function hello() {
    console.log('Hello', this); //Hello Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
    //global object Window is the context of this function
}

const person = {
    name: 'John',
    age: 25,
    sayHello: hello, // this = person
    sayHelloWindow: hello.bind(window), // this === window
    sayHelloWindow2: hello.bind(this), // this === window // Запись строкой выше и эта равнозначны
    sayHelloWindow3: hello.bind(document), // this = #document
    logInfo: function (job, phone) {
        console.group(`${this.name} INFO:`)
        console.log(`My name is ${this.name}`) // Запись this.name равна записи person.name
        console.log(`My age is ${this.age}`)
        console.log(`My job is ${job}`)
        console.log(`My phone is ${phone}`)
        console.groupEnd()

    }
};

// person.sayHello() //Hello {name: "John", age: 25, sayHello: ƒ} // object person is the context of function
// window.hello() //Hello Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …} 

//В первом случае контекст вызова это глоб объект Window, во втором - созданный нами объект person
//Ключевое слово this всегда динамичное, указывает на контекст, в котором было вызвано
//на то, что от точки слева.
//--------------------------------------------------------------
//Bind

//person.sayHelloWindow() // Hello Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
//Запись hello.bind(window) и hello.bind(this) равнозначны, т к this === window это true

const lena = {
    name: 'Lena',
    age: 66
};
// Чтобы воспользоваться готовой функцией logInfo из объекта person,нужно поменять контекст ее вызова
// через bind:
//person.logInfo.bind(lena)() //My name is Lena

//--------------------------------------
//Метод bind позволяет передавать дополнительные параметры в функцию, первым параметром идет this
//person.logInfo.bind(lena, 'Red Director', '+7-999-123-45-67')()
// или такая запись:
/* const fnLenaInfo = person.logInfo.bind(lena);
fnLenaInfo('Red Director', '+7-999-123-45-67'); */

//Метод Call то же самое, что и Bind, только сразу вызывает функцию, в отличие от bind.
//Метод Apply. Всего два параметра - контекст и массив. Сразу вызывает функцию.

//Наглядно все три метода:
//person.logInfo.bind(lena, 'Red Director', '+7-999-123-45-67')()
//person.logInfo.call(lena, 'Red Director', '+7-999-123-45-67')
//person.logInfo.apply(lena, ['Red Director', '+7-999-123-45-67'])

//внутри метода bind лежит метод apply (см. реализацию в 03_closures.js)


//Пример создания метода в глобальном объекте Array
// с использованием контекста this, для его переиспользования любым массивом.
//this указывает на элемент слева от вызова //arr2.multyArr(7)// this = arr2 и т. п.
let arr = [1, 2, 3, 4, 5];
let arr2 = [3, 5, 7];
/* let num = 5;
let arr2 = arr.map(el => el * num);
console.log(arr2); */

/* let multyArr = (arr, num) => {
    return arr.map(el => el * num);
}
console.log(multyArr(arr, 6)); */

Array.prototype.multyArr = function (num) {
    return this.map(el => el * num);
};

console.log(arr.multyArr(4));
console.log(arr2.multyArr(7));

//>>[ 4, 8, 12, 16, 20 ]
//>>[ 21, 35, 49 ]