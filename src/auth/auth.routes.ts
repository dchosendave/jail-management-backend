import express from 'express';
import { send, verify, resend, changePassword, forgotPassword } from '@/auth/auth.handlers.js';
import { ChangePasswordSchema, ResendOtpSchema, SendOtpSchema, VerifyOtpSchema, ForgotPasswordSchema } from './auth.schemas.js';
import { validateBody } from '@/shared/validate-body.js';

const router = express.Router();

router.post('/send', validateBody(SendOtpSchema), send);
router.post('/verify', validateBody(VerifyOtpSchema), verify);
router.post('/resend', validateBody(ResendOtpSchema), resend);
router.post('/change-password', validateBody(ChangePasswordSchema), changePassword);
router.post('/forgot-password', validateBody(ForgotPasswordSchema), forgotPassword);

export default router;