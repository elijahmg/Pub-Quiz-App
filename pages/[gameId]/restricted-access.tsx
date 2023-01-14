import { Text, Stack, Image, Center } from '@chakra-ui/react';

export default function RestrictedAccess() {
  return (
    <Center>
      <Stack>
        <Text>Restricted Access</Text>
        <Image
          maxW={300}
          alt="Illustration placeholder for restricted access"
          src="https://i.kym-cdn.com/entries/icons/original/000/002/144/You_Shall_Not_Pass!_0-1_screenshot.jpg"
          fallbackSrc="https://img.freepik.com/free-vector/flat-design-enter-sign_23-2149291772.jpg?w=1480&t=st=1673707379~exp=1673707979~hmac=f39dbe8597952709b1c658cf99f09c1ba6655aefbe6fd1bcaa967a9bc570a4b3"
        />
        <Text>Looks like the quiz has already started.</Text>
        <Text>Sorry about that, but good luck next time!</Text>
      </Stack>
    </Center>
  );
}
