// utils/types.ts

export type TestResult = {
  id: string;
  title: string;
  status: string;
  duration: number;
  retryCount: number;
  tags: string[];
  errorMessage?: string;
  stackTrace?: string;
  screenshotPath?: string;
  tracePath?: string;
  videoPath?: string;
  rootCause?: string;
  fixProvided?: string;
  notes?: string;
};
