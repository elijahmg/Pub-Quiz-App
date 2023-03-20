import { ReactNode } from 'react';
import { Blobs } from '../images/blobs';
import { Wrapper } from './wrapper';
import type { Props as WrapperProps } from './wrapper';
import Header from '../headers/header';

interface Props extends WrapperProps {
  children: ReactNode;
  header?: ReactNode;
}

export function MainPageWrapper({ children, header, ...props }: Props) {
  return (
    <>
      <Blobs position="absolute" top={0} />
      <Wrapper justifyContent="center" {...props}>
        {header ? <Header mb={10}>{header}</Header> : null}
        {children}
      </Wrapper>
    </>
  );
}
