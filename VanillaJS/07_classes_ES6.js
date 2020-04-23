//ES6 Классы в JS
//Классы удобны по причине того, что с их помощью можно реализовывать полноценное наследование


//обычный способ создния объекта

/* const animal = {
    name: 'Animal',
    age: 5,
    hasTail: true
} */

//создание объектов через классы
//по конвенции имя класса пишется с Большой буквы

//чтобы проинициализировать начальные значения объекта данного класса
//мы должны реализовать специальный метод constructor
//в constructor мы будем принимать некоторый ОБЪЕКТ options, который мы будем причислять к нашему классу
class Animal {

    constructor(options) {
        this.name = options.name; //тут мы связываем поля передаваемого объекта с полями (контекстом) класса
        this.age = options.age;
        this.hasTail = options.hasTail;

    }
    //тут мы можем реализовывать методы, которые попадут в прототип нашего объекта наследника
    voice() {
        console.log('I am Animal');
    }

    //можем реализовывать статические методы и переменные с помощью ключ слова static
    //статические методы и переменные доступны только у самого класса
    static type = 'ANIMAL'
}

//создаем объект animal с помощью класса

const animal = new Animal({ //тут мы описываем ОБЪЕКТ, который передаем в constructor родительского класса Animal
    name: 'Animal',
    age: 5,
    hasTail: true
})

//animal.voice() >> I am Animal
//вложенность прототипов: object of class Animal (animal) > proto class Animal > proto Global Object

// Пример реализации наследования:
// создадим частный случай животного от Animal. Чтобы наследоваться от класса Animal используем ключ слово extends

class Cat extends Animal {
    static type = 'CAT'
    //чтобы добавить поле, которого нет в родительском классе:
    constructor(options) {
        super(options) //вызываем конструктор родительского класса
        this.color = options.color;

    }
    //в дочернем классе мы можем переписывать родительские методы. Дочерний метод перетерает родит. метод.
    voice() {
        super.voice() // вызываем родительский метод >> I am Animal
        console.log('I am cat')
    }

    //релизация гетеров и сетеров в классах(Также как в Object.create)
    // гетер возвращает значение ПОЛЯ объекта, поэтому обращаемся к гетеру как к обычному полю объекта
    get ageInfo() { // cat.ageInfo >> 49
        return this.age * 7;
    }
    // в сетер мы передаем, например, новое значение поля age
    set ageInfo(newAge) { //cat.ageInfo = 5 > cat.ageInfo >> 35
        this.age = newAge;
    }
}

const cat = new Cat({
    name: 'Cat',
    age: 7,
    hasTail: true,
    color: 'black'
})

//cat.voice() >> I am Animal / до переписывания метода
//cat.voice() >> I am cat / после переписывания метода в class Cat 
//вложенность прототипов на один уровень больше: object of class Cat (cat) > proto class Cat > proto class Animal > proto Global Object

//------------------------------------------------------------------------------------
//EXAMPLES.