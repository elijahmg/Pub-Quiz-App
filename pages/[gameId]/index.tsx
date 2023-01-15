import * as React from 'react';
import { FormControl, Heading, Input, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import Header from '../../components/headers/Header';
import SubHeader from '../../components/headers/SubHeader';
import SubTitle from '../../components/headers/SubTitle';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { MainPageWrapper } from '../../components/main-page-wrapper';
import { useRouter } from 'next/router';

const Welcome = (): JSX.Element => {
  const router = useRouter();

  const [value, setValue] = React.useState<string>(``);
  const [buttonStatus, setButtonStatus] = React.useState<boolean>(true);
  const [errorMessage, setErrorMessage] =
    React.useState<string>(`Enter your name`);

  useEffect(() => {
    if (value.length >= 2 && value.length <= 20) {
      setButtonStatus(false);
    } else {
      setButtonStatus(true);
      setErrorMessage(`Pleaaaase enter your team name`);
    }
  }, [value, buttonStatus]);

  function onSubmitHandler() {
    router.push(`/3/waiting`);
  }

  return (
    <MainPageWrapper>
      <Header textAlign="center" mb={10}>
        Welcome
      </Header>
      <SubHeader mb={2}>How about we add your team name?</SubHeader>
      <SubTitle mb={10}>
        You can name your team however you want. important thing is to have fun
      </SubTitle>
      <FormControl
        id="first-name"
        onSubmit={() => {
          console.log('Submi');
          router.push(`/3/waiting`);
        }}
      >
        <Heading as="h3" mb={4}>
          Team name
        </Heading>
        <Input
          placeholder="Your awesome team name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormControl>
      <PrimaryButton isDisabled={buttonStatus} mt={4} onClick={onSubmitHandler}>
        {buttonStatus ? errorMessage : 'Submit'}
      </PrimaryButton>
    </MainPageWrapper>
  );
};
export default Welcome;
