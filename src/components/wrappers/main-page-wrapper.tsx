import { ReactNode } from 'react';
import { Wrapper } from './wrapper';
import type { Props as WrapperProps } from './wrapper';
import Header from '../headers/header';
import Blobs1 from '../images/blobs-1';
import Blobs2 from '../images/blobs-2';
import Blobs3 from '../images/blobs-3';

type BlobVariant = 1 | 2 | 3;

interface Props extends WrapperProps {
  children: ReactNode;
  header?: ReactNode;
  blobVariant?: BlobVariant;
}

function getBlobs(variant: BlobVariant) {
  switch (variant) {
    case 1:
    default:
      return Blobs1;
    case 2:
      return Blobs2;
    case 3:
      return Blobs3;
  }
}

export function MainPageWrapper({
  children,
  header,
  blobVariant = 1,
  ...props
}: Props) {
  const BlobsComponent = getBlobs(blobVariant);

  return (
    <>
      <BlobsComponent position="absolute" top={0} />
      <Wrapper justifyContent="center" {...props}>
        {header ? <Header mb={10}>{header}</Header> : null}
        {children}
      </Wrapper>
    </>
  );
}
