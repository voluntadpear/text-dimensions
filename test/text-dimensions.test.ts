import { Page } from 'puppeteer';
import TextDimensions from '../src';

declare const page: Page;

describe('blah', () => {
  it('should give dimensions similar to div calculation', async () => {
    await page.goto('http://localhost:5000');

    const heightByDiv = await page.evaluate(() => {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.width = 'auto';
      div.style.height = 'auto';
      div.style.whiteSpace = 'nowrap';
      div.style.font = 'bold 12pt arial';

      div.textContent = 'grodd is back.'

      document.body.appendChild(div);

      const dimensions = {
        height: div.clientHeight - 3,
        width: div.clientWidth
      }

      document.body.removeChild(div);

      return dimensions;
    })

    const heightByCanvas = await page.evaluate(() => {
      const dimensions: TextDimensions = new (<any>window).TextDimensions.default('bold 12pt arial');
      return dimensions.measureText('grodd is back.')
    })

    expect(heightByCanvas).toEqual(heightByDiv)
  }, 200000);
});
