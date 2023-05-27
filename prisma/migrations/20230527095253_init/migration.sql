-- CreateEnum
CREATE TYPE "QuizStatusEnum" AS ENUM ('JOINING', 'PLAYING', 'END_ROUND', 'EVALUATION', 'SCORE_VIEWING', 'END_QUIZ');

-- CreateEnum
CREATE TYPE "MediaTypeEnum" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO');

-- CreateTable
CREATE TABLE "QuizStatus" (
    "id" SERIAL NOT NULL,
    "status" "QuizStatusEnum" NOT NULL,
    "currentQuestionId" INTEGER NOT NULL,

    CONSTRAINT "QuizStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "quizStatusId" INTEGER,
    "password" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "mediaType" "MediaTypeEnum",
    "mediaURL" TEXT,
    "roundId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamAnswers" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "score" DOUBLE PRECISION,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "TeamAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizStatus_currentQuestionId_key" ON "QuizStatus"("currentQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_quizStatusId_key" ON "Quiz"("quizStatusId");

-- AddForeignKey
ALTER TABLE "QuizStatus" ADD CONSTRAINT "QuizStatus_currentQuestionId_fkey" FOREIGN KEY ("currentQuestionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_quizStatusId_fkey" FOREIGN KEY ("quizStatusId") REFERENCES "QuizStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamAnswers" ADD CONSTRAINT "TeamAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamAnswers" ADD CONSTRAINT "TeamAnswers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
