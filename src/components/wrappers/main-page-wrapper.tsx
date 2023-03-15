import { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { Blobs } from '../images/blobs';

interface Props {
  children: ReactNode;
}

export function MainPageWrapper({ children }: Props) {
  return (
    <>
      <Box position="absolute" top={0}>
        <Blobs />
      </Box>
      <Flex my={16} flexDirection="column" mx={8}>
        {children}
      </Flex>
    </>
  );
}
