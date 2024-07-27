// abo.3bra@gmail.com
// aa11

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Go to the login page
    await page.goto('https://www.tatar-w.com/login?serv=4');

    // Pause to allow manual entry of email and password
    console.log('Please enter your email and password manually and press Enter in the console when done.');
    console.log('200');
    await new Promise(resolve => {
        console.log('210');
        process.stdin.once('data', () => {
            console.log('220');
            resolve();
        });
        console.log('2300');
    }).then(async () => {
        console.log('50');
        // Wait for and click the login button
        const loginButton = await page.waitForSelector('#btn_ok', { visible: true });
        console.log('60');
        await loginButton.click();
        console.log('70');
        await page.waitForNavigation();  // Wait for the page to navigate after login
        console.log('out loop');
        // Iterate through elements and perform actions
        for (let i = 3; i <= 10; i++) {
            console.log('10');
            await page.goto(`https://www.tatar-w.com/build?id=1`);
            console.log('20');
            await page.evaluate(() => {
                const element = document.querySelector('a[href="#"]');
                console.log('1');
                if (element) {
                    console.log('2');
                    element.scrollIntoView();
                }
            });
            await page.click('a[href="#"]');
            console.log('3');

            await page.goto(`https://www.tatar-w.com/build?id=3`);
            await page.waitForSelector('a[href="#"]', { visible: true });
            await page.click('a[href="#"]');

            await page.goto(`https://www.tatar-w.com/build?id=4`);
            await page.waitForSelector('a[href="#"]', { visible: true });
            await page.click('a[href="#"]');

            await page.goto(`https://www.tatar-w.com/build?id=16`);
            await page.waitForSelector('a[href="#"]', { visible: true });
            await page.click('a[href="#"]');

            // Add similar blocks for other URLs and actions as needed
        }

        // Building actions
        await page.goto('https://www.tatar-w.com/build?id=26');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');

        await page.goto('https://www.tatar-w.com/build?id=39');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');

        // Additional actions (storage, training, etc.)
        await page.goto('https://www.tatar-w.com/build?id=19');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');

        // Continue with other builds, trainings, and settlements as per your script

        // For training settlers
        await page.goto('https://www.tatar-w.com/build?id=33');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');
        for (let i = 0; i < 10; i++) {
            await page.click('a[href="#"]'); // Click the training button multiple times
        }

        // Market actions
        await page.goto('https://www.tatar-w.com/build?id=29');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');

        // Settling
        await page.goto('https://www.tatar-w.com/map');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');
        await page.waitForSelector('button[type="submit"]', { visible: true });
        await page.click('button[type="submit"]');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');
        await page.waitForSelector('a[href="#"]', { visible: true });
        await page.click('a[href="#"]');

        // Go to the village page
        await page.goto('https://www.tatar-w.com/village1');

        // Close the browser
        await browser.close();
    });

})();
