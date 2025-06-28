import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

export function loadEnv(envName: string): void {
  const envFilePath = path.resolve(__dirname, '../../env', `.env.${envName}`);

  if (!fs.existsSync(envFilePath)) {
    console.warn(`⚠️ Environment file not found at: ${envFilePath}`);
    return;
  }

  const result = dotenv.config({ path: envFilePath });

  if (result.error) {
    console.error(`❌ Failed to load env from ${envFilePath}`);
  } else {
    console.log(`✅ Loaded env file: ${envFilePath}`);
  }
}
