//recursion example с базовой и рекурсивной частью.
/* const rec = (i) => {
    console.log(i);
    if (i >= 100) return;
    else rec(i+1);
};

rec(-5); */

// пример работы стека вызовов
/* const greet = (name) => {
    console.log(`hello, ` + name + `!`);
    greet2(name);
    console.log(`getting ready to say bye...`);
    bye();
};

const greet2 = (name) => {
    console.log(`how are you, ` + name + `?`);
};

const bye = () => {
    console.log(`ok, bye!`);
};

greet("Ann"); */

//стек вызовов с рекурсией
/* const factorial = (x) => {
    if (x === 1) return 1;             //завершается первым в стэке вызовов, возвращает 1 и возвращает управление, удаляется из стэка
    else return x * factorial(x - 1);  //
};                                     //

console.log(factorial(5)); */

//проссумировать все числа и вернуть сумму через цикл

/* const summing = (arr) => {
    let total = 0;
    arr.forEach(element => {
        return total += element;
    });
    return total;
};

console.log(summing([2, 4, 6])); */

/* const summing = (arr) => {
    let total = 0;

    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
};
console.log(summing([2, 4, 6])); */

//проссумировать все числа и вернуть сумму через рекурсию

/* const sum = (arr) => {

    if (arr.length === 0) return 0;
    else return arr[0] + sum(arr.slice(1));

};
console.log(sum([2, 4, 6])); */

//проссумировать все числа и вернуть сумму через reduce

/* let arr = [2, 4, 6];
let sum = arr.reduce((prev, curr) => {
    return prev + curr;
});
console.log(sum); */

//рекурсивная функция для подсчета элементов в списке

/* const sum = (arr) => {

    if (arr.length === 0) return 0;
    else return 1 + sum(arr.slice(1));

};
console.log(sum([0, 1, 2, 3, 4, 5])); */

/* сначала заполняется стек вызовов(читать снизу вверх)

[0];
[5];
[4, 5];
[3, 4, 5];
[2, 3, 4, 5];
[1, 2, 3, 4, 5];
(первое выполнение рекурсии - минус один первый элемент массива)

далее, после достижения базового случая, то есть пустого массива, возвращается 0 и начинает выполняться основной код(читать сверху вниз) с одновременным исключением выполненных вызовов из стека.

1 + 0 = 1 - возвращается;
1 + 1 = 2 - возвращается и т;
1 + 2 = 3;
1 + 3 = 4;
1 + 4 = 5;
1 + 5 = 6; */

//рекурсивная функция для поиска большего элемента

/* const bigest = (arr) => {

    if (arr.length === 1) return arr[0];
    else if (arr[0] < arr[1]) return bigest(arr.slice(1));
    else if (arr[0] > arr[1]) return bigest(arr.filter(it => it !== arr[1]));

};
console.log(bigest([1, 5, 10, 25, 16, 17]));

let dd = [1, 5, 10, 25, 16, 17];
dd.splice(1, 1);
console.log(dd); */