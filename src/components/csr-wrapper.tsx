import { ReactNode, useEffect, useState } from 'react';
import { isCSR } from '../utils/common';

interface Props {
  children?: ReactNode;
}

// Render children only on client side (no SSR)
export default function CSRWrapper({ children }: Props) {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(isCSR());
  }, []);

  return <>{canRender ? children ?? null : null}</>;
}
