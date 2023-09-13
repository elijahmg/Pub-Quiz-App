import { Button, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  testId: string;
}

export default function SecondaryButton({
  children,
  testId,
  ...props
}: ButtonProps & ChakraButtonProps) {
  return (
    <Button
      data-testid={testId}
      variant="outline"
      borderColor="green.100"
      color="green.100"
      {...props}
    >
      {children}
    </Button>
  );
}
