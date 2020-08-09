require("ts-node").register({ files: true });

exports.config = {
  runner: "local",
  path: "/wd/hub",
  port: 4444,
  specs: ["./specs/**/*.spec.ts"],
  maxInstances: 2,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["window-size=1960,1080", "--headless"],
        //args: ["window-size=1960,1080"],
      },
    },
  ],
  logLevel: "info",
  bail: 0,
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["selenium-standalone"],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
