import { describe, it } from "mocha/mocha.js";
import "mocha/mocha.css";
import $ from "jquery";
window.chai = require("chai");
window.expect = window.chai.expect;
window.sinon = require("sinon");

mocha.setup("bdd");

require("../content/lookup-parser.test.js");
require("../background/storage.test.js");
mocha.run();
