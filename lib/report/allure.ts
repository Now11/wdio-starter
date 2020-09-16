import allure from "@wdio/allure-reporter"


async function stepAllure(name, cb) {
    allure.startStep(name);
    const result = await cb();
    try {
        allure.endStep('passed');
        return result;
    } catch (error) {
        allure.endStep('failed');
        throw error;
    }
}

async function stepMethodAllure(stepName, cb) {
    allure.startStep(stepName);
    const result = await cb()
    try {
        allure.endStep("passed");
        return result;
    } catch (error) {
        allure.endStep("failed");
        throw error;
    }
}

export {
    stepAllure,
    stepMethodAllure
}