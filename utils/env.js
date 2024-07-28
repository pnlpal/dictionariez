// tiny wrapper with default env vars
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
if (!process.env.UNIT_TEST) process.env.UNIT_TEST = "false";
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3355,
  UNIT_TEST: process.env.UNIT_TEST,
  BROWSER: process.env.BROWSER || "Chrome",
};
