import { IGetCars, IGetCarsHead, ICreateCar } from '../models/models';
import { saveState } from '../servises/state';

const GARAGE: string = 'http://127.0.0.1:3000/garage/';
const ENGINE: string = 'http://127.0.0.1:3000/engine/';
const WINNERS: string = 'http://127.0.0.1:3000/winners/';
const LIMIT: number = 7;

export async function getCars(pageCount: number, limitCars: number = LIMIT): Promise<IGetCarsHead> {
  const resp = await fetch(`${GARAGE}?_page=${pageCount}&_limit=${limitCars}`);
  const arrCars: IGetCars[] = await resp.json();
  const carsCount: number = await Number(resp.headers.get('X-Total-Count'));

  console.log('carItems:::', arrCars);
  console.log('carsCount:::', carsCount);
  return {
    arrCars,
    carsCount,
  };
}

//post car to server
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


//

// Get Car
// Create Car
// Delete Car
// Update Car
