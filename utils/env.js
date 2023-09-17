// tiny wrapper with default env vars
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3355,
};
