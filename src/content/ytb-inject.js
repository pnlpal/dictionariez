export function initYtbInjection() {
  if (location.hostname !== "www.youtube.com" || window.self === window.top)
    return;

  // console.log("Injected in ytb: ", location.href);

  async function fetchCaption(url) {
    var xml = await fetch(url);
    xml = await xml.text();
    return xml.trim();
  }

  async function getVideoCaptions(info) {
    if (!info.captions) {
      console.error(
        "[ytb-inject] There are restrictions preventing you from viewing this video"
      );
      return;
    }
    // console.log("video info", info);
    try {
      var captions =
        info.captions.playerCaptionsTracklistRenderer.captionTracks;

      if (!captions) {
        console.error("[ytb-inject] There is no caption from this video");
        return;
      }

      if (captions.url) captions = [captions];
    } catch (e) {
      console.error("[ytb-inject]", e);
      return;
    }

    const result = [];
    for (const caption of captions) {
      const item = {
        videoId: info.videoDetails.videoId,
        languageName: caption.name.simpleText,
        languageCode: caption.languageCode,
        xml: await fetchCaption(caption.baseUrl),
      };

      result.push(item);
    }

    return result;
  }

  function getVideoInfo(info) {
    if (!info.videoDetails) {
      console.error(
        "[ytb-inject] There are restrictions preventing you from getting info of this video"
      );
      return;
    }

    return {
      snapshot:
        "https://i.ytimg.com/vi/" +
        info.videoDetails.videoId +
        "/hqdefault.jpg",
      videoId: info.videoDetails.videoId,
      title: info.videoDetails.title,
      shortDescription: info.videoDetails.shortDescription,
    };
  }

  async function parse(videoLink = "") {
    if (typeof getPageData == "function") {
      var info = getPageData().data.playerResponse;
      if (info && info != "undefined") {
        return info;
      }
    } else if (typeof window.getPageData == "function") {
      var info = getPageData().data.playerResponse;
      if (info && info != "undefined") {
        return info;
      }
    }
    if (typeof ytInitialPlayerResponse != "undefined") {
      var info = ytInitialPlayerResponse;
      if (info && info != "undefined") {
        return info;
      }
    } else if (typeof window.ytInitialPlayerResponse != "undefined") {
      var info = window.ytInitialPlayerResponse;
      if (info && info != "undefined") {
        return info;
      }
    }
    if (videoLink) {
      try {
        var response = await window.fetch(videoLink);
        var body = await response.text();
        var scriptPt1 = body
          .split(
            "<script" +
              body
                .split("var ytInitialPlayerResponse = ")[0]
                .split("<script")
                .pop() +
              "var ytInitialPlayerResponse = "
          )[1]
          .split("</script>")[0];
        return eval("(function() {return " + scriptPt1 + "})();");
      } catch (e) {
        console.error("[ytb-inject]", e);
        return;
      }
    }
  }

  window.addEventListener("message", async (event) => {
    if (
      event.data &&
      (event.data.type === "getCaptions" ||
        event.data.type === "getVideoInfo") &&
      ["http://localhost:4200", "https://pnlpal.dev"].includes(event.origin)
    ) {
      // console.log("event", event.data, event.origin);
      const videoData = await parse(event.data.videoLink);
      // console.log("parsed video data", videoData);
      const response = {
        type: "captions",
        videoId: event.data.videoId,
      };
      if (!event.data.noCaptions) {
        response.captions = await getVideoCaptions(videoData);
        // console.log("Got captions:", response.captions.length);
      }
      if (!event.data.noVideoInfo) {
        response.videoInfo = getVideoInfo(videoData);
        // console.log("Got videoInfo: ", response.videoInfo);
      }

      window.parent.postMessage(response, event.origin);
    }
  });
}
