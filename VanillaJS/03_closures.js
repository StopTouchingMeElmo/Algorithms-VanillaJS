// Замыкания это по сути функция внутри другой функции
/* function createCulcFunc(n) {
    return function () {
        console.log(100 * n);
    };
}

const culc = createCulcFunc(42); // теперь в этой переменной лежит возвращенная функция и переменная
// n со значением 42

culc() //теперь мы вызываем возвращенную функцию и применяем замкнутое в ней значение//4200
//другими словами внутренняя функция была вызвана в контексте основной функции и получила доступ к
//ее области видимости, в данном случае к переменной n со значением 42 */

//можно записать короче:
//createCulcFunc(42)();


//-----------------------------------------
// Примеры

/* function incremento(num1) {
    return function (num2) {
        return num1 + num2;
    };
}

const closureOne = incremento(1); // num1 = 1 (замыкание); function(num2)
const closureTwo = incremento(2); // num1 = 2 (замыкание); function(num2)

console.log(closureOne(10)); // num1 = 1; function(10)// 11
console.log(closureTwo(10)); // num1 = 2; function(10)// 12 */

//-----------------------------

/* function urlGenerator(domain) {
    return function (url) {
        return `https://${url}.${domain}`;
    };
}

const urlCom = urlGenerator('com'); //замыкание
console.log(urlCom('google')); // google.com
console.log(urlCom('yahoo')); // yahoo.com

const urlRu = urlGenerator('ru'); // замыкание
console.log(urlRu('yandex')); // yandex.ru
console.log(urlRu('vk')); // vk.ru */
//--------------------------------------

//Задача реализовать метод присвоения контекста bind
//Решение:

function bind(contextPerson, fnLogPerson) {
    return function (...args) { // оператор rest, чтобы иметь возможность передавать неогранич кол-во значений. rest берет разрозненные аргументы и объединяет их в массив
        fnLogPerson.apply(contextPerson, args); // принимает два параметра - контекст и массив.
    }
}

//Условия:
function logPerson() {
    console.log(`Person ${this.name}, ${this.age}, ${this.job}`);
}

const person1 = {
    name: 'Mike',
    age: 22,
    job: 'frontend',

};
const person2 = {
    name: 'Kate',
    age: 20,
    job: 'backend',


};

//Вызов:
/* const bind1 = bind(person1, logPerson);
console.log(bind1()); //Person Mike, 22, frontend

const bind2 = bind(person2, logPerson);
console.log(bind2()); // Person Kate, 20, backend
 */

//короткая запись вызова
console.log(bind(person1, logPerson)());
console.log(bind(person2, logPerson)());