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

const ROUTE_TO_STEPS: Record<string, string> = {
  '/admin/edit/create-new-quiz': 'main',
  '/admin/edit/create-new-quiz/rounds': 'rounds',
  '/admin/edit/create-new-quiz/questions': 'questions',
  '/admin/edit/create-new-quiz/final': 'final',
};

export interface Props extends WrapperProps {
  children: ReactNode;
}

export function AdminCreatorWrapper({ children, ...props }: Props) {
  const router = useRouter();

  const activeStepValue = ROUTE_TO_STEPS[router.route];

  return (
    <Grid templateColumns={{ base: '50% 1fr', md: '33% 1fr' }}>
      <Grid autoFlow="column" templateRows="1fr auto" bgColor="gray.100">
        <Steps
          itemList={STEPS}
          activeItemValue={activeStepValue}
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
