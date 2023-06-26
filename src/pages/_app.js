/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import '@/styles/globals.css';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { Toaster } from 'react-hot-toast';
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from '../components/Header';

const progress = new ProgressBar({
  size: 3,
  color: '#DAA520',
  className: 'z-50 bar-of-progress',
  delay: 100,
});

const queryClient = new QueryClient();

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

export default function App({ Component, pageProps }) {
  // const [progress, setProgress] = useState(0);
  return (
    <SessionProvider
      className="z-0"
      session={pageProps.session}
    >
      <Toaster />
      <QueryClientProvider
        className="z-0"
        client={queryClient}
      >
        <div className=" ">
          <Header />
          <Component {...pageProps} />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
