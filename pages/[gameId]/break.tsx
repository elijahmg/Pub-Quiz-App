import { Center, Flex } from '@chakra-ui/react';
import Header from '../../components/headers/Header';
import SubHeader from '../../components/headers/SubHeader';
import SubTitle from '../../components/headers/SubTitle';
import { Alcoholism } from '../../components/images/alcoholism';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';

export default function Break() {
  return (
    <MainPageWrapper>
      <Header textAlign="center" mb={10}>
        Checking answers
      </Header>
      <Center flexDirection="column">
        <Flex justifyContent="center" width="100%">
          <Alcoholism />
        </Flex>
        <SubHeader mt={6} mb={2}>
          Time for a break.
        </SubHeader>
        <SubTitle>
          Your quizmasters is checking your answers. In the meantime, have a
          chat and/or drink, we don’t judge :)
        </SubTitle>
      </Center>
    </MainPageWrapper>
  );
}
