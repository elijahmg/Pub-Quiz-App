import { Center, Image, Stack, Text } from '@chakra-ui/react';

export default function CompletionAnimation() {
  return (
    <Center>
      <Stack>
        <Text>Congratulations!</Text>
        <Image
          maxW={300}
          alt="Animation for completion of the quiz"
          src="https://www.grumpycats.com/images/about/tardar.jpg"
          fallbackSrc="https://www.looper.com/img/gallery/the-untold-truth-of-michael-scott/intro-1600107071.jpg"
        />
      </Stack>
    </Center>
  );
}
