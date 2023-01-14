import {
  PinInput,
  HStack,
  PinInputField,
  Flex,
  Center,
} from '@chakra-ui/react';
import Header from '../components/headers/Header';
import { useRouter } from 'next/router';

export default function InputPin() {
  const router = useRouter();

  function handlePin(pin: string) {
    if (pin.length === 4) {
      router.push('/3');
    }
  }

  return (
    <Flex h="100vh">
      <Flex w="100%" alignItems="center" flexDirection="column">
        <Header mt={16} alignSelf="center">
          Enter PIN
        </Header>
        <Center mt={8}>
          <HStack>
            <PinInput type="alphanumeric" onChange={handlePin}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </Center>
      </Flex>
    </Flex>
  );
}
