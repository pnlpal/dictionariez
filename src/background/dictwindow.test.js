import utils from "utils";
import { expect } from "chai";

const zoo = {
    w: "zoo",
    sentence: "I went to the zoo yesterday.",
    s: "http://test.com",
    sc: "test source content",
    detectedLangInContext: "en",
};

const zoology = {
    w: "zoology",
    sentence: "Zoology is the scientific study of animals.",
    s: "http://test.com",
    sc: "test source content",
    detectedLangInContext: "en",
};

before(async () => {
    await utils.send("close all dict windows");
});
after(async () => {
    await utils.send("close all dict windows");
    await utils.send("save setting", { key: "enableMinidict", value: false });
});

describe("background/dictwindow - look up", () => {
    it("should look up the word: zoo by keyboard", async () => {
        const requestData = {
            ...zoo,
            means: "keyboard",
        };
        const result = await utils.send("look up", requestData);
        expect(result).to.be.null;
        // save in history takes some time async, so wait a bit before checking the history and dict window info.
        await utils.promisifiedTimeout(300);

        const dictsInfo = await utils.send("get all dict windows info");
        // console.log("dictsInfo: ", dictsInfo);
        expect(dictsInfo.length).to.equal(1);
        const dictInfo = dictsInfo[0];
        expect(dictInfo.word).to.equal("zoo");
        expect(dictInfo.sentence).to.equal("I went to the zoo yesterday.");
        expect(dictInfo.detectedLangInContext).to.equal("en");
        expect(dictInfo.dictName).to.be.a("string");

        const { data: historyWords } = await utils.send("history");
        // console.log("historyWords: ", historyWords);
        expect(historyWords.length).to.be.greaterThan(0);
        const lastHistoryWord = historyWords[0];
        expect(lastHistoryWord.w).to.equal("zoo");
        expect(lastHistoryWord.sentence).to.equal("I went to the zoo yesterday.");
        expect(lastHistoryWord.s).to.equal("http://test.com");
        expect(lastHistoryWord.sc).to.equal("test source content");
        expect(lastHistoryWord.lang).to.equal("en");

        await utils.send("remove history", { w: "zoo" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });

    it("should ignore look up the word: zoo by mouse if not mini dict is not enabled", async () => {
        await utils.send("save setting", { key: "enableMinidict", value: false });
        const requestData = {
            ...zoo,
            means: "mouse",
        };
        const result = await utils.send("look up", requestData);
        expect(result).to.be.null;
        // save in history takes some time async, so wait a bit before checking the history and dict window info.
        await utils.promisifiedTimeout(300);

        const dictsInfo = await utils.send("get all dict windows info");
        // console.log("dictsInfo: ", dictsInfo);
        expect(dictsInfo.length).to.equal(0);
    });

    it("should look up the word: zoo by mouse", async () => {
        await utils.send("save setting", { key: "enableMinidict", value: true });

        const requestData = {
            ...zoo,
            means: "mouse",
        };
        const result = await utils.send("look up", requestData);
        expect(result).to.be.null;
        // save in history takes some time async, so wait a bit before checking the history and dict window info.
        await utils.promisifiedTimeout(300);

        const dictsInfo = await utils.send("get all dict windows info");
        // console.log("dictsInfo: ", dictsInfo);
        expect(dictsInfo.length).to.equal(1);
        const dictInfo = dictsInfo[0];
        expect(dictInfo.word).to.equal("zoo");
        expect(dictInfo.sentence).to.equal("I went to the zoo yesterday.");
        expect(dictInfo.detectedLangInContext).to.equal("en");
        expect(dictInfo.dictName).to.be.a("string");

        const { data: historyWords } = await utils.send("history");
        // console.log("historyWords: ", historyWords);
        expect(historyWords.length).to.be.greaterThan(0);
        const lastHistoryWord = historyWords[0];
        expect(lastHistoryWord.w).to.equal("zoo");
        expect(lastHistoryWord.sentence).to.equal("I went to the zoo yesterday.");
        expect(lastHistoryWord.s).to.equal("http://test.com");
        expect(lastHistoryWord.sc).to.equal("test source content");
        expect(lastHistoryWord.lang).to.equal("en");

        await utils.send("remove history", { w: "zoo" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });

    it("should refine text with AI if word is a sentence and is in editable element", async () => {
        // First, we need an AI dict to be available. This test verifies the isInEditable behavior.
        const requestData = {
            w: "I went to the zoo yesterday.",
            s: "http://test.com",
            sc: "test source content",
            detectedLangInContext: "en",
            means: "keyboard",
            isInEditable: true,
        };
        await utils.send("look up", requestData);
        // When isInEditable is true, refineTextWithAI is called instead of normal lookup
        // The result depends on whether an AI dict is available
        await utils.promisifiedTimeout(300);

        const dictsInfo = await utils.send("get all dict windows info");
        console.log("dictsInfo: ", dictsInfo);
        expect(dictsInfo.length).to.equal(1);
        const dictInfo = dictsInfo[0];
        expect(dictInfo.word).to.equal("I went to the zoo yesterday.");

        const hasOneOfAIDict = ["chatgpt", "gemini", "claude"].some((aiDictName) =>
            dictInfo.dictName.toLowerCase().includes(aiDictName),
        );
        expect(hasOneOfAIDict).to.be.true;

        const { data: historyWords } = await utils.send("history");
        // console.log("historyWords: ", historyWords);
        const notInHistory = historyWords.every((hw) => hw.w !== "I went to the zoo yesterday.");
        expect(notInHistory).to.be.true;

        // Clean up
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });

    it("should open dict window with a new dict if the dict name is specified and different from the current one but no word is provided", async () => {
        // Now look up with a different dict and no word
        const { allDicts } = await utils.send("get-all-dicts");
        const theLastDict = allDicts.at(-1);

        await utils.send("look up", {
            dictName: theLastDict.dictName,
        });
        await utils.promisifiedTimeout(300);

        const dictsInfo = await utils.send("get all dict windows info");
        expect(dictsInfo.length).to.be.greaterThan(0);
        // The main window should now use the different dict and no word
        const mainDictInfo = dictsInfo[0];
        expect(mainDictInfo.dictName).to.equal(theLastDict.dictName);
        expect(mainDictInfo.word).to.be.undefined;
        expect(mainDictInfo.sentence).to.be.undefined;
        expect(mainDictInfo.detectedLangInContext).to.be.undefined;

        // Change to the first dict. The word should still be the same (not reset) because no new word is provided.
        const firstDict = allDicts[0];
        await utils.send("look up", {
            dictName: firstDict.dictName,
        });
        await utils.promisifiedTimeout(300);

        const updatedDictsInfo = await utils.send("get all dict windows info");
        expect(updatedDictsInfo.length).to.be.greaterThan(0);
        const mainDictUpdatedInfo = updatedDictsInfo[0];
        expect(mainDictUpdatedInfo.dictName).to.equal(firstDict.dictName);
        expect(mainDictUpdatedInfo.word).to.be.undefined;
        expect(mainDictUpdatedInfo.sentence).to.be.undefined;
        expect(mainDictUpdatedInfo.detectedLangInContext).to.be.undefined;

        // Clean up
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });

    it("should open dict window with a new dict if the dict name is specified and different from the current one and use the current word if no word is provided", async () => {
        // First look up a word to establish the current word
        const requestData = {
            ...zoo,
            means: "keyboard",
        };
        await utils.send("look up", requestData);
        await utils.promisifiedTimeout(300);

        // Verify the word is set
        let dictsInfo = await utils.send("get all dict windows info");
        expect(dictsInfo.length).to.equal(1);
        expect(dictsInfo[0].word).to.equal("zoo");
        const currentDictName = dictsInfo[0].dictName;

        // Get a different dict
        const { allDicts } = await utils.send("get-all-dicts");
        const differentDict = allDicts.find((d) => d.dictName !== currentDictName);

        // Look up with new dict window flag and no word
        await utils.send("look up", {
            dictName: differentDict.dictName,
            newDictWindow: false,
            means: "keyboard",
        });
        await utils.promisifiedTimeout(300);

        dictsInfo = await utils.send("get all dict windows info");
        // Should not have created a new window
        expect(dictsInfo.length).to.equal(1);
        // The existing window should have updated to the new dict and retained the word
        expect(dictsInfo[0].dictName).to.equal(differentDict.dictName);
        expect(dictsInfo[0].word).to.equal("zoo");
        expect(dictsInfo[0].sentence).to.equal("I went to the zoo yesterday.");
        expect(dictsInfo[0].detectedLangInContext).to.equal("en");

        // Clean up
        await utils.send("remove history", { w: "zoo" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });

    it("should open a new dict window if newDictWindow flag is true", async () => {
        // First look up a word to establish the current word
        const requestData = {
            ...zoo,
            means: "keyboard",
        };
        await utils.send("look up", requestData);
        await utils.promisifiedTimeout(500);
        const dictsInfo = await utils.send("get all dict windows info");
        expect(dictsInfo.length).to.equal(1);
        const currentDictName = dictsInfo[0].dictName;

        // Get a different dict
        const { allDicts } = await utils.send("get-all-dicts");
        const differentDict = allDicts.find((d) => d.dictName !== currentDictName);

        // Look up with new dict window flag and no word
        await utils.send("look up", {
            ...zoology,
            dictName: differentDict.dictName,
            newDictWindow: true,
            means: "keyboard",
        });
        await utils.promisifiedTimeout(500);

        const updatedDictsInfo = await utils.send("get all dict windows info");
        // Should have created a new window
        expect(updatedDictsInfo.length).to.equal(2);
        const newWindowInfo = updatedDictsInfo.find((info) => info.dictName === differentDict.dictName);
        expect(newWindowInfo).to.exist;
        // The new window should have the new dict and the same word
        expect(newWindowInfo.word).to.equal("zoology");
        expect(newWindowInfo.sentence).to.equal("Zoology is the scientific study of animals.");
        expect(newWindowInfo.detectedLangInContext).to.equal("en");

        // The main dict window should also update to the new word because the newDictWindow flag is true, but should keep its dict because it's not specified to change dict.
        const mainWindowInfo = updatedDictsInfo.find((info) => info.dictName === currentDictName);
        expect(mainWindowInfo).to.exist;
        expect(mainWindowInfo.word).to.equal("zoology");
        expect(mainWindowInfo.sentence).to.equal("Zoology is the scientific study of animals.");
        expect(mainWindowInfo.detectedLangInContext).to.equal("en");
        expect(mainWindowInfo.dictName).to.equal(currentDictName);

        // Clean up
        await utils.send("remove history", { w: "zoo" });
        await utils.send("remove history", { w: "zoology" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });
});

describe("background/dictwindow - query", () => {
    it("should return the query result from the main dict window", async () => {
        // First look up a word to establish the current word
        const requestData = {
            ...zoo,
            means: "keyboard",
        };
        await utils.send("look up", requestData);
        await utils.promisifiedTimeout(500);

        const queryData = {
            ...zoology,
        };
        const result = await utils.send("query", queryData);
        console.log("query result: ", result);
        expect(result).to.be.null;
        await utils.promisifiedTimeout(500);

        const dictsInfo = await utils.send("get all dict windows info");
        expect(dictsInfo.length).to.equal(1);
        const dictInfo = dictsInfo[0];
        expect(dictInfo.word).to.equal("zoology");
        expect(dictInfo.sentence).to.equal("Zoology is the scientific study of animals.");
        expect(dictInfo.detectedLangInContext).to.equal("en");

        const { data: historyWords } = await utils.send("history");
        expect(historyWords.length).to.be.greaterThan(0);
        const lastHistoryWord = historyWords[0];
        expect(lastHistoryWord.w).to.equal("zoology");
        expect(lastHistoryWord.lang).to.equal("en");

        // Clean up
        await utils.send("remove history", { w: "zoo" });
        await utils.send("remove history", { w: "zoology" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });
    it("should query the last word in next dict if nextDict flag is true", async () => {
        // First look up a word to establish the current word
        const requestData = {
            ...zoo,
            means: "keyboard",
        };
        await utils.send("look up", requestData);
        await utils.promisifiedTimeout(500);
        const dictsInfo = await utils.send("get all dict windows info");
        expect(dictsInfo.length).to.equal(1);
        const dictInfo = dictsInfo[0];
        const currentDictName = dictInfo.dictName;

        const queryData = {
            nextDict: true,
        };
        const result = await utils.send("query", queryData);
        console.log("query result for next dict: ", result);
        expect(result).to.be.null;
        await utils.promisifiedTimeout(500);

        const updatedDictsInfo = await utils.send("get all dict windows info");
        expect(updatedDictsInfo.length).to.equal(1);
        const updatedDictInfo = updatedDictsInfo[0];
        console.log("updatedDictInfo: ", updatedDictInfo);
        expect(updatedDictInfo.dictName).to.not.equal(currentDictName);
        expect(updatedDictInfo.word).to.equal("zoo");
        expect(updatedDictInfo.sentence).to.equal("I went to the zoo yesterday.");
        expect(updatedDictInfo.detectedLangInContext).to.equal("en");

        // Clean up
        await utils.send("remove history", { w: "zoo" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });
    it("should query the last word in previous dict if previousDict flag is true", async () => {
        // First look up a word to establish the current word
        const requestData = {
            ...zoo,
            means: "keyboard",
        };
        await utils.send("look up", requestData);
        await utils.promisifiedTimeout(500);
        const dictsInfo = await utils.send("get all dict windows info");
        expect(dictsInfo.length).to.equal(1);
        const dictInfo = dictsInfo[0];
        const currentDictName = dictInfo.dictName;

        const queryData = {
            previousDict: true,
        };
        const result = await utils.send("query", queryData);
        console.log("query result for previous dict: ", result);
        expect(result).to.be.null;
        await utils.promisifiedTimeout(500);

        const updatedDictsInfo = await utils.send("get all dict windows info");
        expect(updatedDictsInfo.length).to.equal(1);
        const updatedDictInfo = updatedDictsInfo[0];
        console.log("updatedDictInfo: ", updatedDictInfo);
        expect(updatedDictInfo.dictName).to.not.equal(currentDictName);
        expect(updatedDictInfo.word).to.equal("zoo");
        expect(updatedDictInfo.sentence).to.equal("I went to the zoo yesterday.");
        expect(updatedDictInfo.detectedLangInContext).to.equal("en");

        // Clean up
        await utils.send("remove history", { w: "zoo" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });

    it("should query the last word in the specified dict if dictName is provided", async () => {
        // First look up a word to establish the current word
        const requestData = {
            ...zoo,
            means: "keyboard",
        };
        await utils.send("look up", requestData);
        await utils.promisifiedTimeout(500);
        const dictsInfo = await utils.send("get all dict windows info");
        expect(dictsInfo.length).to.equal(1);
        const dictInfo = dictsInfo[0];
        const currentDictName = dictInfo.dictName;

        // Get a different dict
        const { allDicts } = await utils.send("get-all-dicts");
        const differentDict = allDicts.find((d) => d.dictName !== currentDictName);
        expect(differentDict).to.exist;

        const queryData = {
            dictName: differentDict.dictName,
        };
        const result = await utils.send("query", queryData);
        console.log("query result for specified dict: ", result);
        await utils.promisifiedTimeout(500);

        const updatedDictsInfo = await utils.send("get all dict windows info");
        expect(updatedDictsInfo.length).to.equal(1);
        const updatedDictInfo = updatedDictsInfo[0];
        console.log("updatedDictInfo: ", updatedDictInfo);
        expect(updatedDictInfo.dictName).to.equal(differentDict.dictName);
        expect(updatedDictInfo.word).to.equal("zoo");
        expect(updatedDictInfo.sentence).to.equal("I went to the zoo yesterday.");
        expect(updatedDictInfo.detectedLangInContext).to.equal("en");

        // Clean up
        await utils.send("remove history", { w: "zoo" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });

    it("should query the last word in the specified dict if dictNumber is provided", async () => {
        // First look up a word to establish the current word
        const requestData = {
            ...zoo,
            means: "keyboard",
        };
        await utils.send("look up", requestData);
        await utils.promisifiedTimeout(500);
        const dictsInfo = await utils.send("get all dict windows info");
        expect(dictsInfo.length).to.equal(1);
        const dictInfo = dictsInfo[0];
        const currentDictName = dictInfo.dictName;

        // Get a different dict
        const { allDicts } = await utils.send("get-all-dicts");
        const differentDictIndex = allDicts.findIndex((d) => d.dictName !== currentDictName);
        expect(differentDictIndex).to.be.greaterThan(-1);

        const queryData = {
            dictNumber: differentDictIndex + 1, // dictNumber is 1-based index
        };
        const result = await utils.send("query", queryData);
        console.log("query result for specified dict number: ", result);
        await utils.promisifiedTimeout(500);

        const updatedDictsInfo = await utils.send("get all dict windows info");
        expect(updatedDictsInfo.length).to.equal(1);
        const updatedDictInfo = updatedDictsInfo[0];
        console.log("updatedDictInfo: ", updatedDictInfo);
        expect(updatedDictInfo.dictName).to.equal(allDicts[differentDictIndex].dictName);
        expect(updatedDictInfo.word).to.equal("zoo");
        expect(updatedDictInfo.sentence).to.equal("I went to the zoo yesterday.");
        expect(updatedDictInfo.detectedLangInContext).to.equal("en");

        // Clean up
        await utils.send("remove history", { w: "zoo" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });

    it("should query previous word if previous flag is true", async () => {
        // First look up a word to establish the current word
        const requestData = {
            ...zoo,
            means: "keyboard",
        };
        await utils.send("look up", requestData);
        await utils.promisifiedTimeout(500);

        // Then look up another word to have a previous word in history
        const requestData2 = {
            ...zoology,
            means: "keyboard",
        };
        await utils.send("look up", requestData2);
        await utils.promisifiedTimeout(500);

        const queryData = {
            previousWord: true,
        };
        await utils.send("query", queryData);
        await utils.promisifiedTimeout(500);

        const dictsInfo = await utils.send("get all dict windows info");
        expect(dictsInfo.length).to.equal(1);
        const dictInfo = dictsInfo[0];
        expect(dictInfo.word).to.equal("zoo");
        expect(dictInfo.sentence).to.equal("I went to the zoo yesterday.");
        expect(dictInfo.detectedLangInContext).to.equal("en");

        // Clean up
        await utils.send("remove history", { w: "zoo" });
        await utils.send("remove history", { w: "zoology" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });

    it("should query the last word in a new dict window if the newDictWindow flag is true", async () => {
        // First look up a word to establish the current word
        const requestData = {
            ...zoo,
            means: "keyboard",
        };
        await utils.send("look up", requestData);
        await utils.promisifiedTimeout(500);

        // Get a different dict
        const { allDicts } = await utils.send("get-all-dicts");
        const differentDict = allDicts.find((d) => d.dictName !== requestData.dictName);
        expect(differentDict).to.exist;

        // Look up with new dict window flag and no word
        await utils.send("query", {
            newDictWindow: true,
            dictName: differentDict.dictName,
        });
        await utils.promisifiedTimeout(500);

        const updatedDictsInfo = await utils.send("get all dict windows info");
        // Should have created a new window
        expect(updatedDictsInfo.length).to.equal(2);
        const newWindowInfo = updatedDictsInfo.find((info) => info.dictName === differentDict.dictName);
        expect(newWindowInfo).to.exist;
        // The new window should have the same word and sentence as the current word because no new word is provided, but should use the new dict.
        expect(newWindowInfo.word).to.equal("zoo");
        expect(newWindowInfo.sentence).to.equal("I went to the zoo yesterday.");
        expect(newWindowInfo.detectedLangInContext).to.equal("en");
        expect(newWindowInfo.dictName).to.equal(differentDict.dictName);

        // Clean up
        await utils.send("remove history", { w: "zoo" });
        await utils.send("close all dict windows");
        await utils.promisifiedTimeout(300);
    });
});
