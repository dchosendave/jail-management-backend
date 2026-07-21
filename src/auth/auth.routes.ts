import express, { type Request, type Response, type NextFunction } from 'express';
import { send, verify, resend, changePassword, forgotPassword } from '@/auth/auth.handlers.js';
import * as z from 'zod';
import { ChangePasswordSchema, ResendOtpSchema, SendOtpSchema, VerifyOtpSchema, ForgotPasswordSchema } from './auth.schemas.js';

const router = express.Router();

const validateBody = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).send({
            errors: z.prettifyError(result.error)
        });
    }

    req.body = result.data; // clean the req.body after parsing

    next();
}

router.post('/send', validateBody(SendOtpSchema), send);
router.post('/verify', validateBody(VerifyOtpSchema), verify);
router.post('/resend', validateBody(ResendOtpSchema), resend);
router.post('/change-password', validateBody(ChangePasswordSchema), changePassword);
router.post('/forgot-password', validateBody(ForgotPasswordSchema), forgotPassword);

export default router;