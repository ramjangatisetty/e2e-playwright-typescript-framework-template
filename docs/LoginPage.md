# LoginPage Class

**File:** `pages/LoginPage.ts`

## Purpose

Encapsulates all selectors and actions for the login page.  
Provides a single place to maintain login logic, making tests more readable and maintainable.

---

## Typical Methods

- `goto()`: Navigates to the login page URL.
- `login(userName: string, password: string)`: Fills in the username and password fields and clicks the login button.

---

## Usage Example

```typescript
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('user', 'pass');
```

---

## Maintenance Tips

- Update selectors here if the login page UI changes.
- Add new login-related actions as needed.