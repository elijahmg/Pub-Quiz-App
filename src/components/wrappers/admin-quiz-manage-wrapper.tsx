import { Wrapper } from './wrapper';
import type { Props as WrapperProps } from './wrapper';
import Blobs3 from '../images/blobs-3';
import { ReactNode } from 'react';
import { Grid } from '@chakra-ui/react';
import Steps from '../steps';
import { useRouter } from 'next/router';

const STEPS = [
  { value: 'main', label: 'Main info' },
  { value: 'rounds', label: 'Rounds' },
  { value: 'questions', label: 'Questions' },
  { value: 'final', label: 'Final check & create' },
];

export interface Props extends WrapperProps {
  children: ReactNode;
  routeList: string[];
}

export function AdminQuizManageWrapper({
  children,
  routeList,
  ...props
}: Props) {
  const router = useRouter();

  const activeStep = STEPS[routeList.indexOf(router.route)];

  const steps = STEPS.map((step, i) => ({
    ...step,
    onClick: () => router.push({ pathname: routeList[i], query: router.query }),
  }));

  return (
    <Grid templateColumns={{ base: '50% 1fr', md: '33% 1fr' }}>
      <Grid autoFlow="column" templateRows="1fr auto" bgColor="gray.100">
        <Steps
          itemList={steps}
          activeItemValue={activeStep?.value}
          justifySelf="center"
          pt={16}
          px={8}
        />
        <Blobs3 width="auto" />
      </Grid>
      <Wrapper height="100vh" {...props}>
        {children}
      </Wrapper>
    </Grid>
  );
}
