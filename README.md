
# 🎭 Playwright Test Automation Framework (TypeScript)

This is a robust end-to-end Test Automation Framework built using **Playwright** and **TypeScript**. It supports cross-browser testing, rich reporting using **Allure**, and integrates seamlessly with **GitHub Actions CI/CD pipelines**.

---

## 📚 Documentation

- [BasePage](docs/BasePage.md)
- [LoginPage](docs/LoginPage.md)
- [HomePage](docs/HomePage.md)
- [Logger Utility](docs/logger.md)
- [Allure Helper](docs/allureHelper.md)
- [Playwright Config](docs/playwright-config.md)

## 🚀 Features

- ✅ TypeScript-based Playwright tests
- ✅ Page Object Model (POM)
- ✅ Parallel execution
- ✅ Cross-browser support (Chromium, Firefox, WebKit)
- ✅ Allure reporting
- ✅ CI/CD via GitHub Actions

---

## 🧪 Running Tests Locally

```bash
# Install dependencies
npm ci

# Run all Playwright tests
npx playwright test

# Run in headed mode
npx playwright test --headed

# Generate Allure report
npm run allure:generate

# Open Allure report in browser
npm run allure:open
````

> Make sure Playwright browsers are installed:

```bash
npx playwright install
```

---

## 📂 Project Structure

```
e2e-playwright-framework/
├── tests/                # Test specs
├── pages/                # Page Object Models
├── fixtures/             # Shared test fixtures
├── utils/                # Custom utilities
├── storage/              # Session files
├── allure-results/       # Allure raw data
├── allure-report/        # Allure HTML reports
├── playwright.config.ts  # Playwright test config
├── .github/workflows/    # GitHub Actions workflows
```

---

## ✅ GitHub Actions CI/CD

This project uses **GitHub Actions** to automate test execution on each commit or pull request.

### 📍 When it Runs

* On every push to the `main` branch
* On every pull request

### 📁 Workflow Location

```
.github/workflows/playwright.yml
```

### 📜 Manual Trigger

1. Go to the **Actions** tab in GitHub.
2. Select the **"Playwright Tests"** workflow.
3. Click **"Run workflow"** (top-right dropdown).

### 📂 CI Artifacts

* 🧪 `playwright-report/` — HTML report of test run
* 📊 `allure-results/` — Raw Allure results
* 📁 `allure-report/` — Rich HTML Allure report (on demand)

---

## 📦 NPM Scripts

Add these to your `package.json`:

```json
"scripts": {
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "allure:generate": "allure generate --clean allure-results",
  "allure:open": "allure open allure-report"
}
```

---

# GitHub Pages

![Playwright Tests](https://github.com/ramjangatisetty/e2e-playwright-typescript-framework-template/actions/workflows/playwright.yml/badge.svg)
[![Allure Report](https://img.shields.io/badge/Allure-Report-blue)](https://ramjangatisetty.github.io/e2e-playwright-typescript-framework-template/)

> 🚀 Automated Playwright tests with integrated Allure reporting and GitHub Pages hosting.

---

## 🤝 Contributing

1. Fork this repo
2. Create a new feature branch
3. Submit a PR after testing

---

## 📄 License

MIT © 2025 Ramakrishna Jangatisetty
