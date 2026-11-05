import { BasePage } from './BasePage.js';

export class BooksPage extends BasePage {
    constructor(page) {
        super(page);

        this.bookHeading = page.getByRole('heading', { level: 1 });
        this.tagItem = page.locator('.tag-item');
        this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    }

    bookItem(name) {
        return this.page.locator('a[href*="/books/"]', { hasText: name });
    }

    async searchBook(name) {
        await this.page_Open('search?term=' + name); // example, if searching for `Blue-Cat`, then it will take us to `books?search=Blue-Cat`
    }
    
    async deleteBook(bookUrl) {
        await this.page.goto(bookUrl + '/delete');
        await this.confirmButton.click();
    }
}
