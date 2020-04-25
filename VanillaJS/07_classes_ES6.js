//ES6 Классы в JS
//Классы удобны по причине того, что с их помощью можно реализовывать полноценное наследование.
//Классы - это удобный синтаксис для создания объектов.
//Можно выносить базовую логику в базовые классы, задвать методы в прототипе и т. д.


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

class Component {
    constructor(selector) {
        //через $ указываются переменные, которые содержат в себе DOM node
        this.$el = document.querySelector(selector)
    }

    hide() {
        //style доступен у любого дом элемента. Меняем css стили.
        this.$el.style.display = 'none'
    }

    show() {
        this.$el.style.display = 'block'
    }
}

class Box extends Component {
    constructor(options) {
        super(options.selector) //с помощью super получаем доступ к constructor родительского класса Component.
        //Так как родит. конструктор принимает только один параметр (селектор),
        //то передаем в него только строку поля selector. Наш объект(options).selector

        //после вызова метода super у нас появился доступ к переменной this.$el:
        this.$el.style.width = this.$el.style.height = options.size + 'px';
        this.$el.style.background = options.color;
    }
}

const box1 = new Box({
    selector: '#box1',
    size: 100,
    color: 'red'
})

class Circle extends Box {
    constructor(options) {
        super(options)
        this.$el.style.borderRadius = '50%'
    }
}

const circle1 = new Circle({
    selector: "#circle1",
    size: 200,
    color: 'green'
})

//В шаблоне
//<div id="box1"></div>
//<div id="circle1"></div>

//В консоле прячем и показваем красный квардат и зеленый круг
//circle1.hide()
//box1.hide()
//circle1.show()
//box1.show()