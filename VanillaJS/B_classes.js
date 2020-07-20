// Классы
// Это синтаксический сахар. Добавлен в ES в 2015.
// Это паттерн использования функций конструкторов и прототипного наследования (через extends),
// который упрощает работу с объектно-ориентированным кодом.

// В языках типа Java, C++, C# класс - это некий чертёж, по которому создаются объекты.
// Класс - базовое понятие в ООП.

// Хоть JS построен не на классах, а на прототипах,
// программисты пришли к такому паттерну объектно ориентированного кода:

function Animal(name, voice) {
  // конструктор
  this.name = name;
  this.voice = voice;
}

Animal.prototype.say = function () {
  console.log("Animal", this.name, "says:", this.voice); // объект прототип, которому мы добаляем свойство
};

const dog = new Animal("dog", "'woof-woof'");
dog.say();
//>> Animal dog says: 'woof-woof'

// Такой код не удобен по двум причинам:
// 1. Он показывает детали формирования связи между объектами,
// вместо того, чтобы показывать смысл.
// А смысл такой: у всех объектов типа Animal д.б. имя и голос, а также функция say, которая использует эти значения.
// 2. Наследование и управление цепочками прототипов.
// Код для вызова функции выше по цепочке прототипов выглядит слишком громоздко.

// По этим причинам был добавлен синтаксис Класса. Он ничего не добавляет в язык, только интуитивно упрощает работу:
// Цепочка прототипов от инстанс duck будет следующей:
// duck -> Bird.prototype -> AnimalClass.prototype -> Object.prototype -> null

class AnimalClass {
  constructor(name, voice) {
    // конструктор
    this.name = name;
    this.voice = voice;
  }
  say() {
    console.log("Animal", this.name, "says:", this.voice); // прототип
  }
}
//==============================================================================================================

class Bird extends AnimalClass {
  constructor(name, voice, canFly) {
    super(name, voice);
    super.say();
    this.canFly = canFly;
  }

  say() {
    console.log("Birds don't like to talk");
  }
}

const duck = new Bird("Donald Duck", "kria-krja-krja", true);
duck.say();
//>> Animal Donald Duck says: kria-krja-krja // из конструктора // super.say();
//>> Birds don't like to talk                // из вызова переопределенного в классе Bird метода // duck.say();

// Если явно не добавлять constructor в класс то он будет наследовать конструктор супер класса, т.е. AnimalClass.
// При добавлении своего конструктора в класс наследник необходимо в нем вызвать конструктор супер класса, через super.
// При этом вызвать super() необходимо до первого использования ключевого слова this.

// Ключевое слово super дает доступ не только к супер конструктору, но и к любому методу в супер классе.

// Если необходимо, мы пожем полностью переопределить функцию say() для класса Bird
// Для этого мы просто создаем в теле класса Bird функцию с таким же именем.

// если в конструкторе класса мы хотим обратиться к методу, находящимуся в теле самого класса, то
// super меняем на this:
/* constructor(name, voice, canFly) {
    super(name, voice);
    this.say();
 */
//==============================================================================================================

// Варианты создания функции внутри объекта (не в прототипе):
// 1. Классический способ:
class SomeClass {
  constructor(name, voice) {
    // конструктор
    this.name = name;
    this.voice = voice;
    // просто передаем функцию в объект через конструктор
    this.fnInsideObj = () => {
      console.log("i'm inside object");
    };
  }
  say() {
    console.log("Animal", this.name, "says:", this.voice); // прототип
  }
}

// 2. Proposal Class Fields, еще не вошедший в стандарт.
// Просто пишем функцию в теле класса.
class SomeClass3 extends SomeClass {
  fnInsideObj2 = () => {
    console.log("i'm inside object too");
  };
}

const inst = new SomeClass3();
inst.fnInsideObj2();
//i'm inside object too
