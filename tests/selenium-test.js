const { Builder, By, until } = require('selenium-webdriver');

async function runTest() {
    let driver;
    
    try {
        console.log('Starting Selenium test...');
        
        // Connect to Selenium container
        driver = await new Builder()
            .forBrowser('chrome')
            .usingServer('http://selenium:4444/wd/hub')
            .build();
        
        console.log('Connected to Selenium Grid');
        
        // Test your frontend
        await driver.get('http://frontend:5173');
        console.log('Opened frontend URL');
        
        // Wait for page to load and check title
        await driver.wait(until.titleContains('Vite'), 10000);
        const title = await driver.getTitle();
        console.log('Page title:', title);
        
        // Basic check - look for any element with text
        try {
            await driver.wait(until.elementLocated(By.tagName('body')), 10000);
            console.log('✅ Page loaded successfully');
        } catch (error) {
            console.log('❌ Page failed to load properly');
            throw error;
        }
        
        console.log('✅ Test completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    } finally {
        if (driver) {
            await driver.quit();
            console.log('Browser closed');
        }
    }
}

runTest();