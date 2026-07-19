import * as z from 'zod';

export const PersonalInformationSchema = z.object({
    accountNumber: z.number().int().positive().min(6).max(12),
    salutation: z.enum(['Mr', 'Mrs.']),
    firstName: z.string().min(2).max(50),
    middleName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    gender: z.string(),
    birthDate: z.date().min(new Date("1930-01-01")).max(new Date("2019-12-31")), // change later on, do not hard code.,
    civilStatus: z.string(),
    emailAddress: z.email(),
    mobileNumber: z.number().int().min(9).max(11), // hard coded to PH only
    alternativeEmailAddress: z.email().nullish()
});

export const AddressInformationSchema = z.object({
    addressLine1: z.string().min(10).max(255),
    addressLine2: z.string().min(10).max(255),
    country: z.string(),
    countryCode: z.string(),
    region: z.string(),
    city: z.string(),
    barangay: z.string(),
    postalCode: z.string()
});

export const EmploymentInformationSchema = z.object({ 
    // can't think of any fields atm
});

export type PersonalInformation = z.infer<typeof PersonalInformationSchema>;
export type AddressInformation = z.infer<typeof AddressInformationSchema>;
export type EmploymentInformation = z.infer<typeof EmploymentInformationSchema>;