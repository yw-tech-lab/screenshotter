// const puppeteer = require("puppeteer");
import puppeteer from "puppeteer";
import urls from "./cne.mjs";

const runScript = async (directory, viewport) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport(viewport);

    for (const url of urls) {
        console.log(`Capturing ${url}...`);
        await page.goto(url, { waitUntil: "networkidle2" });

        // Format filename from URL
        const filename =
            url.replace(/^https?:\/\//, "").replace(/[^\w]/g, "_") + ".png";

        await page.screenshot({
            path: `screenshots/${directory}/${filename}`,
            fullPage: true,
        });

        console.log(`Saved to screenshots/${filename}`);
    }

    await browser.close();
};

const generateScreenshots = async () => {
    const desktop = {
        directory: "desktop",
        viewport: {
            width: 1200,
            height: 900,
            deviceScaleFactor: 1,
        },
    };
    const mobile = {
        directory: "mobile",
        viewport: {
            width: 700,
            height: 900,
            deviceScaleFactor: 1,
        },
    };
    [desktop, mobile].forEach(async (config) => {
        await runScript(config.directory, config.viewport);
    });
};

generateScreenshots();
