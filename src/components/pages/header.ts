import { saveState } from '../servises/state';
import { renderGaragePage } from './garage';
import { renderWinnersPage } from './wins-board';

function renderHeader(): string {
  return `<header class="header">
    <h1 class="h1"><span>A</span>sync Rase</h1>
    <div class="nav">
      <button class="nav__garage">Garage</button>
      <button class="nav__winners">Winners</button>
    </div>
  </header>
  <main></main>`;
}

function getHeader(): void {
  const body: HTMLElement | null = document.querySelector('body');
  if (body) body.innerHTML = renderHeader();

  const navWinners: HTMLElement | null = document.querySelector('.nav__winners');
  if (navWinners) {
    navWinners.addEventListener('click', () => renderWinnersPage(saveState.pageWinnerCount));
  }

  const navGarage: HTMLElement | null = document.querySelector('.nav__garage');
  if (navGarage) {
    navGarage.addEventListener('click', () => renderGaragePage(saveState.pageGarageCount));
  }
}

window.onload = () => {
  getHeader();
  renderGaragePage(saveState.pageGarageCount);
};
