// const puppeteer = require("puppeteer");
import puppeteer from "puppeteer";
const urls = [
    "https://cne-official.webflow.io/about/history",
    "https://cne-official.webflow.io/about/impact",
    "https://cne-official.webflow.io/about/annual-reports",
    "https://cne-official.webflow.io/about/staff",
    "https://cne-official.webflow.io/about/board-policy-council",
    "https://cne-official.webflow.io/about/partners",
    "https://cne-official.webflow.io/about/employment-opportunities",
    "https://cne-official.webflow.io/for-families/programs-overview",
    "https://cne-official.webflow.io/for-families/head-start-early-head-start",
    "https://cne-official.webflow.io/for-families/programs-childcare-assistance-program-ccap",
    "https://cne-official.webflow.io/for-families/preschool-for-all",
    "https://cne-official.webflow.io/for-families/new-families",
    "https://cne-official.webflow.io/for-families/current-families",
    "https://cne-official.webflow.io/for-families/childcare-list",
    "https://cne-official.webflow.io/for-supporters/upcoming-events",
    "https://cne-official.webflow.io/for-supporters/supporters-list",
    "https://cne-official.webflow.io/for-educators/professional-development",
    "https://cne-official.webflow.io/for-supporters/news-events",
    "https://cne-official.webflow.io/contact",
];

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
    [
        {
            directory: "desktop",
            viewport: {
                width: 1200,
                height: 900,
                deviceScaleFactor: 1,
            },
        },
        {
            directory: "mobile",
            viewport: {
                width: 700,
                height: 900,
                deviceScaleFactor: 1,
            },
        },
    ].forEach(async (config) => {
        const { directory, viewport } = config;
        await runScript(directory, viewport);
    });
};

generateScreenshots();
