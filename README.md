## About

This is a practice of Playwright on https://practicesoftwaretesting.com/.

## How to run

`npm test`

### or:

Run a specific test file
`npx playwright test file.spec.ts`

Run tests by title (grep)
`npx playwright test -g "test name"`

Run tests in visible browser mode
`npx playwright test --headed`

Run on a specific browser
`npx playwright test --browser=firefox`

Run in debug mode (pauses and opens inspector)
`npx playwright test --debug`

Launch recorder to generate test code automatically
`npx playwright codegen <url>`

Opens the HTML test report
`npx playwright show-report`

Opens trace viewer for a recorded test
`npx playwright show-trace trace.zip`

### Custom assertions

- Refer to the `toHaveUserName()` example in `playwright.config.ts`
- Reference: https://playwrightsolutions.com/creating-custom-expects-in-playwright-how-to-write-your-own-assertions/

### Author

[@ntsanq - Nguyen Thanh Sang](https://github.com/ntsanq)
