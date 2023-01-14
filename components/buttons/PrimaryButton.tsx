import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClickHandle: Function;
}

export default function PrimaryButton({
  children,
  onClickHandle,
}: ButtonProps) {
  return (
    <Button color="white" onClick={() => onClickHandle()} bgColor="green.100">
      {children}
    </Button>
  );
}
