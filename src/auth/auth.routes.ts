import express from 'express';
import { send, verify, resend, changePassword, forgotPassword } from '@/auth/auth.js';

const router = express.Router();

router.post('/send', send);
router.post('/verify', verify);
router.post('/resend', resend);
router.post('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);

export default router;