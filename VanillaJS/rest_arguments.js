/* const smthn = function (a, b) {
    return arguments.length;
};
const res = smthn(3, 4, 6, 7, 4, 3, 8, 6, 4, 6);
console.log(res); // 10 */

/* const func = function (a, b) {
    return arguments.length;
};
const result = func(4, 3, 2);
console.log(result); */
//3

//массиво-подобный объект arguments работает только в ES5, берет ВСЕ переданные в функцию аргументы
//независимо от их количества в скобках самой функции. Но использует только метод length
//и обращение к элементам через индекс.
/* const arLike = function (a, b, c) {
    let res1 = arguments[0] + arguments[1] + arguments[2];
    let res2 = arguments[0] + arguments[1] + arguments[2] + arguments[3];
    return `res1 is ${res1}, res2 is ${res2}`;
};
let result = arLike(1, 2, 3, 4);
console.log(result); */ //res1 is 6, res2 is 10

// В ES6 используют REST параметры (оставшиеся аргументы)
//обращает через ... в полноценный массив со всеми возможностями объекта Array
// можно раскладывать элементы через ...[a,b,c],
// не смешивает с остальными аргументами в скобках функции, в отличие от arguments
/* const arlikeES6 = (...allArgs) => {
    return allArgs.reduce((prev, curr) => {
        return prev + curr;
    }, 10);

};
let result = arlikeES6(1, 2, 3, 4);
console.log(result); */ //20

/* const arlikeES6 = (a, b, ...allArgs) => {
    return allArgs.reduce((prev, curr) => {
        return prev + curr;
    }, 10);

};
let result = arlikeES6(1, 2, 3, 4);
console.log(result); */ //17 В этом примере a и b не являются частью allArgs, в отличие от
//работы массиво-подобного объекта argumrnts

//деструктуризация
/* function arlikeES5(...[a, b, c]) {
    return a + b + c;
};
let result = arlikeES5(1, 2, 3, 4);
console.log(result); */ //6

/* const arlikeES6 = (...[a, b, c]) => {
    return a + b + c;
};
let result = arlikeES6(2, 2, 3, 4);
console.log(result); */ //7

//Пример передачи аргументов с помощью Rest(ES6).
/* const elCountHash = (...arr) => {

    const elCountHashTable = {};

    arr.forEach(el => {
        if (elCountHashTable[el]) elCountHashTable[el] += 1;
        else elCountHashTable[el] = 1;
    });

    return elCountHashTable;

};
let res = elCountHash('d', 'f', 'g', 'd', 1, 1, 1, 'x', 'x', 'p', 12, 123, 123);
console.log(res); */ //{ '1': 3, '12': 1, '123': 2, d: 2, f: 1, g: 1, x: 2, p: 1 }

//Пример передачи аргументов с помощью массиво-подобного объекта arguments(ES5).
/* const elCountHash = function (a, b) {
    const elCountHashTable = {};
    for (let el of arguments) {
        if (elCountHashTable[el]) elCountHashTable[el] += 1;
        else elCountHashTable[el] = 1;
    }
    return elCountHashTable;
};

let res = elCountHash('d', 'f', 'g', 'd', 1, 1, 1, 'x', 'x', 'p', 12, 123, 123, 123);
console.log(res); */ //{ '1': 3, '12': 1, '123': 3, d: 2, f: 1, g: 1, x: 2, p: 1 }

// Если дана строка, из которой нужно сделать аргументы и передать в функцию
//то  внутри скобок при передаче нужно разбить строку на элементы через троеточие, например
//let str = 'dfgd111xxp12123123';
//let res = elCountHash(...str);
//{1: 6, 2: 3, 3: 2, d: 2, f: 1, g: 1, x: 2, p: 1}

//или, если строка содержит разделитель, например, запятую, то сначала нужно 
//создать массив, поделив элементы по запятой, а потом этот массив так же разбить через троеточие
/* let str = 'd,f,g,d,111,x,x,p,12,12,3,12,3';
let arr2 = str.split(',');
let res = elCountHash(...arr2);
console.log(res); */ //{3: 2, 12: 3, 111: 1, d: 2, f: 1, g: 1, x: 2, p: 1}