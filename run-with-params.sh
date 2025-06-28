#!/bin/bash

echo "Running Playwright tests with:"
echo "  TEST_ENV: $TEST_ENV"
echo "  BROWSER: $BROWSER"
echo "  WORKERS: $WORKERS"
echo "  RETRIES: $RETRIES"
echo "  TAG: $TAG"

# Build the base command
CMD="npx playwright test --project=${BROWSER} --workers=${WORKERS} --retries=${RETRIES}"

# Add tag conditionally
if [[ -n "$TAG" ]]; then
  CMD="$CMD --grep \"$TAG\""
fi

echo "Executing: $CMD"
eval $CMD
git add