export interface PersonalInformation {
    accountNumber: number;
    salutation: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    civilStatus: string;
    emailAddress: string;
    mobileNumber: string;
    alternativeEmailAddress: string | null;

}

export interface AddressInformation {
    addressLine1: string;
    addressLine2: string;
    country: string;
    countryCode: string;
    region: string;
    city: string;
    barangay: string;
    postalCode: string;
}

export interface EmploymentInformation {

}