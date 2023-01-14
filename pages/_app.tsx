import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    colors: {
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
