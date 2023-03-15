import { Center } from '@chakra-ui/react';
import Header from '../../components/headers/header';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { Denied } from '../../components/images/denied';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';

export default function RestrictedAccess() {
  return (
    <MainPageWrapper>
      <Header mb={14} alignSelf="center">
        Restricted Access
      </Header>
      <Center flexDirection="column">
        <Denied />
        <SubHeader mt={14} mb={2}>
          Looks like the quiz has already started.
        </SubHeader>
        <SubTitle>Sorry about that, but good luck next time!</SubTitle>
      </Center>
    </MainPageWrapper>
  );
}
