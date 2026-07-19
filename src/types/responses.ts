export interface HealthResponse {
    timestamp: string;
    isHealthy: boolean;
}

// default api response wrapper
export interface ApiResponse<T> {
    isSuccess: boolean;
    message: string | string[] | null;
    statusCode: number;
    data: T;
}

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