import {useState, useCallback} from "react";




type UseHttpReturn = {
    loading: boolean;
    error: string | null;
    request: (url: string, method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', body?: string | null, headers?: HeadersInit) => Promise<any>;
    clearError: () => void;
}

export const useHttp = (): UseHttpReturn => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async (url: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET', body: string | null = null, headers: HeadersInit = {}) => {

        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not find resource ${url},status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            const message = e instanceof Error ? e.message : String(e);
            setError(message);
            throw e;
        }

    }, [])

    const clearError = useCallback(() => setError(null), []);
    return {loading, error, request, clearError};
}