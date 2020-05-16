// // 13_WeakSet (по аналогии с WeakMap)
// Структура данных, схожая с Set, у которой есть свои особенности.
// С помощью ws мы можем избегать различных утечек памяти в JS.
// Значениями могут являться ТОЛЬКО ОБЪЕКТЫ.
// В случае, если к-то объект вычищается 'сборщиком мусора'(obj = null), то тогда он удаляется из ws.

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

const visits = new WeakSet()
visits
    .add(users[0])
    .add(users[1])
    .add(users[2])


//>>visits
//WeakSet {{…}, {…}, {…}}
//[[Entries]]
//0: Object
//1: Object
//2: Object
//__proto__: WeakSet

users.splice(1, 1) // удаляем объект с индексом [1] из массива объектов, не трогая WS

//>>visits
//WeakSet {{…}, {…}}
//[[Entries]]
//0: Object
//1: Object
//__proto__: WeakSet