import * as React from 'react';
import {
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import Header from '../../components/headers/Header';
import SubHeader from '../../components/headers/SubHeader';
import SubTitle from '../../components/headers/SubTitle';

const Welcome = (): JSX.Element => {
  const [value, setValue] = React.useState<string>(``);
  const [buttonStatus, setButtonStatus] = React.useState<boolean>(true);
  const [errorMessage, setErrorMessage] =
    React.useState<string>(`Enter your name`);

  useEffect(() => {
    if (value.length >= 2 && value.length <= 20) {
      setButtonStatus(false);
    } else {
      setButtonStatus(true);
      setErrorMessage(`Invalid Name`);
    }
  }, [value, buttonStatus]);

  return (
    <Center h={`100vh`} p={`20px`}>
      <Stack spacing={8}>
        <Header label="Welcome" />
        <SubHeader label="How about we add your team name?" />
        <SubTitle
          label="You can name your team however you want. important thing is to have
          fun"
        />
        <FormControl id="first-name" isInvalid={buttonStatus}>
          <Heading as="h3" mb={4}>
            Team name
          </Heading>
          <Input
            placeholder="Your awesome team name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormControl>
        <Button isDisabled={buttonStatus}>
          {buttonStatus ? errorMessage : 'Submit'}
        </Button>
      </Stack>
    </Center>
  );
};
export default Welcome;
