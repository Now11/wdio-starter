//import { allure } from 'allure-mocha/runtime'
import { ContentType } from 'allure-js-commons';
import allure from "@wdio/allure-reporter"

async function attachScreenshot(title, png) {
    return allure.addAttachment(title, Buffer.from(png, 'base64'), ContentType.PNG);
}

function attachJsonData(title: string, data: string) {
    return allure.addAttachment(title, data, ContentType.JSON);
}

async function stepAllure(name, cb) {

    // @ts-ignore
    allure.startStep(name);

    try {
        const result = await cb();

        if (typeof result === 'string') {
            allure.addAttachment('Result', result, ContentType.TEXT);
        }

        if (typeof result === "object") {
            allure.addAttachment('Result', JSON.stringify(result), ContentType.JSON);
        }

        // set success result
        allure.endStep('passed');
        return result;

    } catch (error) {
        // set fail result
        allure.endStep('failed');
        throw error;
    }

}

export {
    stepAllure,
    attachScreenshot,
    attachJsonData,
}