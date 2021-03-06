//10_Практические примеры применения:
//Общий принцип реализации Прокси - повторение дефолтного функционала(default) с последующим его изменением/расширением(custom).

//Ex.1

const person = {
    name: 'Masha',
    age: '22',
    job: 'Fullstack'
}
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
//---------------------------------------------------------------------------------------------------------------------------

//Ex.2
//Wrapper
//функция будет добавлять дефолтные значения ключам, которые не определены

const withDefaultValue = (target, defaultValue = 0) => {
    return new Proxy(target, {
        get: (target, prop) => (prop in target) ? target[prop] : defaultValue
        //get: (target, prop) => (prop in target) ? target[prop] : target[prop] = defaultValue //*

    })
}

const position = withDefaultValue({
    x: 24,
    y: 67
}, 0)

//>>position
//Proxy {x: 24, y: 67}
//>>position.x
//24
//>>position.y
//67
//>>position.z
//0
//>>position
//Proxy {x: 24, y: 67}

//*
//>>position
//Proxy {x: 24, y: 67}
//>>position.jj
//0
//>>position
//Proxy {x: 24, y: 67, jj: 0}
//-------------------------------------------------------------------------------------------------------------------------

// Ex.3
// Hidden properties
// Функция-обертка для объекта, которая будет прятать свойства, которые мы укажем
// те свойства, которые начинаются с '_' будут скрыты от доступа, хотя в объекте они будут /security
const withHiddenProps = (target, prefix = '_') => {
    return new Proxy(target, {
        //для скрытия по запросу prop in object = true/false
        has: (obj, prop) => (prop in obj) && (!prop.startsWith(prefix)), //prefix доступен по замыканию от внешней функции
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // ownKeys - свойство Proxy, которое говорит, какие ключи находятся внутри объекта
        // Reflect - объект, который позволяет более детально работать с объектами, в частности получить его ключи через ownKeys
        // Reflect.ownKeys(obj) >> мы получаем массив из ключей(строк), example:
        // >>Reflect.ownKeys(position)
        // ["x", "y"]
        ownKeys: obj => Reflect.ownKeys(obj).filter(el => !el.startsWith(prefix)),
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // теперь, благодаря тому, что мы переписали ownKeys мы можем переписать метод get
        // метод get, на самом деле, принимает не два, а три параметра. reciever - сам Proxy, который мы возвращаем,
        // тот объект, с которым ведем работу.
        // метод get отдает нам свойства объекта, в нем нужно сокрыть нужные свойства от отдачи.
        // То есть мы обращаемся не к передаваемому объекту, а к Proxy (reciever), в котором, с помощью ownKeys мы исключили
        // нужные ключи по префиксу "_".
        // Другими словами перенастраиваем метод get с передаваемого объекта, на его обертку (объект Proxy)
        get: (obj, prop, receiver) => (prop in receiver) ? obj[prop] : void 0 // void 0 тоже возвращает undefined, можно написать напрямую undefined
    })
}

const data = withHiddenProps({
    name: 'Steve',
    age: 33,
    _uid: '12345' //должно быть скрыто в любых вариантах запроса
})

//Result output:

//>>data
//Proxy {name: "Steve", age: 33, _uid: "12345"}

//Через get:
//>>data.name
//"Steve"
//>>data.age
//33
//>>data._uid
//undefined

//Через has:
//>>'_uid' in data
//false

//Через цикл (get):
//>>for(let key in data) console.log(key)
//name
//age
//undefined

//>>Object.keys(data)
//["name", "age"]

//---------------------------------------------------------------------------------------------------------------------
//Ex.4
//Optimization

//По сути в примере был реализован функционал записи массива в хэш таблицу.
//При первом обращении, а также, через метод push, мы присваиваим элементу массива его уникальное имя в хэш таблице,
//при повторном обращении используем поиск по этому имени.

const userData = [{
        id: 11,
        name: 'Steve',
        job: 'Fullstack',
        age: '37'
    },
    {
        id: 22,
        name: 'Mary',
        job: 'Designer',
        age: '25'
    },
    {
        id: 33,
        name: 'Bill',
        job: 'Backend',
        age: '40'
    },
    {
        id: 44,
        name: 'Elon',
        job: 'Frontend',
        age: '30'
    }
]

