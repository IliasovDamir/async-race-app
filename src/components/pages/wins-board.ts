import { IWinner, SortType } from '../models/models';
// eslint-disable-next-line import/no-cycle
import { createWinner, getOneCar, getWinner, getWinners, LIMIT_WINNERS, updateWinner } from '../servises/api';
import { saveState } from '../servises/state';

function getImg(color: string): string {
  return `<svg fill="${color}" class="garage__car-img" xmlns="http://www.w3.org/2000/svg" width="1706.667" height="582.667" version="1.0" viewBox="0 0 1280 437"><path d="M550 34.1c-36.6 2.2-81.2 9.3-128 20.4-65 15.4-153.9 41.8-222 65.8l-18.5 6.5-9-1.8c-12.8-2.7-11.8-3.2-11.3 5.5.3 5.1.1 7.5-.6 7.5-.6 0-5.8-.7-11.6-1.5s-10.8-1.5-11.2-1.5c-.4 0-.5 2.7-.1 6l.6 6h-24.2l-.3 5.2-.3 5.2-11.5 2.8c-6.3 1.6-16.7 4.3-23.2 5.9-11.6 3.1-11.6 3.1-12.2 6.5-.9 4.8-6.5 11.6-19.7 24.2-17.3 16.5-18.4 20.4-14.1 49.7 3.3 22 3.7 30 1.8 37.1-3 11.5-1.9 16.4 5.4 24.9 8.7 10.2 22.6 23.8 25.5 25.1 2.8 1.1 26.7 4.7 92.3 13.9 14 1.9 26 3.5 26.7 3.5.7 0 1.7-1.7 2.2-3.8l.9-3.7 12.5-.3 12.6-.3 1.9 4.3c5.6 12.6 19.5 29.4 31.7 38.4 33 24.3 81.9 24.3 116.2-.1 12.2-8.7 30.9-31.4 33.2-40.3.5-2.2.9-2.3 8.6-2l8.2.3v12l116.5-.2c64.1-.1 170.6-.4 236.8-.8l120.3-.7-.3-6.7-.3-6.6h14.8l4.1 8c5.8 11.4 9.8 16.9 19 26.1 13.4 13.4 28.9 22.3 46.2 26.6 10.5 2.5 33 3 42.9.9 31.6-6.7 56.7-25.6 70.6-53.4 4.4-8.6 6.2-9.9 12.8-9l4.1.6v18l18.8-.6c48.2-1.7 96.5-10.9 124.7-23.6l6.6-3-4.3-6.2c-2.4-3.4-4.8-6.9-5.4-7.8-.8-1.1-.9-4-.3-9.6.4-4.4 1.3-17.5 2-29.2l1.2-21.2-4.2-4.8c-17.9-20.6-48.8-39-80.3-47.8-4.1-1.2-7.6-3.2-12.5-7.3-20-16.7-41-26.3-61.3-27.8-4.1-.3-10.4-1.4-14-2.5-23.3-6.6-97-17.6-161.6-24l-22.2-2.2-3.1 2.2c-5 3.6-15.1 7.7-23.6 9.7-6.1 1.4-11.9 1.9-24.1 1.9-16.1 0-16.1 0-19.5-2.8-23.6-19.1-64.8-45.8-125.3-81.2l-9.8-5.7 6.7-6.8 6.6-6.7-4.3-1.6C657 37 602.4 31 550 34.1zM598.2 63c47.7 3.2 72.3 11.2 113.3 36.5 12.4 7.7 82.1 53.9 84.8 56.3 2.3 2 .6 3.2-4.4 3.2-7.1 0-9.3-1-12.6-5.8-10.5-15.4-27.9-27.5-42.5-29.7-11.4-1.7-21.4 8.9-24.9 26.4l-1.2 6.1h-7.6c-4.2 0-47-1.4-95.1-3-48.1-1.6-90.2-3-93.5-3h-6l-11.8-38.3c-6.5-21-11.8-39-11.7-39.9 0-2 .8-2.3 15-4.2 36.9-5.2 67.8-6.6 98.2-4.6zM460 78.2c1.2 3 5.6 64.9 4.7 67.1-.8 2.3-2.3 2.2-47.7-.8-62.1-4.2-90.7-6.7-96.9-8.4-8.9-2.7-10.5-7-4.3-12.1 13.5-11.2 57.1-27 117.2-42.5 23.7-6.2 25.7-6.4 27-3.3zm45 71.9c0 .5-2.3 3.8-5 7.2-7 8.6-9.2 14.9-9.8 27.3-.3 8.1 0 11.8 1.7 18.4 3.3 13 17.1 43.9 27.2 61 14.4 24.3 37.8 43.2 63.4 51.3 12 3.8 23.3 4.6 75 5.2 25.9.3 77.1 1.2 114 2 52.6 1.1 67.1 1.2 67.7.2 1-1.6 1.4-5.5 4.9-50.7 4.4-55.4 4.5-59.6 2-70.2-3.6-15.1-10-27.1-20.6-38.3-3.6-3.7-5.2-6.1-4.4-6.4 2.9-.9 16.6 16.9 22.5 29.2 5.8 12.4 6.9 18.2 6.7 35.7-.3 23-6.8 104.1-8.5 105.1-.7.5-6.9.6-13.8.4-15.8-.7-88.3-2.2-163-3.5-31.6-.5-60.8-1.2-64.8-1.5-32.2-2.5-67-27-86.5-61-11.8-20.6-21.9-44.8-25.3-61-2.1-9.8-2.1-22.8.1-29 3.5-10.2 16.5-27 16.5-21.4zm592.5 25.3c21.3 7.1 40.3 18.8 61.4 37.5 7 6.3 14.1 14.4 14.1 16.2 0 1.8-7.3.8-16.7-2.2-18.7-5.9-35.1-15.1-53.1-29.6-9.6-7.8-23.2-21.9-23.2-24.1 0-2.2 6.9-1.3 17.5 2.2zm-979.6 11.5c23.4 2.7 45.6 5.3 49.4 5.6 3.7.4 7 1.1 7.2 1.6.7 1-11.5 6.9-20.5 10-5.6 1.9-9.1 2.2-25 2.6-10.2.2-30 0-44-.4l-25.5-.8.2-3.3c0-1.8 1.9-7.1 4.2-11.8 3.9-8.3 4.1-8.4 7.7-8.4 2 0 22.8 2.2 46.3 4.9zM323.5 225c36.1 9.2 59.5 38.7 61.2 77.2.7 14.1-.9 22.2-6.7 34.3-9.6 20.1-27.9 36.9-48.2 44.3-6.7 2.5-8.5 2.7-22.3 2.7-12.6 0-16.3-.4-23-2.3-29.1-8.3-49-28.6-57.3-58.4-1.2-4.6-1.7-10.1-1.7-20.3 0-11.9.4-15.1 2.3-21.5 9.6-30.3 34.1-52.7 63.3-57.9 7.7-1.4 23.1-.5 32.4 1.9zm689.5-.5c20.8 5.4 41.6 21.5 50.8 39.3 6.6 12.8 9.4 22.9 9.9 36.8.7 15-1 23.6-7.1 36.1-7.5 15.3-22 31-34.1 36.7-19.9 9.5-43.5 12-61 6.6-12-3.8-24.1-10.7-30.7-17.4-8.3-8.7-14.2-16.9-18.8-26.1-13.3-26.8-10-57.6 8.9-82.6 10.9-14.3 33.5-27.3 53.6-30.9 6.9-1.2 20.8-.5 28.5 1.5zm211 35.1c7.4 2.2 12 6.9 12 12.1 0 2.9-.7 4.6-2.4 6.2-1.3 1.3-2.6 3.9-3 6.2l-.6 3.9h-23v-5.9l-15-.3-14.9-.3 1.8-4.1c3.9-8.7 12.5-15.6 22.5-18 7.2-1.7 16.3-1.7 22.6.2zm4.3 33.1c.2.5-.1 3.3-.7 6.3l-1.1 5.5h-21l-.3-3.6c-.2-1.9.2-4.7.7-6.2 1-2.7 1.1-2.7 11.5-2.7 5.8 0 10.7.3 10.9.7zm-3.5 16.8c.2.2-.2 3.6-.9 7.5-1.2 6.9-1.3 7.1-3.8 6.5-4.8-1.2-8.8-4.4-11.2-9-2.1-4-2.2-4.7-.9-5.6 1.3-.9 15.8-.4 16.8.6z"/><path d="M293.5 227.7c-28.1 3.9-51.8 23.6-61.1 50.9-2.3 6.7-2.8 10.1-3.2 21.9-.3 11.7-.1 15.4 1.6 22.6 6.5 27.1 23 44.5 49.7 52.5 7.9 2.3 10.7 2.7 22.5 2.6 10.4 0 15.3-.5 21.4-2.1 25.1-6.6 42.4-23.8 52.7-52.1 2-5.7 2.3-8.2 2.2-20 0-11.6-.4-14.8-2.7-22.3-7.7-25.7-22.8-41.5-47.1-49.6-12.8-4.2-25.8-5.8-36-4.4zM981.5 228.5c-26.8 4.9-47.6 21.1-57 44.4-7.5 18.5-8.6 38.8-2.8 55.4 4.3 12.3 8.5 18.9 18.3 28.7s17.7 14.4 31.5 18.6c12.2 3.6 29.9 3.9 41.9.6 17-4.7 33.6-15.1 42.2-26.6 9.9-13.1 13.5-24.6 13.5-42.6 0-30.9-12.4-55.7-34.5-68.6-7.7-4.6-20.9-9-30.9-10.3-9.6-1.3-13.3-1.3-22.2.4zM693.6 57.9c-2 3.2-3.6 6.3-3.6 6.9 0 .5 6 4.4 13.3 8.7 17.9 10.6 50.8 31.5 89 56.8l31.8 21 15.2-.6c8.4-.3 18.5-1.3 22.6-2.2 8.1-1.8 20.1-6.2 20.1-7.5 0-.4-2.4-1.8-5.2-3-2.9-1.2-36.1-17.3-73.8-35.8-37.7-18.4-72.8-35.5-78-37.9-11-5.2-26.9-12.3-27.5-12.3-.2 0-2 2.6-3.9 5.9z"/></svg>
`;
}

