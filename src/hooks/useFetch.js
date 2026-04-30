import { useState, useEffect } from "react";

export default function useFetch(callback) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        callback()
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false))
    }, []);
    return { data, loading, error }
}