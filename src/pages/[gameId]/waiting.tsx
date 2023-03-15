import { Center } from '@chakra-ui/react';
import { AlienTaken } from '../../components/images/alien-taken';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import Header from '../../components/headers/header';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';

export default function Waiting() {
  return (
    <MainPageWrapper>
      <Header mb={14} alignSelf="center">
        Getting Ready
      </Header>
      <Center flexDirection="column">
        <AlienTaken />
        <SubHeader mt={6} mb={2}>
          Don&apos;t worry Quirky Owls, the quiz will start in a few moments.
        </SubHeader>
        <SubTitle>Grab a drink in the meantime!</SubTitle>
      </Center>
    </MainPageWrapper>
  );
}