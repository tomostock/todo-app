module.exports = {
  moduleDirectories: ["../../", "node_modules"],
  roots: ["."],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"], // 追記
  verbose: true,
};