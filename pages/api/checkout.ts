import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import BigCommerce from 'node-bigcommerce';

export default async function checkout(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;
  const API_TOKEN = process.env.BIGCOMMERCE_STORE_API_TOKEN;
  const CLIENT_ID = process.env.BIGCOMMERCE_STORE_API_CLIENT_ID;

  const STORE_HASH = process.env.BIGCOMMERCE_STORE_API_STORE_HASH;
  const bigCommerce = new BigCommerce({
    clientId: CLIENT_ID,
    accessToken: API_TOKEN,
    storeHash: STORE_HASH,
    apiVersion: 'v3',
    responseType: 'json',
  });

  const { bc_cart } = parse(headers.cookie ?? '');

  try {
    const { data } = await bigCommerce.get<{ data: unknown }>(
      `/carts/${bc_cart}?include=redirect_urls`,
    );

    res.status(200).json(data);
  } catch (error) {
    // @ts-ignore
    const { message, response } = error;

    res.status(response?.status || 500).end(message || 'Authentication failed, please re-install');
  }
}
