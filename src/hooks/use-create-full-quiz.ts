import { useAdminQuizManageContext } from '../components/contexts/admin-quiz-manage-context';
import { trpc } from '../utils/trcp';
import { Game, GameStatus, Topic } from '@prisma/client';
import { Question } from '../../types';

/**
 * Order of function calls
 * 1. Create a game
 * 2. Create topics
 * 3. Get topics
 * 3. Create questions
 * 4. Get questions
 * 5. Create game status
 * 6. Update game
 *
 *
 * @param onQuizCreationSuccess
 */
export function useCreateFullQuiz(onQuizCreationSuccess: () => void) {
  const { quizData } = useAdminQuizManageContext();

  // 1. First create quiz with main information (name, password, pim etc...)
  const {
    mutate: createQuiz,
    data: createdQuiz,
    isSuccess: isQuizCreatedSuccessfully,
  } = trpc.admin.createQuiz.useMutation({
    onSuccess: (data) => handleCreateTopics(data),
  });

  /**-------Topics creation--------**/

  // 2. Create topics/rounds [TRPC]
  const { mutate: creteTopics, isSuccess: isTopicsCreatedSuccessfully } =
    trpc.admin.createTopics.useMutation();

  // 2. Create topics/rounds [creation handler]
  const handleCreateTopics = async (createdQuiz: Game) => {
    const { rounds } = quizData;

    const roundNames = rounds.map((round) => round.name);
    console.log('Create topics');

    // quiz must exist at this point
    await creteTopics({
      rounds: roundNames,
      gameId: createdQuiz!.id,
    });
  };

  /**-------Get topics--------**/

  // 3. Get topics after successfully creating topics [TRPC]
  const { data: topics, isSuccess: isGetTopicSuccessfully } =
    trpc.admin.getTopics.useQuery(
      {
        gameId: createdQuiz?.id || -1,
      },
      {
        enabled: isTopicsCreatedSuccessfully && isQuizCreatedSuccessfully,
        onSuccess: (data) => handleCreateQuestions(data),
      },
    );

  /**-------Questions creation--------**/

  // 4. Create questions [TRPC]
  const { mutate: createQuestions, isSuccess: isQuestionsCreatedSuccessfully } =
    trpc.admin.createQuestions.useMutation();

  // 4. Create questions [Creation handler]
  const handleCreateQuestions = async (createdTopics: Topic[]) => {
    const { rounds } = quizData;

    const parsedQuestions = rounds.reduce(
      (acc, round) => {
        const topic = createdTopics!.find((topic) => topic.name === round.name);

        round.questions.forEach((question) => {
          acc.push({
            topicId: topic!.id,
            mediaURL: question.mediaURL,
            answer: question.answer,
            content: question.content,
            mediaType: question.mediaType,
          } as Omit<Question, 'id'> & {
            topicId: number;
          });
        });

        return acc;
      },
      [] as Array<
        Omit<Question, 'id'> & {
          topicId: number;
        }
      >,
    );

    await createQuestions(parsedQuestions);
  };

  /**-------Get questions--------**/

  console.log({
    cond:
      isQuestionsCreatedSuccessfully &&
      isTopicsCreatedSuccessfully &&
      isGetTopicSuccessfully &&
      isQuizCreatedSuccessfully,
  });

  // 5. Get questions after successfully creating topics [TRPC]
  trpc.admin.getQuestions.useQuery(
    {
      topicId: topics?.[0]?.id || -1,
    },
    {
      enabled:
        isQuestionsCreatedSuccessfully &&
        isTopicsCreatedSuccessfully &&
        isGetTopicSuccessfully &&
        isQuizCreatedSuccessfully,
      // parse is needed because of how prisma handles enums
      onSuccess: (data) => handleCreateGameStatus(data as Question[]),
    },
  );

  /**-------Game status creation--------**/

  // 6. Create game status [TRPC]
  const { mutate: createGameStatus } = trpc.admin.createGameStatus.useMutation({
    onSuccess: (data) => handleEditGame(data),
  });

  // 6. Create game status [creation handler]
  const handleCreateGameStatus = async (questions: Question[]) => {
    await createGameStatus({
      currentQuestionId: questions![0].id,
    });
  };

  /**-------Edit game--------**/

  // 7. Edit game [TRPC]
  const { mutate: updateGameWithGameStatusId } =
    trpc.admin.updateGameWithGameStatusId.useMutation({
      onSuccess: onQuizCreationSuccess,
    });

  // 7. Edit game [creation handle]
  const handleEditGame = async (gameStatus: GameStatus) => {
    await updateGameWithGameStatusId({
      gameId: createdQuiz!.id,
      gameStatusId: gameStatus.id,
    });
  };

  return async () => {
    const { pin, password, name } = quizData;

    await createQuiz({
      name,
      password,
      pin,
    });
  };
}
