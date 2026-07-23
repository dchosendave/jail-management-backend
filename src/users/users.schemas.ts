import * as z from 'zod';

export const UserSchema = z.object({
    personnelId: z.number().int().positive(),
    email: z.email(),
    password: z.string(),
    status: z.string().default('active'),
    lastLoginAt: z.iso.datetime().nullish()
});

export type User = z.infer<typeof UserSchema>;