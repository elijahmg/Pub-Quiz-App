import { Center, Flex, Stack } from '@chakra-ui/react';
import Question from '../../components/Question';
import TeamName from '../../components/TeamName';
import Constants from '../../constants';

export default function Overview({
  name,
  questions,
}: {
  name: string;
  questions: Array<{ id: string; content: string; answer: string }>;
}) {
  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <Flex justifyContent="flex-start">
          <TeamName name="Dummy Team" />
          <Stack>
            {questions.map(({ id, content, answer }, idx) => {
              return (
                <Question
                  key={id}
                  question={content}
                  handleAnswer={(answer) => {
                    questions[idx] = {
                      ...questions[idx],
                      answer,
                    };
                  }}
                />
              );
            })}
          </Stack>
        </Flex>
      </Stack>
    </Center>
  );
}
