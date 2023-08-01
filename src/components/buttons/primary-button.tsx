import { Button, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

export default function PrimaryButton({
  children,
  ...props
}: ButtonProps & ChakraButtonProps) {
  return (
    <Button
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
