import { useState, useEffect } from 'react';

export function useApi(apiFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiFunction();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => {
    setLoading(true);
    apiFunction().then(r => setData(r.data)).catch(e => setError(e));
  } };
}
