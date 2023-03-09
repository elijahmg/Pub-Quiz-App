import { Button, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

export default function SecondaryButton({
  children,
  ...props
}: ButtonProps & ChakraButtonProps) {
  return (
    <Button
      variant="outline"
      borderColor="green.100"
      color="green.100"
      {...props}
    >
      {children}
    </Button>
  );
}
