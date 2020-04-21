// Object.create / geters / seters / Property Descriptors
// Гибкая настойка объектов в JS

//const person = Object.create({},{}) //первый параметр(объект) это прототип объекта person

// Возможность настраивать каждое поле объекта, передавая разные параметры (Proprty Descriptors):
// enumerable: false/true (видимость поля) 
// writable: false/true (возможность перезаписи значения поля) person.name = 'Igor'
// configurable: false/true (возможность удалять ключ из объекта) delete person.name

//В методе get(){} мы должны ВЕРНУТЬ(return) новое значение. В геттере мы можем выполнять любую логику, при этом
//возвращено будет значение, которое будет обычным значением поля

//В метод set(){} мы ПРИНИМАЕМ значение value / В сетерах можно делать что угодно, например,
//менять фон окна при передаче значения.

//На гетерах и сетерах построено большое кол-во фреймворков, чтобы смотреть за изменением полей,
//и выполнять дополнительную логику, например, по отрисовке приложения.
//С их помощью можно писать реактивный и динамический функционал.

const person = Object.create({
    calculateAge() {
        console.log('Age:', new Date().getFullYear() - this.birthYear); //этот метод будет в прототипе объект person
    } //по дефолту метод for in при итерации пробегается по прототипу объекта
}, {
    name: {
        value: "Ivan",
        enumerable: true,
        writable: true,
        configurable: true
    },
    birthYear: {
        value: 1993,
        enumerable: false, // поле будет видно в консоли бледной подсветкой, но не доступно для манипуляций типа итерации полей и т д.
        writable: false,
        configurable: false
    },
    age: {
        get() {
            return new Date().getFullYear() - this.birthYear //person.age >> 26
        },
        set(value) {
            document.body.style.background = 'green'; //person.age = 'change font to green' >> изменится цвет фона
            console.log('Set age', value); //person.age = 33 >> Set age 33
        }
    }
})

for (let key in person) {
    if (person.hasOwnProperty(key)) { // Данный метод позволяет не пробегаться по прототипу. Рекомундуется его применять всегда
        console.log('KEY:', key, ';Value:', person[key]); //когда делаете итерацию по объекту с помощью цикла for in
    }
}

person.calculateAge() //>> Age: 27