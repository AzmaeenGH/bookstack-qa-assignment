# BookStack QA Assignment

Software quality assurance assignment on the BookStack demo application.

- **Application**: BookStack Demo (https://demo.bookstackapp.com/)
- **Feature tested**: Create Book (with Login as precondition)
- **Environment**: Linux Mint, Brave Browser 1.97.56
- **Tester**: Azmaeen Galib Hassan

## What was done

1. **Functional testing.** Test cases for Login and Create Book covering positive, negative, boundary and edge cases, with results.
2. **Bug hunting.** One reproducible bug found and documented with screenshots and a screen recording.
3. **Test automation.** Three scenarios selected for automation, with detailed automation test cases and the reason for each.

## Summary

| | Count |
|---|---|
| Test cases written and executed | 31 |
| Passed | 29 |
| Failed | 2 |
| Bugs reported | 1 |
| Scenarios selected for automation | 3 |

Bug found: BUG-001, rapid clicks on the Save button create multiple duplicate records (Book, Shelf and Chapter).

## Repository structure

```
bookstack-qa-assignment/
├── README.md
├── test-cases/
│   ├── test-cases.md
│   ├── test-cases.csv
│   └── test-data/
├── bug_reports/
│   ├── bug-report.md
│   └── evidence/
└── automation/
    └── automation-candidates.md
```

- `test-cases/` : all test cases with expected and actual results. `test-data/` holds the files used by some cases (a valid image and an invalid text file for cover image tests).
- `bug_reports/` : bug report BUG-001 and its evidence (screenshots and recording).
- `automation/` : automation candidates AUT-001 to AUT-003.

## Notes

- The demo site is shared and resets from time to time, so results reflect the application at the time of testing (30-31 Oct 2026).
- Some failed test cases are marked Fail because the result differed from the expected result. After checking, the behaviour was by design (for example, duplicate book names are allowed and get a different URL), so they are not reported as bugs.