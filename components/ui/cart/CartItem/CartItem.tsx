import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import s from './CartItem.module.css';

interface ItemOption {
  name: string;
  nameId: number;
  value: string;
  valueId: number;
}

const CartItem = ({
  item,
  variant = 'default',
  currencyCode,
  ...rest
}: {
  variant?: 'default' | 'display';
  item: any;
  currencyCode: string;
}) => {
  const [removing] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity);

  // TODO: Add a type for this
  const options = item.options;

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity);
    }
  }, [item.quantity, quantity]);

  return (
    <li
      className={classnames(s.root, {
        'opacity-50 pointer-events-none': removing,
      })}
      {...rest}
    >
      <div className="flex flex-row space-x-4 py-4">
        <div className="w-16 h-16 bg-ecru-sand relative overflow-hidden cursor-pointer z-0">
          <Link href={`/product/${item.path}`}>
            <Image
              alt={item.variant.image?.altText}
              className={s.productImage}
              height={150}
              src={item.variant.image?.url}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              unoptimized
              width={150}
            />
          </Link>
        </div>
        <div className="flex-1 flex flex-col text-base">
          <Link href={`/product/${item.path}`}>
            <span className={s.productName}>{item.name}</span>
          </Link>
          {options && options.length > 0 && (
            <div className="flex items-center pb-1">
              {options.map((option: ItemOption, i: number) => (
                <div
                  className="text-sm font-semibold text-grayscale-7 inline-flex items-center justify-center"
                  key={`${item.id}-${option.name}`}
                >
                  {option.name}
                  {option.name === 'Color' ? (
                    <span
                      className="mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-grayscale-9 inline-flex items-center justify-center overflow-hidden"
                      style={{
                        backgroundColor: `${option.value}`,
                      }}
                    />
                  ) : (
                    <span className="mx-2 rounded-full bg-transparent border h-5 p-1 text-grayscale-9 inline-flex items-center justify-center overflow-hidden">
                      {option.value}
                    </span>
                  )}
                  {i === options.length - 1 ? '' : <span className="mr-3" />}
                </div>
              ))}
            </div>
          )}
          {variant === 'display' && <div className="text-sm tracking-wider">{quantity}x</div>}
        </div>
        <div className="flex flex-col justify-between space-y-2 text-sm">
          <span>222</span>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
