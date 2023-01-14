import { Button } from '@chakra-ui/react';

interface ButtonProps {
  label: string;
  onClickHandle: Function;
}

export default function PrimaryButton({ label, onClickHandle }: ButtonProps) {
  return (
    <Button color="white" onClick={() => onClickHandle()} bgColor="green.100">
      {label}
    </Button>
  );
}
