import utils from "utils";

function promisifiedTimeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function playAudios(urls) {
  if (!urls || !urls.length) {
    return;
  }

  const _checkEnd = async (audio) => {
    if (audio.ended) {
      return true;
    }
    await promisifiedTimeout(100);
    return _checkEnd(audio);
  };

  const _play = (url) => {
    return new Promise((resolve) => {
      if (!url) {
        return resolve();
      }

      let audio = new Audio(url);
      audio.oncanplay = () => {
        audio.play();
      };

      _checkEnd(audio).then(resolve);
    });
  };

  for (let url of urls) {
    if (url) {
      await _play(url);
    }
  }
}

function playSynthesis({ text, lang, name, voice } = {}) {
  if (!text) {
    return;
  }

  let msg = new SpeechSynthesisUtterance();
  msg.text = text;
  if (lang) {
    msg.lang = lang;
  }

  let voices = speechSynthesis.getVoices();
  let v;

  if (lang) {
    if (utils.isWindows()) {
      v =
        voices.find((x) => x.name === voice) ||
        voices.find(
          (x) => x.name.startsWith("Microsoft Zira") && x.lang === lang
        ) || // Windows default
        voices.find(
          (x) => x.name.startsWith("Microsoft David") && x.lang === lang
        ) ||
        voices.find((x) => x.lang === lang);
    } else if (utils.isMac()) {
      voices.find((x) => x.name === voice) ||
        voices.find((x) => x.name === "Samantha" && x.lang === lang) || // macOS default
        voices.find((x) => x.name === "Daniel" && x.lang === lang) ||
        voices.find((x) => x.lang === lang);
    } else {
      v =
        voices.find((x) => x.name === voice) ||
        voices.find((x) => x.name.startsWith("Google") && x.lang === lang) ||
        voices.find((x) => x.lang === lang);
    }
    if (v) {
      msg.voice = v;
    }
  } else if (name) {
    v = voices.find((x) => x.name.toLowerCase().includes(name.toLowerCase()));
    if (v) {
      msg.voice = v;
    }
  }

  // console.log("speak", text, msg);
  window.speechSynthesis.speak(msg);
}

if (!navigator.userAgent.includes("Gecko/")) {
  // not Firefox, Firefox doesn't support offscreen.
  chrome.runtime.onMessage.addListener(
    ({ type, ameSrc, breSrc, otherSrc, synthesisObj }) => {
      if (type === "speak") {
        playAudios([ameSrc, breSrc, otherSrc]);
        playSynthesis(synthesisObj);
      }
    }
  );
}

export { playAudios, playSynthesis };
