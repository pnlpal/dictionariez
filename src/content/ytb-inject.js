export function initYtbInjection() {
  if (location.hostname !== "www.youtube.com" || window.self === window.top)
    return;

  // console.log("Injected in ytb: ", location.href);

  async function fetchCaption(url) {
    var xml = await fetch(url);
    xml = await xml.text();
    return xml.trim();
  }

  async function getCaptionsFromVideo(info) {
    if (!info.captions) {
      console.error(
        "[ytb-inject] There are restrictions preventing you from viewing this video"
      );
      return;
    }
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
      console.log(
        `Got ${caption.name.simpleText} caption for video ${info.videoDetails.videoId}`
      );
      result.push(item);
    }

    return result;
  }

  async function getCaptions(videoLink = "") {
    if (typeof getPageData == "function") {
      var info = getPageData().data.playerResponse;
      if (info && info != "undefined") {
        return getCaptionsFromVideo(info);
      }
    } else if (typeof window.getPageData == "function") {
      var info = getPageData().data.playerResponse;
      if (info && info != "undefined") {
        return getCaptionsFromVideo(info);
      }
    }
    if (typeof ytInitialPlayerResponse != "undefined") {
      var info = ytInitialPlayerResponse;
      if (info && info != "undefined") {
        return getCaptionsFromVideo(info);
      }
    } else if (typeof window.ytInitialPlayerResponse != "undefined") {
      var info = window.ytInitialPlayerResponse;
      if (info && info != "undefined") {
        return getCaptionsFromVideo(info);
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
        return getCaptionsFromVideo(
          eval("(function() {return " + scriptPt1 + "})();")
        );
      } catch (e) {
        console.error("[ytb-inject]", e);
        return;
      }
    }
  }

  window.addEventListener("message", (event) => {
    if (
      event.data &&
      event.data.type === "getCaptions" &&
      ["http://localhost:4200", "https://pnlpal.dev"].includes(event.origin)
    ) {
      //   console.log("event", event.data, event.origin);
      getCaptions(event.data.videoLink).then((captions) => {
        window.parent.postMessage(
          {
            type: "captions",
            captions: captions,
            videoId: event.data.videoId,
          },
          event.origin
        );
      });
    }
  });
}
