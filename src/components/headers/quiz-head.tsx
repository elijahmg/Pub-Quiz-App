import { Badge, Box, Flex, Text } from '@chakra-ui/react';

interface QuizHeadProps {
  teamName: string;
  round: string;
}

export default function QuizHead({ teamName, round }: QuizHeadProps) {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box pb={4}>
          <Text as="b">{teamName}</Text>
        </Box>
        <Box pb={4}>
          <Badge
            borderRadius={6}
            px={2}
            py={1}
            textTransform="none"
            fontWeight={400}
          >
            Round {round}
          </Badge>
        </Box>
      </Flex>
    </Box>
  );
}
