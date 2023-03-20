import { TextProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import useIsAdmin from '../../hooks/use-is-admin';

interface SubText {
  children: ReactNode;
}

export default function SubTitle({ children, ...props }: SubText & TextProps) {
  const isAdmin = useIsAdmin();

  return (
    <Text
      color="gray.400"
      fontSize="md"
      textAlign={isAdmin ? 'left' : 'center'}
      {...props}
    >
      {children}
    </Text>
  );
}
