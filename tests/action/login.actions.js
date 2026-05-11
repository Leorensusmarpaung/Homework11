const { until } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../Pageobjects/login.page');

class LoginAction {
    constructor(driver) {
        this.driver = driver;
    }

    async openLoginPage(url) {
        await this.driver.get(url);
    }

    async inputUsername(username) {
        await this.driver
            .findElement(LoginPage.usernameInput)
            .sendKeys(username);
    }

    async inputPassword(password) {
        await this.driver
            .findElement(LoginPage.passwordInput)
            .sendKeys(password);
    }

    async clickLogin() {
        await this.driver
            .findElement(LoginPage.loginButton)
            .click();
    }

    async assertLoginSuccess() {
        await this.driver.wait(
            until.elementLocated(LoginPage.pageTitle),
            10000
        );

        const title = await this.driver
            .findElement(LoginPage.pageTitle)
            .getText();

        assert.strictEqual(title, 'Products');
    }

    async assertLoginFailed(expectedMessage) {
        await this.driver.wait(
            until.elementLocated(LoginPage.errorMessage),
            10000
        );

        const actualMessage = await this.driver
            .findElement(LoginPage.errorMessage)
            .getText();

        assert.strictEqual(actualMessage, expectedMessage);
    }
}

module.exports = LoginAction;