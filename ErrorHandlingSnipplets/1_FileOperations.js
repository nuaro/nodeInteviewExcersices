// Exercise 1: Handle file reading errors
const fs = require('fs').promises;

async function readConfigFile(path) {
    try {
        const data = await fs.readFile(path, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('Configuration file not found');
        }
        if (error instanceof SyntaxError) {
            throw new Error('Invalid JSON in configuration file');
        }
        throw new Error(`Unexpected error: ${error.message}`);
    }
}

function readConfigFileSync(path) {
    try {
        // Read file synchronously
        const data = fs.readFileSync(path, 'utf8');

        // Parse JSON
        const config = JSON.parse(data);

        // Validate config structure
        if (!config) {
            throw new Error('Empty configuration file');
        }

        return config;

    } catch (error) {
        // Handle specific error types
        if (error.code === 'ENOENT') {
            console.error('File not found error:', path);
            throw new Error(`Configuration file not found at ${path}`);
        }

        if (error instanceof SyntaxError) {
            console.error('JSON parsing error:', error.message);
            throw new Error('Configuration file contains invalid JSON');
        }

        // Handle unexpected errors
        console.error('Unexpected error:', error.message);
        throw new Error(`Failed to read config: ${error.message}`);
    }
}

