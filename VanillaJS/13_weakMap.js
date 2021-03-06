// 13_WeakMap
// Структура данных, схожая с Map, у которой есть свои особенности.
// С помощью wm мы можем избегать различных утечек памяти в JS.

let obj = {
    'name': 'Alex'
}

const map = new Map()
map.set(obj, 'Val of obj')

obj = null

//>>map
//Map(1) {{…} => "Val of obj"}
//>>map.get(obj)
//undefined         (**)  (!)

// Получается, после того, как мы обнулили obj, мы потеряли возможность обращаться к значению, 
// которое было присвоено ключу obj внутри Map объекта.
// НО! ключ-значение, по-прежнему, лежит внутри объекта Map и занимает определенный объем памяти.

// В JS существует 'сборщик мусора', который, видя, что объект обнулен и не используется - освобождает память от этого объекта.
// Но, если ДО обнуления, объект был куда-то записан, он там остается.*
// Это нормальное поведение, но в случае с Map, когда объект используется в роли ключа какого-то значения, при его обнулении (удалении ссылки на объект),
// мы теряем доступ к значению**, а значит отсутствует смысл хранения таких данных. Память расходуется без пользы.

let obj2 = {
    'name': 'Jack'
}
const arr = [obj2]
obj2 = null

//>>obj2
//null
//>>arr
//[{…}]   (*)
//==========================================================================

// WM позволяет нам избежать такой ситуации.
// В WM ключами могут являться ТОЛЬКО ОБЪЕКТЫ   (!)
// По сути WM это Map, но с ограничениями. Weak - слабая.
// У WM есть только методы get, set, has и delele.

let obj3 = {
    'name': 'Alex'
}

//const mapW = new WeakMap([
//    [obj3, 'obj val']
//])

const mapW = new WeakMap()
mapW.set(obj3, 'obj value')

obj3 = null

//Теперь смотрим разницу, между Map объектом и WM объектом. (!)
// WM не содержит свойств, он пустой. No properties***

//>>map
//Map(1) {{…} => "Val of obj"}
//[[Entries]]
//0: {Object => "Val of obj"}
//size: (...)
//__proto__: Map

//>>mapW
//WeakMap {{…} => "obj value"}
//[[Entries]]
//No properties     (***)
//__proto__: WeakMap

//console.log(map) //Map { { name: 'Alex' } => 'Val of obj' }
//console.log(mapW) //WeakMap { [items unknown] }****

// ****Особенность заключается в том, что мы не можем знать наверняка, в какое время интерпретатор JS удалит неиспользуемый
// ключ(объект) из WM, поэтому отсутствует метод size, т.к. количество элементов невозможно определить точно в определенный период времени.
//=======================================================================================

// Пример практического применения:
// Задача. Проверить пользователя по хэшу.
// Если пользователь есть в хэше - вернуть его значение.
// Если нет. То, сначала, добавить в хэш, а потом вернуть значение.

let alex = {
    name: 'Alex'
}
let steve = {
    name: 'Steve'
}

const cache = new WeakMap()

function cacheUser(user) {
    if (!cache.has(user)) cache.set(user, new Date())
    return cache.get(user)
}

cacheUser(alex)
cacheUser(steve)

alex = null

console.log(cache)

//WeakMap {{…} => Sat May 16 2020 07:34:34 GMT+0300 (Moscow Standard Time), 
//{…} => Sat May 16 2020 07:34:34 GMT+0300 (Moscow Standard Time)}
//[[Entries]]
//0: {Object => Sat May 16 2020 07:34:34 GMT+0300 (Moscow Standard Time)}
//__proto__: WeakMap

// При этом нужно много раз обновить браузер, чтобы увидеть, что обнуленный объект удалился из WM.
// Время его удаления не определено.