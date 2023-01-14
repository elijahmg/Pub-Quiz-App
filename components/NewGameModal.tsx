import * as React from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface NewGameModalProps {
  isOpen: boolean;
  onClose: Function;
  data?: GameData;
  setData: Function;
}
interface GameData {
  name: string;
  password: string;
  pin: number;
}
export const NewGameModal = (props: NewGameModalProps): JSX.Element => {
  const setState = (
    prevState: GameData | undefined,
    name: string,
    newVal: any,
  ) => {
    props.setData((prevState: GameData) => ({
      ...prevState,
      [name]: newVal,
    }));
  };
  return (
    <Modal isOpen={props.isOpen} onClose={() => props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Set Game Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={props.data?.name}
            onChange={(e) => setState(props.data, `name`, e.target.value)}
          />
          <Input
            value={props.data?.password}
            onChange={(e) => setState(props.data, `password`, e.target.value)}
          />
          <Input
            value={props.data?.pin}
            onChange={(e) => setState(props.data, `pin`, e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => props.onClose}>
            Close
          </Button>
          <Button variant="ghost">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
