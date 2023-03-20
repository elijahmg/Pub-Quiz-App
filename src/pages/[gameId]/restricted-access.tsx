import { Center } from '@chakra-ui/react';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { Denied } from '../../components/images/denied';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';

const RestrictedAccess = () => {
  return (
    <Center flexDirection="column">
      <Denied />
      <SubHeader mt={14} mb={2}>
        Looks like the quiz has already started.
      </SubHeader>
      <SubTitle>Sorry about that, but good luck next time!</SubTitle>
    </Center>
  );
};

RestrictedAccess.getLayout = function getLayout(
  pageContent: React.ReactElement,
) {
  return (
    <MainPageWrapper header="Restricted Access">{pageContent}</MainPageWrapper>
  );
};

export default RestrictedAccess;
