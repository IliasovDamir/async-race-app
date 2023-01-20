import { saveState } from '../servises/state';
import { renderGaragePage } from './garage';
import { renderWinnersPage } from './wins-board';

window.onload = () => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  getHeader();
  renderGaragePage(saveState.pageGarageCount);
};

function getHeader() {
  const body: HTMLElement | null = document.querySelector('body');
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  if (body) body.innerHTML = renderHeader();

  const navWinners: HTMLElement | null = document.querySelector('.nav__winners');
  if (navWinners) {
    navWinners.addEventListener('click', () => renderWinnersPage());
  }

  const navGarage: HTMLElement | null = document.querySelector('.nav__garage');
  if (navGarage) {
    navGarage.addEventListener('click', () => renderGaragePage(saveState.pageGarageCount));
  }
}

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

