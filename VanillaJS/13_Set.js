// 13_дополнительные Структуры данных в JS (Map, Set, WeakMap, WeakSet)
// SET
// По сравнению с Map более простая структура данных.
// Структура данных, которая возвращает новый Set объект, состоящий из УНИКАЛЬНЫХ значений ЛЮБОГО ТИПА, в единственном экземпляре, исключающих дубликаты.
// В конструктор Set передаем итерируемый объект, состоящий из значений ЛЮБОГО ТИПА. Как примитивы, так и объекты любого типа.
// new Set([iterable])

// Идея в том, что каждое значение внутри Set уникально. (!)

const set = new Set([1, 1, 1, 2, 2, 2, 3, 3, 3])
//>>set
//Set(3) {1, 2, 3} // Объект Set с уникальными значениями.

//Методы

set
    .add(10) // Метод add возвращает обновленный Set объект
    .add(20)
    .add(10) // повторное значение, будет проигнорировано
//>>set
//Set(5) {1, 2, 3, 10, 20}

set.values()
//SetIterator {1, 2, 3, 10, 20}
set.keys()
//SetIterator {1, 2, 3, 10, 20}
// Результат один и тот же, т. к. объект Set хранит только значения, без ключей. Однако, эти методы присутствуют в Set
// для обратной совместимости с более сложным объектом Map.
set.entries()
// SetIterator {1 => 1, 2 => 2, 3 => 3, 10 => 10, 20 => 20}
// set.entries() тоже присутствует, однако, тут значение дублирется в ключ, именно поэтому keys и values дают одинаковый результат. (!)
// Это сделано для того, чтобы мы могли из Set делать Map.

set.has(444)
//false
set.has(10)
//true
set.size
//5
//>>set.delete(1)
//true
//>>set.size
//4
//>>set.clear()
//>>set.size
//0

// Итерация for of:

for (let key of set) console.log(key) // ключи они же значения
//1
//2
//3
//10
//20
//=============================================================================================

//Пример практического применения.

// Задача. Написать функцию, которая будет возвращать уникальные значения из массива.
function uniqVal(arr) {
    //return new Set(arr) //Set(3) {2, 3, 55}
    //return Array.from(new Set(arr)) //(3) [2, 3, 55]
    return [...new Set(arr)] //(3) [2, 3, 55]
}
uniqVal([2, 2, 2, 3, 3, 3, 55, 55, 55])