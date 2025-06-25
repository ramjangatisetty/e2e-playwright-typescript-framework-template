# HomePage Class

**File:** `pages/HomePage.ts`

## Purpose

Encapsulates actions and verifications for the home page after login.

---

## Typical Methods

- `verifyLoginIsSuccessful()`: Checks if login succeeded by verifying the URL or a specific element.
- `verifyProductExists(productName: string)`: Checks if a product is visible on the home page.

---

## Usage Example

```typescript
const homePage = new HomePage(page);
await homePage.verifyLoginIsSuccessful();
```

---

## Maintenance Tips

- Add new methods for home page actions or verifications as needed.