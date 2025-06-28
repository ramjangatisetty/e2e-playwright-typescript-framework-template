#!/bin/bash

echo "Running Playwright tests with:"
echo "  TEST_ENV: $TEST_ENV"
echo "  BROWSER: $BROWSER"
echo "  WORKERS: $WORKERS"
echo "  RETRIES: $RETRIES"
echo "  TAG: $TAG"

# Safely construct the command with proper quoting
npx playwright test \
  --project="${BROWSER}" \
  --workers="${WORKERS}" \
  --retries="${RETRIES}" \
  ${TAG}