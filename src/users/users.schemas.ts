import * as z from 'zod';

export const UsersSchema = z.object({
    personnelId: z.number().int().positive(),
    email: z.email(),
    password: z.string(),
    status: z.string().default('active'),
    lastLoginAt: z.iso.datetime().nullish()
});

export type Users = z.infer<typeof UsersSchema>;