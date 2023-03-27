import { Box, BoxProps } from '@chakra-ui/react';

interface LineProps extends BoxProps {
  isCompleted?: boolean;
}

export default function StepsLine({
  isCompleted = false,
  ...props
}: LineProps) {
  return (
    <Box
      justifySelf="center"
      alignSelf="stretch"
      bgColor={isCompleted ? 'green.100' : 'secondary.100'}
      width="2px"
      {...props}
    />
  );
}
