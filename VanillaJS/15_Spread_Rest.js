//15_Операторы Spread и Rest (ES6)

// Spread:
// разворачивает массивы или объекты
// служит созданию новых массивов или объектов
// трансформирует массивы или объекты

// Rest:
// собирает все аргументы в массив (часто используется в функциях)
// собирает все поля в объектах*

const citiesRu = ['Москва', 'Санкт-Петербург', 'Волгоград', 'Биробиджан']
const citiesEu = ['Paris', 'Berlin', 'Amsterdam']

const populationRu = {
    Moscow: 20,
    Spb: 8,
    Kazan: 5,
    Volgograd: 1,
    Birobidjan: 0.1
}

const populationEu = {
    Paris: 7,
    Berlin: 5,
    Amsterdam: 3
}
//=====================================================================

// Spread с массивами:
// разворачивает массив на элементы
console.log(...citiesEu) //Paris Berlin Amsterdam
// клонирование массива
const newArr = [...citiesEu] //(3) ["Paris", "Berlin", "Amsterdam"] // новый массив с другой ссылкой
// объединение массивов
const allCities = [...citiesEu, ...citiesRu] //(7) ["Paris", "Berlin", "Amsterdam", "Москва", "Санкт-Петербург", "Волгоград", "Биробиджан"]
const allCitiesPlusOne = [...citiesEu, 'Texas', ...citiesRu] // (8) ["Paris", "Berlin", "Amsterdam", "Texas", "Москва", "Санкт-Петербург", "Волгоград", "Биробиджан"]

const allCitiesOldMethod = citiesEu.concat(citiesRu) //(7) ["Paris", "Berlin", "Amsterdam", "Москва", "Санкт-Петербург", "Волгоград", "Биробиджан"]

// Spread с объектами:
// Разворачивание объекта
// Просто развернуть содержимое объекта по аналогии с массивом не получится console.log(...populationEu), т.к
// необходимо место, куда складывать пары ключ-значение console.log({...populationEu}). Только через создание нового объекта.
console.log({ //{Paris: 7, Berlin: 5, Amsterdam: 3}
    ...populationEu
})

// клонирование объекта (с новой ссылкой)
const newObj = { //{Paris: 7, Berlin: 5, Amsterdam: 3}
    ...populationEu
}

// объединение объектов (c новой ссылкой)
// в случае наличия одинаковых ключей будет записан последний
const allPopulation = { //{Paris: 7, Berlin: 5, Amsterdam: 3, Moscow: 20, Spb: 8, …}
    ...populationEu,
    ...populationRu
}
//---------------------------------------------------------------------------------------------

//Practice examples.
const arr = [1, 34, 5, 13, 3, 42]
Math.max(arr)
//NaN
Math.max(...arr)
//42
// old standard
Math.max.apply(null, arr) // т.к. метод apply вторым параметром принимает массив значений
//42

const divs = document.querySelectorAll('div') //NodeList(3) [div, div#box1, div#circle1]
// Однако, это не полноценный массив, а коллекция дом элементов, псевдо-массив.
// __proto__: NodeList содержит ограниченный список методов по сравнению с полноценным массивом.
const nodesArr = [...divs] //(3) [div, div#box1, div#circle1] // превратили в полноценный массив.
Array.isArray(divs)
//false
Array.isArray(nodesArr)
//true
//==========================================================================================================

// Rest
// Синтаксис одинаковый с оператором Spread.
// Отличие в области применения.

// Собирает оставшиеся аргументы в новый массив.
function sum(a, b, ...rest) {
    console.log(a, b, rest) //1 4 (4) [5, 7, 8, 9]
    return a + b + rest.reduce((prev, curr) => prev + curr, 0) //34
}
const numbers = [1, 4, 5, 7, 8, 9]
sum(...numbers) //Spread!

// в деструктуризации
const [a, b, ...rest] = numbers
//>>a
//1
//>>b
//4
//>>rest
//(4) [5, 7, 8, 9]

//аналогично присвоению:
//const a = numbers[0]
//const b = numbers[1]
//----------------------------------------------------------------------------

// Для объектов

const person = {
    name: 'Steve',
    age: 33,
    city: 'Paris',
    country: 'France'
}

const {name, age, ...address} = person

//>>name
//"Steve"
//>>age
//33
//>>address  *
//{city: "Paris", country: "France"}
//--------------------------------------------------------------------------------------

const {...newObjRest} = person // создание нового объекта через оператор Rest
const newObjSpread = {...person} // создание нового объекта через оператор Spread

newObjRest
//{name: "Steve", age: 33, city: "Paris", country: "France"}
newObjSpread
//{name: "Steve", age: 33, city: "Paris", country: "France"}

Object.is(newObjRest, person)
//false
Object.is(newObjSpread, person)
//false
Object.is(newObjSpread, newObjRest)
//false

const person2 = person // новая переменная со ссылкой на прежний объект
Object.is(person, person2)// две ссылки на один и тот же объект
//true