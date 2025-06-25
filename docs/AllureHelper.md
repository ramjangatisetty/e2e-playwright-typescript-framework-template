# Allure Helper

**File:** `utils/allureHelper.ts`

## Purpose

Simplifies Allure reporting integration.  
Allows marking steps with status and stopping tests on failure.

---

## Key Method

### stepCheck

```typescript
stepCheck(message: string, status: string = 'passed', shouldStop: boolean = false)
```
- Logs and reports a step.
- Optionally fails the test if `shouldStop` is true.

---

## Usage Example

```typescript
await AllureHelper.stepCheck('Login is successful');
```