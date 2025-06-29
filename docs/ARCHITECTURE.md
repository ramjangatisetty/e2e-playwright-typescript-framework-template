# 📘 Playwright E2E Framework - Architecture Documentation

## 📁 Project Structure Overview

```
├── .github/workflows/
│   └── playwright.yml                 # GitHub Actions workflow with dynamic test config
├── env/
│   └── .env.qa1                       # Environment-specific config
├── global/
│   ├── setup.ts                      # Global setup for context and metadata
│   ├── teardown.ts                   # Global teardown to enrich test results
├── pages/
│   ├── BasePage.ts                   # Base class with reusable Playwright actions
│   └── LoginPage.ts                  # Page Object Model (POM) for Login page
├── playwright-report/                # Allure and JSON report outputs
├── tests/
│   ├── testsetup.ts                 # Custom test hooks with logger integration
│   └── ui/
│       └── login.spec.ts            # Sample test for login validation
├── utils/
│   ├── allureHelper.ts              # Helper for tagging tests in Allure
│   ├── config.ts                    # Typed environment config reader
│   ├── loadEnv.ts                   # Dynamic .env loader by TEST_ENV
│   └── logger.ts                    # Winston logger
├── Dockerfile.playwright            # Multi-stage Dockerfile with Java + Allure setup
├── package.json
├── playwright.config.ts             # Main test runner config
└── run-with-params.sh               # Shell script for running tests with dynamic env
```

---

## 🔧 Core Technologies

* **Playwright** for browser automation
* **TypeScript** for type safety and maintainability
* **Allure Reporter** for rich test visualization
* **Docker** to encapsulate execution
* **GitHub Actions** for CI/CD with test param flexibility

---

## 🏗️ Key Components Explained

### ✅ playwright.config.ts

* Configures base test settings, retries, reporters, and project runners.
* Includes:

  * Global hooks (`globalSetup`, `globalTeardown`)
  * `json` reporter for enriching data in teardown
  * Allure and HTML reports

### ✅ global/setup.ts

* Loads environment from `.env.{env}` using `loadEnv.ts`
* Initializes metadata like testRunId, startTime
* Writes `test-run-context.json`

### ✅ global/teardown.ts

* Parses `test-results.json`
* Enhances each test case with:

  * Duration, tags, retry count
  * Failure message + stack trace if applicable
  * History stub fields (e.g., flaky count, last failed)
* Merges data into `enriched-test-results.json`

### ✅ testsetup.ts

* Adds `beforeEach` and `afterEach` logging using Winston
* Replaces Playwright's default test

### ✅ Dockerfile.playwright

* Multi-stage:

  * Stage 1 installs deps and caches builds
  * Stage 2 copies node\_modules, env, and source
* Includes Java and Allure CLI for reporting

### ✅ GitHub Actions Workflow

* Supports inputs: `tag`, `browser`, `workers`, `retries`, `test_env`
* Uses `run-with-params.sh` inside container
* Publishes Allure report to GitHub Pages

### ✅ env/.env.qa1

* Customizes:

  * `URL=https://saucedemo.com`
  * `USERNAME`, `PASSWORD`

### ✅ utils/config.ts

* Loads env vars with type safety
* Validates missing values early

### ✅ utils/logger.ts

* Uses Winston logger with ISO timestamps

### ✅ run-with-params.sh

* Dynamically runs Playwright with flags like:

```bash
npx playwright test \
  --project="$BROWSER" \
  --workers="$WORKERS" \
  --retries="$RETRIES" \
  $TAG
```

---

## 📈 Future-Ready Features (Planned or Extendable)

* 🔍 Store enriched JSON to DynamoDB/Postgres
* 📊 Build custom dashboards from enriched test result metadata
* 📤 Slack/GitHub notification integration
* 🤖 Integrate GPT-based RCA suggestions per failure
* 🔄 Automatic test rerun for flaky failures

---

## 🙌 Usage Summary

* `TEST_ENV=qa1 npx playwright test` (local)
* `docker build -t my-playwright-runner .`
* `docker run --rm -e TEST_ENV=qa1 my-playwright-runner`
* CI: Trigger via GitHub Actions with tag and env

---

## ✅ Author

Maintained by [@ramjangatisetty](https://github.com/ramjangatisetty) with ❤️ for the testing community.
