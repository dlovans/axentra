import { env } from '$env/dynamic/private';

// Make sure required environment variables are set
export function validateEnv() {
  const requiredVars = ['EMAIL_PASSWORD'];
  
  for (const varName of requiredVars) {
    if (!env[varName]) {
      console.error(`Missing required environment variable: ${varName}`);
      throw new Error(`Configuration error: Missing ${varName}`);
    }
  }
  
  return true;
}

// Get environment variables
export function getEnv() {
  validateEnv();
  return env;
}

// Get a specific environment variable
export function getEnvVar(name) {
  validateEnv();
  return env[name];
} 