const path = require("path");
const fs = require("fs");
const ROOT_DIR = path.resolve(__dirname);
const SPECS_DIR = path.join(ROOT_DIR, "specs");
const LIB_DIR = path.join(ROOT_DIR, "lib");
const OUTPUT_DIR = path.join(ROOT_DIR, "output");
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, "screenshots");
const testPattern = path.relative(ROOT_DIR, path.join(SPECS_DIR, "**", "*.spec.ts"));

exports.config = {
  runner: "local",

  path: "/wd/hub",

  port: 4444,

  specs: [testPattern],

  outputDir: OUTPUT_DIR,

  maxInstances: 1,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["window-size=1960,1080", "--headless"],
        //args: ["window-size=1960,1080"],
      },
    },
  ],

  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "silent",

  baseUrl: "",

  waitforTimeout: 10000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  services: ["selenium-standalone"],

  framework: "mocha",

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: path.join(OUTPUT_DIR, "allure-results"),
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true,
        disableWebdriverStepsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
    require: "ts-node/register",
  },

  waitforTimeout: 3000,

  screenshotPath: path.join(OUTPUT_DIR, "screenshots"),

  coloredLogs: true,

  afterTest: async function (test, context, { error }) {
    if (error) {
      if (!fs.existsSync(SCREENSHOT_DIR)) {
        fs.mkdirSync(SCREENSHOT_DIR);
      }

      const filename = encodeURIComponent(test.title.replace(/\s+/g, "-"));
      const filePath = SCREENSHOT_DIR + `/${filename}.png`;
      await browser.saveScreenshot(filePath);
    }
  },
};
