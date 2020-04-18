/* const arr = ['a', 'g', 'c', 'h', 'k'];

console.log(arr.indexOf('smth'));

let str = 'agshdj';
console.log(str[str.length - 1]); */

//Поиск в ширину ближайшего (по количеству шагов) элемента.(см.Openday)

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

    const searched = [];
    console.log(searched);

    while (queueFifo.length) {

        const person = queueFifo.shift();
        console.log(person);

        if (searched.indexOf(person) === -1) {
            if (findEl(person)) {
                console.log(`We have found it! The nearest element is ${person.toUpperCase()}`);
                return true;
            } else {
                queueFifo = queueFifo.concat(graph[person]); // важна именно такая запись с 
                searched.push(person); //переопределением переменной Очереди.

            }
        }
    }

    return false;

};

widthSearch('you');