'use client';

import useSWR from 'swr';
import { useCallback } from 'react';

import { axiosInstance } from 'src/utils/axios-instance';

// --------------------
// Helper: Ensure trailing slash for Django
// --------------------
const ensureTrailingSlash = (url) => url.endsWith('/') ? url : `${url}/`;

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
    fetch = true,
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    refreshInterval = 0,
  } = options;

  const { data, error, isLoading, mutate, isValidating } = useSWR(fetch ? url : null, fetcher, {
    revalidateOnFocus,
    revalidateOnReconnect,
    refreshInterval,
  });

  // --------------------
  // POST (Create)
  // --------------------
  const postData = useCallback(
    async (endpointOrPayload, payloadIfEndpoint) => {
      const isPayloadOnly = payloadIfEndpoint === undefined;
      const endpoint = isPayloadOnly
        ? ensureTrailingSlash(url)
        : ensureTrailingSlash(`${url}${endpointOrPayload}`);
      const payload = isPayloadOnly ? endpointOrPayload : payloadIfEndpoint;

      console.log('POST to:', endpoint);
      const res = await axiosInstance.post(endpoint, payload);
      await mutate();
      return res.data;
    },
    [url, mutate]
  );

  // --------------------
  // PUT (Update Full)
  // --------------------
  const putData = useCallback(
    async (idOrPayload, payloadIfId) => {
      const isPayloadOnly = payloadIfId === undefined;
      const endpoint = isPayloadOnly
        ? ensureTrailingSlash(url)
        : ensureTrailingSlash(`${ensureTrailingSlash(url)}${idOrPayload}`);
      const payload = isPayloadOnly ? idOrPayload : payloadIfId;

      console.log('PUT to:', endpoint);
      const res = await axiosInstance.put(endpoint, payload);
      await mutate();
      return res.data;
    },
    [url, mutate]
  );

  // --------------------
  // PATCH (Update Partial)
  // --------------------
  const patchData = useCallback(
    async (idOrPayload, payloadIfId) => {
      const isPayloadOnly = payloadIfId === undefined;
      const endpoint = isPayloadOnly
        ? ensureTrailingSlash(url)
        : ensureTrailingSlash(`${ensureTrailingSlash(url)}${idOrPayload}`);
      const payload = isPayloadOnly ? idOrPayload : payloadIfId;

      console.log('PATCH to:', endpoint);
      const res = await axiosInstance.patch(endpoint, payload);
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
          ? ensureTrailingSlash(`${ensureTrailingSlash(url)}${idOrUrlParam}`)
          : ensureTrailingSlash(url);

      console.log('DELETE:', deleteUrl);
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
