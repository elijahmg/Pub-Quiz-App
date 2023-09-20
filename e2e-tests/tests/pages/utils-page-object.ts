import { type Page, expect } from '@playwright/test';

export class UtilsPage {
  readonly page: Page;
  readonly baseUrl =
    'https://pub-quiz-app-git-feat-testids-playwright-elijahmg.vercel.app/';

  constructor(page: Page) {
    this.page = page;
  }

  async checkCurrentUrl(urlSuffix: string) {
    //await is needed because Playwright is really fast
    await this.page.waitForURL(this.baseUrl + urlSuffix);
    expect(this.page.url()).toBe(this.baseUrl + urlSuffix);
  }
}
