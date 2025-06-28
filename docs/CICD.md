## 🛠️ CI/CD Implementation Details

This project uses **GitHub Actions** for Continuous Integration and Continuous Deployment (CI/CD).  
Below is a detailed explanation of how CI/CD is set up and works in this repository.

---

### 1. **Workflow File Location**

The main workflow file is located at:

```
.github/workflows/playwright.yml
```

---

### 2. **Workflow Triggers**

The workflow is triggered automatically:
- On every push to `main`, `qa`, `dev`, or any `feature/*` branch
- On every pull request to those branches
- Manually via the "Run workflow" button in the GitHub Actions UI (`workflow_dispatch`)

---

### 3. **Key Steps in the Workflow**

#### **a. Checkout Code**

```yaml
- name: Checkout repo
  uses: actions/checkout@v3
```
Checks out the repository code so the workflow can access it.

---

#### **b. Build Docker Image**

```yaml
- name: Build Docker Image
  run: docker build -t my-playwright-runner -f DockerFile.playwright .
```
Builds a Docker image using the provided `DockerFile.playwright`.  
This image includes all dependencies (Node, Playwright, Java for Allure, etc.) and your test code.

---

#### **c. Run Playwright Tests in Docker**

```yaml
- name: Run Playwright Tests in Docker
  run: docker run --name temp-runner my-playwright-runner npm run test:allure
```
Runs your Playwright tests inside the Docker container.  
The `test:allure` script runs all tests and generates Allure results and report.

---

#### **d. Copy Allure Report from Container**

```yaml
- name: Copy Allure report
  run: |
    docker cp temp-runner:/app/allure-report ./allure-report
    docker rm temp-runner
```
Copies the generated Allure HTML report from the Docker container to the workflow runner, then removes the container.

---

#### **e. Upload Allure Report as Artifact**

```yaml
- name: Upload Allure report
  uses: actions/upload-artifact@v4
  with:
    name: allure-report
    path: ./allure-report
```
Uploads the Allure report as a downloadable artifact in the GitHub Actions UI.

---

#### **f. Deploy Allure Report to GitHub Pages (Optional)**

If configured, the workflow can publish the Allure HTML report to GitHub Pages using an action like `peaceiris/actions-gh-pages@v3`.  
This makes the latest test report available as a public web page.

---

### 4. **Artifacts and Reports**

- **playwright-report/**: Playwright's built-in HTML report (if enabled)
- **allure-results/**: Raw Allure results (JSON/XML files)
- **allure-report/**: Allure HTML report (generated and uploaded as artifact, and optionally published to GitHub Pages)

---

### 5. **Benefits of This CI/CD Setup**

- **Consistency:** Tests always run in a clean, reproducible Docker environment.
- **Parallelism:** GitHub Actions can run multiple jobs in parallel for faster feedback.
- **Traceability:** All logs, reports, and artifacts are stored with each workflow run.
- **Visibility:** Allure reports are available as CI artifacts and (optionally) on GitHub Pages for easy sharing.
- **Automation:** No manual steps required to run, report, or publish test results.

---

### 6. **How to Trigger the Workflow Manually**

- Go to the **Actions** tab in your GitHub repository.
- Select the `Playwright Tests in Docker` workflow.
- Click **Run workflow** and select the branch.

---

### 7. **Customizing the Workflow**

- **Add more jobs** for linting, code coverage, or deployment.
- **Change the Dockerfile** to add more dependencies or tools.
- **Modify triggers** to suit your branching strategy.

---

### 8. **Security and Best Practices**

- Use secrets for sensitive data (not hardcoded in workflow).
- Pin action versions (as done with `@v3` or `@v4`).
- Regularly update Docker base images and dependencies.

---

## 📈 Example Workflow Visualization

```
Push/PR/Manual Trigger
        │
        ▼
[GitHub Actions Workflow]
        │
        ├── Checkout code
        ├── Build Docker image
        ├── Run tests in Docker
        ├── Copy Allure report
        ├── Upload Allure report as artifact
        └── (Optional) Deploy Allure report to GitHub Pages
```

---

**In summary:**  
This CI/CD setup ensures your Playwright tests are run reliably and reports are always available, both as downloadable artifacts and as a browsable web page via GitHub Pages.