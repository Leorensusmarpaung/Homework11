const { Builder } = require('selenium-webdriver');
const LoginAction = require('../action/login.action');
const SharingAction = require('../action/sharing.action');
const LoginPage = require('../pageobject/login.page.js');

describe('Login', () => {
    let driver;
    let loginAction;
    let sharingAction;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginAction = new LoginAction(driver);
        sharingAction = new SharingAction(driver);
        await loginAction.openLoginPage('https://www.saucedemo.com/');
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('should login with valid credentials', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginSuccess();

        await sharingAction.fullPageScreenshot('login_success');
    });

    it('should login with invalid username', async () => {
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Epic sadface: Username is required.');

        await sharingAction.fullPageScreenshot('login_failed_empty_username');
        await sharingAction.partialScreenshot(
            LoginPage.errorMessage,
            'login_failed_empty_username_partial'
        );
    });
});