import type { AppProps } from 'next/app';
import '@vercel/examples-ui/globals.css';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
