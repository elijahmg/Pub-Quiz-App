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

const BASE_ROUTE = '/admin/edit/create-new-quiz';

const ROUTE_LIST = [
  `${BASE_ROUTE}`,
  `${BASE_ROUTE}/rounds`,
  `${BASE_ROUTE}/questions`,
  `${BASE_ROUTE}/final`,
];

export interface Props extends WrapperProps {
  children: ReactNode;
}

export function AdminCreatorWrapper({ children, ...props }: Props) {
  const router = useRouter();

  const activeStep = STEPS[ROUTE_LIST.indexOf(router.route)];

  const steps = STEPS.map((step, i) => ({
    ...step,
    onClick: () => router.push(ROUTE_LIST[i]),
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
      <Wrapper {...props}>{children}</Wrapper>
    </Grid>
  );
}
