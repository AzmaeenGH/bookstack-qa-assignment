import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { BookCreatePage } from '../pages/BookCreatePage.js';
import { BooksPage } from '../pages/BooksPage.js';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/env.js';

let loginPage, createPage, booksPage, bookUrl, name;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    createPage = new BookCreatePage(page);
    booksPage = new BooksPage(page);
    bookUrl = '';
    name = `Book_${Date.now()}`; // switch to `Book-${Date.now()}` if 01 or 02 below fails

    await loginPage.page_Open();
    await loginPage.click_LoginButton();
    await loginPage.login_EmailAddress(ADMIN_EMAIL);
    await loginPage.login_Password(ADMIN_PASSWORD);
    await loginPage.login_Button();
    await createPage.page_Open('create-book');
});
 
// // Cleanup
test.afterEach(async () => {
    if (bookUrl) await booksPage.deleteBook(bookUrl);
});

test('AUT-002-01: name only', async ({ page }) => {
    await createPage.fillBookName(name);
    await createPage.saveBook();
    await expect(page).toHaveURL(/\/books\/[^/]+$/); // wait for redirect to book page before capturing URL
    bookUrl = page.url();  // Capture URL
    await expect(booksPage.bookHeading).toHaveText(name);
    
    await booksPage.searchBook(name);
    await expect(booksPage.bookItem(name)).toBeVisible();
});

test('AUT-002-02: name and description', async ({ page }) => {
    await createPage.fillBookName(name);
    await createPage.fillBookDescription('Test description');
    await createPage.saveBook();

    await expect(page).toHaveURL(/\/books\/[^/]+$/); // wait for redirect to book page before capturing URL    
    bookUrl = page.url();  // Capture URL 
    await expect(booksPage.bookHeading).toHaveText(name);
    
    await booksPage.searchBook(name);
    await expect(booksPage.bookItem(name)).toBeVisible();
});

test('AUT-002-03: cancel', async () => {
    await createPage.fillBookName(name);
    await createPage.cancelSavingBookButton();

    await booksPage.searchBook(name);
    await expect(booksPage.bookItem(name)).toHaveCount(0);
});

test('AUT-002-04: name, description, tag', async ({ page }) => {
    await createPage.fillBookName(name);
    await createPage.fillBookDescription('Test description');
    await createPage.fillTag('little', '3');
    await createPage.saveBook();

    await expect(page).toHaveURL(/\/books\/[^/]+$/); // wait for redirect to book page before capturing URL
    bookUrl = page.url();  // Capture URL
    await expect(booksPage.bookHeading).toHaveText(name);
    await expect(booksPage.tagItem).toContainText('little');
});

test('AUT-002-05: valid cover image', async ({ page }) => {
    await createPage.fillBookName(name);
    await createPage.uploadBookCover('test-data/cover.jpg');
    await createPage.saveBook();

    await expect(page).toHaveURL(/\/books\/[^/]+$/); // wait for redirect to book page before capturing URL
    bookUrl = page.url(); // Capture URL
    await expect(booksPage.bookHeading).toHaveText(name);
});

test('AUT-002-06: empty name', async () => {
    await createPage.saveBook();

    await expect(createPage.errorMessage('The name field is required.')).toBeVisible();
});

test('AUT-002-07: invalid cover file', async () => {
    await createPage.fillBookName(name);
    await createPage.uploadBookCover('test-data/invalid-cover.txt');
    await createPage.saveBook();

    await expect(createPage.errorMessage('The image must have a valid & supported image extension.')).toBeVisible();
});
