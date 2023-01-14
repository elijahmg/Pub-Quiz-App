import { Heading } from '@chakra-ui/react';

interface Header {
  label: string;
}

export default function Header({ label }: Header) {
  return (
    <Heading as="h1" size="3xl" color="green.100" mb={200}>
      {label}
    </Heading>
  );
}
