import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { trpc } from '../utils/trcp';

function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    colors: {
      gray: {
        100: '#F1F1F1',
      },
      red: {
        100: '#E53E3E',
      },
      green: {
        100: '#38A169',
      },
      brand: {
        100: '#f7fafc',
        // ...
        900: '#1a202c',
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default trpc.withTRPC(App);
