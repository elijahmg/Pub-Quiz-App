import { Text, Stack, Image, Center } from '@chakra-ui/react';
import { AlienTaken } from '../../components/images/alien-taken';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import Header from '../../components/headers/Header';
import SubHeader from '../../components/headers/SubHeader';
import SubTitle from '../../components/headers/SubTitle';

export default function Waiting() {
  return (
    <MainPageWrapper>
      <Header mb={14} alignSelf="center">
        Getting Ready
      </Header>
      <AlienTaken />
      <SubHeader mt={6} mb={2}>
        Don&apos;t worry Quirky Owls, the quiz will start in a few moments.
      </SubHeader>
      <SubTitle>Grab a drink in the meantime!</SubTitle>
    </MainPageWrapper>
  );
}
