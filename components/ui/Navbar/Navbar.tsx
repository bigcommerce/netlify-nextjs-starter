import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';

import { Bag } from '@components/icons';
import Container from '@components/ui/Container';
import Logo from '@components/ui/Logo';
import UserNav from '@components/ui/UserNav';

import s from './Navbar.module.css';

interface ProductViewProps {
  data: any;
}

const Navbar: FC<ProductViewProps> = ({ data }) => {
  return (
    <div className={cn(s.root)}>
      <Container>
        <div className="justify-between items-center  px-2 py-2 md:py-2  text-center">
          <Link href="/">
            <span className="cursor-pointer inline-block">
              <Logo />
            </span>
          </Link>
        </div>
        <div className={cn(s.mobileNav, 'divide-gray-400 divide-x')}>
          <div className="flex flex-col items-center py-3">
            <Bag width="18" />
            <span className="mt-1">Bag</span>
          </div>
        </div>
      </Container>
      <div className=" border-b border-gray-300 px-4 md:py-4">
        <Container>
          <nav className="hidden lg:flex flex-row space-x-8 items-center justify-center">
            {data?.bc_cat?.data?.map((link: any) => (
              <a
                className="cursor-pointer hover:text-gray-600 text-center text-sm uppercase font-medium tracking-widest"
                href={link?.custom_url?.url ?? ''}
                key={link?.name ?? ''}
              >
                {link?.name ?? 'aa'}
              </a>
            ))}

            {data?.link?.map((link: any) => (
              <a
                className="cursor-pointer hover:text-gray-600 text-center text-sm uppercase font-medium tracking-widest"
                href={link?.href ?? ''}
                key={link?.title ?? ''}
              >
                {link?.title ?? ''}
              </a>
            ))}
            <div className="flex-1">
              <Link
                className="cursor-pointer hover:text-gray-600 uppercase font-medium text-sm"
                href="/"
              >
                Search
              </Link>
            </div>
            <UserNav />
          </nav>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
