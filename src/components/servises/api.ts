import { IGetCars, IGetCarsHead, ICreateCar } from '../models/models';
// import { saveState } from '../servises/state';
import { renderGaragePage } from '../pages/garage';

const GARAGE: string = 'http://127.0.0.1:3000/garage/';
const ENGINE: string = 'http://127.0.0.1:3000/engine/';
const WINNERS: string = 'http://127.0.0.1:3000/winners/';
const LIMIT: number = 7;

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


//

// Get Car
// Create Car
// Delete Car
// Update Car
