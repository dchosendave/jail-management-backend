import dotenv from 'dotenv/config';
import express, { type Express, type Request, type Response } from 'express';
import auth from './auth/auth.routes.js';
import references from './references/references.routes.js';
import type { HealthResponse } from './types/responses.js';

const app: Express = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || '';

app.use(express.json());

app.get(`${baseUrl}/health`, (res: Response<HealthResponse>) => {

    const response: HealthResponse = {
        timestamp: new Date().toISOString(),
        message: 'Health check successful',
        isHealthy: true
    };

    res.status(200).send(response);
});

app.use(`${baseUrl}/references`, references);
app.use(`${baseUrl}/auth`, auth);

app.listen(port, () => {
    console.log(`[START]    Server is running at http://localhost:${port}`);
    console.log(`[HEALTH]   Health check endpoint available at http://localhost:${port}${baseUrl}/health`);
});