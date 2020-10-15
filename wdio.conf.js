const {  startStep, endStep } = require('@wdio/allure-reporter').default;
const path = require('path');
const fs = require('fs');
const ROOT_DIR = path.resolve(__dirname);
const OUTPUT_DIR = path.join(ROOT_DIR, 'output');
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, 'screenshots');

exports.config = {
  runner: 'local',
  path: '/wd/hub',
  port: 4444,
  specs: ['./specs/**/*.spec.ts'],
  maxInstances: 5,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        //args: ['window-size=1960,1080', '--headless'],
        args: ["window-size=1960,1080"],
      },
    },
  ],
  logLevel: 'silent',
  bail: 0,
  baseUrl: '',
  waitforTimeout: 10000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableMochaHooks: true,
        disableWebdriverScreenshotsReporting: false,
        disableWebdriverStepsReporting: true,
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
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
  outputDir: OUTPUT_DIR,
  screenshotPath: SCREENSHOT_DIR,
  onPrepare: function (config, capabilities) {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR);
    }
  },

  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (error) {
      const currentUrl = await browser.getUrl();
      startStep(`Screenshot current url: ${currentUrl} `);
      await browser.takeScreenshot();
      endStep('passed');
    }
  },
};
