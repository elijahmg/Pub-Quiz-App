import { Progress, Center, Stack, Heading } from '@chakra-ui/react';
import Question from '../../components/Question';
import TeamName from '../../components/TeamName';
import Constants from '../../constants';

function Play() {
  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <TeamName name="Dummy Team" />

        <Question
          question="WTF?!"
          handleAnswer={(answer: string) => {
            // send answer to admin
          }}
        />

        <Progress size="lg" value={50} />
      </Stack>
    </Center>
  );
}

export default Play;
