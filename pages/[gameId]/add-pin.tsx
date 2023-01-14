import {
  PinInput,
  Text,
  Stack,
  usePinInput,
  HStack,
  PinInputField,
  Center,
} from '@chakra-ui/react';
import Header from '../../components/headers/Header';

export default function InputPin() {
  return (
    <Center>
      <Stack>
        <Header>Enter PIN</Header>
        <Center>
          <HStack>
            <PinInput type="alphanumeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </Center>
      </Stack>
    </Center>
  );
}
