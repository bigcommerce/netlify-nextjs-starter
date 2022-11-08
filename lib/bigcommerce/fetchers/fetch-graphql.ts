/**
 * Coded simpler version of the super generic commerce API graph fetcher.
 * Does not rely on the `commerce` object, but uses ENV vars directly.
 *
 * WILL EVENTUALLY REPLACE :  framework/bigcommerce/api/utils/fetch-graphql-api.ts
 */
import fetch from 'node-fetch';

// TODO Move into a central ENV object.
const API_URL = process.env.BIGCOMMERCE_STOREFRONT_API_URL;
const API_TOKEN = process.env.BIGCOMMERCE_STOREFRONT_API_TOKEN;

export const fetchGraphQL = async (query: string, variables = {}, fetchOptions = {}) => {
  const apiUrl = String(API_URL);
  const apiToken = String(API_TOKEN);
  const res = await fetch(apiUrl, {
    ...fetchOptions,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  return { data: json.data, res };
};
