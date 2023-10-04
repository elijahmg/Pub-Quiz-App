import { test } from '@playwright/test';
import { AdminCreatePage } from './pages/admin-page-object';
import { UtilsPage } from './pages/utils-page-object';

const quizName = 'My Fancy Quizz Name';
const quizPassword = '2023';
const quizPin = '2023';
const roundName = 'History';
const roundQuestion = 'Is this the best quizz?';
const roundAnswer = 'Hell yeah!';

test('Admin Create Quizz Page Object ', async ({ page }) => {
  const adminCreatePage = new AdminCreatePage(page);
  const utilsPage = new UtilsPage(page);
  //open landing page and check the header
  await adminCreatePage.goToLandingPage();

  //click the Admin dashboard button
  await adminCreatePage.clickAdminDashboardButton();

  //transition check using url
  await utilsPage.checkCurrentUrl('admin');

  //click create the quiz button
  await adminCreatePage.clickAdminCreateQuizButton();

  //transition check using url
  await utilsPage.checkCurrentUrl('admin/create');

  //type quiz name
  await adminCreatePage.typeAdminMainInfoName(quizName);

  //type quiz password
  await adminCreatePage.typeAdminMainInfoPassword(quizPassword);

  //type quiz pin
  await adminCreatePage.typeAdminMainInfoPin(quizPin);

  //click next step button from main info
  await adminCreatePage.clickNextStepButton();

  //transition check using url
  await utilsPage.checkCurrentUrl('admin/create/rounds');

  //type the round name and click enter
  await adminCreatePage.typeAdminRoundName(roundName);

  //click next step button from rounds overview
  await adminCreatePage.clickNextStepButton();

  //transition check using url
  await utilsPage.checkCurrentUrl('admin/create/questions');

  //select round from dropdown
  await adminCreatePage.selectRoundsDropdown(roundName);

  //type the question
  await adminCreatePage.typeAdminRoundQuestion(roundQuestion);

  //type the answer
  await adminCreatePage.typeAdminRoundAnswer(roundAnswer);

  //click next step button from questions overview
  await adminCreatePage.clickNextStepButton();

  //transition check using url
  await utilsPage.checkCurrentUrl('admin/create/final');

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
