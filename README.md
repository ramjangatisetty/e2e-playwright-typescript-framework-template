# 🎭 Playwright Test Automation Framework (TypeScript)

A robust end-to-end Test Automation Framework built with **Playwright** and **TypeScript**.  
Supports cross-browser testing, rich reporting with **Allure**, Dockerized execution, and seamless CI/CD via **GitHub Actions** with Allure report publishing to GitHub Pages.

---

## 📚 Documentation

- [ARCHITECTURE](docs/ARCHITECTURE.md)
- [BasePage](docs/BasePage.md)
- [LoginPage](docs/LoginPage.md)
- [HomePage](docs/HomePage.md)
- [Logger Utility](docs/logger.md)
- [Allure Helper](docs/allureHelper.md)
- [Playwright Config](docs/playwright-config.md)
- [CICD](docs/CICD.md)

---

## 🚀 Features

- ✅ TypeScript-based Playwright tests
- ✅ Page Object Model (POM) for maintainability
- ✅ Parallel execution
- ✅ Cross-browser support (Chromium, Firefox, WebKit)
- ✅ Allure reporting (HTML, CI artifacts, and GitHub Pages)
- ✅ Docker support for consistent CI/CD runs
- ✅ CI/CD via GitHub Actions (with Docker)
- ✅ GitHub Pages publishing for Allure reports

---

## 🐞 Debugging Playwright Tests in VS Code

You can debug your Playwright tests using VS Code's built-in debugger and the provided launch.json configuration.
Example launch.json configuration:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Playwright Test",
  "program": "${workspaceFolder}/node_modules/@playwright/test/cli.js",
  "args": ["test", "--headed", "--project=chromium"],
  "env": {
    "TAG": "@smoke",
    "BROWSER": "chromium",
    "WORKERS": "1",
    "RETRIES": "1",
    "TEST_ENV": "qa1"
  },
  "console": "integratedTerminal",
  "internalConsoleOptions": "openOnSessionStart"
}
```

### ▶️ How to Use

Open your project in VS Code.
Set breakpoints in your test or page files.
Go to the Run & Debug panel (left sidebar).
Select Debug Playwright Test from the dropdown.
Click the green play button (▶️) to start debugging.
The browser will open in headed mode, and you can step through your code, inspect variables, and use all VS Code debugging features.

You can customize the environment variables and arguments as needed for your test run.
For more details, see VS Code Debugging Documentation.

---

## 🐞 Debugging Tests with Playwright Debugger

You can debug your Playwright tests using the built-in Playwright Inspector or VS Code debugger. The project provides a convenient script for running tests in debug mode with environment variables pre-set.

### Using the Debug Script

  To run tests in debug mode with your environment settings, use:
    npm run test:env:debug -- [test-file-or-pattern] --debug
  test:env:debug is the script defined under package.json file
  This command sets the following variables:
  TAG='@smoke' BROWSER='chromium' WORKERS=2 RETRIES=1 TEST_ENV='qa1'
  The --debug flag opens the Playwright Inspector for interactive debugging.
  Example
    npm run test:env:debug -- tests/login.spec.ts --debug
  What Happens
    The script runs Playwright tests with your specified environment.
    The Playwright Inspector UI will open, allowing you to step through your tests, inspect selectors, and interact with the browser.
  Tips
  You can pass any test file or pattern after -- to target specific tests.
  Use breakpoints in your test code or add await page.pause() to pause execution at a specific point.
  Add this section to your README.md to help contributors debug tests using your custom script and Playwright’s debugging tools. Let me know if you want this inserted automatically!

  ---

## 🧪 Running Tests Locally

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install

# Run all Playwright tests (headless)
npm test

# Run in headed mode
npm run test:headed

# Generate Allure report
npm run allure:generate

# Open Allure report in browser
npm run allure:open
```

---

## 🐳 Running Tests in Docker

Build and run tests in a Docker container (as in CI):

```bash
# Build Docker image
docker build -t my-playwright-runner -f DockerFile.playwright .

# Run tests (Allure report will be generated inside the container)
docker run --rm -v $(pwd)/allure-report:/app/allure-report my-playwright-runner npm run test:allure
```

---

## 📦 NPM Scripts

```json
"scripts": {
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "test:allure": "npx playwright test && npm run allure:generate",
  "allure:generate": "allure generate --clean allure-results -o allure-report",
  "allure:open": "allure open allure-report"
}
```

## ✅ GitHub Actions CI/CD

This project uses **GitHub Actions** to automate test execution and reporting.

### 📍 When it Runs

- On every push to `main`, `qa`, `dev`, or any `feature/*` branch
- On every pull request to those branches
- Manually via workflow dispatch

### 📁 Workflow Location

.github/workflows/playwright.yml

### 🐳 Docker in CI

- Builds and runs tests inside a Docker container for consistency
- Generates and uploads Allure reports as CI artifacts

### 📂 CI Artifacts

- 🧪 `playwright-report/` — HTML report of test run
- 📊 `allure-results/` — Raw Allure results
- 📁 `allure-report/` — Rich HTML Allure report (on demand)

---

## 🌐 GitHub Pages

![Playwright Tests](https://github.com/ramjangatisetty/e2e-playwright-typescript-framework-template/actions/workflows/playwright.yml/badge.svg)
[![Allure Report](https://img.shields.io/badge/Allure-Report-blue)](https://ramjangatisetty.github.io/e2e-playwright-typescript-framework-template/)

> 🚀 Automated Playwright tests with integrated Allure reporting and GitHub Pages hosting.

- Allure HTML reports are published to GitHub Pages after each CI run.
- Access the latest Allure report [on GitHub Pages](https://ramjangatisetty.github.io/e2e-playwright-typescript-framework-template/).

---

## 🤝 Contributing

1. Fork this repo
2. Create a new feature branch
3. Submit a PR after testing

---

TEST_ENV=qa1 npx playwright test

## 📄 License

MIT © 2025 Ramakrishna Jangatisetty
