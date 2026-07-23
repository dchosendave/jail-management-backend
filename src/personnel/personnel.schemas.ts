import * as z from 'zod';

export const PersonnelSchema = z.object({
    userId: z.int().positive(),
    employeeNumber: z.string(),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    suffix: z.string(),
    rank: z.string(),
    designation: z.string(),
    badgeNumber: z.string(),
    email: z.string(),
    contactNumber: z.string(),
    dateOfBirth: z.date(),
    dateHired: z.date(),
    status: z.string() 
});

export const Audit = z.object({
    createdAt: z.iso.date(),
    createdBy: z.int().positive(),
    updatedAt: z.iso.date().nullish(),
    updatedBy: z.int().positive().nullish()
})

export type Personnel = z.infer<typeof PersonnelSchema>;
export type Audit = z.infer<typeof Audit>;