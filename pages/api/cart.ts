import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import BigCommerce from 'node-bigcommerce';

import { normalizeCart } from '@lib/bigcommerce/normalize';
import { BigcommerceCart } from '@lib/bigcommerce/types/cart';

import { getExceptionMessage, getExceptionStack, getExceptionStatus } from '../../utils/errors';
import getCartCookie from '../../utils/get-cart-cookie';

const API_TOKEN = process.env.BIGCOMMERCE_STORE_API_TOKEN;
const CLIENT_ID = process.env.BIGCOMMERCE_STORE_API_CLIENT_ID;
const STORE_HASH = process.env.BIGCOMMERCE_STORE_API_STORE_HASH;
const BC_CART_MAX_AGE = 60 * 60 * 24 * 30;

const bigCommerce = new BigCommerce({
  clientId: CLIENT_ID,
  accessToken: API_TOKEN,
  storeHash: STORE_HASH,
  apiVersion: 'v3',
  responseType: 'json',
});

function assertsBcCart(cookies: Record<string, string>) {
  if ('bc_cart' in cookies) {
    return cookies.bc_cart;
  }

  throw new ApiError(404, 'Existing cart not found');
}

async function createOrUpdateCart(cart: unknown, cartId?: string) {
  if (cartId) {
    return bigCommerce.post<{ data: BigcommerceCart }>(
      `/carts/${cartId}/items?include=line_items.physical_items.options`,
      cart,
    );
  }

  return bigCommerce.post<{ data: BigcommerceCart }>(
    '/carts?include=line_items.physical_items.options',
    cart,
  );
}

export default async function cartApi(req: NextApiRequest, res: NextApiResponse) {
  const { body, method, headers } = req;
  const { cookie = '' } = headers;

  switch (method) {
    case 'GET': {
      try {
        const cookies = parse(cookie);
        const cartId = assertsBcCart(cookies);

        const { data } = await bigCommerce.get<{ data?: BigcommerceCart }>(
          `/carts/${cartId}?include=line_items.physical_items.options`,
        );

        return res.status(200).json(data ? normalizeCart(data) : null);
      } catch (error) {
        const status = getExceptionStatus(error);
        const message = getExceptionMessage(error);
        const stack = getExceptionStack(error);

        if (stack) {
          // eslint-disable-next-line no-console
          console.debug(stack);
        }

        return res.status(status).send(message);
      }
    }

    case 'POST': {
      try {
        const cookies = parse(cookie);
        const cartId = assertsBcCart(cookies);

        const cart = {
          line_items: [
            {
              quantity: 1,
              product_id: body?.entityId,
              list_price: body?.prices?.price?.value,
              variant_id: body?.variants?.edges[0]?.node?.entityId,
            },
          ],
        };

        const { data } = await createOrUpdateCart(cart, cartId);

        return res
          .setHeader('Set-Cookie', getCartCookie('bc_cart', cartId, BC_CART_MAX_AGE))
          .status(200)
          .json(normalizeCart(data));
      } catch (error) {
        const status = getExceptionStatus(error);
        const message = getExceptionMessage(error);
        const stack = getExceptionStack(error);

        if (stack) {
          // eslint-disable-next-line no-console
          console.debug(stack);
        }

        return res.status(status).send(message);
      }
    }

    default: {
      return res.status(501).end(`Method ${method} not implemented.`);
    }
  }
}
