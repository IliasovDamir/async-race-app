import { IGetCars, IGetCarsHead, ICreateCar } from '../models/models';
// import { saveState } from '../servises/state';
import { renderGaragePage } from '../pages/garage';

const GARAGE: string = 'http://127.0.0.1:3000/garage/';
const ENGINE: string = 'http://127.0.0.1:3000/engine/';
const WINNERS: string = 'http://127.0.0.1:3000/winners/';
const LIMIT: number = 7;

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

export async function getCars(pageCount: number, limitCars: number = LIMIT): Promise<IGetCarsHead> {
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
  const createCarTextInput = document.querySelector('.garage__create-text-input');
  const createCarColorInput = document.querySelector('.garage__create-color-input');
  let carName: string = (createCarTextInput as HTMLInputElement).value;
  if (carName === '') {
    carName = 'New car';
  }
  const newCar: ICreateCar = {
    name: carName,
    color: (createCarColorInput as HTMLInputElement).value,
  };
  await createCar(newCar);
  await renderGaragePage();
}

// delete car
export async function deleteCar(id: number) {
  return (await fetch(`${GARAGE}${id}`, { method: 'DELETE' })).json();
}

export async function removeCar(el: HTMLElement) {
  const id = Number(el.getAttribute('car-id'));
  await deleteCar(id);
  await renderGaragePage();
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

