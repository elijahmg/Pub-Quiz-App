import { Button, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClickHandle: Function;
}

export default function PrimaryButton({
  children,
  onClickHandle,
  ...props
}: ButtonProps & ChakraButtonProps) {
  return (
    <Button
      color="white"
      onClick={() => onClickHandle()}
      bgColor="green.100"
      {...props}
    >
      {children}
    </Button>
  );
}
