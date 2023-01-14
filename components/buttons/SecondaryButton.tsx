import { Button } from '@chakra-ui/react';

interface ButtonProps {
  label: string;
}

export default function SecondaryButton({ label }: ButtonProps) {
  return (
    <Button
      variant="outline"
      borderColor="green.100"
      w="100%"
      color="green.100"
    >
      {label}
    </Button>
  );
}
