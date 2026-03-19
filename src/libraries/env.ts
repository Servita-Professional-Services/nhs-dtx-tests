import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export type EnvConfig = {
    testEnv: string;
    baseUrl: string;
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

    return {
        testEnv,
        baseUrl: process.env.BASE_URL,
    };
};