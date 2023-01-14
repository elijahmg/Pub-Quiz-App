import { Button } from '@chakra-ui/react';

interface ButtonProps {
  label: string;
  changeModalStatus: Function;
}

export default function PrimaryButton({
  label,
  changeModalStatus,
}: ButtonProps) {
  return (
    <Button
      w="100%"
      onClick={() => changeModalStatus(true)}
      color="white"
      bgColor="green.100"
      mb={2}
    >
      {label}
    </Button>
  );
}
