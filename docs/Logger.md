# Logger Utility

**File:** `utils/logger.ts`

## Purpose

Provides centralized logging using Winston.  
Logs to both console and file for traceability.

---

## Usage Example

```typescript
logger.info('This is an info message');
logger.error('This is an error message');
```

---

## Maintenance Tips

- Adjust log levels or formats as needed.
- Ensure logs are rotated or archived in CI environments.