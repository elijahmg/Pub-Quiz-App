import type { Props as WrapperProps } from './wrapper';
import { ReactNode } from 'react';
import { ADMIN_EDIT_ROUTE_LIST } from '../../../constants';
import { AdminQuizManageWrapper } from './admin-quiz-manage-wrapper';
import {
  AdminQuizManageContextWrapper,
  useAdminQuizManageContext,
} from '../contexts/admin-quiz-manage-context';
import { Formik } from 'formik';

export interface Props extends WrapperProps {
  children: ReactNode;
}

export function AdminEditorWrapper({ children, ...props }: Props) {
  const { quizData } = useAdminQuizManageContext();

  return (
    <Formik
      initialValues={quizData}
      onSubmit={(_values, actions) => {
        actions.setSubmitting(false);
      }}
    >
      <AdminQuizManageWrapper routeList={ADMIN_EDIT_ROUTE_LIST} {...props}>
        <AdminQuizManageContextWrapper>
          {children}
        </AdminQuizManageContextWrapper>
      </AdminQuizManageWrapper>
    </Formik>
  );
}
