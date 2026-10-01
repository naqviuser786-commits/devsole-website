import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Fetches a CMS resource once on mount. Sections decide how to render each state. */
export function useApiData<T>(path: string, fallback: T | null = null): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: fallback, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    api
      .get<T>(path)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: fallback,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load content.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return state;
}
