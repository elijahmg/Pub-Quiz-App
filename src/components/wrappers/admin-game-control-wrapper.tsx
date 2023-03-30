import { ReactNode } from 'react';
import { Props as WrapperProps } from './wrapper';
import AdminQuizWrapper from './admin-quiz-wrapper';
import Blobs3 from '../images/blobs-3';
import { Stack } from '@chakra-ui/react';
import { STACK_SPACING } from '../../../constants';

interface Props extends WrapperProps {
  children: ReactNode;
}

export default function AdminGameControlWrapper({ children, ...props }: Props) {
  return (
    <>
      <Blobs3 position="absolute" bottom={0} zIndex={-1} />
      <Blobs3
        position="absolute"
        bottom={0}
        right={0}
        zIndex={-1}
        transform="scaleX(-1)"
      />
      <AdminQuizWrapper {...props}>
        <Stack spacing={STACK_SPACING}>{children}</Stack>
      </AdminQuizWrapper>
    </>
  );
}
