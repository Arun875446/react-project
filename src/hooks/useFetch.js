import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import api from '@/api';
import { getItem, setItem } from '@/lib/utils/localStorage';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const useFetch = (url, options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const abortController = useRef(null);

  const storageKey = useMemo(() => {
    if (!options?.params) {
      return url;
    }

    return url + '?' + JSON.stringify(options.params);
  }, [options, url]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const currentTime = new Date().getTime();
    const cachedData = getItem(storageKey);

    if (cachedData && currentTime - cachedData.lastFetched < STALE_TIME) {
      setData(cachedData.data);
      setLoading(false);
      return;
    }
    abortController.current = new AbortController();
    api
      .get(url, {
        ...options,
        signal: abortController.current?.signal,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (axios.isCancel(error)) {
          return;
        }
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.current?.abort();
    };
  }, [url, options]);

  useEffect(() => {
    if (!data) return;

    setItem(storageKey, {
      lastFetched: new Date().getTime(),
      data,
    });
  }, [data, storageKey]);
  return { data, loading, error };
};

export default useFetch;
