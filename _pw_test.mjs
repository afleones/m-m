import { chromium } from 'playwright';

const SCRATCH = 'C:/Users/leone/AppData/Local/Temp/claude/c--Users-leone-Desktop-Andr-s-Leones---Programacion-FrontEnd-mym/3f121781-e60c-4f15-a362-337a806c794b/scratchpad';

const browser = await chromium.launch();

for (const [name, vw, vh, scrollFrac] of [
  ['desktop', 1897, 1000, 0.15],
  ['short', 1897, 650, 0.3],
  ['mobile', 390, 844, 0.15],
]) {
  const context = await browser.newContext({ viewport: { width: vw, height: vh } });
  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Toca para abrir/i }).click();
  await page.waitForTimeout(3500);
  await page.evaluate((frac) => {
    const section = document.querySelector('#historia');
    const rect = section.getBoundingClientRect();
    const targetY = rect.top + window.scrollY + window.innerHeight * frac;
    window.scrollTo(0, targetY);
  }, scrollFrac);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SCRATCH}/pw_join_${name}.png` });
  await context.close();
}

await browser.close();
console.log('done');
