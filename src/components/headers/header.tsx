import { Heading, HeadingProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import useIsAdmin from '../../hooks/use-is-admin';

export interface Props extends HeadingProps {
  children: ReactNode;
}

export default function Header({ children, ...props }: Props) {
  const isAdmin = useIsAdmin();

  return (
    <Heading
      size="2xl"
      color="green.100"
      textAlign={isAdmin ? 'left' : 'center'}
      {...props}
    >
      {children}
    </Heading>
  );
}
