import TeamName from '../../../components/TeamName';
import { Button } from '@chakra-ui/react';
import { NewGameModal } from '../../../components/NewGameModal';
import { useState } from 'react';

export default function CreateNewQuiz(name: string) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <TeamName name={'Team name'} />
      <NewGameModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Button onClick={() => setShowModal(true)}>Create new quiz</Button>
    </div>
  );
}
