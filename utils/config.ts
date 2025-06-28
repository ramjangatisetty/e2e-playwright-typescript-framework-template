import * as dotenvFlow from 'dotenv-flow';

const envName = process.env.TEST_ENV || 'local';
console.log("Environment Name is: " + envName);

// Load .env files using dotenv-flow
dotenvFlow.config({
  node_env: envName, // This will load .env.qa1, .env.dev, etc.
  path: `${__dirname}/../env`
});

interface TestConfig {
  baseUrl: string;
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
  baseUrl: assertEnvVar('URL', process.env.BASE_URL),
  username: assertEnvVar('USERNAME', process.env.USERNAME),
  password: assertEnvVar('PASSWORD', process.env.PASSWORD),
};