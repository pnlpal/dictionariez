import "mocha/mocha.js";
import "mocha/mocha.css";
import "jquery";
window.chai = require("chai");
window.expect = window.chai.expect;
window.sinon = require("sinon");

mocha.setup("bdd");

require("../content/lookup-parser.test.js");
require("../content/lookup-parser.google.test.js");
require("../background/storage.test.js");
require("../background/plain-lookup.test.js");

mocha.run();
