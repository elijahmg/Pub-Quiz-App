import { Heading, HeadingProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SubHeader {
  children: ReactNode;
}

export default function SubHeader({
  children,
  ...props
}: SubHeader & HeadingProps) {
  return (
    <Heading as="h2" size="lg" {...props}>
      {children}
    </Heading>
  );
}
