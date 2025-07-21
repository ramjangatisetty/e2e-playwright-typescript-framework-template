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

---

## 📂 Project Structure

```
e2e-playwright-framework/
├── tests/                # Test specs
├── pages/                # Page Object Models
├── utils/                # Custom utilities
├── storage/              # Session files
├── allure-results/       # Allure raw data
├── allure-report/        # Allure HTML reports
├── playwright.config.ts  # Playwright test config
├── DockerFile.playwright # Dockerfile for CI/CD
├── .github/workflows/    # GitHub Actions workflows
```
## 🌐 Overriding baseURL

- By default, `baseURL` is loaded from your environment file (e.g., `env/.env.dev1`).
- To override for a specific run, set the `BASE_URL` variable:

```sh
BASE_URL=https://another-url.com npm test
```

- Or use a different environment:

```sh
TEST_ENV=dev1 npm test
```
---

## ✅ GitHub Actions CI/CD

This project uses **GitHub Actions** to automate test execution and reporting.

### 📍 When it Runs

- On every push to `main`, `qa`, `dev`, or any `feature/*` branch
- On every pull request to those branches
- Manually via workflow dispatch

### 📁 Workflow Location

```
.github/workflows/playwright.yml
```

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
- Access the latest report [here](https://ramjangatisetty.github.io/e2e-playwright-typescript-framework-template/).

---

## 🤝 Contributing

1. Fork this repo
2. Create a new feature branch
3. Submit a PR after testing

---

TEST_ENV=qa1 npx playwright test



## 📄 License

MIT © 2025 Ramakrishna Jangatisetty