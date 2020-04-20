//Hash Table + Task (Find the amount of the same elements in the list ). О(1)(сред.случай), O(n)(худ.случай).

/* const book = {
milk: 1.65,
coffee: 3.43
};

console.log(book.milk); */

/* const book = {};

book.milk = 1.65;
book.coffee = 3.43;
book['pipka'] = 77;
book.peter = 'teacher';
console.log(book.milk); */


/* const arr = [1,2,'a',3,4,5];
console.log(arr.findIndex(x=> x === 'a')); */


//Voter
/* const voted = {};
const checkVoted = (name) => {
    if (voted[name])
        console.log(`Get out of here!`);
    else {
        voted[name] = true;
        console.log(`U R WELCOME!`);
    }
};

checkVoted('Peter');
checkVoted('Ivan');
checkVoted('Peter');
checkVoted('Ivan'); */

//Task (Find the amount of the same elements in the list ).

//Var1
/* const hashSort = (arr) => {

    const hashTable = {};

    arr.map(x => {
        if (hashTable[x]) hashTable[x] += 1;
        else hashTable[x] = 1;
    });

    console.log(hashTable);

}; */

//Var2
/* const hashSort = (arr) => {

    const hashTable = {};

    for (let el of arr) {

        if (hashTable[el]) {
            hashTable[el] += 1;
        } else {
            hashTable[el] = 1;
        }

    }
    console.log(hashTable);

}; */

/* hashSort(['r', 't', 't', 'r', 'r', 'r', 'd', 'u', 'k', 1, 4, 4, 6, 6, 6]); */

//Передача из строки в массив потом в функцию
/* const elCountHash = (arr) => {

    const elCountHashTable = {};

    arr.forEach(el => {
        if (elCountHashTable[el]) elCountHashTable[el] += 1;
        else elCountHashTable[el] = 1;
    });

    return elCountHashTable;

};
let str = 'd,f,g,d,111,x,x,p,12,12,3,12,3';
console.log(...str);
let arr2 = str.split(',');
console.log(arr2);
console.log(typeof (arr2));
let res = elCountHash(arr2);
console.log(`Result is:`, res);
//Result is: {3: 2, 12: 3, 111: 1, d: 2, f: 1, g: 1, x: 2, p: 1} */

//----------------------------------------------------------------------------------------

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