import { Heading } from '@chakra-ui/react';

export default function TeamName({ name }: { name: string }) {
  return (
    <Heading as="h1" size="lg">
      {name}
    </Heading>
  );
}
