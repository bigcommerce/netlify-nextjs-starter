import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';
import '@vercel/examples-ui/globals.css';

import '../styles/globals.css';

const inter = Inter();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
