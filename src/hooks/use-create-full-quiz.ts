import { useAdminQuizManageContext } from '../components/contexts/admin-quiz-manage-context';
import { trpc } from '../utils/trcp';
import { Game, Topic } from '@prisma/client';
import { Question } from '../../types';

export function useCreateFullQuiz(onQuizCreationSuccess: () => void) {
  const { quizData } = useAdminQuizManageContext();

  const { mutate: creteTopics, isSuccess: isTopicsCreatedSuccessfully } =
    trpc.admin.createTopics.useMutation();

  const { mutate: createQuestions } = trpc.admin.createQuestions.useMutation({
    onSuccess: onQuizCreationSuccess,
  });

  const handleCreateTopics = async (createdQuiz: Game) => {
    const { rounds } = quizData;

    const roundNames = rounds.map((round) => round.name);

    // quiz must exist at this point
    await creteTopics({
      rounds: roundNames,
      gameId: createdQuiz!.id,
    });
  };

  const { mutate: createQuiz, data: createdQuiz } =
    trpc.admin.createQuiz.useMutation({
      onSuccess: (data) => handleCreateTopics(data),
    });

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

  trpc.admin.getTopics.useQuery(
    {
      gameId: createdQuiz?.id || -1,
    },
    {
      enabled: isTopicsCreatedSuccessfully && !!createdQuiz,
      onSuccess: (data) => handleCreateQuestions(data),
    },
  );

  const handleCreateQuiz = async () => {
    const { pin, password, name } = quizData;

    await createQuiz({
      name,
      password,
      pin,
    });
  };

  return handleCreateQuiz;
}
