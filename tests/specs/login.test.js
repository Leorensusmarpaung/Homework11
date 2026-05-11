const { Builder } = require('selenium-webdriver');
const LoginAction = require('../action/login.actions');

describe('Login', () => {
    let driver;
    let loginAction;

    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        loginAction = new LoginAction(driver);
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
    });

    it('should fail login with invalid username', async () => {
        await loginAction.inputUsername('invalid_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();

        await loginAction.assertLoginFailed(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    it('should fail login with wrong password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('wrong_password');
        await loginAction.clickLogin();

        await loginAction.assertLoginFailed(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    it('should fail login with locked_out_user', async () => {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();

        await loginAction.assertLoginFailed(
            'Epic sadface: Sorry, this user has been locked out.'
        );
    });
});