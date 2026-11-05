import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage{
    constructor(page){
        super(page);

        // For LOGIN
        this.clickLoginButton = page.locator('a[href="https://demo.bookstackapp.com/login"]')
        this.loginEmailInput = page.locator('input[name="email"]');
        this.loginPasswordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
    }

    // Error message handling
    errorMessage(text) {
        // Targets elements containing the exact validation error text string
        return this.page.locator('.text-neg', { hasText: text });
    }

    async click_LoginButton(){
        await this.clickLoginButton.click();
    }

    async login_EmailAddress(name){
        await this.loginEmailInput.fill(name);
    }

    async login_Password(name){
        await this.loginPasswordInput.fill(name);
    }

    async login_Button(){
        await this.loginButton.click();
    }
}
