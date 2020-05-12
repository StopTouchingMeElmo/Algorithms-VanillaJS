// 11_Генераторы, Symbol(Symbol.iterator), for of.
// Генераторы - функции, которые могут последовательно (ПОРЦИОННО) выдавать результат работы.

// Специальный синтаксис функции генератора - звездочка после слова function* или перед именем функции function *funcName
// Появляется доступ к спец слову yield
// yield нам порционно выдает желаемый результат

function* strGenerator() {
    yield 'H'
    yield 'E'
    yield 'L'
    yield 'L'
    yield 'O'
}

const str = strGenerator() // функция Генератор ВЕРНЕТ ОБЪЕКТ (proto Generator), у которого есть метод next
// на выходе мы получим объект, у которого есть два ключа value и done

//>>str.next()
//{value: "H", done: false}
//>>str.next()
//{value: "E", done: false}
//>>str.next()
//{value: "L", done: false}
//>>str.next()
//{value: "L", done: false}
//>>str.next().value
//"O"
//>>str.next()
//{value: undefined, done: true} //Generator done: true

function* numGenerator(n = 10) {
    for (let i = 0; i < n; i++) {
        yield i //несмотря на то, что мы находимся в цикле, js не бежит по всему циклу, а ПОРЦИОННО выдает значения вызова(!)
    }
}
const num = numGenerator(4) //(2)

//>>num.next() //(3)
//{value: 0, done: false}
//>>num.next()
//{value: 1, done: false}
//>>num.next()
//{value: 2, done: false}
//>>num.next()
//{value: 3, done: false}
//>>num.next()
//{value: undefined, done: true}

//(1)
for (let k of numGenerator(3)) {
    console.log(k)
}
//0
//1
//2

// Таким образом, чтобы проитерировать функцию Генератор, не обязательно создавать объект (2) и вызывать метод next (3)
// Т. к в функции Генератор по умолчанию определен Symbol(Symbol.iterator), а благодаря тому, что порционно выдается результат
// через yield, console.log внутри цикла понимает на каком этапе находится итерация.

//-----------------------------------------------
// Для примера создадим собственный генератор:
// Создадим обычный объект, без использования генераторов и поля yield:

const iterator = {
    gen(num = 10) {
        let i = 0
        return {
            next() {
                if (i < num) {
                    return {
                        value: i++,
                        done: false
                    }
                }
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}

const it = iterator.gen(5) // метод gen возвращает нам ОбЪЕКТ с методом next, который мы кладем в переменную it
// далее вызываем у объекта it метод next/ также в замыкании у нас переднная переменная num =5 и i = 0

//>>it.next()
//{value: 0, done: false}
//>>it.next()
//{value: 1, done: false}
//>>it.next()
//{value: 2, done: false}
//>>it.next()
//{value: 3, done: false}
//>>it.next()
//{value: 4, done: false}
//>>it.next()
//{value: undefined, done: true}

//--------------------------------------------
// (1) Тема генераторов еще интересна тем, что в JS есть вид цикла FOR OF

for (let k of "ABC") { // String
    console.log(k)
}

//A
//B
//C

for (let k of [1, 2, 3]) { // Array 
    console.log(k)
}

//1
//2
//3

// Цикл FOR OF работает со специальным типом данных в JS - Symbol
// Цикл FOR OF может работать с любым объектом, у которого определен Symbol(Symbol.iterator)(!)

// Например в прототипе глобального класса Array определен Symbol(Symbol.iterator)

// Таким образом, цикл for of нельзя прменить к нашему объекту iterator, для этого нужно определить в нем Symbol(Symbol.iterator):
const iteratorWithSym = {
    [Symbol.iterator](num = 4) {
        let i = 0
        return {
            next() {
                if (i < num) {
                    return {
                        value: i++,
                        done: false
                    }
                }
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}
for (let key of iteratorWithSym) {
    console.log(key)
}
//0
//1
//2
//3

// В функциях Генераторах Symbol(Symbol.iterator) определен по умолчанию.
// В некоторых ситуациях удобно пользоваться функциями Генераторами, в некоторых лучше использовать async/await..