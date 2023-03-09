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
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

interface NewGameModalProps {
  isOpen: boolean;
  onClose: Function;
  data?: GameData;
}
interface GameData {
  name: string;
  password: string;
  pin: number;
}
export const NewGameModal = (props: NewGameModalProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    name: '',
    password: '',
    pin: 0,
  });

  const setState = (
    prevState: GameData | undefined,
    name: string,
    newVal: string | number,
  ) => {
    setData((prevState: GameData) => ({
      ...prevState,
      [name]: newVal,
    }));
  };

  function sendData() {
    props.onClose();
    return data;
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Set Game Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Quiz Name</Text>
          <Input
            value={props.data?.name}
            onChange={(e) => setState(props.data, `name`, e.target.value)}
          />
          <Text>Quiz Password</Text>
          <Input
            value={props.data?.password}
            onChange={(e) => setState(props.data, `password`, e.target.value)}
          />
          <Text>Quiz PIN</Text>
          <Input
            value={props.data?.pin}
            onChange={(e) => setState(props.data, `pin`, e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose()}>
            Close
          </Button>
          <Button variant="ghost" onClick={sendData}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
