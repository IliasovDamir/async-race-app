export interface IGetCars {
  name: string;
  color: string;
  id: number;
}

export interface ICreateCars {
  name: string;
  color: string;
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
