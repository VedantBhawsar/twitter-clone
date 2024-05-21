import '@/styles/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RootLayout from './layout';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId='610390957718-vcrohprm63o5cur7rf3ln1vvop2teue6.apps.googleusercontent.com'>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: '#2f2e2e',
                  color: 'white',
                },
              },
              error: {
                style: {
                  background: '#2f2e2e',
                  color: 'white',
                },
              },
              loading: {
                style: {
                  background: '#2f2e2e',
                  color: 'white',
                },
              },
            }}
          />
        </GoogleOAuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}
