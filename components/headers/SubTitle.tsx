import { Text } from '@chakra-ui/react';

interface SubText {
  label: string;
}

export default function SubTitle({ label }: SubText) {
  return (
    <Text color="gray.400" align="center">
      {label}
    </Text>
  );
}
