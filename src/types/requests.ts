export interface SendOtpRequest {
    purpose: string;
    accountNumber: number | null;
    emailAddress: string | null;
    firstName: string;
    lastName: string;
}

export interface ResendOtpRequest {
    purpose: string;
    existingChallengeToken: string;
}

export interface VerifyOtpRequest {
    otpCode: string;
    existingChallengeToken: string;
}