function renderWinsList(arrWinners: IWinner[]): void {
  const main: HTMLElement | null = document.querySelector('main');
  const prevWinnersListWrapper: HTMLElement | null = document.querySelector('.winners-wrapper');
  if (main && prevWinnersListWrapper) main.removeChild(prevWinnersListWrapper);

  const winnersListWrapper = document.createElement('div');
  winnersListWrapper.classList.add('winners__state-title');
  winnersListWrapper.classList.add('winners-wrapper');

  arrWinners.forEach(async (el, index) => {
    const responce = await getOneCar(el.id);
    const winnersList = document.createElement('div');
    winnersList.classList.add('winners__state-title');
    winnersList.innerHTML = `
    <div class="winners__number">${index + 1}</div>
    <div class="winners__car">${getImg(responce.color)}</div>
    <div class="winners__name">${responce.name}</div>
    <div class="winners__wins">${el.wins}</div>
    <div class="winners__time">${el.time}</div>`;
    winnersListWrapper.appendChild(winnersList);
  });

  if (main) main.appendChild(winnersListWrapper);
}

function renderWinsBoard(winnersCount: number): string {
  return `<main class="winners">
    <h3 class="winners__title">Winners <span>(${winnersCount})</span></h3>
    <p class="winners__page">Page #<span>${saveState.pageWinnerCount}/${saveState.allPageWinner}</span></p>
    <div class="winners__btn-wrap">
      <button class="winners__page-settings-prev-btn">prev</button>
      <button class="winners__page-settings-next-btn">next</button>
    </div>
      <div class="winners__state-title">
        <div class="winners__number first-line">N</div>
        <div class="winners__car first-line">Car</div>
        <div class="winners__name first-line car-name">Name</div>
        <div class="winners__wins first-line car-wins">Wins</div>
        <div class="winners__time first-line car-time">Best time (s)</div>
      </div>
  </main>`;
}

