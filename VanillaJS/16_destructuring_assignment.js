//16_Деструктуризация (destructuring assignment) – это особый синтаксис присваивания, 
//при котором можно присвоить массив или объект сразу нескольким переменным, разбив его на части.

function culcVal(a, b) {
    return [a + b, b - a, a * b, a / b, a + b - 1]
}

//Старый подход
/* const res = culcVal(40, 50)
const sum = res[0] //90
const sub = res[1] //10 */
//=====================================================================================

// Деструктуризация с массивами.

/* const [sum, sub] = culcVal(40, 50)
sum
//90
sub
//10 */

//Если необходимо проигнорировать переменную
/* const [sum, , mult] = culcVal(40, 50)
sum
//90
mult
//2000 */

//Положить все оставшиеся переменные в отдельный массив(оператор Rest)
const [sum, , mult, ...rest] = culcVal(40, 50)
sum
//90
mult
//2000
rest
//(2) [0.8, 89]

// При работе с деструктуризацией мы можем задавать значения по умолчанию, которые будут применяться в случае, 
// если значение не определено. 
function culcVal2(a, b) {
    return [a + b, b - a, a * b, undefined, a + b - 1] //полный синтаксис работы деструктуризации с массивами
}
const [sum2, , mult2, div = 'Нет деления', ...rest2] = culcVal2(40, 50)

div
//"Нет деления"
//=========================================================================================

// Деструктуризация с объектами

const person = {
    name: 'Alex',
    age: 42,
    address: {
        counntry: 'Norway',
        city: 'Oslo'
    },
    
}

const person2 = {
    name2: 'Alex',
    age2: 42,
    address2: {
        counntry2: 'Norway',
        city2: 'Oslo'
    },
    
}

// const name = person.name
// const age = person.age
// Также можем задавать дефолтные значения для несуществующих в изначальном объекте ключей.*
// Можем делать деструктуризацию объектов внутри основного объекта***
const {name, age, car = 'default car', address: {counntry, city: myTown} } = person

name
//"Alex"
age
//42
car
//"default car"*

//***
//address
//Uncaught ReferenceError: address is not defined
counntry
//"Norway"
//city
//Uncaught ReferenceError: city is not defined
myTown
//"Oslo"


// Можем присваивать значение ключа объекта другой переменной, при этом с возможностью задать дефолтное значение этой переменной.**
// Также можем использовать оператор rest для оставшихся полей
const {name2: newVar = 'def of new var', age2, car2 = 'default car', ...restInfo} = person2

//name2
//Uncaught ReferenceError: name2 is not defined
newVar
//"Alex"**
restInfo
//{address2: {…}}
//========================================================================================

// Пример использования на практике*
function logPerson (per){
    console.log(per.name + ' ' + per.age)
}
logPerson(person)
//Alex 42

function logPerson2 ({name, age}){ //*
    console.log(name + ' ' + age)
}
logPerson2(person)
//Alex 42

function logPerson3 ({name: newName = 'def name', age}){ //*
    console.log(newName + ' ' + age)
}
logPerson3(person)
//Alex 42