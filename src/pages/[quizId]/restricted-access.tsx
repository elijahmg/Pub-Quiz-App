import { Center, Stack } from '@chakra-ui/react';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { Denied } from '../../components/images/denied';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';

const RestrictedAccess = () => {
  return (
    <Stack as={Center} spacing={6}>
      <Denied />
      <Stack>
        <SubHeader>Looks like the quiz has already started.</SubHeader>
        <SubTitle>Sorry about that, but good luck next time!</SubTitle>
      </Stack>
    </Stack>
  );
};

RestrictedAccess.getLayout = function getLayout(
  pageContent: React.ReactElement,
) {
  return (
    <MainPageWrapper header="Restricted Access" spacing={14}>
      {pageContent}
    </MainPageWrapper>
  );
};

export default RestrictedAccess;
