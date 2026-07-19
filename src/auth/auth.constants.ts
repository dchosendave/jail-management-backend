export const AuthMessages = {
    PASSWORD_REQUIRES_NUMBER: "Password must have at least one number character.",
    PASSWORD_REQUIRES_UPPERCASE: "Password must have at least one uppercase letter.",
    PASSWORD_REQUIRES_LOWERCASE: "Password must have at least one lowercase letter.",
    PASSWORD_REQUIRES_SPECIAL: "Password must have at least one special character.",
    PASSWORD_TOO_SHORT: "Password must be at least 8 characters long.",
    PASSWORD_MISMATCH: "Password doesn't match. Please try again.",
    
    INVALID_LOGIN: "Invalid email or password. Please try again.",
    SESSION_EXPIRED: "Session expired. Please log in again."
} as const;

export type AuthMessage = typeof AuthMessages[keyof typeof AuthMessages];