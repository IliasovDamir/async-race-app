import { IGetCars, IGetCarsHead, ICreateCar, ICarSpeed, SortType, OrderType, IGetWinnersHead, IWinner, IUpdateWinner } from '../models/models';
// import { saveState } from '../servises/state';
import { getRacingPage } from '../pages/garage';
import { saveState } from './state';

const GARAGE: string = 'http://127.0.0.1:3000/garage/';
const ENGINE: string = 'http://127.0.0.1:3000/engine/';
const WINNERS: string = 'http://127.0.0.1:3000/winners/';
export const LIMIT_GARAGE: number = 7;
export const LIMIT_WINNERS: number = 10;

export const inputsObjValue: IGetCars = {
  name: 'New car',
  color: '#d039b7',
  id: 0,
};

export function resetInputsObjValue() {
  inputsObjValue.name = 'New car';
  inputsObjValue.color = '#d039b7';
  inputsObjValue.id = 0;
}

export async function getOneCar(id: number): Promise<IGetCars> {
  return (await fetch(`${GARAGE}${id}`, { method: 'GET' })).json();
}

export async function getCars(pageCount: number, limitCars: number = LIMIT_GARAGE): Promise<IGetCarsHead> {
  const resp = await fetch(`${GARAGE}?_page=${pageCount}&_limit=${limitCars}`);
  const arrCars: IGetCars[] = await resp.json();
  const carsCount: number = await Number(resp.headers.get('X-Total-Count'));
  return {
    arrCars,
    carsCount,
  };
}

// post car to server
export async function createCar(body: ICreateCar): Promise<IGetCars> {
  return (
    await fetch(GARAGE, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
}

// create car after POST
// eslint-disable-next-line import/prefer-default-export
export async function setCar(): Promise<void> {
  const createCarTextInput: HTMLInputElement | null = document.querySelector('.garage__create-text-input');
  const createCarColorInput: HTMLInputElement | null = document.querySelector('.garage__create-color-input');
  let carName: string = '';
  if (createCarTextInput) carName = createCarTextInput.value;
  if (carName === '') {
    carName = 'New car';
  }
  const newCar: ICreateCar = {
    name: carName,
    color: (createCarColorInput as HTMLInputElement).value,
  };
  await createCar(newCar);
  await getRacingPage(saveState.pageGarageCount);
  if (createCarTextInput) createCarTextInput.value = '';
}

// delete car
export async function deleteCar(id: number) {
  return (await fetch(`${GARAGE}${id}`, { method: 'DELETE' })).json();
}

export async function removeCar(el: HTMLElement) {
  const id = Number(el.getAttribute('car-id'));
  await deleteCar(id);
  await getRacingPage(saveState.pageGarageCount);
  await deleteWinner(id);
}

// update car
export async function updateCar(id: number, body: ICreateCar) {
  return (
    await fetch(`${GARAGE}${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
}

export function onlockUpdateInputs(state: boolean) {
  const updateCarTextInput: HTMLInputElement | null = document.querySelector('.garage__update-text-input');
  const updateCarColorInput: HTMLInputElement | null = document.querySelector('.garage__update-color-input');
  const updateCarBtn: HTMLButtonElement | null = document.querySelector('.garage__update-btn');
  if (updateCarTextInput && updateCarColorInput && updateCarBtn) {
    updateCarTextInput.disabled = state;
    updateCarColorInput.disabled = state;
    updateCarBtn.disabled = state;
  }
}

export async function updateNameColorCar(el: HTMLElement) {
  onlockUpdateInputs(false);
  const id = Number(el.getAttribute('car-id'));
  const name = el.getAttribute('car-name');
  inputsObjValue.id = id;
  const updateCarTextInput: HTMLInputElement | null = document.querySelector('.garage__update-text-input');
  if (updateCarTextInput && name) updateCarTextInput.value = name;
}

// http://127.0.0.1:3000/engine/?id=43&status=started

export async function startEngine(id: number): Promise<ICarSpeed> {
  return (
    await fetch(`${ENGINE}?id=${id}&status=started`, {
      method: 'PATCH',
    })
  ).json();
}

export async function stopEngine(id: number): Promise<ICarSpeed> {
  return (
    await fetch(`${ENGINE}?id=${id}&status=stopped`, {
      method: 'PATCH',
    })
  ).json();
}

export async function driveEngine(id: number): Promise<number> {
  const responce = await fetch(`${ENGINE}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  return responce.status;
}

export async function getWinner(id: number): Promise<IWinner> {
  return (await fetch(`${WINNERS}${id}`)).json();
}

export async function deleteWinner(id: number) {
  return (await fetch(`${WINNERS}${id}`, { method: 'DELETE' })).json();
}

export async function getWinners(
  pageCount: number,
  limitWinners: number = LIMIT_WINNERS,
  sort: SortType = 'time',
  order: OrderType = 'ASC',
): Promise<IGetWinnersHead> {
  const resp = await fetch(`${WINNERS}?_page=${pageCount}&_limit=${limitWinners}&_sort=${sort}&_order=${order}`);
  const arrWinners: IWinner[] = await resp.json();
  const winnersCount: number = await Number(resp.headers.get('X-Total-Count'));
  return {
    arrWinners,
    winnersCount,
  };
}

export async function createWinner(body: IWinner): Promise<IWinner> {
  return (
    await fetch(WINNERS, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
}

export async function updateWinner(id: number, body: IUpdateWinner): Promise<IWinner> {
  return (
    await fetch(`${WINNERS}${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
}
