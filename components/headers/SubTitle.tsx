import { Text } from '@chakra-ui/react';

interface SubText {
  subTitleText: string;
}

export default function SubTitle({ subTitleText }: SubText) {
  return (
    <Text color="gray.400" align="center">
      {subTitleText}
    </Text>
  );
}
