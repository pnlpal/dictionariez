"use strict";

const express = require("express");
const path = require("path");
const app = express();

const PORT = 8080;

// Serve all static files in this directory (HTML, CSS, JS, images, etc.)
app.use(express.static(__dirname));
// Map root requests for .jpg/.png/.gif to ../readme_images
app.use("/", express.static(path.join(__dirname, "../readme_images")));
app.get("/github-badge.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/vendor/github-badge.js"));
});
// Serve favicon at /library-64.png
app.get("/library-64.png", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/images/library-64.png"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dictionariez landing page running at http://localhost:${PORT}`);
});
