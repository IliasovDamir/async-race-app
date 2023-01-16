/* eslint-disable import/prefer-default-export */
import { main } from './garage';

function renderWinsBoard(): string {
  return `<main class="winners">
    <h3 class="winners__title">Winners <span>(0)</span></h3>
    <p class="winners__page">Page #<span>1</span></p>
    <div class="winners__state-wrap">
      <div class="winners__state-title">
        <div class="winners__number">Number</div>
        <div class="winners__car">Car</div>
        <div class="winners__name">Name</div>
        <div class="winners__wins">Wins</div>
        <div class="winners__time">Best time (s)</div>
      </div>
    </div>
  </main>`;
}

export async function renderWinnersPage(): Promise<void> {
  if (main) {
    main.classList.add('winners');
    main.innerHTML = '';
    main.innerHTML = renderWinsBoard();
  }
}
const navWinners: HTMLElement | null = document.querySelector('.nav__winners');

if (navWinners) {
  navWinners.addEventListener('click', () => {
    renderWinnersPage();
  });
}
