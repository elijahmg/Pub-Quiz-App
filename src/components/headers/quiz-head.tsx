import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { useUserStore } from '../stores/user-store';

export default function QuizHead() {
  const userStore = useUserStore(({ team, roundIndex }) => ({
    team,
    roundIndex,
  }));

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text as="b">{userStore.team?.name}</Text>
        <Badge
          borderRadius={6}
          px={2}
          py={1}
          textTransform="none"
          fontWeight={400}
        >
          Round {userStore.roundIndex + 1}
        </Badge>
      </Flex>
    </Box>
  );
}
