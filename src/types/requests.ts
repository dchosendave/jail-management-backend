import * as z from 'zod';
import { AuthMessages } from '@/shared/auth-messages.js';

const VALID_PURPOSES = ['create_account', 'update_account', 'change_password'] as const;

export const SendOtpSchema = z.object({
    purpose: z.enum(VALID_PURPOSES),
    accountNumber: z.number().int().positive(),
    emailAddress: z.email(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50)
});

export const ResendOtpSchema = z.object({
    purpose: z.enum(VALID_PURPOSES),
    existingChallengeToken: z.guid()
});

export const VerifyOtpSchema = z.object({
    otpCode: z.string(),
    existingChallengeToken: z.guid()
});

const passwordField = z
    .string()
    .min(8, AuthMessages.PASSWORD_TOO_SHORT )
    .max(20)
    .refine((password) => /[A-Z]/.test(password), {
        error: AuthMessages.PASSWORD_REQUIRES_UPPERCASE
    })
    .refine((password) => /[a-z]/.test(password), {
        error: AuthMessages.PASSWORD_REQUIRES_LOWERCASE
    })
    .refine((password) => /[0-9]/.test(password), {
        error: AuthMessages.PASSWORD_REQUIRES_NUMBER
    })
    .refine((password) => /[!@#$%^&*()]/.test(password), {
        error: AuthMessages.PASSWORD_REQUIRES_SPECIAL
    });

export const ChangePasswordSchema = z
    .object({
        currentPassword: z.string(),
        newPassword: passwordField,
        confirmPassword: z.string()
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        error: AuthMessages.PASSWORD_MISMATCH,
        path: ['confirmPassword']
    })

export type SendOtpRequest = z.infer<typeof SendOtpSchema>;
export type ResendOtpRequest = z.infer<typeof ResendOtpSchema>;
export type VerifyOtpRequest = z.infer<typeof VerifyOtpSchema>;