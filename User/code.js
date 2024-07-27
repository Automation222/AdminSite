// abo.3bra@gmail.com
// aa11

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Go to the login page 
    await page.goto('https://www.tatar-w.com/login?serv=4');

    // Wait for user input for manual login
    console.log('Please enter your email and password manually and press Enter in the console when done.');
    process.stdout.write('Waiting for manual login...\n');

    try {
        //await new Promise(resolve => setTimeout(resolve, 60000));
        await page.waitForTimeout(60000);
        console.log('Wait period over. Continuing with the script.');
    } catch (error) {
        console.error('Error during wait period:', error);
    }

    // Function to click an element by selector
    async function clickElement(selector) {
        try {
            await page.waitForSelector(selector, { visible: true, timeout: 5000 });
            await page.click(selector);
        } catch (error) {
            console.error(`Error clicking element with selector: ${selector}`, error);
        }
    }

    // Function to navigate and perform actions on a specific build page
    async function handleBuild(buildId) {
        try {
            await page.goto(`https://www.tatar-w.com/build?id=${buildId}`);
            await clickElement('a[href="#"]');
        } catch (error) {
            console.error(`Error handling build id ${buildId}:`, error);
        }
    }

    // Main function to perform tasks
    async function performTasks() {
        console.log('Starting main tasks...');
        for (let i = 3; i <= 10; i++) {
            console.log(`Processing build id ${i}`);
            await handleBuild(i);
        }

        // Additional specific build actions
        await handleBuild(26); // House
        await handleBuild(39); // Gathering point
        await handleBuild(19); // Granaries
        await handleBuild(33); // Settlers training
        await handleBuild(29); // Market actions
        await handleBuild(28); // Another build action

        // Settling actions
        try {
            await page.goto('https://www.tatar-w.com/map');
            await clickElement('a[href="#"]');
            await clickElement('a[href="#"]');
            await clickElement('button[type="submit"]');
        } catch (error) {
            console.error("Error during settling actions:", error);
        }

        // Go to the village page
        try {
            await page.goto('https://www.tatar-w.com/village1');
        } catch (error) {
            console.error("Error navigating to the village page:", error);
        }
    }

    // Wait for login button and proceed
    try {
        await clickElement('#btn_ok');
        await page.waitForNavigation();
        console.log('Logged in successfully, starting tasks...');
        await performTasks();
    } catch (error) {
        console.error("Error during login or navigation:", error);
    }

    // Close the browser
    await browser.close();
})();
