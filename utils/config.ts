import * as dotenv from 'dotenv';
import * as path from 'path';

// Determine the environment (default to 'local' if not provided)
const envName = process.env.TEST_ENV || 'local';
console.log("Environment Name is: " + envName);

// Load the corresponding .env file from /env folder
console.log(`../../env/.env.${envName}`);
dotenv.config({ path: path.resolve(__dirname, `../env/.env.${envName}`) });

interface TestConfig {
  url: string;
  username: string;
  password: string;
}

function assertEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`❌ Environment variable ${name} is not defined in .env.${envName}`);
  }
  return value;
}

export const config: TestConfig = {
  url: assertEnvVar('URL', process.env.URL),
  username: assertEnvVar('USERNAME', process.env.USERNAME),
  password: assertEnvVar('PASSWORD', process.env.PASSWORD),
};