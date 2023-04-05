import { ChangeEvent, ReactElement, useState } from 'react';
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
import { useUserStore } from '../../components/stores/user-store';

enum Error {
  UNDEFINED = 'undefined',
  TOO_SHORT = 'tooShort',
  TOO_LONG = 'tooLong',
}

const ERROR_MESSAGES = {
  undefined: "Please choose your team's name",
  tooShort: "The team's name must be atleast 2 characters long",
  tooLong: "The team's name can't be more than 20 characters long",
};

const MIN_TEAM_NAME_LENGTH = 2;
const MAX_TEAM_NAME_LENGTH = 20;

const Welcome = () => {
  const router = useRouter();

  const userStore = useUserStore(({ setTeam }) => ({ setTeam }));

  const [teamName, setTeamName] = useState('');

  const [error, setError] = useState<Error | undefined>();

  const handleTeamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);

    if (error) setError(undefined);
  };

  function handleSubmit() {
    if (!teamName) {
      setError(Error.UNDEFINED);
      return;
    }

    if (teamName.length < MIN_TEAM_NAME_LENGTH) {
      setError(Error.TOO_SHORT);
      return;
    }

    if (teamName.length > MAX_TEAM_NAME_LENGTH) {
      setError(Error.TOO_LONG);
      return;
    }

    userStore.setTeam({ id: 1, name: teamName });

    router.push({ pathname: '[gameId]/waiting', query: router.query });
  }

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
        <PrimaryButton isDisabled={!!error} onClick={handleSubmit}>
          Submit
        </PrimaryButton>
      </Stack>
    </>
  );
};

Welcome.getLayout = function getLayout(pageContent: ReactElement) {
  return (
    <MainPageWrapper header="Welcome" spacing={10}>
      {pageContent}
    </MainPageWrapper>
  );
};

export default Welcome;
