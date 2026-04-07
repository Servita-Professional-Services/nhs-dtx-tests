import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export type EnvConfig = {
    testEnv: string;
    baseUrl: string;
    apiBaseUrl: string;
    vendorApiKey: string;
};

export const getEnv = (): EnvConfig => {
    const testEnv = process.env.TEST_ENV || 'dev';

    const envFilePath = path.resolve(process.cwd(), `env/.env.${testEnv}`);

    if (fs.existsSync(envFilePath)) {
        dotenv.config({path: envFilePath});
    }

    if (!process.env.BASE_URL) {
        throw new Error('[ENV] Missing required environment variable: BASE_URL');
    }

    if (!process.env.API_BASE_URL) {
        throw new Error('[ENV] Missing required environment variable: API_BASE_URL');
    }

    if (!process.env.VENDOR_API_KEY) {
        throw new Error('[ENV] Missing required environment variable: VENDOR_API_KEY');
    }

    return {
        testEnv,
        baseUrl: process.env.BASE_URL,
        apiBaseUrl: process.env.API_BASE_URL,
        vendorApiKey: process.env.VENDOR_API_KEY,
    };
};