import express from 'express';
import { send, verify, resend } from './auth.js';

const router = express.Router();

router.post('/send', send);
router.post('/verify', verify);
router.post('/resend', resend);

export default router;