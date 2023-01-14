import { Text, Stack, Image, Center } from '@chakra-ui/react';

export default function Waiting() {
  return (
    <Center>
      <Stack>
        <Text>Getting Ready</Text>
        <Image
          alt="Illustration placeholder for waiting for start"
          src="https://i.kym-cdn.com/photos/images/original/001/373/328/b16.jpg"
          maxW={400}
        />
        <Text>
          Don&apos;t worry Quirky Owls, the quiz will start in a few moments.
        </Text>
        <Text>Grab a drink in the meantime!</Text>
      </Stack>
    </Center>
  );
}
