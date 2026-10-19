# Dictionary Sync Flow

## Overview

This document describes the synchronization flow between the client (browser extension) and server (pnl.dev cloud) for Pro users' dictionary lists.

## Simplified Sync Model (Proposed)

The sync model is **full state sync** - client always sends complete `allDicts` array. `lastTimeSyncDicts` on the client only ever holds a time the server returned; the client never writes its own clock into it. A local change is signalled with `action` instead.

```mermaid
flowchart TD
    subgraph Client["Client (Browser Extension)"]
        A[User Action] --> B{Action Type}
        B -->|Add Dict| C1[Add to allDicts]
        B -->|Remove Dict| C2[Remove from allDicts]
        B -->|Reorder| C3[Update sequences]
        B -->|Change Languages| C4[Sync dicts for languages]
        B -->|Restore Defaults| C5[Add missing defaults]
        
        C1 & C2 & C3 & C4 & C5 --> D[Re-sequence allDicts]
        D --> E[Save to Local Storage<br/>batch: removeAll + setAll]
        E --> F{Is Pro User?}
        F -->|No| G[Done - Local Only]
        F -->|Yes| F2{Has lastTimeSyncDicts?}
        F2 -->|No| F3[Edge Case 6:<br/>check server first]
        F2 -->|Yes| H[Send allDicts + lastTimeSyncDicts<br/>+ action]
        H --> I[Call Server API<br/>POST /api/dicts/syncAllDicts]
    end
    
    subgraph Server["Server (pnl.dev)"]
        I --> J{Validate Pro Status}
        J -->|Not Pro| K[Return 403 not-pro-user]
        J -->|Pro| L[Validate allDicts array]
        L --> M{First Time Sync?<br/>serverTimestamp == null}
        M -->|Yes| N[Save all client dicts<br/>shouldUpdateClientSide = false]
        M -->|No| O{action sent?}
        O -->|Yes| P[Delete all server dicts<br/>Save all client dicts<br/>shouldUpdateClientSide = false]
        O -->|No| O2{clientTime == serverTime?}
        O2 -->|Yes| P2[In sync, nothing to do]
        O2 -->|No| Q[Keep server dicts<br/>shouldUpdateClientSide = true]

        N & P --> R[Update serverTimestamp<br/>to new ISO time]
        R & P2 & Q --> S[Return response<br/>with serverTimestamp]
    end
    
    subgraph Response["Client Handles Response"]
        S --> T{shouldUpdateClientSide?}
        T -->|Yes| U[Replace local allDicts<br/>with server allDicts]
        U --> V[Batch save to storage<br/>removeAll + setAll]
        T -->|No| W[Keep local allDicts]
        V & W --> X[Update lastTimeSyncDicts<br/>from server response]
        X --> Y[Done]
    end
    
    K --> Z[Client: Set isPro = false<br/>Disable Pro features]
```

## Edge Cases

### Edge Case 1: New Pro User

```mermaid
flowchart LR
    E1A[User becomes Pro] --> E1B[First sync call]
    E1B --> E1C[Server has no dicts<br/>serverTimestamp = null]
    E1C --> E1D[Server saves all client dicts]
    E1D --> E1E[Client keeps local state]
```

### Edge Case 2: Multi-Device Sync

```mermaid
flowchart LR
    E2A[Device A changes dicts] --> E2B[Device A syncs to server<br/>serverTime = T1]
    E2B --> E2C[Device B opens extension]
    E2C --> E2D[Device B pulls, no action<br/>clientTime < T1]
    E2D --> E2E[Server wins<br/>Device B updates from server]
```

### Edge Case 3: Offline Changes

```mermaid
flowchart TD
    E3A[User makes changes offline] --> E3B[Changes saved locally]
    E3B --> E3C[User comes online]
    E3C --> E3D[Sync triggered]
    E3D --> E3E[Sync with action]
    E3E --> E3F[Client wins<br/>Changes made meanwhile on other devices are lost!]
```

### Edge Case 4: Pro Expires

```mermaid
flowchart LR
    E4A[Pro subscription expires] --> E4B[Sync call returns 403]
    E4B --> E4C[Client sets isPro = false]
    E4C --> E4D[Local storage still works]
    E4D --> E4E[No more cloud sync]
```

### Edge Case 5: Language Change

```mermaid
flowchart LR
    E5A[User changes languages] --> E5B[Calculate suggested dicts]
    E5B --> E5C[Remove non-suggested<br/>non-custom dicts]
    E5C --> E5D[Add new suggested dicts]
    E5D --> E5E[Batch save + sync]
```

### Edge Case 6: New Device with Existing Server Data

```mermaid
flowchart TD
    E6A[User installs ext on new device] --> E6B[Mandatory language selection]
    E6B --> E6C[Generate dicts from languages<br/>Save locally]
    E6C --> E6D{Is Pro User?}
    
    E6D -->|No| E6E[Done - local only]
    
    E6D -->|Yes| E6F{Has lastTimeSyncDicts?}
    E6F -->|Yes, already synced| E6G[Normal sync flow]
    
    E6F -->|No, never synced| E6H[Check server with<br/>lastTimeSyncDicts = 0<br/>before any sync, on any trigger]
    E6H --> E6I{Server has dicts?}
    
    E6I -->|No| E6J[Sync to upload local dicts]
    E6J --> E6K[Done]
    
    E6I -->|Yes| E6L[Show conflict prompt:<br/>'Found synced dicts from another device']
    E6L --> E6M{User choice?}
    
    E6M -->|Use server copy| E6N[Replace local with server dicts<br/>Store server's lastTimeSyncDicts]
    E6N --> E6K

    E6M -->|Keep local| E6P[Sync with action + server's lastTimeSyncDicts<br/>to overwrite server with local dicts]
    E6P --> E6K
```

**Key Point**: For Pro users on a device that has never synced (fresh install, or a free user who became Pro):
1. **Language selection first** (always mandatory)
2. Generate local dicts from selected languages
3. If never synced before, **check server** (with timestamp = 0). Every sync does this first, whether it is a pull or a local change, so neither side overwrites the other before the user decides. The options page shows the conflict prompt whenever it finds one, not only in the welcome dialog.
4. If server has data → **ask user**: "Use server copy?" or "Keep local?"
   - Use server copy → replace local dicts with server dicts
   - Keep local → overwrite server with local dicts
5. If server has no data → sync to upload local dicts

Language selection happens **before** the sync check, so server data doesn't affect language choice.

## Data Flow Summary

| Trigger | Local Storage | Cloud Sync |
|---------|--------------|------------|
| Add dict | Append to storage | Full sync |
| Remove dict | Remove from storage | Full sync |
| Reorder | Update all sequences | Full sync |
| Change languages | Batch remove + add | Full sync |
| Open options page | Read only | Full sync (get latest) |

## Key Simplifications

1. **No incremental sync** - Always send full `allDicts` state
2. **Last writer wins** - a sync with `action` overwrites the server; a sync without it takes the server's version unless the timestamps match. Older extensions that send `Date.now()` without `action` still win when their time is newer than the server's
3. **Batch local storage** - Use `removeAll` + `setAll` instead of individual operations
4. **Single sync call** - No separate add/remove actions, just full state sync

## Custom Dict Protection

Custom dicts (installed from pnl.dev with `troveUrl` property) are **never removed** during language sync:

```javascript
// Only remove if: NOT in suggested AND NOT a custom dict
if (!suggestedDictNames.has(dict.dictName) && !dict.troveUrl) {
    remove(dict);
}
```
