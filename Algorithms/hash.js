//Hash Table + Task (Find the amount of the same elements in the list )

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