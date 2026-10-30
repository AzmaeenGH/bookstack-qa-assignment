# Bug Report

- **Application:** BookStack Demo (https://demo.bookstackapp.com/)
- **Environment:** Linux Mint, Brave Browser 1.97.56 
- **Date:** 31 Oct 2026
- **Tester:** Azmaeen Galib Hassan

## BUG-001: Rapid clicks on Save button create multiple duplicate records

**Severity:** Medium

**Steps to Reproduce**
1. Log in as admin@example.com
2. Go to Books > Create New Book
3. Enter Name: `tree`
4. Click "Save Book" many times, very fast
5. Go to the Books list

The same happens on Create Shelf and Create Chapter.

**Expected Result**
One book is created.

**Actual Result**
Up to 14 books named `new-book` are created from one submit. Each has a different URL (for example `/books/new-book` and `/books/new-book-BQG`). Same result on Shelf and Chapter.

**Reproduced:** 5 of 5 attempts per entity

**Evidence**
- Screen recording: [BUG-001_recording.mp4](evidence/BUG-001_recording.mp4)
- Book: [list](evidence/BUG-001_book_list.png), [URL 1](evidence/BUG-001_book_slug_1.png), [URL 2](evidence/BUG-001_book_slug_2.png)
- Shelf: [list](evidence/BUG-001_shelf_list.png), [URL 1](evidence/BUG-001_shelf_slug_1.png), [URL 2](evidence/BUG-001_shelf_slug_2.png)
- Chapter: [list](evidence/BUG-001_chapter_list.png), [URL 1](evidence/BUG-001_chapter_slug_1.png), [URL 2](evidence/BUG-001_chapter_slug_2.png)
