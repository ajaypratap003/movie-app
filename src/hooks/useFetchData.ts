import { useState, useEffect } from 'react';

type FetchState<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export const useFetchData = <T,>(url: string): FetchState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export const fetchAllImdbData = async (API_URL: string, IMDB_IDS: { episode_id: number, imdb_id: string }[],) => {
    try {
        const responses = await Promise.all(
            IMDB_IDS.map(({ imdb_id }) =>
                fetch(`${API_URL}&i=${imdb_id}`).then((response) => response.json())
            )
        );
        return responses;
    } catch (err) {
        console.error("Error fetching IMDb data:", err);
        return [];
    }
};
