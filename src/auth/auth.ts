import express, { type Request, type Response, type NextFunction } from 'express';
import type { SendOtpRequest } from '../types/requests.js';

export async function send(req: Request<SendOtpRequest>, res: Response) {

    return res.status(201).send({
        purpose: 'something',
        challengeToken: 'something hashed and all that shit',
        sentAt: 'sometime',
        expiresAt: 'duration - sentTime and shi'
    });
}

export async function verify(req: Request, res: Response) {
    return res.status(201).send({
        isSuccess: true,
        jwt: 'something',
        iat: 'something-else',
        user: 'haha',
        role: 'investor'
    });
}

export async function resend(req: Request, res: Response) {
    return res.status(201).send({
        purpose: 'something',
        challengeToken: 'something hashed and all that shit',
        sentAt: 'sometime',
        expiresAt: 'duration - sentTime and shi',
        resendRemaining: 1
    });
}