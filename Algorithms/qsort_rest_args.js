//Quick Sort. O(n*logN)(лучший он же средний случай), O(n*n)(худший случай).
//Зависит от выбора опорного (pivot) элемента. Если выполнять случ. поиск pivot, то будет сред. случай.

// мой первый вариант кода быстрой сортировки
/* const qsort = (arr) => {
    if (arr.length < 2) return arr;

    else {
        let pivot = arr[0];
        let less = [];
        let more = [];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] <= pivot) less.push(arr[i]);
            else if (arr[i] > pivot) more.push(arr[i]);
        }
        console.log(pivot);
        console.log(less);
        console.log(more);
        return qsort(less).concat(pivot, qsort(more));
    }

};

console.log(qsort([10, 5, 2, 3, 11, 0, 255, 300])); */

/* let arr1 = [2];
let arr2 = [3];
console.log(arr1.concat(arr2)); */

// вариант кода быстрой сортировки оптимизированный

/* const qsort = (arr) => {

    if (arr.length < 2) return arr;

    let pivot = arr[0];
    const less = arr.slice(1).filter(el => el <= pivot);
    const more = arr.slice(1).filter(el => el > pivot);
    return [...qsort(less), pivot, ...qsort(more)];

};
console.log(qsort([10, 5, 2, 3, 11, 0, 255, 300])); */

/* let str = '957682413';
let strArr = str.split('');
console.log(strArr);

const qsort = (arr) => {
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const less = arr.slice(1).filter(x => x <= pivot);
    const more = arr.slice(1).filter(x => x > pivot);
    return [...qsort(less), pivot, ...qsort(more)].join('');
};
console.log(qsort(strArr)); */

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let variable = 7;
//console.log(arr1.concat(arr2, variable).join(''));// 1234567

let rev = arr1.reverse();

let new1 = arr1.concat(arr2);




//Создание таблицы умножения для всех элементов массива. Например,если массив состоит из элементов [2, 3, 7, 8, 10], сначала каждый элемент умножается на 2,
// затем каждый элемент умножается на 3 и т д.

//Вариант с передачей готового массива
/* const multiply = (arr) => {

    let res = [];

    for (let el of arr) {
        res.push(arr.map(x => x * el));
    }
    return res.forEach(el => console.log(el));

};
console.log(multiply([2, 3, 7, 8, 10]));
//Output:
//(5) [4, 6, 14, 16, 20]
//(5) [6, 9, 21, 24, 30]
//(5) [14, 21, 49, 56, 70]
//(5) [16, 24, 56, 64, 80]
//(5) [20, 30, 70, 80, 100]
//undefined */

//Вариант с передачей строки одинарных цифр
/* const multiply = (...arr) => {

    let res = [];

    for (let el of arr) {
        res.push(arr.map(x => x * el));
    }
    return res.forEach(el => console.log(el));

};
let str = '3276873';
console.log(multiply(...str));
//Output:
//(7) [9, 6, 21, 18, 24, 21, 9]
//(7) [6, 4, 14, 12, 16, 14, 6]
//... */

//Вариант с передачей строки символов с более, чем один знак
//с деструктуризацией массива
/* const multiply = (...arr) => {

    let res = [];

    for (let el of arr) {
        res.push(arr.map(x => x * el));
    }
    return res.forEach(el => console.log(el));

};

let str = '32,768,73,64';
let strArr = str.split(',');
console.log(strArr);
//(4) ["32", "768", "73", "64"]
console.log(multiply(...strArr));
//Output:
//(4) [1024, 24576, 2336, 2048]
//(4) [24576, 589824, 56064, 49152]
//(4) [2336, 56064, 5329, 4672]
//(4) [2048, 49152, 4672, 4096] */

//без деструктуризации
/* const multiply = (arr) => {

    let res = [];

    for (let el of arr) {
        res.push(arr.map(x => x * el));
    }
    return res.forEach(el => console.log(el));

};

let str = '32,768,73,64';
let strArr = str.split(',');
console.log(strArr);
//(4) ["32", "768", "73", "64"]
console.log(multiply(strArr));
//Output:
//(4) [1024, 24576, 2336, 2048]
//(4) [24576, 589824, 56064, 49152]
//(4) [2336, 56064, 5329, 4672]
//(4) [2048, 49152, 4672, 4096] */

//Вариант с передачей в функцию с rest аргументом f(...gotArr) массива без деструктуризации f(sentArr),
//выдаст ошибку NaN, так как на вход придет всего 1 элемент(массив), а не множество rest аргументов. 