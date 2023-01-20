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
export interface IWinner {
  wins: number;
  time: number;
}

export interface ICreateWinner {
  id: number;
  wins: number;
  time: number;
}

