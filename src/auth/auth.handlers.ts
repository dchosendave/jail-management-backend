import { type Request, type Response, type NextFunction } from 'express';
import {
    SendOtpSchema,
    ResendOtpSchema,
    VerifyOtpSchema,
    ChangePasswordSchema,
    ForgotPasswordSchema,
    type ForgotPasswordRequest
} from './auth.schemas.js';
import { db } from '../db/connection.js';

export async function send(req: Request, res: Response) {
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

export async function changePassword(req: Request, res: Response) {
    return res.status(201).send({
        message: 'change password is successful'
    });
}

export async function forgotPassword(req: Request, res: Response) {

    const body: ForgotPasswordRequest = req.body;

    const user = await db.query.users.findFirst({
        where: {
            email: body.email
        }
    });

    if (user) {
        return res.status(200).send({
            message: 'email is found. sending forgot password temporary link.'
        });
    }

    return res.status(400).send({
        message: 'an error occurred.'
    });
}