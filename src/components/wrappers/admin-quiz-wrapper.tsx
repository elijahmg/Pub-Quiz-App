import { ReactNode } from 'react';
import { Props as WrapperProps, Wrapper } from './wrapper';
import { Grid, Tag } from '@chakra-ui/react';
import SubHeader from '../headers/sub-header';
import SubTitle from '../headers/sub-title';
import { useAdminQuizDataState } from '../../state/admin/admin-quiz-data.state';

interface Props extends WrapperProps {
  children: ReactNode;
}

export default function AdminQuizWrapper({ children, ...props }: Props) {
  const { quizData } = useAdminQuizDataState((state) => ({
    quizData: state.quizData,
  }));

  // @TODO teams

  return (
    <Wrapper minHeight="100vh" px={48} {...props}>
      <Grid
        templateColumns="1fr auto"
        templateRows="1fr 1fr"
        alignItems="center"
      >
        <SubHeader>{quizData.name}</SubHeader>
        <Tag gridRow="span 2">{`Teams online: ${56666}`}</Tag>
        <SubTitle>{`PIN: ${quizData.pin}`}</SubTitle>
      </Grid>
      {children}
    </Wrapper>
  );
}
