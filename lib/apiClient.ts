export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api` 
    : 'http://localhost:8080/api';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    console.log(`url : ${API_BASE_URL}${endpoint}`)
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });
    if (!response.ok) {
        throw new Error(`API Error : ${response.statusText}`);
    }
    return response.json();
};

export const apiWithFile = async (endpoint: string, options: RequestInit = {}) => {
    console.log(`url : ${API_BASE_URL}${endpoint}`)
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,

    })
    if (!response.ok) {
        throw new Error(`API Error : ${response.statusText}`);
    }
    return response.json();
}