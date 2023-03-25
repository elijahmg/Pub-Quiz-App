import { Flex } from '@chakra-ui/react';
import { AdminEditorWrapper } from '../../../../components/wrappers/admin-editor-wrapper';

const EditQuiz = () => {
  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <div>TODO edit mode</div>
    </Flex>
  );
};

EditQuiz.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <AdminEditorWrapper>{pageContent}</AdminEditorWrapper>;
};

export default EditQuiz;
