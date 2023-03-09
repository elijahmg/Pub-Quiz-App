import { Heading } from '@chakra-ui/react';

export default function TeamName({ name }: { name: string }) {
  return (
    <Heading as="h3" size="md">
      {name}
    </Heading>
  );
}
