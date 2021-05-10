const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('https://example.com');

    // console.log(await page.content());
    await page.screenshot({path: 'puppeteer/screenshot.png'});

    await browser.close();
})();