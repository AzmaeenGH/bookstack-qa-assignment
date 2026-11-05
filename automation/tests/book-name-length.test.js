import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { BookCreatePage } from '../pages/BookCreatePage.js';
import { BooksPage } from '../pages/BooksPage.js';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/env.js';

const lengthCases = [
    { id: 'AUT-003-01', length: 1 },
    { id: 'AUT-003-02', length: 255},
    { id: 'AUT-003-03', length: 256, error: 'The name may not be greater than 255 characters.' },
];

let loginPage, createPage, booksPage, bookUrl;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    createPage = new BookCreatePage(page);
    booksPage = new BooksPage(page);
    bookUrl = '';

    await loginPage.page_Open();
    await loginPage.click_LoginButton();
    await loginPage.login_EmailAddress(ADMIN_EMAIL);
    await loginPage.login_Password(ADMIN_PASSWORD);
    await loginPage.login_Button();
    await createPage.page_Open('create-book');
});

// Book Cleanup part
test.afterEach(async () => {
    if (bookUrl) await booksPage.deleteBook(bookUrl);
});

for (const data of lengthCases) {
    test(`${data.id}: name length ${data.length}`, async ({ page }) => {
        if (data.length === 255) test.fail(true, 'BUG: name truncated to 191 chars');

        const name = 'a'.repeat(data.length);

        await createPage.fillBookName(name);
        await createPage.saveBook();

        if (data.error) {
            await expect(createPage.errorMessage(data.error)).toBeVisible();
            return;
        }

        await expect(page).toHaveURL(/\/books\/[^/]+$/);  // wait for redirect to book page before capturing URL
        bookUrl = page.url(); // Capture URL
        await expect(booksPage.bookHeading).toHaveText(name);
    });
}

// TAKES 255 before giving error on websiite 
// 255 a = aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// BUT after creating the book, we find that the name is only 191 character long.
// 191 a = aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
