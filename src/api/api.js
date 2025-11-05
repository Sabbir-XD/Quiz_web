'use client';

import useSWR from 'swr';
import { useCallback } from 'react';

import { axiosInstance } from 'src/utils/axios-instance';

// --------------------
// Default SWR fetcher
// --------------------
const fetcher = async (url) => {
  const res = await axiosInstance.get(url);
  return res.data;
};

// --------------------
// Reusable API Hook
// --------------------
export default function useApi(url, options = {}) {
  const {
    fetch = true, // auto fetch toggle
    revalidateOnFocus = true, // SWR option
    revalidateOnReconnect = true, // SWR option
    refreshInterval = 0, // auto refresh interval in ms (0 = disabled)
  } = options;

  // useSWR for GET request
  const { data, error, isLoading, mutate, isValidating } = useSWR(fetch ? url : null, fetcher, {
    revalidateOnFocus,
    revalidateOnReconnect,
    refreshInterval,
  });

  // --------------------
  // POST (Create)
  // --------------------
  const postData = useCallback(
    async (payload) => {
      const res = await axiosInstance.post(url, payload);
      await mutate(); // refresh cache
      return res.data;
    },
    [url, mutate]
  );

  // --------------------
  // PUT (Update Full)
  // --------------------
  const putData = useCallback(
    async (payload) => {
      const res = await axiosInstance.put(url, payload);
      await mutate();
      return res.data;
    },
    [url, mutate]
  );

  // --------------------
  // PATCH (Update Partial)
  // --------------------
  const patchData = useCallback(
    async (payload) => {
      const res = await axiosInstance.patch(url, payload);
      await mutate();
      return res.data;
    },
    [url, mutate]
  );

  // --------------------
  // DELETE
  // --------------------
  const deleteData = useCallback(
    async (idOrUrlParam) => {
      const deleteUrl =
        typeof idOrUrlParam === 'string' || typeof idOrUrlParam === 'number'
          ? `${url}${url.endsWith('/') ? '' : '/'}${idOrUrlParam}`
          : url;

      const res = await axiosInstance.delete(deleteUrl);
      await mutate();
      return res.data;
    },
    [url, mutate]
  );

  // --------------------
  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    postData,
    putData,
    patchData,
    deleteData,
  };
}
