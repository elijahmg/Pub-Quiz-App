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
        <Heading>Now enter your name please…</Heading>
        <FormControl id="first-name" isInvalid={buttonStatus}>
          <Input
            placeholder="Your Name"
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
