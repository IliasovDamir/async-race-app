export interface IStateApp {
  pageGarageCount: number;
  allPageGarage: number;
  pageWinnerCount: number;
  allPageWinner: number;
  winnersMessageCount: number;
  sort: OrderType;
}

export interface IGetCars {
  name: string;
  color: string;
  id: number;
}

export interface IGetCarsHead {
  arrCars: IGetCars[];
  carsCount: number;
}

export interface ICreateCar {
  name: string;
  color: string;
}

export interface ICarSpeed {
  velocity: number;
  distance: number;
}

export interface IRaceCar {
  id: number;
  time: number;
}
export interface IUpdateWinner {
  wins: number;
  time: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IGetWinnersHead {
  arrWinners: IWinner[];
  winnersCount: number;
}

export type SortType = 'id' | 'time' | 'wins';

export type OrderType = 'ASC' | 'DESC';
