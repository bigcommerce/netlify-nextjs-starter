import { FC } from 'react';

import { Github } from '@components/icons';
import Container from '@components/ui/Container';

import s from './Footer.module.css';

interface Props {
  className?: string;
  children?: any;
  pages?: any[];
}

const footerNavigation = {
  shop: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  account: [
    { name: 'Manage Account', href: '#' },
    { name: 'Returns & Exchanges', href: '#' },
    { name: 'Redeem a Gift Card', href: '#' },
  ],
  connect: [
    { name: 'Contact Us', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' },
  ],
};

const Footer: FC<Props> = () => {
  return (
    <footer aria-labelledby="footer-heading" className="border-gray-200 border-t">
      <Container>
        <h2 className="sr-only" id="footer-heading">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Shop</h3>
                  <ul className="mt-6 space-y-6">
                    {footerNavigation.shop.map((item) => (
                      <li className="text-sm" key={item.name}>
                        <a className="text-gray-500 hover:text-gray-600" href={item.href}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Company</h3>
                  <ul className="mt-6 space-y-6">
                    {footerNavigation.company.map((item) => (
                      <li className="text-sm" key={item.name}>
                        <a className="text-gray-500 hover:text-gray-600" href={item.href}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Account</h3>
                  <ul className="mt-6 space-y-6">
                    {footerNavigation.account.map((item) => (
                      <li className="text-sm" key={item.name}>
                        <a className="text-gray-500 hover:text-gray-600" href={item.href}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Connect</h3>
                  <ul className="mt-6 space-y-6">
                    {footerNavigation.connect.map((item) => (
                      <li className="text-sm" key={item.name}>
                        <a className="text-gray-500 hover:text-gray-600" href={item.href}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-16 md:mt-16 xl:mt-0">
              <h3 className="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
              <p className="mt-6 text-sm text-gray-500">
                The latest deals and savings, sent to your inbox weekly.
              </p>
              <form className="mt-2 flex sm:max-w-md">
                <label className="sr-only" htmlFor="email-address">
                  Email address
                </label>
                <input
                  autoComplete="email"
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 shadow-sm py-2 px-4 text-base text-slate-500 placeholder-gray-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                  id="email-address"
                  required
                  type="text"
                />
                <div className=" flex-shrink-0">
                  <button
                    className="w-full bg-black border border-transparent shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-row border-t border-gray-200 py-10">
            <div className="flex-1">
              <p className="text-sm text-gray-500">&copy; 2022 ACME, Inc. All rights reserved.</p>
            </div>
            <div className="flex flex-1 space-x-6 items-center h-10 justify-end">
              <a
                aria-label="Github Repository"
                className={s.link}
                href="https://github.com/bigcommerce/netlify-nextjs-starter"
              >
                <Github />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
