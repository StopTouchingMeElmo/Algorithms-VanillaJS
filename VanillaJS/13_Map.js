//13_дополнительные Структуры данных в JS (Map, Set, WeakMap, WeakSet)
// MAP

const obj = {
    name: 'Steve',
    age: 33,
    job: 'proger'
}

const arrObj = [
    ['name', 'Bill'],
    ['age', 33],
    ['job', 'proger']
]

// из объекта в массив
// console.log(Object.entries(obj))
// [ [ 'name', 'Steve' ], [ 'age', 33 ], [ 'job', 'proger' ] ]

// из массива в объект
//>>Object.fromEntries(arrObj)
//{name: "Bill", age: 33, job: "proger"}
//----------------------------------------------------

// Map по сути это усложненный объект, КЛЮЧАМИ КОТОРОГО МОГУТ БЫТЬ ЛЮБЫЕ ТИПЫ ДАННЫХ.
// Например, объект (*), NaN и т п.
// Map работает только с классами, которые содержат Symbol(Symbol.iterator)

const map = new Map(arrObj)
//>>map
//Map(3) {"name" => "Bill", "age" => 33, "job" => "proger"}

//const map2 = new Map(obj) //Error!
//Uncaught TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))   (!)
// Т.о. map работает только с итерируемыми классами [Symbol(Symbol.iterator)].
// Простой объект не является итерируемым.

// Чтобы создать map из простого объекта: объект в массив, массив в map:
const map3 = Object.entries(obj)
//>>map3
//(3) [Array(2), Array(2), Array(2)]
const mapFromObj = new Map(map3)
//>>mapFromObj
//Map(3) {"name" => "Steve", "age" => 33, "job" => "proger"}

//Преимущества Map в сравнении с Обычным Объектом:
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Map
// Ключами Объекта выступают Строки и Символы, в то время как любое значение может быть ключом Map, включая функции, объекты и примитивы.
// Map - итерируемый объект и может быть итерирован напрямую, в то время как Объект требует ручного получения списка ключей и их итерации.
// В отличие от Объектов, ключи в Map упорядочены. Таким образом, во время итерации Map, ключи возвращаются в порядке вставки.
// Вы легко можете получить количество элементов в Map с помощью свойства size, в то время как количество элементов Объекта может быть определено только вручную.
// Map может иметь более высокую производительность в случаях частого добавления или удаления ключей. (!)

// Пример обычной хэш-таблицы:

//>>for (let [key, value] of graph) {console.log(key, value)}
// Uncaught TypeError: graph is not iterable // отсутствует Symbol(Symbol.iterator)

// Порядок добавления элементов не имеет значения в обычной хэш-таблице, ключи не упорядочены:
//>>graph
//alice: ["paggi"]
//anudzh: []
//bob: (2) ["anudzh", "paggi"]
//clare: (2) ["tom", "jonny"]
//jonny: []
//paggi: []
//tom: []
//you: (3) ["bob", "clare", "alice"]

const graph = {};
graph.you = ['bob', 'clare', 'alice'];
graph.bob = ['anudzh', 'paggi'];
graph.clare = ['tom', 'jonny'];
graph['alice'] = ['paggi'];
graph.tom = [];
graph.jonny = [];
graph.anudzh = [];
graph.paggi = [];
//------------------------------------------------------

// Методы Map:

//Создать новое поле(ключ-значение):
map
    .set('newField', 42) //метод set возвращает обновленный map
    //Map(4) {"name" => "Bill", "age" => 33, "job" => "proger", "newField" => 42}
    .set(obj, 'Value of object') // в качестве КЛЮЧА передаем ОБЪЕКТ (*)
    //Map(5) {"name" => "Bill", "age" => 33, "job" => "proger", "newField" => 42, {…} => "Value of object"}
    .set(NaN, 'Value of NaN')
//Map(6) {"name" => "Bill", "age" => 33, "job" => "proger", "newField" => 42, {…} => "Value of object", NaN => 'Value of NaN' }

//Обратиться к полям:
map.get('age')
//33
map.get(obj)
//"Value of object"
map.get(NaN)
//"Value of NaN"
map.has(obj) //boolean
//true
map.size
//6

//map.delete('name')
//map.has('name')
//false
//map.clear() // очистить map
//map.size
//0
//=============================================================

// Итерация по Map [Symbol(Symbol.iterator)]:

for (let [key, value] of map) {
    console.log(key, value)
}
//name Bill
//age 33
//job proger
//newField 42
//{ name: 'Steve', age: 33, job: 'proger' } 'Value of object'
//NaN 'Value of NaN'

for (let value of map.values()) {
    console.log(value)
}
//Bill
//33
//proger
//42
//Value of object
//Value of NaN

for (let key of map.keys()) {
    console.log(key)
}
//name
//age
//job
//newField
//{ name: 'Steve', age: 33, job: 'proger' }
//NaN

for (let entrie of map.entries()) {
    console.log(entrie)
}
//[ 'name', 'Bill' ]
//[ 'age', 33 ]
//[ 'job', 'proger' ]
//[ 'newField', 42 ]
//[ { name: 'Steve', age: 33, job: 'proger' }, 'Value of object' ]
//[ NaN, 'Value of NaN' ]

map.forEach((val, key, map) => console.log(val, key))
//Bill name
//33 "age"
//proger job
//42 "newField"
//Value of object {name: "Steve", age: 33, job: "proger"}
//Value of NaN NaN
//=====================================================================================

//Трансформации:

// Из Map в массив:
const arr = Array.from(map)
//>>arr
//[Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]
const arr2 = [...map] //Spread
//>>arr2
//[Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]

// Из Map в объект:
const mapObj = Object.fromEntries(map.entries())
//>>mapObj
//{name: "Bill", age: 33, job: "proger", newField: 42, [object Object]: "Value of object", …}
//Так как в обычных объектах ключами не могут быть объекты, JS привел, с помощью метода toString объект-ключ из Map к строке [object Object].
//========================================================================================

// Пример применения Map.
// Все те же случаи, что при использовании обычных объектов, плюс особенность Map с ключами-объектами:

// Задача: для каждого пользователя записать время, когда он просматривал сайт или статью.
const users = [{
        name: 'Alex'
    },
    {
        name: 'Ann'
    },
    {
        name: 'Gleb'
    }
]

const visits = new Map()

visits
    .set(users[0], new Date())
    .set(users[1], new Date(new Date().getTime() + 1000 * 60))
    .set(users[2], new Date(new Date().getTime() + 5000 * 60))

function lastVisit(name) { // То есть как ключ мы передаем ОБЪЕКТ пользователя, в ответ получаем нужное значение
    return visits.get(name)
}
//>>lastVisit(users[0])
//Thu May 14 2020 05:49:53 GMT+0300 (Moscow Standard Time)
//lastVisit(users[1])
//Thu May 14 2020 05:54:27 GMT+0300 (Moscow Standard Time)