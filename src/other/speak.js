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

  if (lang === "en-US") {
    if (utils.isWindows()) {
      v =
        voices.find((x) => x.name === voice) ||
        voices.find((x) => x.name === "Microsoft Zira") || // Windows default
        voices.find((x) => x.name === "Microsoft David") ||
        voices.find((x) => x.lang === "en-US");
    } else if (utils.isMac()) {
      voices.find((x) => x.name === voice) ||
        voices.find((x) => x.name === "Samantha") || // macOS default
        voices.find((x) => x.lang === "en-US");
    } else {
      v =
        voices.find((x) => x.name === voice) ||
        voices.find((x) => x.name === "Google US English") ||
        voices.find((x) => x.lang === "en-US" && x.name === "Samantha");
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
