import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { trpc } from '../utils/trcp';
import { AppPropsWithLayout } from '../../types';
import CSRWrapper from '../components/csr-wrapper';

function App({ Component, pageProps }: AppPropsWithLayout) {
  const theme = extendTheme({
    colors: {
      secondary: {
        100: '#1A2330',
      },
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

  const getLayout = Component.getLayout || ((page) => page);

  // @TODO REMOVE
  return (
    <CSRWrapper>
      <ChakraProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </CSRWrapper>
  );
}

export default trpc.withTRPC(App);
