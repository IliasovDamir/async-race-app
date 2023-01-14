import { ICreateCar } from '../models/models';
import { createCar } from './api';
import { renderGaragePage } from '../pages/garage';

// const createCarBtn = document.querySelector('.garage__create-btn');


// // create car after POST
// async function setCar() {
//   const createCarTextInput = document.querySelector('.garage__create-text-input');
//   const createCarColorInput = document.querySelector('.garage__create-color-input');
//   const body: ICreateCar = {
//     name: (createCarTextInput as HTMLInputElement).value,
//     color: (createCarColorInput as HTMLInputElement).value,
//   };
//   console.log(body);
//   await createCar(body);
//   await renderGaragePage();
// }

// if (createCarBtn) {
//   createCarBtn.addEventListener('click', () => setCar());
// }
