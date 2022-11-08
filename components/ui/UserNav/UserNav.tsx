import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';

import { Bag } from '@components/icons';
import useCart from '@lib/bigcommerce/hooks/use-cart';
import { LineItem } from '@lib/bigcommerce/types/cart';

import s from './UserNav.module.css';

interface Props {
  className?: string;
}

const UserNav: FC<Props> = ({ className }) => {
  const countItem = (count: number, item: LineItem) => count + item.quantity;
  let itemsCount = 0;

  const { cart } = useCart();

  if (cart) {
    itemsCount = cart?.lineItems?.reduce(countItem, 0) ?? 0;
  }

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <Link href="/cart">
            <li className={s.item}>
              <Bag />
              <span className={s.bagCount}>{itemsCount}</span>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default UserNav;
