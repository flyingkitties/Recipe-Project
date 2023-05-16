import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { useState } from 'react';
import Header from '@/components/Header';
import toast, { Toaster } from 'react-hot-toast';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
  const [progress, setProgress] = useState(0);
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div className="h-screen overflow-y-scroll  ">
          <Header />
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}
