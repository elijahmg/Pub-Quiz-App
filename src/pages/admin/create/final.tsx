import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useCreatorStorage from '../../../hooks/use-creator-storage';
import SubHeader from '../../../components/headers/sub-header';
import CreatorQuestion from '../../../components/creator-question';
import SecondaryButton from '../../../components/buttons/secondary-button';
import PrimaryButton from '../../../components/buttons/primary-button';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';
import CSRWrapper from '../../../components/csr-wrapper';

const Rounds = () => {
  const router = useRouter();

  const { data } = useCreatorStorage();

  const { name, password, pin, rounds } = data;

  const handlePrevious = () => {
    router.push('questions');
  };

  const handleCreate = () => {
    console.log(data);
    router.push('success');
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Creating a new quiz
      </Heading>
      <SubHeader>Final check & create</SubHeader>
      <SubHeader size="md">Main info</SubHeader>
      <Text>Quiz name</Text>
      <Input value={name} isReadOnly />
      <Text>Quiz password</Text>
      <Input value={password} isReadOnly />
      <Text>Quiz PIN</Text>
      <Input value={pin} isReadOnly />
      <CSRWrapper>
        {rounds?.length && (
          <Accordion>
            {rounds.map((round, i) => (
              <AccordionItem key={round.name}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {`Round ${i + 1} Questions`}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>Name of this round</Text>
                  <Input value={round.name} isReadOnly />
                  {round.questions?.map((question, i) => (
                    <CreatorQuestion
                      key={question.content}
                      title={`Question ${i + 1}`}
                      question={question}
                      isReadOnly
                    />
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CSRWrapper>
      <Flex gap={2} mt="auto" alignSelf="end">
        <SecondaryButton
          borderColor="secondary.100"
          color="secondary.100"
          leftIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
        >
          Previous step
        </SecondaryButton>
        <PrimaryButton onClick={handleCreate}>Create quiz</PrimaryButton>
      </Flex>
    </Flex>
  );
};

Rounds.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <AdminCreatorWrapper>{pageContent}</AdminCreatorWrapper>;
};

export default Rounds;
