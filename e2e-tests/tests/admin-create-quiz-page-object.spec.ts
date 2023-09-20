import { test } from '@playwright/test';
import { AdminCreatePage } from './page-objects/admin-page-object';

const quizName = 'My Fancy Quizz Name';
const quizPassword = '2023';
const quizPin = '2023';
const roundName = 'History';
const roundQuestion = 'Is this the best quizz?';
const roundAnswer = 'Hell yeah!';

test('Admin Create Quizz Page Object ', async ({ page }) => {
  const adminCreatePage = new AdminCreatePage(page);
  //open landing page and check the header
  await adminCreatePage.goToLandingPage();

  //click the Admin dashboard button
  await adminCreatePage.clickAdminDashboardButton();

  //to do: add method to the admin page object to check for the URL when transition happens, needs to be dynamic
  //click create the quiz button
  await adminCreatePage.clickAdminCreateQuizButton();

  //to do: add method to the admin page object to check for the URL when transition happens, needs to be dynamic
  //type quiz name
  await adminCreatePage.typeAdminMainInfoName(quizName);

  //type quiz password
  await adminCreatePage.typeAdminMainInfoPassword(quizPassword);

  //type quiz password
  await adminCreatePage.typeAdminMainInfoPin(quizPin);

  //click next step button from main info
  await adminCreatePage.clickNextStepButton();

  //to do: add method to the admin page object to check for the URL when transition happens, needs to be dynamic
  //type the round name and click enter
  await adminCreatePage.typeAdminRoundName(roundName);

  //click next step button from rounds overview
  await adminCreatePage.clickNextStepButton();

  //select round from dropdown
  await adminCreatePage.selectRoundsDropdown(roundName);

  //type the question
  await adminCreatePage.typeAdminRoundQuestion(roundQuestion);

  //type the answer
  await adminCreatePage.typeAdminRoundAnswer(roundAnswer);

  //click next step button from questions overview
  await adminCreatePage.clickNextStepButton();

  //check for quiz name
  await adminCreatePage.checkAdminOverviewName(quizName);

  //check for quiz password
  await adminCreatePage.checkAdminOverviewPassword(quizPassword);

  //check for quiz pin
  await adminCreatePage.checkAdminOverviewPin(quizPin);

  //click round dropdown from overview
  await adminCreatePage.clickAdminOverviewRoundDropdown();

  //check for round name
  await adminCreatePage.checkAdminOverviewRoundName(roundName);

  //check for question
  await adminCreatePage.checkAdminOverviewRoundQuestion(roundQuestion);

  //check for answer
  await adminCreatePage.checkAdminOverviewRoundAnswer(roundAnswer);

  //click create quiz button
  //await adminCreatePage.clickAdminCreateQuizButton();
});
