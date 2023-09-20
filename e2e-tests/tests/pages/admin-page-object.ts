import { type Locator, type Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class AdminCreatePage {
  readonly page: Page;
  //readonly urlAddress: string = 'http://localhost:3000';
  readonly urlAddress: string =
    'https://pub-quiz-app-git-feat-testids-playwright-elijahmg.vercel.app';
  readonly landingPageHeader: Locator;
  readonly adminDashboardButton: Locator;
  readonly adminCreateQuizButton: Locator;
  readonly adminCreateQuizName: Locator;
  readonly adminCreateQuizPassword: Locator;
  readonly adminCreateQuizPin: Locator;
  readonly nextStepButton: Locator;
  readonly adminRoundsTopicInput: Locator;
  readonly adminQuestionsDropdown: Locator;
  readonly adminQuestionsRoundQuestion: Locator;
  readonly adminQuestionsRoundAnswer: Locator;
  readonly adminOuizOverviewName: Locator;
  readonly adminQuizOverviewPassword: Locator;
  readonly adminQuizOverviewPin: Locator;
  readonly adminQuizOverviewRoundsDropdown: Locator;
  readonly adminQuizOverviewRoundName: Locator;
  readonly adminQuizOverviewRoundQuestion: Locator;
  readonly adminQuizOverviewRoundAnswer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.landingPageHeader = page.getByTestId('LandingPage_Header');
    this.adminDashboardButton = page.getByTestId('AdminDashboard_Button');
    this.adminCreateQuizButton = page.getByTestId('AdminCreateQuiz_Button');
    this.adminCreateQuizName = page.getByTestId(
      'AdminQuizMainInfoName_InputField',
    );
    this.adminCreateQuizPassword = page.getByTestId(
      'AdminQuizMainInfoPassword_InputField',
    );
    this.adminCreateQuizPin = page.getByTestId(
      'AdminQuizMainInfoPIN_InputField',
    );
    this.nextStepButton = page.getByTestId('NextStep_Button');
    this.adminRoundsTopicInput = page.getByTestId(
      'AdminQuizRoundsTopic_InputField',
    );
    this.adminQuestionsDropdown = page.getByTestId('AdminQuizQuestions_Select');
    this.adminQuestionsRoundQuestion = page.getByTestId(
      'AdminQuizQuestionsTypeQuestion_InputField',
    );
    this.adminQuestionsRoundAnswer = page.getByTestId(
      'AdminQuizQuestionsTypeAnswer_InputField',
    );
    this.adminOuizOverviewName = page.getByTestId(
      'AdminQuizFinalCheck_QuizName',
    );
    this.adminQuizOverviewPassword = page.getByTestId(
      'AdminQuizFinalCheck_QuizPassword',
    );
    this.adminQuizOverviewPin = page.getByTestId('AdminQuizFinalCheck_QuizPIN');
    this.adminQuizOverviewRoundsDropdown = page.getByTestId(
      'AdminQuizFinalCheck_RoundBox',
    );
    this.adminQuizOverviewRoundName = page.getByTestId(
      'AdminQuizFinalCheck_RoundName',
    );
    this.adminQuizOverviewRoundQuestion = page.getByTestId(
      'AdminQuizQuestionsTypeQuestion_InputField',
    );
    this.adminQuizOverviewRoundAnswer = page.getByTestId(
      'AdminQuizQuestionsTypeAnswer_InputField',
    );
  }

  async goToLandingPage() {
    await this.page.goto(this.urlAddress);
    await expect.soft(this.landingPageHeader).toBeVisible();
  }

  async clickAdminDashboardButton() {
    await this.adminDashboardButton.click();
  }

  async clickAdminCreateQuizButton() {
    await this.adminCreateQuizButton.click();
  }

  async typeAdminMainInfoName(quizName: string) {
    await this.adminCreateQuizName.type(quizName);
  }

  async typeAdminMainInfoPassword(quizPassword: string) {
    await this.adminCreateQuizPassword.type(quizPassword);
  }

  async typeAdminMainInfoPin(quizPin: string) {
    await this.adminCreateQuizPin.type(quizPin);
  }

  async clickNextStepButton() {
    await this.nextStepButton.click();
  }

  async typeAdminRoundName(roundName: string) {
    await this.adminRoundsTopicInput.type(roundName);
    await this.page.keyboard.press('Enter');
  }

  async selectRoundsDropdown(roundNameToSelect: string) {
    await this.adminQuestionsDropdown.selectOption(roundNameToSelect);
  }

  async typeAdminRoundQuestion(question: string) {
    await this.adminQuestionsRoundQuestion.type(question);
  }

  async typeAdminRoundAnswer(answer: string) {
    await this.adminQuestionsRoundAnswer.type(answer);
  }

  async checkAdminOverviewName(quizOverviewName: string) {
    await expect(this.adminOuizOverviewName).toHaveValue(quizOverviewName);
  }

  async checkAdminOverviewPassword(quizOverviewPassord: string) {
    await expect(this.adminQuizOverviewPassword).toHaveValue(
      quizOverviewPassord,
    );
  }

  async checkAdminOverviewPin(quizOverviewPin: string) {
    await expect(this.adminQuizOverviewPin).toHaveValue(quizOverviewPin);
  }

  async clickAdminOverviewRoundDropdown() {
    await this.adminQuizOverviewRoundsDropdown.click();
  }

  async checkAdminOverviewRoundName(quizOverviewRoundName: string) {
    await expect(this.adminQuizOverviewRoundName).toHaveValue(
      quizOverviewRoundName,
    );
  }

  async checkAdminOverviewRoundQuestion(quizOverviewRoundQuestion: string) {
    await expect(this.adminQuizOverviewRoundQuestion).toHaveValue(
      quizOverviewRoundQuestion,
    );
  }

  async checkAdminOverviewRoundAnswer(quizOverviewRoundAnswer: string) {
    await expect(this.adminQuizOverviewRoundAnswer).toHaveValue(
      quizOverviewRoundAnswer,
    );
  }
}
