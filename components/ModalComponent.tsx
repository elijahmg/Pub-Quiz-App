import {
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Stack,
} from '@chakra-ui/react';

interface ModalProps {
  modalStatus: boolean;
  onClickHandle: Function;
}
export default function ModalComponent({
  modalStatus,
  onClickHandle,
}: ModalProps) {
  return (
    <Modal isOpen={modalStatus} onClose={() => onClickHandle(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Stack>
              <Heading as="h3" size="md">
                Please enter PIN of the game you want to enter:
              </Heading>
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
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => onClickHandle(false)}
          >
            Join
          </Button>
          <Button onClick={() => onClickHandle(false)} variant="ghost">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