//>>>userData
//[{…}, {…}, {…}, {…}]
//>>userData.find(el => el.id ===4)
//{id: 4, name: "Elon", job: "Frontend", age: "30"}

//Метод find все равно итерирует каждый элемент массива. Если массив будет состоять из миллиона элементов, то потребуется
//совершать миллион итераций при каждом поиске, а это очень затратная операция.
//С помощью Proxy мы можем создать обертку, которая оптимизирует этот процесс.

// Для решения этой задачи просто создадим хэш-таблицу:
const index = {}
userData.forEach(el => index[el.id] = el)

//>>index
//{11: {…}, 22: {…}, 33: {…}, 44: {…}}
//11: {id: 11, name: "Steve", job: "Fullstack", age: "37"}
//22: {id: 22, name: "Mary", job: "Designer", age: "25"}
//33: {id: 33, name: "Bill", job: "Backend", age: "40"}
//44: {id: 44, name: "Elon", job: "Frontend", age: "30"}
//__proto__: Object

//Этому принципу будем следовать реализуя данный класс через Proxy:
// Проксировать мы будем глобальный класс Array
const IndexedArray = new Proxy(Array, {
    construct(target, [args]) { //Этот метод ставит ловушку на момент, когда мы обращаемся через ключевое слово new
        console.log(target) //глобальный класс Array //ƒ Array() { [native code] }
        console.log([args]) //передаваемый массив //[Array(4)]
        //повторяем логику создания хэш таблицы:
        //на этот раз мы будем это делать всего один раз при создании инстанса класса, в отличие от первого подхода.(!)
        const index2 = {}
        args.forEach(el => index2[el.id] = el)
        //default: повторяем логику базового определения массивов
        //return new target(...args) //default: то же самое что создать массив через: const h = new Array(2, 4, 5, 6)// h = [2, 4, 5, 6]
        // возвращаемый массив мы оборачиваем в прокси, чтобы реализовать хэндлеры и внести изменения в логику, отличную от
        // дефолтного создания массивов.
        return new Proxy(new target(...args), { //new target(...args) это массив (arr)
            get(arr, prop) { //ловушка на обращение к свойствам массива users
                // конструкция switch/case, где, если никакой case не сработал - вернем свойство, к которому обращались - default get
                switch (prop) { //switch делается по свойствам - базовое применение
                    case 'push': // т.е. если мы обращаемся к методу push, то:
                        return el => {
                            // сначала повторяем default функционал push.
                            arr[prop].call(arr, el) // = arr['push']/ Вызываем метод пуш в контексте текущего массива и передаем методу добавляемый в массив элемент 
                            //метод call для вызова, т к мы точно знаем, что передаем один параметр (элемент) vs apply

                            // также пополняем нашу хэш таблицу добавленным в массив элементом:(!)
                            index2[el.id] = el
                        }
                        // тут мы реализуем НОВЫЙ метод поиска по хэш таблице, ради этого функционала мы проксировали класс Array(!)
                    case 'findByIndex':
                        return ind => index2[ind]

                    default:
                        return arr[prop]
                }
            }
        })
    }
})

const users = new IndexedArray([{
    id: 11,
    name: 'Steve',
    job: 'Fullstack',
    age: '37'
}, {
    id: 22,
    name: 'Mary',
    job: 'Designer',
    age: '25'
}, {
    id: 33,
    name: 'Bill',
    job: 'Backend',
    age: '40'
}, {
    id: 44,
    name: 'Elon',
    job: 'Frontend',
    age: '30'
}])

//Output default:
//>>users
//Proxy {0: {…}, 1: {…}, 2: {…}, 3: {…}} //Наш массив теперь прокси
//>>users[0]
//{id: 11, name: "Steve", job: "Fullstack", age: "37"}

//>>users.push({id: 777, name: 'Joe'})
//>>users[4]
//{id: 777, name: "Joe"}

//Output Custom:
//>>users.findByIndex(777)
//{id: 777, name: "Joe"}

//users.findByIndex(44)
//{id: 44, name: "Elon", job: "Frontend", age: "30"}

//Таким образом, мы реализовали поиск по хэш таблице, что существенно ускорит работу с  массивами - инстансами нашего прокси класса.
//Пример оптимизации с помощью класса Proxy.