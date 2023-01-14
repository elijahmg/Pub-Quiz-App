import { Heading } from '@chakra-ui/react';

interface Header {
  headerText: string;
}

export default function Header({ headerText }: Header) {
  return (
    <Heading as="h1" size="3xl" color="green.100" mb={200}>
      {headerText}
    </Heading>
  );
}
