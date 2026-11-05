# BookStack QA Automation

Playwright (JavaScript, ES modules, Page Object Model) automation for the candidates in `automation/automation-candidates.md`, run against the public demo site `https://demo.bookstackapp.com/`.

## What is tested

Scenarios and justifications: see [automation-candidates.md](automation-candidates.md).

| Spec file | ID | Scope | Cases |
|---|---|---|---|
| `tests/login.test.js` | AUT-001 | Login with valid and invalid credentials | 8 |
| `tests/create-book.test.js` | AUT-002 | Create a book and see it in the list | 7 |
| `tests/book-name-length.test.js` | AUT-003 | Book name length boundary (1, 255, 256) | 3 |

Total: 18 tests per browser, 54 runs across 3 browsers.

## Tech stack

- Playwright Test (JavaScript, ES modules)
- Page Object Model
- Reporters: list, Playwright HTML, Allure
- Browsers: Chromium, Firefox, WebKit

## Project structure

```
automation/
├── pages/
│   ├── BasePage.js          # goto helper, viewport
│   ├── LoginPage.js         # login locators and actions
│   ├── BookCreatePage.js    # create-book form locators and actions
│   └── BooksPage.js         # book page, search, delete
├── tests/
│   ├── login.test.js
│   ├── create-book.test.js
│   └── book-name-length.test.js
├── utils/
│   └── env.js               # demo credentials
├── test-data/
│   ├── cover.jpg            # valid cover image
│   └── invalid-cover.txt    # invalid cover file
├── playwright.config.js
├── package.json
├── automation-candidates.md
└── README.md
```

## Requirements

- Node.js 18+
- Internet access to `https://demo.bookstackapp.com/`
- Java (only for generating the Allure report)

## Setup

```bash
npm install
npx playwright install
```

If dependencies are missing:

```bash
npm install -D @playwright/test allure-playwright allure-commandline
```

## Run

Run all commands from the `automation/` project root. Test files use relative paths such as `test-data/cover.jpg`.

```bash
npx playwright test                                   # all tests, all browsers
npx playwright test --project=chromium                # one browser
npx playwright test tests/login.test.js               # one spec file
npx playwright test -g "AUT-002-01"                   # one test by ID
npx playwright test --headed                          # visible browser
```

## Reports

Playwright HTML report:

```bash
npx playwright show-report
```

Allure report (requires Java):

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

Failure screenshots are kept.

## Notes

- The demo site is shared and public. Tests log in through the UI in `beforeEach`.
- Credentials are in `utils/env.js`.
- Book names use `Book_<timestamp>` to stay unique across parallel runs.
- Cleanup: every test that creates a book deletes it in `afterEach`. The book URL is captured right after the redirect to the book page, so cleanup still runs if a later assertion fails.

## Known defect

Tracked as BUG-002 in `../bug_reports/bug-report.md`.

Book names longer than 191 characters are silently truncated.

- The form accepts up to 255 characters. 256 is rejected with "The name may not be greater than 255 characters."
- A 255-character name is saved and shown as 191 characters. No error is displayed.
- 191 characters is saved in full. 192 is truncated to 191.

AUT-003-02 (length 255) detects this on the heading assertion. It is marked with `test.fail(true, ...)`, so it is reported as an expected failure. If the app is fixed, this test will start failing as an unexpected pass. Remove the `test.fail` line at that point.

## Limitations

- Results depend on the shared demo site's availability and speed.
