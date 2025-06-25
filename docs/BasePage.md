# BasePage Class

**File:** `pages/BasePage.ts`

## Purpose

The `BasePage` class provides reusable, robust, and well-logged utility methods for interacting with web elements in Playwright.  
All specific page classes should extend `BasePage` to inherit these utilities, ensuring consistency and reducing code duplication.

---

## Methods

### waitForElement

```typescript
async waitForElement(
    locator: Locator,
    timeout: number = 5000,
    maxRetries: number = 3,
    delayBetweenRetries: number = 1000
): Promise<void>
```
Waits for an element to appear/become ready, with configurable retries and delays.  
- Retries up to `maxRetries` times, waiting `timeout` ms each time.
- Logs each attempt and failure.
- Throws an error if the element is not found after all retries.

---

### clickElement

```typescript
async clickElement(locator: Locator, wait: boolean = true): Promise<void>
```
Clicks an element, optionally waiting for it to be ready first.

---

### enterText

```typescript
async enterText(locator: Locator, value: string, wait: boolean = true): Promise<void>
```
Fills an input field with the provided value, optionally waiting for readiness.

---

### typeText

```typescript
async typeText(locator: Locator, value: string, wait: boolean = true): Promise<void>
```
Types text into an input field character by character, simulating real user input.

---

### selectDropdown

```typescript
async selectDropdown(locator: Locator, value: string, wait: boolean = true): Promise<void>
```
Selects an option from a dropdown by value.

---

### getElementText

```typescript
async getElementText(locator: Locator, wait: boolean = true): Promise<string>
```
Retrieves the text content of an element.

---

### isElementVisible

```typescript
async isElementVisible(locator: Locator): Promise<boolean>
```
Checks if an element is visible on the page.

---

## Logging

All actions are logged using the shared logger utility for traceability and easier debugging.

---

## Usage Example

```typescript
import { BasePage } from './BasePage';

class LoginPage extends BasePage {
    // Define locators and page-specific methods here
}
```

---

## Maintenance Tips

- Add new generic element actions here so all pages benefit.
- Avoid page-specific logic in `BasePage`.
- Use logs to diagnose flaky tests or UI issues