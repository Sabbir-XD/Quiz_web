import useSWR from 'swr';

// Generic reusable hook
export default function useFetch(url) {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
}
