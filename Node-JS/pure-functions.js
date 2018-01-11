'use strict'
//Check the digit for valid numbers
// function isValidNumber(digit) {
//   return typeof digit === 'number' && !isNaN(digit);
// }
const isValidNumber = digit => typeof digit === 'number' && !isNaN(digit);

//Returns minimum element beetween two default elements
function findMin(a, b) {
  if(isValidNumber(a) && isValidNumber(b)) {
    return a < b ? a : b;
  } else {
    throw "Invalid argument types";
  }
}


//Returns the number of current symbol repeats in the string
// function countChar(str, symbol) {
//   return str.split("").filter(item => item === symbol).length;
// }
const countChar = (str, symbol) => str.split("").filter(item => item === symbol).length;;

//Returns an array in a range beetween start and end
function range(start, end, step) {
  //Check start and end indexes for valid types
  if(!isValidNumber(start) || !isValidNumber(end)) {
    throw "Invalid argument types: start and end should be valid numbers!";
  }
  //Swap start and end, if end > start
  start = start > end ? [end, end = start][0]:start;
  //If step is not declared, it means 1
  step = step == undefined ? 1 : step;
  //Check step for a valid number
  if(!isValidNumber(step)){
    throw "Invalid argument types: step should be valid number!"
  }

  let arr = [];
  for (var i = start; i <= end; i+=step) {
    arr.push(i);
  }
  return arr;
}

//Returns the sum of all numbers in a range
// function sum(arr) {
//   return arr.reduce((accumulator, item) => accumulator += item);
// }
const sum = arr => arr.reduce((accumulator, item) => accumulator += item);

//Concatenate all arrays in one array with reduce and concat
var	arrays	=	[[1,	2,	3],	[4,	5],	[6]];
const fullArr = arrays.reduce((accumulator, item) => accumulator.concat(item));

//VECTOR
//Vector constructor
function Vector(x,y) {
  this.x = x;
  this.y = y;
}
//Add new vector to default
Vector.prototype.plus = function (addVector) {
  return new Vector(this.x + addVector.x, this.y + addVector.y);
}
//Subtract other vector from default
Vector.prototype.minus = function (subVector) {
  return new Vector(this.x - subVector.x, this.y - subVector.y);
}
//Defines a new property "length", calculating a length of Vector
Object.defineProperty(Vector.prototype, "length", {
  get: function () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
});

//Usage of vectors
var vector1 = new Vector(1,2);
var vector2 = new Vector(3,4);
console.log(vector1.plus(vector2).length);

//IMPORTANT!!!
//Usage of localStorage
// localStorage.setItem("username",	"marijn");
// console.log(localStorage.getItem("username"));
// //	→	marijn
// localStorage.removeItem("username");

try {
  console.log(findMin(1, 4));
  // console.log(findMin(2, -2));
  // console.log(findMin(NaN, 1));

  console.log(countChar("fff sdsdff f", "f"));

  // console.log(sum(range(1, 10, 2)));

  // console.log(fullArr);
} catch(error) {
  console.log(error);
}
