const { except}= require('@playwright/test');

exports.LoginPage=class LoginPage {
    constructor(page) {
            this.page=page;
            this.usernameInput ='#email';
            this.passwordInput ='//input[@placeholder="Password"]';
            this.loginButton = '//button[@id="submit"]';
            this.logOut = '//button[@id="logout"]';
            this.loginValidation ='//p[contains(text(),"")]';
            this.alertMessage = '//span[@id="error"]';
        }

    async login(username, password) {
        await this.page.waitForTimeout(2000);

        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }
    async verifyValidlogin() {
        const loginValidation = await this.page.locator(this.loginValidation);
        await this.page.waitForTimeout(2000);
        except(this.logout).tobeVisible();
        await except(loginValidation).toHaveText('Click on any contact to view details');
    }
}