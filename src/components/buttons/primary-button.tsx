import { Button, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  testId: string;
}

export default function PrimaryButton({
  children,
  testId,
  ...props
}: ButtonProps & ChakraButtonProps) {
  return (
    <Button
      data-testid={testId}
      color="white"
      bgColor="green.100"
      _hover={{
        bg: 'green.300',
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
