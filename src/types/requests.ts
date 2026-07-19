import * as z from 'zod';
import { AuthMessages, type AuthMessageType } from '../shared/auth-messages.js';

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
    .min(8, AuthMessages.PASSWORD_MIN_LENGTH )
    .max(20)
    .refine((password) => /[A-Z]/.test(password), {
        error: AuthMessages.PASSWORD_MUST_HAVE_UPPERCASE_LETTER
    })
    .refine((password) => /[a-z]/.test(password), {
        error: AuthMessages.PASSWORD_MUST_HAVE_LOWERCASE_LETTER
    })
    .refine((password) => /[0-9]/.test(password), {
        error: AuthMessages.PASSWORD_MUST_HAVE_NUMBER_CHARACTER
    })
    .refine((password) => /[!@#$%^&*()]/.test(password), {
        error: AuthMessages.PASSWORD_MUST_HAVE_SPECIAL_CHARACTER
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