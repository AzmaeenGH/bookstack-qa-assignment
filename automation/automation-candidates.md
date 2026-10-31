# Automation Candidates

- **Application**: BookStack Demo (https://demo.bookstackapp.com/)
- **Tool**: Playwright

## AUT-001: Login with valid and invalid credentials

Steps:
1. Open the login page
2. Enter email and password
3. Click "Log In"
4. Check the result

| Test case | Email | Password | Expected result |
|---|---|---|---|
| AUT-001-01 | admin@example.com | valid password | Login succeeds |
| AUT-001-02 | (empty) | (empty) | "The email field is required." and "The password field is required." |
| AUT-001-03 | admin@example.com | pass0word | "These credentials do not match our records." |
| AUT-001-04 | adminn@exaample.com | valid password | "These credentials do not match our records." |
| AUT-001-05 | adminexample.com | valid password | "The email must be a valid email address." User stays on login page |
| AUT-001-06 | ADMIN@example.com | valid password | Login succeeds |
| AUT-001-07 | " admin@example.com" (leading space) | valid password | Login succeeds |
| AUT-001-08 | "admin@example.com " (trailing space) | valid password | Login succeeds |

**Why automate**: Login is needed by every other test and is run very often. The steps are the same every time, only the input changes. If login breaks, nothing else works.

## AUT-002: Create a book and check it appears in the book list

Precondition: User is logged in. Book name is unique per run (example: `Book_data_time`).

| Test case | Input | Steps | Expected result |
|---|---|---|---|
| AUT-002-01 | Name only | Go to /create-book, enter name, click "Save Book", go to /books | Book page opens with the name. Name is in the book list. |
| AUT-002-02 | Name and description | Go to /create-book, enter name and description, click "Save Book", go to /books | Book is created and listed. |
| AUT-002-03 | Cancel | Go to /create-book, enter name, click "Cancel", go to /books | Book is not in the list. |
| AUT-002-04 | Name + description + 1 tag (name `little`, value `3`) | Go to /create-book, enter name and description, add the tag, click "Save Book" | Book is created. Tag is shown on the book page. |
| AUT-002-05 | Name + valid cover image (.jpg) | Go to /create-book, enter name, upload the .jpg, click "Save Book" | Book is created with the cover image. |
| AUT-002-06 | Empty name | Go to /create-book, leave name empty, click "Save Book" | Book is not created. "The name field is required." |
| AUT-002-07 | Invalid cover file (.txt) | Go to /create-book, enter name, upload the .txt, click "Save Book" | Book is not created. "The image must have a valid & supported image extension." |

Cleanup: delete the created books after the run.

**Why automate**: Creating a book is the main function of the app. Steps are fixed and the page is stable. Good quick check after every update.

## AUT-003: Book name length boundary

Precondition: User is logged in.

Steps:
1. Go to /create-book
2. Enter a name of the given length
3. Click "Save Book"
4. Check the result

| Test case | Name length | Expected result |
|---|---|---|
| AUT-003-01 | 1 | Book is created |
| AUT-003-02 | 255 | Book is created |
| AUT-003-03 | 256 | Not created. "The name may not be greater than 255 characters." |

Cleanup: delete the created books after the run.

**Why automate**: Typing and counting 255 and 256 characters by hand is slow and easy to get wrong. A script creates the exact length every time. Good for catching changes to the validation rule.