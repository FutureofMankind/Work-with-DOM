/* eslint-disable no-console */
import NumberOne from './modules/NumberOne';
import NumberTwo from './modules/NumberTwo';

const divForNumberOne = document.getElementById('numberOne');
const numberOne = new NumberOne(divForNumberOne);
numberOne.init();

const divForNumberTwo = document.getElementById('numberTwo');
const numberTwo = new NumberTwo(divForNumberTwo);
numberTwo.init();

console.log('app started');
