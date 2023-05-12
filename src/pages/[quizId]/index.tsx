import React, { useState, useEffect } from 'react';
import { FormControl, Heading, Input } from '@chakra-ui/react';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import PrimaryButton from '../../components/buttons/primary-button';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trcp';
import { useQuizDataStore } from '../../state/quiz-data.state';

const Welcome = (): JSX.Element => {
  const router = useRouter();

  const [teamName, setTeamName] = useState<string>(``);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>(`Enter your name`);

  const { id } = useQuizDataStore((state) => state.quizData);

  const { mutate: createTeam } = trpc.team.createTeam.useMutation({
    onSuccess: () => null,
  });

  useEffect(() => {
    const isTeamNameInvalid = teamName.length < 2 || teamName.length > 32;

    setIsButtonDisabled(isTeamNameInvalid);

    if (isTeamNameInvalid) {
      setErrorMessage(`Pleaaaase enter your team name`);
    }
  }, [teamName, isButtonDisabled]);

  async function onSubmitHandler() {
    if (!id) {
      throw new Error('Quiz has not been created');
    }

    await createTeam({
      name: teamName,
      quizId: id,
    });

    router.push(`/${id}/waiting`);
  }

  return (
    <>
      <SubHeader mb={2}>How about we add your team name?</SubHeader>
      <SubTitle mb={10}>
        You can name your team however you want. important thing is to have fun
      </SubTitle>
      <FormControl
        id="first-name"
        onSubmit={() => router.push(`/${id}/waiting`)}
      >
        <Heading as="h3" mb={4}>
          Team name
        </Heading>
        <Input
          placeholder="Your awesome team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </FormControl>
      <PrimaryButton
        isDisabled={isButtonDisabled}
        mt={4}
        onClick={onSubmitHandler}
      >
        {isButtonDisabled ? errorMessage : 'Submit'}
      </PrimaryButton>
    </>
  );
};

Welcome.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <MainPageWrapper header="Welcome">{pageContent}</MainPageWrapper>;
};

export default Welcome;
