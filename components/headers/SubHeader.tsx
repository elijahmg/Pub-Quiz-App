import { Heading } from '@chakra-ui/react';

interface SubHeader {
  subHeaderText: string;
}

export default function SubHeader({ subHeaderText }: SubHeader) {
  return (
    <Heading as="h2" textAlign="center" mb={2}>
      {subHeaderText}
    </Heading>
  );
}
