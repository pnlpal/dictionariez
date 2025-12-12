"use strict";

const express = require("express");
const path = require("path");
const app = express();

const PORT = 8080;

// Serve all static files in this directory (HTML, CSS, JS, images, etc.)
app.use(express.static(__dirname));
// Map root requests for .jpg/.png/.gif to ../readme_images
app.use("/", express.static(path.join(__dirname, "../readme_images")));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dictionariez landing page running at http://localhost:${PORT}`);
});
