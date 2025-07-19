/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

export default function useFetch<T>(url: string, id?: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(id ? url + id : url);
        const dados = await res.json();
        setData(dados);
      } catch (error) {
        console.error("Erro ao fazer fetch na API", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url, id]);

  return { data, loading, error };
}
