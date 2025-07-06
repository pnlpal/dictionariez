import lookupParser from "../content/lookup-parser.js";
import utils from "../utils.coffee";
import { expect } from "chai";
import allLangs from "../resources/langs.json";

const enableLanguages = async (langs = ["Swedish"], withEnglish = true) => {
  const allOtherSupportedLanguages = Object.keys(allLangs).filter(
    (l) => l !== "English"
  );
  const otherDisabledLanguages = allOtherSupportedLanguages.filter(
    (l) => !langs.includes(l)
  );
  await utils.send("save setting", {
    key: "otherDisabledLanguages",
    value: otherDisabledLanguages,
  });
};

before(() => {
  lookupParser();
});

describe.only("background/plain-lookup", () => {
  it("should get definition of fart from both Swedish and English", async () => {
    await enableLanguages(["Swedish"]);
    const result = await utils.send("look up plain", {
      w: "fart",
    });
    expect(result.length).to.equal(2);
    expect(result[0].lang).to.equal("Swedish");
    expect(result[0].w).to.equal("fart");
    expect(result[1].lang).to.equal("English");
    expect(result[1].w).to.equal("fart");
  });
});
