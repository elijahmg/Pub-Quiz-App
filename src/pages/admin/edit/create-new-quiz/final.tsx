import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import SubHeader from '../../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../../components/wrappers/admin-creator-wrapper';
import { ROUNDS } from '../../../../../mock-data';
import { useRouter } from 'next/router';
import PrimaryButton from '../../../../components/buttons/primary-button';

const Rounds = () => {
  const router = useRouter();

  const handlePrevious = () => {
    router.back();
  };

  const handleCreate = () => {
    router.push('questions');
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Creating a new quiz
      </Heading>
      <SubHeader>Final check & create</SubHeader>
      <Flex gap={2} mt="auto" alignSelf="end">
        <Button
          size="lg"
          variant="outline"
          borderColor="secondary.100"
          color="secondary.100"
          leftIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
        >
          Previous step
        </Button>
        <PrimaryButton size="lg" onClick={handleCreate}>
          Create quiz
        </PrimaryButton>
      </Flex>
    </Flex>
  );
};

Rounds.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <AdminCreatorWrapper minHeight="100vh">{pageContent}</AdminCreatorWrapper>
  );
};

export default Rounds;
