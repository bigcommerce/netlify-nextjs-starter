import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Component, FC, ReactNode } from 'react';

import s from './Grid.module.css';

export interface GridEntity {
  grid: GridData;
}

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

const Grid: FC<Props> = ({ className, children, variant, data = {} }) => {
  const rootClassName = cn(
    s.root,
    {
      [s.variantCols4]: variant === 'cols4',
    },
    className,
  );

  // If it contains data we build the childrens.
  const { grid } = data;

  if (grid) {
    const meassureProps =
      variant === 'cols4'
        ? {
            width: 263,
            height: 365,
          }
        : {
            width: 365,
            height: 365,
          };

    return (
      <div>
        <div className="text-center my-12">
          {data.title && (
            <h2 className="mb-2 text-4xl font-semibold tracking-wide uppercase">{data.title}</h2>
          )}
          {data.description && <p className="">{data.description}</p>}
        </div>
        <div className={rootClassName}>
          {grid.map((item: any, i) => (
            <div className="flex flex-col items-center text-center mb-10" key={`item__${i}`}>
              <div className="mb-2">
                {item?.img?.url && (
                  <Image alt={item.img.title} src={item.img.url} {...meassureProps} />
                )}
              </div>
              {item.title && (
                <h2 className="mb-2 text-lg font-medium tracking-wide uppercase">{item.title}</h2>
              )}
              {item.description && (
                <div className="mb-2 px-4" dangerouslySetInnerHTML={{ __html: item.description }} />
              )}
              <Link
                className="mt-4 uppercase font-semibold tracking-wide text-xs text-slate-900 bg-white rounded-full px-4 py-3 border border-slate-400 hover:border-black transition ease-linear duration-150"
                href={item?.link?.url ? item?.link?.url : '/'}
              >
                {item?.link?.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div className={rootClassName}>{children}</div>;
};

export default Grid;
