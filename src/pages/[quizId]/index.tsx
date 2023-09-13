import React, { useState, ChangeEvent } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import PrimaryButton from '../../components/buttons/primary-button';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trcp';
import { useTeamQuizDataStore } from '../../state/team/team-quiz-data.state';
import { MAX_TEAM_NAME_LENGTH, MIN_TEAM_NAME_LENGTH } from '../../../constants';
import { Team } from '.prisma/client';
import useResponseToast from '../../hooks/use-response-toast';

enum FormError {
  UNDEFINED = 'undefined',
  TOO_SHORT = 'tooShort',
  TOO_LONG = 'tooLong',
}

const ERROR_MESSAGES = {
  undefined: "Please choose your team's name",
  tooShort: "The team's name must be at least 2 characters long",
  tooLong: "The team's name can't be more than 20 characters long",
};

const Quiz = () => {
  const router = useRouter();

  const { handleTRPCError } = useResponseToast();

  const [teamName, setTeamName] = useState<string>(``);

  const [error, setError] = useState<FormError | undefined>();

  const handleTeamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);

    if (error) setError(undefined);
  };

  const {
    quizData: { id },
    setTeamData,
  } = useTeamQuizDataStore((state) => ({
    quizData: state.quizData,
    setTeamData: state.setTeamData,
    teamId: state.teamData.id,
  }));

  const onSuccessfullyCreatedTeam = (teamData: Team) => {
    setTeamData(teamData);
    router.push(`/${id}/waiting`);
  };

  const { mutate: createTeam } = trpc.team.createTeam.useMutation({
    onSuccess: onSuccessfullyCreatedTeam,
    onError: handleTRPCError,
  });

  const handleSubmit = async () => {
    if (!teamName) {
      setError(FormError.UNDEFINED);
      return;
    }

    if (teamName.length < MIN_TEAM_NAME_LENGTH) {
      setError(FormError.TOO_SHORT);
      return;
    }

    if (teamName.length > MAX_TEAM_NAME_LENGTH) {
      setError(FormError.TOO_LONG);
      return;
    }

    if (!id) {
      throw new Error('Quiz has not been created');
    }

    await createTeam({ name: teamName, quizId: id });
  };

  return (
    <>
      <Stack>
        <SubHeader textAlign="left">How about we add your team name?</SubHeader>
        <SubTitle textAlign="left">
          You can name your team however you want, important thing is to have
          fun.
        </SubTitle>
      </Stack>
      <Stack>
        <FormControl onSubmit={handleSubmit} isInvalid={!!error} isRequired>
          <FormLabel>
            <Heading as="h3" size="md" display="inline">
              Team name
            </Heading>
          </FormLabel>
          <Input
            placeholder="Your awesome team name"
            value={teamName}
            onChange={handleTeamNameChange}
          />
          <FormErrorMessage>{error && ERROR_MESSAGES[error]}</FormErrorMessage>
        </FormControl>
        <PrimaryButton
          testId="SubmitTeamName_Button"
          isDisabled={!!error}
          onClick={handleSubmit}
        >
          Submit
        </PrimaryButton>
      </Stack>
    </>
  );
};

Quiz.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <MainPageWrapper header="Welcome">{pageContent}</MainPageWrapper>;
};

export default Quiz;
