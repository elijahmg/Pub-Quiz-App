import { ReactNode } from 'react';
import { Blobs, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../images/blobs';
import { Wrapper } from './wrapper';
import type { Props as WrapperProps } from './wrapper';

interface Props extends WrapperProps {
  children: ReactNode;
}

export function MainPageWrapper({ children, ...props }: Props) {
  return (
    <>
      <Blobs
        position="absolute"
        top={0}
        width={{ base: DEFAULT_WIDTH, md: 'auto' }}
        height={{ base: DEFAULT_HEIGHT, md: '20%' }}
      />
      <Wrapper {...props}>{children}</Wrapper>
    </>
  );
}
