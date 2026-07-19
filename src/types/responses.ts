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