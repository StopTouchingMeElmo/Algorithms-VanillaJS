//09_Proxy
//Теория.

//Proxy - класс в JS, который позволяет создавать различные ловушки для объектов, функций, классов и т.д.

//Objects
const person = {
    name: 'Masha',
    age: '22',
    job: 'Fullstack'
}

//В constructor данного класса мы передаем два парметра:
//targrt - та цель, на которую хотим повесить прокси,
//handlers - набор хэндлеров, т.е. те методы, которые позволяют сделать ловушки для объекта или функциии или класса и т п.
// const smProxyObj = new Proxy (target, {handlers})


//>>op
//>>Proxy {name: "Masha", age: "22", job: "Fullstack"}
//>>op.name
//>>"Masha"
//Т.е. мы обращаемся уже не к объекту person, а к объекту Proxy через переменную op.
const op = new Proxy(person, {
    //Тут мы ставим ловушку на метод get и выводим, например, console.log при обращении к полю объекта
    //В этом и заключается основная идея проксирования объектов.
    //В организации ловушек и переписывании или дополнении базового функционала.(!)
    get(target, prop) { // метод get всегда что-то возвращает, в данном случае -*
        //custom:
        console.log('Target:', target);
        console.log('Prop:', prop);
        //op.age
        //Target: {name: "Masha", age: "22", job: "Fullstack"}
        //Prop: age
        //'22'

        return target[prop] //*объект по ключу(значение поля).//default get method
    },
    //В Proxy существует большое количество различных методов. Основные get, set, has и др.
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
    has() {

    }
})
//-----------------------------------------------------------------------------------------------------
//Практические примеры применения:

//По сути в примере был реализован функционал записи массива в хэш таблицу.
//При первом обращении мы присваиваим элементу массива его уникальное имя в хэш таблице,
//при повторном обращении используем поиск по этому имени. 