const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
    let driver;
    
    try {
        console.log('🔍 Starting DEBUG Selenium test...');
        
        // Wait for Selenium to be ready
        console.log('⏳ Waiting for Selenium to start...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        // Connect to Selenium container with explicit options
        const options = new chrome.Options();
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .usingServer('http://selenium-grid:4444/wd/hub')
            .build();
        
        console.log('✅ Connected to Selenium Grid');
        
        // Navigate to your frontend
        console.log('🌐 Navigating to frontend...');
        await driver.get('http://bezzer-frontend:5175');
        console.log('✅ Opened frontend URL');
        
        // Wait a bit for page to load completely
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // 🔍 DEBUG: Get ALL the information we can
        console.log('\n=== 🔍 DEBUG INFORMATION ===');
        
        // 1. Get the actual title
        const title = await driver.getTitle();
        console.log('📝 Page Title:', `"${title}"`);
        console.log('📏 Title Length:', title.length);
        console.log('🔤 Title is empty?', title === '');
        
        // 2. Get the page source (first 500 chars to see what's there)
        const pageSource = await driver.getPageSource();
        console.log('📄 Page Source Length:', pageSource.length);
        console.log('📄 First 500 chars of page:', pageSource.substring(0, 500));
        
        // 3. Look for specific HTML elements
        try {
            // Check if there's a title tag in HTML
            const titleElement = await driver.findElement(By.tagName('title'));
            const titleText = await titleElement.getText();
            console.log('🏷️  HTML <title> tag content:', `"${titleText}"`);
        } catch (e) {
            console.log('❌ No <title> tag found');
        }
        
        // 4. Check for common React/Vite elements
        try {
            const rootDiv = await driver.findElement(By.id('root'));
            console.log('✅ Found #root div (React app container)');
        } catch (e) {
            console.log('❌ No #root div found');
        }
        
        // 5. Check for any h1, h2, or main content
        try {
            const h1Elements = await driver.findElements(By.tagName('h1'));
            console.log('📰 Found', h1Elements.length, 'h1 elements');
            
            if (h1Elements.length > 0) {
                const firstH1Text = await h1Elements[0].getText();
                console.log('📰 First h1 text:', `"${firstH1Text}"`);
            }
        } catch (e) {
            console.log('❌ Error checking h1 elements');
        }
        
        // 6. Check current URL (in case of redirects)
        const currentUrl = await driver.getCurrentUrl();
        console.log('🔗 Current URL:', currentUrl);
        
        // 7. Check if page is actually loaded (look for any text content)
        try {
            const bodyElement = await driver.findElement(By.tagName('body'));
            const bodyText = await bodyElement.getText();
            console.log('📝 Body text length:', bodyText.length);
            console.log('📝 First 200 chars of body:', bodyText.substring(0, 200));
        } catch (e) {
            console.log('❌ Error getting body text');
        }
        
        console.log('=== 🔍 DEBUG COMPLETE ===\n');
        
        // 8. Now let's try different wait strategies
        console.log('🧪 Testing different wait strategies...');
        
        // Strategy 1: Wait for body to have some content
        try {
            await driver.wait(async () => {
                const body = await driver.findElement(By.tagName('body'));
                const text = await body.getText();
                return text.length > 10; // Wait for some actual content
            }, 15000);
            console.log('✅ Body has content - page loaded!');
        } catch (e) {
            console.log('❌ Body content wait failed:', e.message);
        }
        
        // Strategy 2: Wait for React root to be populated
        try {
            await driver.wait(async () => {
                try {
                    const root = await driver.findElement(By.id('root'));
                    const innerHTML = await root.getAttribute('innerHTML');
                    return innerHTML.length > 50; // Wait for React to render something
                } catch (e) {
                    return false;
                }
            }, 15000);
            console.log('✅ React root has content!');
        } catch (e) {
            console.log('❌ React root wait failed:', e.message);
        }
        
        console.log('✅ Debug test completed successfully!');
        
    } catch (error) {
        console.error('❌ Debug test failed:', error.message);
        console.error('Full error:', error);
    } finally {
        if (driver) {
            await driver.quit();
            console.log('🔒 Browser closed');
        }
    }
}

// Run the debug test
runTest();