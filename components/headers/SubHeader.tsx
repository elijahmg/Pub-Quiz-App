import { Heading } from '@chakra-ui/react';

interface SubHeader {
  label: string;
}

export default function SubHeader({ label }: SubHeader) {
  return (
    <Heading as="h2" textAlign="center" mb={2}>
      {label}
    </Heading>
  );
}
