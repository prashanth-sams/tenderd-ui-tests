import { After, AfterAll, Before, BeforeAll, BeforeStep, AfterStep, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, chromium, Page, BrowserContext, firefox, webkit } from "@playwright/test";
import { pageFixture as fixture } from "./pageFixture";
import { config } from "../../../playwright.config";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../support/logger";
import { exec } from "child_process";
const path = require('path');

export let context: BrowserContext;
let browser: Browser;

const fs = require('fs');

BeforeAll(async function (){
    getEnv();
    setDefaultTimeout(60 * 1000);

    browser = await chromium.launch(config); 

});

Before(async function({ pickle }){
    const scenarioName = pickle.name + pickle.id
    const tags = pickle.tags.map(tag => tag.name);

    const contextOptions = {
        javaScriptEnabled: true,
        ignoreHTTPSErrors: true,
        viewport: { width: 1680, height: 1080 },
        recordVideo: { dir: 'test-result/videos/' }
    };

    
    context = await browser.newContext(contextOptions);

    const page = await context.newPage();

    await context.tracing.start({
        screenshots: true,    // Capture screenshots
        snapshots: true,      // Capture DOM snapshots
        sources: true         // Capture JS and CSS source files
    });

    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

Before({ tags: "@data"}, async function (){

    /**
     * Generate data for the automation test
     */
    
    exec(`cd ../../../hse-api; TEST_CAMERA_ID=${process.env.TEST_CAMERA_ID} bun ./src/scripts/qa-event.producer.ts`, (error, stdout, stderr) => {
        
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
    });

    await new Promise(resolve => setTimeout(resolve, 3000));
});

After({ tags: "@alarm"}, async function (){
    await fixture.page?.close();
});

After(async function ({ pickle, result }){
    if(result?.status != Status.PASSED){
        const timeStamp = () => new Date().toISOString().replace(/:/g, '-');

        /**
         * rename the video file on failure
         */
        const videoPath = await fixture.page.video().path();

        const newVideoPath = path.join(
            'test-result/videos/',
            '.',
            `[${result.status}] ${pickle.name} ${timeStamp()}.webm`
        );
        await fs.promises.rename(videoPath, newVideoPath);
        
        /**
         * Take a screenshot on failure
         */
        const img = await fixture.page.screenshot({ path: `./test-result/screenshots/${pickle.name}-${timeStamp()}.png`,type:"png"});
        await this.attach(img, "image/png");
        await fixture.page?.close();

        await context.close();
    }
});

AfterAll(async function (){
    await browser.close();
});