import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ADMIN_EMAIL, ADMIN_PASSWORD, WRONG_PASSWORD } from '../utils/env.js';

const REQUIRED_EMAIL = 'The email field is required.';
const REQUIRED_PASSWORD = 'The password field is required.';
const BAD_CREDENTIALS = 'These credentials do not match our records.';
const INVALID_EMAIL = 'The email must be a valid email address.';

const loginCases = [
  {
    id: 'AUT-001-01',
    title: 'valid credentials log in',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    success: true,
  },
  {
    id: 'AUT-001-02',
    title: 'empty email and password show required errors',
    email: '',
    password: '',
    errors: [REQUIRED_EMAIL, REQUIRED_PASSWORD],
  },
  {
    id: 'AUT-001-03',
    title: 'wrong password is rejected',
    email: ADMIN_EMAIL,
    password: WRONG_PASSWORD,
    errors: [BAD_CREDENTIALS],
  },
  {
    id: 'AUT-001-04',
    title: 'unknown email is rejected',
    email: 'adminn@exaample.com',
    password: ADMIN_PASSWORD,
    errors: [BAD_CREDENTIALS],
  },
  {
    id: 'AUT-001-05',
    title: 'email without @ shows validation error',
    email: 'adminexample.com',
    password: ADMIN_PASSWORD,
    errors: [INVALID_EMAIL],
  },
  {
    id: 'AUT-001-06',
    title: 'email is case-insensitive',
    email: 'ADMIN@example.com',
    password: ADMIN_PASSWORD,
    success: true,
  },
  {
    id: 'AUT-001-07',
    title: 'leading space in email is accepted',
    email: ` ${ADMIN_EMAIL}`,
    password: ADMIN_PASSWORD,
    success: true,
  },
  {
    id: 'AUT-001-08',
    title: 'trailing space in email is accepted',
    email: `${ADMIN_EMAIL} `,
    password: ADMIN_PASSWORD,
    success: true,
  },
];


// test.describe('AUT-001: Login with valid and invalid credentials', () => {
  for (const data of loginCases) {
      test(`${data.id}: ${data.title}`, async ({ page }) => {
          const pages = new LoginPage(page);

          // LOGIN
          await pages.page_Open();
          await pages.click_LoginButton();
          await pages.login_EmailAddress(data.email);
          await pages.login_Password(data.password);
          await pages.login_Button();

          if (data.success) {
              await expect(page).not.toHaveURL(/\/login/);
              await expect(pages.loginEmailInput).toHaveCount(0);
              return;
          }

          await expect(page).toHaveURL(/\/login/);
              for (const message of data.errors) {
              await expect(pages.errorMessage(message)).toBeVisible();
          }
      });
  }

// });

// await page.waitForTimeout(50000);
// await page.pause();
