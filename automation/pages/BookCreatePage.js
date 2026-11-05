import { BasePage } from './BasePage.js';

export class BookCreatePage extends BasePage {
    constructor(page) {
        super(page);

        // this.bookBooksPageButton = page.locator('a[href="https://demo.bookstackapp.com/books"]');
        // this.CreateNewBookButton = page.locator('a[href="https://demo.bookstackapp.com/create-book"]');
        this.bookNameInput = page.locator('input[name="name"]');

        this.bookDescriptionInput = page.locator('[contenteditable="true"]');

        this.coverImageInput = page.locator('input[name="image"]');

        this.addTagButton = page.getByRole('button', { name: 'Book Tags' });
        this.bookTagNameInput = page.locator('input[name="tags[0][name]"]');
        this.bookTagValueInput = page.locator('input[name="tags[0][value]"]');
        
        this.bookSaveBookButton = page.getByRole('button', { name: 'Save Book' });
        this.bookCancelBookButton = page.getByRole('link', { name: 'Cancel' });
    }

    // Navigate to the Book Creating Page
    // async clickBookLink(){
    //     await this.bookBooksPageButton.click();
    // }

    errorMessage(text) {
        return this.page.locator('.text-neg', { hasText: text });
    }
    
    // // Create New Book Steps:
    // async CreateNewBook(){
    //     await this.CreateNewBookButton.click();
    // }

    async fillBookName(bookName){
        await this.bookNameInput.fill(bookName);
    }

    async fillBookDescription(bookDescription){
        await this.bookDescriptionInput.fill(bookDescription);
    }

    async fillTag(name, value) {
        await this.addTagButton.click();
        await this.bookTagNameInput.fill(name);
        await this.bookTagValueInput.fill(value);
    }

    async uploadBookCover(filePath){
        await this.coverImageInput.setInputFiles(filePath);
    }

    async saveBook() {
        await this.bookSaveBookButton.click();
    }

    async cancelSavingBookButton() {
        await this.bookCancelBookButton.click();
    }
}
