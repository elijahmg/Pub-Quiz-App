import * as React from 'react';
import { FormControl, Heading, Input, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import Header from '../../components/headers/Header';
import SubHeader from '../../components/headers/SubHeader';
import SubTitle from '../../components/headers/SubTitle';
import DummyPeople from '../../components/images/dummy-people';
import PrimaryButton from '../../components/buttons/PrimaryButton';

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
    <Flex flexDirection="column" p={6} height="100vh">
      <Header textAlign="center" my={8}>
        Welcome
      </Header>
      <SubHeader>How about we add your team name?</SubHeader>
      <SubTitle mb={6}>
        You can name your team however you want. important thing is to have fun
      </SubTitle>
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
      <PrimaryButton isDisabled={buttonStatus} mt={4}>
        {buttonStatus ? errorMessage : 'Submit'}
      </PrimaryButton>
    </Flex>
  );
};
export default Welcome;
