import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

export default function SecondaryButton({ children }: ButtonProps) {
  return (
    <Button
      variant="outline"
      borderColor="green.100"
      w="100%"
      color="green.100"
    >
      {children}
    </Button>
  );
}