async function toggleSort(): Promise<void> {
  if (saveState.sort === 'ASC') {
    saveState.sort = 'DESC';
  } else {
    saveState.sort = 'ASC';
  }
}

async function changeSort(param: SortType): Promise<void> {
  toggleSort();
  const { arrWinners, winnersCount } = await getWinners(
    saveState.pageWinnerCount,
    LIMIT_WINNERS,
    param,
    saveState.sort
  );
  renderWinsList(arrWinners);
}

function addSortToWinnersPage(): void {
  const sortName = document.querySelector('.car-name');
  const sortWins = document.querySelector('.car-wins');
  const sortTime = document.querySelector('.car-time');

  if (sortName) sortName.addEventListener('click', () => changeSort('id'));
  if (sortWins) sortWins.addEventListener('click', () => changeSort('wins'));
  if (sortTime) sortTime.addEventListener('click', () => changeSort('time'));
}

export async function setWinnerList(id: number, time: number): Promise<void> {
  const winnerState = await getWinner(id);
  if (!winnerState.id) {
    createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const newTime = winnerState.time < time ? winnerState.time : time;
    const newWins = winnerState.wins + 1;
    updateWinner(id, { wins: newWins, time: newTime });
  }
}

function addPaginationWinnersPage(): void {
  const nextPage: HTMLElement | null = document.querySelector('.winners__page-settings-next-btn');
  if (nextPage) {
    nextPage.addEventListener('click', () => {
      if (saveState.pageWinnerCount < saveState.allPageWinner) {
        saveState.pageWinnerCount += 1;
      };
      renderWinnersPage(saveState.pageWinnerCount);
    });
  }
  const prevPage: HTMLElement | null = document.querySelector('.winners__page-settings-prev-btn');
  if (prevPage) {
    prevPage.addEventListener('click', () => {
      if (saveState.pageWinnerCount > 1) {
        saveState.pageWinnerCount -= 1;
      };
      renderWinnersPage(saveState.pageWinnerCount);
    });
  }
}

export async function renderWinnersPage(page: number): Promise<void> {
  const main: HTMLElement | null = document.querySelector('main');
  if (main) {
    main.innerHTML = '';
    main.classList.add('winners');
    const { arrWinners, winnersCount } = await getWinners(page);
    saveState.allPageWinner = Math.ceil(winnersCount / LIMIT_WINNERS);
    main.innerHTML = renderWinsBoard(winnersCount);
    addSortToWinnersPage();
    renderWinsList(arrWinners);
    addPaginationWinnersPage();
  }
}
