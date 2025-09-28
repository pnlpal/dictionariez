// 102,400	QUOTA_BYTES
// 8,192	QUOTA_BYTES_PER_ITEM
// 512	    MAX_ITEMS
const test_QUOTA_BYTES_PER_ITEM = async () => {
    let s = "";
    let i = 0;
    while (i < 8189) {
        s += "a";
        i += 1;
    }

    await storage.set({ s });
    console.log(new Blob([JSON.stringify(s + "s")]).size);
    const data = await storage.get("s");
    console.log(data);
};

test_QUOTA_BYTES_PER_ITEM();

const test_MAX_ITEMS = async () => {
    let i = 0;
    let data = {};
    while (i < 512) {
        let w = `w-${i}`;
        data[w] = { w, t: Date.now() };
        i += 1;
    }
    await storage.set(data);
    await storage.init();
    console.log(storage.localHistory.length);
};

test_MAX_ITEMS();
