export interface SendOtpResponse {
    challengeToken: string;
    resendAttemptsRemaining: number;
    sentAt: Date;
    expiresAt: Date;
    expiresAtInSeconds: number;
}

export interface ResendOtpResponse {
    challengeToken: string;
    resendAttemptsRemaining: number;
    sentAt: Date;
    expiresAt: Date;
    expiresAtInSeconds: number;
}

export interface VerifyOtpResponse {
    jwt: number;
    issuedAt: number;
    expiresAt: number;
    expiresAtInSeconds: number;
}