import { Heading, HeadingProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Header {
  children: ReactNode;
}

export default function Header({ children, ...props }: Header & HeadingProps) {
  return (
    <Heading size="3xl" color="green.100" {...props}>
      {children}
    </Heading>
  );
}
