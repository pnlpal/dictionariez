module.exports = {
  searchDirectory: "src",

  useJSModules: true,

  decaffeinateArgs: [
    "--use-cs2",
    "--loose",
    "--logical-assignment",
    "--nullish-coalescing",
    "--optional-chaining",
    "--no-array-includes",
  ],

  fixImportsConfig: {
    searchPath: "./src",
    absoluteImportPaths: ["./src"],
  },
};
