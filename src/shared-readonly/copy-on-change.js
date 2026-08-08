// This file is auto-copied. Do not edit directly.

const fs = require("fs");
const path = require("path");

module.exports = ({
  sourceFile,
  sourceFiles = [],
  sourceDir,
  sourceDirs = [],
  destDir,
  watchMode = true,
}) => {
  if (!fs.existsSync(destDir)) {
    console.warn(
      `⚠️ Destination directory does not exist: ${destDir}, skipping copy-on-change.`,
    );
    return;
  }

  function addMessageOnFileTop(filepath) {
    const message = "// This file is auto-copied. Do not edit directly.";
    try {
      const content = fs.readFileSync(filepath, "utf-8");
      if (!content.startsWith(message)) {
        fs.writeFileSync(filepath, message + "\n\n" + content, "utf-8");
        console.log(`✅ Added message to top of ${filepath}`);
      }
    } catch (error) {
      console.error(`❌ Failed to add message to ${filepath}:`, error);
    }
  }

  function addMessageToFilesInDir(dirPath) {
    try {
      const files = fs.readdirSync(dirPath, { recursive: true });
      files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        try {
          const stats = fs.statSync(fullPath);
          if (stats.isFile()) {
            addMessageOnFileTop(fullPath);
          }
        } catch (error) {
          // skip if stat fails
        }
      });
    } catch (error) {
      console.error(`❌ Failed to add messages to files in ${dirPath}:`, error);
    }
  }

  function copyPath(source) {
    try {
      const resolvedSource = path.resolve(source);
      const stats = fs.statSync(resolvedSource);
      const destPath = path.join(destDir, path.basename(source));

      if (stats.isDirectory()) {
        // Copy directory recursively
        fs.cpSync(resolvedSource, destPath, { recursive: true, force: true });
        console.log(`✅ Copied directory ${source} to ${destPath}`);
        addMessageToFilesInDir(destPath);
      } else {
        // Copy file
        fs.copyFileSync(resolvedSource, destPath);
        console.log(`✅ Copied ${source} to ${destPath}`);
        addMessageOnFileTop(destPath);
      }
    } catch (error) {
      console.error(`❌ Copy failed:`, error);
    }
  }

  function watchPath(source) {
    try {
      const resolvedSource = path.resolve(source);
      const stats = fs.statSync(resolvedSource);

      if (stats.isDirectory()) {
        fs.watch(resolvedSource, { recursive: true }, () => {
          console.log(`📁 ${source} changed`);
          copyPath(source);
        });
      } else {
        fs.watchFile(resolvedSource, () => {
          console.log(`📁 ${source} changed`);
          copyPath(source);
        });
      }

      console.log(`👀 Watching ${source} for changes...`);
    } catch (error) {
      console.error(`❌ Failed to watch ${source}:`, error);
    }
  }

  // Initial copy
  if (sourceFile) copyPath(sourceFile);
  if (sourceDir) copyPath(sourceDir);
  sourceFiles.forEach((file) => copyPath(file));
  sourceDirs.forEach((dir) => copyPath(dir));

  // Watch for changes
  if (watchMode) {
    if (sourceFile) watchPath(sourceFile);
    if (sourceDir) watchPath(sourceDir);
    sourceFiles.forEach((file) => watchPath(file));
    sourceDirs.forEach((dir) => watchPath(dir));
  }
};
