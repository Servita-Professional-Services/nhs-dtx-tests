import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as fs from 'fs';
import * as path from 'path';

const ajv = new Ajv({allErrors: true, strict: false});
addFormats(ajv);

const schemaCache = new Map<string, any>();

export const validateSchema = (schemaFile: string, data: unknown): void => {
    const schemaPath = path.resolve(__dirname, `../schemas/${schemaFile}`);

    if (!fs.existsSync(schemaPath)) {
        throw new Error(`Schema file not found: ${schemaPath}`);
    }

    // Cache compiled validator
    let validate = schemaCache.get(schemaFile);

    if (!validate) {
        const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
        validate = ajv.compile(schema);
        schemaCache.set(schemaFile, validate);
    }

    const valid = validate(data);

    if (!valid) {
        throw new Error(
            `Schema validation failed for ${schemaFile}:\n${JSON.stringify(
                validate.errors,
                null,
                2
            )}`
        );
    }
};