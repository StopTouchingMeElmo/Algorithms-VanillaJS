//09_Proxy
//Теория.

// Proxy - класс в JS, который позволяет создавать различные ловушки для объектов(просто переписывая и дополняя методы), 
// функций(ловушка на вызов функции с помощью apply),
// классов (ловушка на инициализацию класса по ключевому слову new, через construct) и т.д.,

// что позволяет гибко кастомизировать их функционал, расширяя его или изменяя.


// 1. Objects
const person = {
    name: 'Masha',
    age: '22',
    job: 'Fullstack'
}

//В constructor данного класса мы передаем два парметра:
//target - та цель, на которую хотим повесить прокси,
//{handlers} - объект набора хэндлеров, т.е. те методы, которые позволяют сделать ловушки для объекта или функциии или класса и т п.
// const smProxyObj = new Proxy (target, {handlers})


//>>op
//>>Proxy {name: "Masha", age: "22", job: "Fullstack"}
//>>op.name
//>>"Masha"
//Т.е. мы обращаемся уже не к объекту person, а к объекту Proxy через переменную op.(!)
const op = new Proxy(person, {
    //Тут мы ставим ловушку на метод get и выводим, например, console.log при обращении к полю объекта
    //В этом и заключается основная идея проксирования объектов.
    //В организации ловушек и переписывании или дополнении базового функционала.(!)
    get(target, prop) { // метод get всегда что-то возвращает, в данном случае -*
        //custom:
        console.log('Target:', target);
        console.log('Prop:', prop);
        //>>op.age
        //Target: {name: "Masha", age: "22", job: "Fullstack"}
        //Prop: age
        //'22'

        return target[prop] //*объект по ключу(значение поля).//default get method
    },
    //В Proxy существует большое количество различных методов. Основные get, set, has, deleteProperty и др.
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    set(target, prop, value) { //value - то значение, которое хотим добавить op.age = 30(value) 
        //target[prop] = value //default set method
        //custom:
        if (prop in target) {
            target[prop] = value
        } else {
            throw new Error(`No ${prop} field in ${target}`)
        }
    },
    has(target, prop) {
        //return ['name', 'age', 'job'].includes(prop)//default has method
        //>>'name' in op
        //true
        //'height' in op
        //false

        //custom:
        return ['age', 'job'].includes(prop)
        //>>'name' in op
        //false
    },
    deleteProperty(target, prop) {
        console.log(`Deleting... ${prop}`) // custom
        delete target[prop] // default deleteProperty method
        return true
        //>>delete op.age
        //Deleting... age
        //true
        //op
        //Proxy {name: "Masha", job: "Fullstack"}
    }
})
//-----------------------------------------------------------------------------------------------------

// 2.Functions
const log = text => `Log: ${text}`;

const fp = new Proxy(log, {
    // (!) сначала нужно отследить, когда наша функция (target = log) будет вызываться (перехватить вызов функции)>> apply method
    apply(target, thisContext, argsArray) { // >> fp('someText')
        console.log(target) //text => `Log: ${text}`
        console.log(thisContext) //undefined
        console.log(argsArray) // ["someText"]
        //теперь выполняем саму функцию и возвращаем результат
        //для вызова функции применяем метод apply, т. к. он принимает массив аргументов - универсальное решение
        //для работы с любым количеством парметров
        //default:
        //return target.apply(thisContext, argsArray) // "Log: someText"
        //custom:
        //теперь мы можем как угодно преобразовывать изначальную функцию(log), например:
        return target.apply(thisContext, argsArray).toUpperCase() //"LOG: SOMETEXT"

    }
})
//-----------------------------------------------------------------------------------------------------

// 3. Classes и ключевое слово new
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

//т.к мы создаем прокси класс, то название переменной с Большой буквы
const PersonProxy = new Proxy(Person, {
    //для того, чтобы отследить инициализацию нового класса, через ключевое слово new**,
    //нужно использовать trap(ловушку) construct
    construct(target, argsArray) { //по аналогии с методом apply в функциях
        console.log('Construct...')
        //базовое использование ловушки над коструктором класса (default):
        //мы возвращаем НОВЫЙ объект target и spread массива аргументов
        //return new target(...argsArray) //(1)

        //чтобы на выходе получать не new Person, а объект Proxy
        //нужно инициализацию нового объекта обернуть в Proxy:

        return new Proxy(new target(...argsArray), { //(!) и тут в объекте хендлеров мы можем отлавливать и видоизменять любую логику
            get(trgt, prop) {
                console.log(`Any changing code u want ${prop}`)
                return trgt[prop]
            }
        })

    }
})

//const p = new PersonProxy('Maxin', '30') //** (1)
// Construct...
//>> p
// Person {name: "Maxin", age: "30"}

const p = new PersonProxy('Maxin', '30') //** (2)
// Construct...
//>> p
// Proxy {name: "Maxin", age: "30"}

//>> p.age
//Any changing code u want age
//"30"

//-----------------------------------------------------------------------------------------------------
//Практические примеры применения: (см. 09_proxy.ex.js)

const op2 = new Proxy(person, {
    get(target, prop) {
        //custom
        if (!(prop in target)) {
            return prop.split('_').map(el => target[el]).join(' ');
        } else return target[prop] //default
    }
})

//default output:
//>>op2.age
//"22"
//custom output:
//>>op2.age_job_name_name
//"22 Fullstack Masha Masha"
//op2.name_name_name_job_job_job_age_age_job
//"Masha Masha Masha Fullstack Fullstack Fullstack 22 22 Fullstack"