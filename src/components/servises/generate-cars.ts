import { ICreateCar } from '../models/models';
import { getRacingPage } from '../pages/garage';
import { createCar } from './api';
import { carFirstName, carSubName } from './cars-brands';
import { saveState } from './state';

function getRandomColor(): string {
  const letters: string = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandName(arr: string[], length: number): string {
  return arr[Math.floor(Math.random() * length)];
}

// eslint-disable-next-line import/prefer-default-export
export async function getRandom100Cars(): Promise<void> {
  let carName: string = '';
  for (let i = 0; i < 10; i += 1) {
    carName = `${getRandName(carFirstName, carFirstName.length)} ${getRandName(carSubName, carSubName.length)}`;
    const newCar: ICreateCar = {
      name: carName,
      color: getRandomColor(),
    };
    createCar(newCar);
  }
  await getRacingPage(saveState.pageGarageCount);
}
