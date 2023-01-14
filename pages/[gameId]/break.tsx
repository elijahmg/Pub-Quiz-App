import { Center, Image, Stack, Text } from '@chakra-ui/react';

export default function Break() {
  return (
    <Center>
      <Stack>
        <Text>Checking answers</Text>
        <Image
          maxW={300}
          alt="Illustration placeholder for break"
          src="https://cdn.vox-cdn.com/thumbor/-T7aAB2aRt3B_Aa3o6BU1qoIm6U=/0x0:5760x3840/1720x0/filters:focal(0x0:5760x3840):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/23463325/2021_BreakEven_Photos_22.jpg"
          fallbackSrc="https://cdn-icons-png.flaticon.com/512/3014/3014323.png"
        />
        <Text>Time for a break.</Text>
        <Text>
          Your quizmaster is checking your answers. In the meantime, have a chat
          and/or drink, we do not judge.
        </Text>
      </Stack>
    </Center>
  );
}
