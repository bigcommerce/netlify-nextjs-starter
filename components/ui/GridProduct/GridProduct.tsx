import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Component, FC, ReactNode } from 'react';

import { Product } from '@lib/bigcommerce/types/product';

import s from './GridProduct.module.css';

export interface GridData {
  item: ItemData;
}

export interface ItemData {
  title: string;
  description: string;
  link: LinkData;
  img?: any;
}

export interface LinkData {
  title: string;
  url: string;
}

export interface DataProps {
  title: string;
  description: string;
  grid: GridData[];
}

interface Props {
  className?: string;
  children?: ReactNode[] | Component[] | any[];
  variant?: 'cols4' | string;
  data?: DataProps;
}

const GridProduct: FC<Props> = ({ className, children, variant, data = {} }) => {
  const rootClassName = cn(
    s.root,
    {
      [s.variantCols4]: variant === 'cols4',
    },
    className,
  );

  // If it contains data we build the childrens.
  const { grid } = data;
  // @ts-ignore
  const { bc_products } = grid[0];

  if (grid) {
    return (
      <div>
        <div className="text-center my-12">
          {data.title && (
            <h2 className="mb-2 text-4xl font-semibold tracking-wide uppercase">{data.title}</h2>
          )}
          {data.description && <p className="">{data.description}</p>}
        </div>
        <div className={rootClassName}>
          {bc_products?.data?.map((item: Product, i: any) => (
            <div className="flex flex-col items-center text-center mb-10" key={`item__${i}`}>
              <div className="mb-2">
                {item?.name && (
                  <Image
                    alt={item.primary_image?.url_standard}
                    height={200}
                    src={item.primary_image?.url_standard || ''}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                    width={200}
                  />
                )}
              </div>
              {item?.name && (
                <h2 className="mb-2 text-lg font-medium tracking-wide uppercase">{item?.name}</h2>
              )}
              {item?.description && (
                <div
                  className="mb-2 px-4"
                  dangerouslySetInnerHTML={{
                    __html: `${item?.description.substring(0, 100)}...`,
                  }}
                />
              )}
              <Link
                className="mt-4 uppercase font-semibold tracking-wide
            text-xs text-slate-900 bg-white rounded-full
            px-4 py-3 border  border-slate-400 hover:border-black
            transition ease-linear duration-150"
                href={`product${item?.custom_url?.url}`}
              >
                Shop Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div className={rootClassName}>{children}</div>;
};

export default GridProduct;
