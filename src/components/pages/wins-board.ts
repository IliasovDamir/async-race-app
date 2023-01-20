/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IRaceCar } from '../models/models';

// function renderWinsList(): string {
//   return `<div class="winners__state-title">
//   <div class="winners__number">${position}</div>
//   <div class="winners__car">${carImg}</div>
//   <div class="winners__name">${CarName}</div>
//   <div class="winners__wins">${winsCount}</div>
//   <div class="winners__time">${time}</div>
// </div>`;
// }

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
  const main: HTMLElement | null = document.querySelector('main');
  if (main) {
    main.classList.add('winners');
    main.innerHTML = '';
    main.innerHTML = renderWinsBoard();
  }
}

