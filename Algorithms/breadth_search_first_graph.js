//Поиск в ширину ближайшего (по количеству шагов) элемента. O(V+E) V- кол-во вершин(элементов), E- кол-во ребер.
//(см.Openday) 

// создаем граф взаимосвязей между объектами
const graph = {};

graph.you = ['bob', 'clare', 'alice'];
graph.bob = ['anudzh', 'paggi'];
graph.clare = ['tom', 'jonny'];
graph['alice'] = ['paggi'];
graph.tom = [];
graph.jonny = [];
graph.anudzh = [];
graph.paggi = [];

//создаем формулу определения искомого элемента

const findEl = (name) => {

    if (name[name.length - 1] === 'm')
        return true;
};

// создаем Поиск в ширину по Графу

const widthSearch = (name) => {

    let queueFifo = [];
    queueFifo = queueFifo.concat(graph[name]);
    console.log(queueFifo);

    const searched = []; //Отслеживание уже проверенных имен
    console.log(searched);

    while (queueFifo.length) {

        const person = queueFifo.shift();
        console.log(person);

        if (searched.indexOf(person) === -1) { //Только если не проверялся ранее, индекс отсутствующего элемента в массиве (- 1)
            if (findEl(person)) {
                console.log(`We have found it! The nearest element is ${person.toUpperCase()}`);
                return true;
            } else {
                queueFifo = queueFifo.concat(graph[person]); // важна именно такая запись с переопределением значения переменной Очереди.
                console.log(queueFifo);
                searched.push(person);

            }
        }
    }

    return false;

};

widthSearch('you');

//Output:
/* [ 'bob', 'clare', 'alice' ]
[]
bob
[ 'clare', 'alice', 'anudzh', 'paggi' ]
clare
[ 'alice', 'anudzh', 'paggi', 'tom', 'jonny' ]
alice
[ 'anudzh', 'paggi', 'tom', 'jonny', 'paggi' ]
anudzh
[ 'paggi', 'tom', 'jonny', 'paggi' ]
paggi
[ 'tom', 'jonny', 'paggi' ]
tom
We have found it! The nearest element is TOM */


//-------------------------------------------------------
/* const arr = ['a', 'g', 'c', 'h', 'k'];

console.log(arr.indexOf('smth'));

let str = 'agshdj';
console.log(str[str.length - 1]); */