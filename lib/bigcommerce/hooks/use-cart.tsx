import useSWR from 'swr';

// @ts-ignore
const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

export default function useCart() {
  const { data, error } = useSWR('/api/cart', fetcher);

  return {
    cart: data,
    isLoading: !error && !data,
    isError: error,
  };
}
