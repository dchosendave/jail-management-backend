import { type Request, type Response, type NextFunction } from 'express';
import {
    SendOtpSchema,
    ResendOtpSchema,
    VerifyOtpSchema,
    ChangePasswordSchema,
    type SendOtpRequest,
    type ResendOtpRequest,
    type VerifyOtpRequest
} from '@/auth/auth.schemas.js';
import * as z from 'zod';

export async function send(req: Request, res: Response) {

    const body = SendOtpSchema.safeParse(req.body);

    if (!body.success){
        return res.status(400).send({
            errors: body.error.issues
        });
    }

    return res.status(201).send({
        purpose: 'something',
        challengeToken: 'something hashed and all that shit',
        sentAt: 'sometime',
        expiresAt: 'duration - sentTime and shi'
    });
}

export async function verify(req: Request, res: Response) {

    const body = ResendOtpSchema.safeParse(req.body);

    if (!body.success){
        return res.status(400).send({
            errors: body.error.issues
        });
    }

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

    const result = ChangePasswordSchema.safeParse(req.body);

    if (!result.success){
        return res.status(400).send({
            error: z.prettifyError(result.error)
        });
    }

    return res.status(201).send({
        message: 'change password is successful'
    });
}

export async function forgotPassword(req: Request, res: Response) {

}
