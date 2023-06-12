import { useAdminQuizManageContext } from '../components/contexts/admin-quiz-manage-context';
import { trpc } from '../utils/trcp';
import { Quiz, QuizStatus, Round } from '@prisma/client';
import { Question } from '.prisma/client';
import useResponseToast from './use-response-toast';

/**
 * Order of function calls
 * 1. Create a quiz
 * 2. Create rounds
 * 3. Get rounds
 * 3. Create questions
 * 4. Get questions
 * 5. Create quiz status
 * 6. Update quiz
 *
 *
 * @param onQuizCreationSuccess
 */
export function useCreateFullQuiz(onQuizCreationSuccess: () => void) {
  const { quizData } = useAdminQuizManageContext();

  const { handleTRPCError } = useResponseToast();

  // 1. First create quiz with main information (name, password, pim etc...)
  const {
    mutate: createQuiz,
    data: createdQuiz,
    isSuccess: isQuizCreatedSuccessfully,
  } = trpc.admin.createQuiz.useMutation({
    onSuccess: (data) => handleCreateRounds(data),
    onError: handleTRPCError,
  });

  /**-------Rounds creation--------**/

  // 2. Create rounds/rounds [TRPC]
  const { mutate: creteRounds, isSuccess: isRoundsCreatedSuccessfully } =
    trpc.admin.createRounds.useMutation({ onError: handleTRPCError });

  // 2. Create rounds/rounds [creation handler]
  const handleCreateRounds = async (createdQuiz: Quiz) => {
    const { rounds } = quizData;

    const roundNames = rounds.map((round) => round.name);

    // quiz must exist at this point
    await creteRounds({
      rounds: roundNames,
      quizId: createdQuiz!.id,
    });
  };

  /**-------Get rounds--------**/

  // 3. Get rounds after successfully creating rounds [TRPC]
  const { data: rounds, isSuccess: isGetRoundSuccessfully } =
    trpc.admin.getRounds.useQuery(
      {
        quizId: createdQuiz?.id || -1,
      },
      {
        enabled: isRoundsCreatedSuccessfully && isQuizCreatedSuccessfully,
        onSuccess: (data) => handleCreateQuestions(data),
        onError: handleTRPCError,
      },
    );

  /**-------Questions creation--------**/

  // 4. Create questions [TRPC]
  const { mutate: createQuestions, isSuccess: isQuestionsCreatedSuccessfully } =
    trpc.admin.createQuestions.useMutation({ onError: handleTRPCError });

  // 4. Create questions [Creation handler]
  const handleCreateQuestions = async (createdRounds: Round[]) => {
    const { rounds: storeRounds } = quizData;

    const parsedQuestions = storeRounds.reduce(
      (acc, round) => {
        const createdRound = createdRounds!.find(
          (createdRound) => createdRound.name === round.name,
        );

        round.questions.forEach((question) => {
          acc.push({
            roundId: createdRound!.id,
            mediaURL: question.mediaURL || null,
            answer: question.answer,
            content: question.content,
            mediaType: question.mediaType || null,
          } as Omit<Question, 'id'> & {
            roundId: number;
          });
        });

        return acc;
      },
      [] as Array<
        Omit<Question, 'id'> & {
          roundId: number;
        }
      >,
    );

    await createQuestions(parsedQuestions);
  };

  /**-------Get questions--------**/

  // 5. Get questions after successfully creating rounds [TRPC]
  trpc.admin.getQuestions.useQuery(
    {
      roundId: rounds?.[0]?.id || -1,
    },
    {
      enabled:
        isQuestionsCreatedSuccessfully &&
        isRoundsCreatedSuccessfully &&
        isGetRoundSuccessfully &&
        isQuizCreatedSuccessfully,
      // parse is needed because of how prisma handles enums
      onSuccess: (data) => handleCreateQuizStatus(data as Question[]),
      onError: handleTRPCError,
    },
  );

  /**-------Quiz status creation--------**/

  // 6. Create quiz status [TRPC]
  const { mutate: createQuizStatus } = trpc.admin.createQuizStatus.useMutation({
    onSuccess: (data) => handleEditQuiz(data),
    onError: handleTRPCError,
  });

  // 6. Create quiz status [creation handler]
  const handleCreateQuizStatus = async (questions: Question[]) => {
    await createQuizStatus({
      currentQuestionId: questions![0].id,
    });
  };

  /**-------Edit quiz--------**/

  // 7. Edit quiz [TRPC]
  const { mutate: updateQuizWithQuizStatusId } =
    trpc.admin.updateQuizWithQuizStatusId.useMutation({
      onSuccess: onQuizCreationSuccess,
      onError: handleTRPCError,
    });

  // 7. Edit quiz [creation handle]
  const handleEditQuiz = async (quizStatus: QuizStatus) => {
    await updateQuizWithQuizStatusId({
      quizId: createdQuiz!.id,
      quizStatusId: quizStatus.id,
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
