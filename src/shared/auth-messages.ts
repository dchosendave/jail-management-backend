export const AuthMessages = {
    PASSWORD_MUST_HAVE_NUMBER_CHARACTER: "Passwordm ust have at least one number character.",
    PASSWORD_MUST_HAVE_UPPERCASE_LETTER: "Password must have at least one uppercase letter.",
    PASSWORD_MUST_HAVE_LOWERCASE_LETTER: "Password must have at least one lowercase letter.",
    PASSWORD_MUST_HAVE_SPECIAL_CHARACTER: "Password must have at least one special character.",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long.",
    PASSWORD_MISMATCH: "Password doesn't match. Please try again."
};

export type AuthMessageType = typeof AuthMessages[keyof typeof AuthMessages];