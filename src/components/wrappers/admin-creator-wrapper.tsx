import type { Props as WrapperProps } from './wrapper';
import { ReactNode } from 'react';
import { ADMIN_CREATE_ROUTE_LIST } from '../../../constants';
import { AdminQuizManageWrapper } from './admin-quiz-manage-wrapper';
import { AdminQuizManageProvider } from '../contexts/admin-quiz-manage-context';

export interface Props extends WrapperProps {
  children: ReactNode;
}

export function AdminCreatorWrapper({ children, ...props }: Props) {
  return (
    <AdminQuizManageWrapper routeList={ADMIN_CREATE_ROUTE_LIST} {...props}>
      <AdminQuizManageProvider>{children}</AdminQuizManageProvider>
    </AdminQuizManageWrapper>
  );
}
