export class BasePage {
    constructor(page) {
        this.page = page;
    }

    // Page Open. path '' = home page
    async page_Open(path = '') { // Opens home. page_Open('login') opens login. page_Open('create-book') opens create book page.
        await this.page.goto('/' + path, { 
            waitUntil: 'domcontentloaded', timeout: 60000
        });
        await this.page.setViewportSize({ width: 1920, height: 1080 });
    }
}
