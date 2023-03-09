import TeamName from '../../../components/team-name';
import { Button } from '@chakra-ui/react';
import { NewGameModal } from '../../../components/new-game-modal';
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
