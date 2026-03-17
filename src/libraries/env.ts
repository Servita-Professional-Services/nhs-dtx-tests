import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export type EnvConfig = {
    testEnv: string;
    baseUrl: string;
    apiUrl: string;
};

/**
 * Load environment configuration
 */
export const getEnv = (): EnvConfig => {
    const testEnv = process.env.TEST_ENV || 'dev';

    const envFilePath = path.resolve(process.cwd(), `env/.env.${testEnv}`);

    // Validate env file exists
    if (!fs.existsSync(envFilePath)) {
        throw new Error(`[ENV] Environment file not found: ${envFilePath}`);
    }

    // Load env variables
    dotenv.config({path: envFilePath});

    // Validate required variables
    if (!process.env.BASE_URL) {
        throw new Error('[ENV] Missing required environment variable: BASE_URL');
    }

    return {
        testEnv,
        baseUrl: process.env.BASE_URL,
        apiUrl: process.env.API_URL || '',
    };
};