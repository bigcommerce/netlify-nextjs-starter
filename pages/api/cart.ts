import { NextApiRequest, NextApiResponse } from 'next';
import BigCommerce from 'node-bigcommerce';
import { parseString } from 'set-cookie-parser';

import { normalizeCart } from '@lib/bigcommerce/normalize';
import { BigcommerceCart, Cart } from '@lib/bigcommerce/types/cart';

import getCartCookie from '../../utils/get-cart-cookie';

export default async function cart(req: NextApiRequest, res: NextApiResponse) {
  const { body, method, headers } = req;
  const ONE_DAY = 60 * 60 * 24;
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

  if (method === 'GET') {
    try {
      if (headers.cookie) {
        // @ts-expect-error set-cookie-parser types are wrong
        const { bc_cart } = parseString(headers.cookie);

        if (bc_cart && typeof bc_cart === 'string') {
          const { data } = await bigCommerce.get<{ data?: BigcommerceCart }>(
            `/carts/${bc_cart}?include=line_items.physical_items.options`,
          );

          res.status(200).json(data ? normalizeCart(data) : null);
        }
      }
    } catch (error) {
      // @ts-expect-error not going to fix
      const { message, response } = error;

      res
        .status(response?.status || 500)
        .end(message || 'Authentication failed, please re-install');
    }
  } else if (method === 'POST') {
    try {
      let data: Cart;
      // @ts-ignore
      const { bc_cart } = parseString(headers.cookie);

      if (bc_cart) {
        const bccart = {
          line_items: [
            {
              quantity: 1,
              product_id: body?.entityId,
              list_price: body?.prices?.price?.value,
              variant_id: body?.variants?.edges[0]?.node?.entityId,
            },
          ],
        };

        try {
          data = await bigCommerce.post(
            `/carts/${bc_cart}/items?include=line_items.physical_items.options`,
            bccart,
          );
        } catch (error) {
          // @ts-ignore
          const { message, response } = error;

          res
            .status(response?.status || 500)
            .end(message || 'Authentication failed, please re-install');
        }
      } else {
        const bccart = {
          line_items: [
            {
              quantity: 1,
              product_id: body?.entityId,
              list_price: body?.prices?.price?.value,
              variant_id: body?.variants?.edges[0]?.node?.entityId,
            },
          ],
        };

        data = await bigCommerce.post('/carts?include=line_items.physical_items.options', bccart);
      }

      // @ts-ignore
      const cartId = data.data?.id;

      // Create or update the cart cookie
      res.setHeader('Set-Cookie', getCartCookie('bc_cart', cartId, ONE_DAY * 30));
      // @ts-ignore
      res.status(200).json(normalizeCart(data));
    } catch (error) {
      // @ts-ignore
      const { message, response } = error;

      res
        .status(response?.status || 500)
        .end(message || 'Authentication failed, please re-install');
    }
  }
}
