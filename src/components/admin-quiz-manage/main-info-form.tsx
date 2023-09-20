import {
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import { ChangeEvent } from 'react';
import { StoreQuiz } from '../../../types';
import { getCombinedFunction } from '../../utils/common';

interface Props extends FlexProps {
  quizData: StoreQuiz;
  onQuizDataChange: (quizData: StoreQuiz) => void;
}

export default function AdminQuizManageMainInfoForm({
  quizData,
  onQuizDataChange,
  ...props
}: Props) {
  const { errors, touched } = useFormikContext<StoreQuiz>();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuizDataChange({ ...quizData, name: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuizDataChange({ ...quizData, password: e.target.value });
  };

  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuizDataChange({ ...quizData, pin: e.target.value });
  };

  const validateName = (value: StoreQuiz['name']) => {
    if (!value) {
      return 'This field is required';
    }
  };

  const validatePassword = (value: StoreQuiz['password']) => {
    if (!value) {
      return 'This field is required';
    }

    if (value.length < 4 || value.length > 8) {
      return 'Password must have at between 4 and 8 characters';
    }
  };

  const validatePin = (value: StoreQuiz['pin']) => {
    if (!value) {
      return 'This field is required';
    }

    if (value.length !== 4) {
      return 'PIN must have 4 characters';
    }
  };

  return (
    <Form>
      <Flex direction="column" gap={4} {...props}>
        <Field name="name" validate={validateName}>
          {({
            field: { onChange, ...field },
          }: FieldProps<StoreQuiz['name'], StoreQuiz>) => (
            <FormControl isInvalid={!!(errors.name && touched.name)}>
              <FormLabel>Please name your quiz</FormLabel>
              <Input
                data-testid="AdminQuizMainInfoName_InputField"
                {...field}
                placeholder="E.g.: I hate Mondays"
                onChange={getCombinedFunction(onChange, handleNameChange)}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="password" validate={validatePassword}>
          {({
            field: { onChange, ...field },
          }: FieldProps<StoreQuiz['password'], StoreQuiz>) => (
            <FormControl isInvalid={!!(errors.password && touched.password)}>
              <FormLabel>Add the password</FormLabel>
              <Input
                data-testid="AdminQuizMainInfoPassword_InputField"
                {...field}
                placeholder="E.g.: AmazingQuiz1!"
                onChange={getCombinedFunction(onChange, handlePasswordChange)}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="pin" validate={validatePin}>
          {({
            field: { onChange, ...field },
          }: FieldProps<StoreQuiz['pin'], StoreQuiz>) => (
            <FormControl isInvalid={!!(errors.pin && touched.pin)}>
              <FormLabel>Add the PIN</FormLabel>
              <Input
                data-testid="AdminQuizMainInfoPIN_InputField"
                {...field}
                placeholder="E.g.: 1234"
                onChange={getCombinedFunction(onChange, handlePinChange)}
              />
              <FormErrorMessage>{errors.pin}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
    </Form>
  );
}
