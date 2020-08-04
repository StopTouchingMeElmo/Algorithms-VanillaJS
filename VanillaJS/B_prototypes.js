// Цепочка прототипов
// obj animal1, obj animal2, obj animal3 ---> obj Animal.prototype ---> Object.prototype ---> undefind

// Движок JS в поиске нужного метода, сначала, ищет его в самом объекте инстансе, потом в его прототипе,
// потом в прототипе прототипа и т. д. до глобального объекта Object.prototype. Если нигде нет, то undefind.
//==========================================================================================================

// Способы связать объект с его прототипом:
// 1. Object.setPrototypeOf(obj, proto) // Появился в ES6(2015) Ресурсоемкий. НЕ РЕКОМЕНДОВАН.
// 2. Object.create(proto)
// 3. function Uppercase(){}

// 1. Object.setPrototypeOf(obj, proto) // Появился в ES6(2015) Ресурсоемкий. НЕ РЕКОМЕНДОВАН.
const animalMethod = {
  say: function () {
    console.log(`${this.name} goes ${this.voice}`);
  },
};

const animalDog = {
  name: "Dog",
  voice: "wufff",
};

const animalCat = {
  name: "Cat",
  voice: "meaw",
};

Object.setPrototypeOf(animalDog, animalMethod);
Object.setPrototypeOf(animalCat, animalMethod);

//animalCat.say()
//>>Cat goes meaw
//animalDog.say()
//>>Dog goes wufff
//============================================================================================

// 2. Object.create(proto)
const animalFox = Object.create(animalMethod);
animalFox.name = "Fox";
animalFox.voice = "frfrfr";

//animalFox.say()
//>>Fox goes frfrfr

// То же самое, только через функцию.
function createObj(name, voice) {
  const res = Object.create(animalMethod);
  res.name = name;
  res.voice = voice;
  return res;
}

const animalBear = createObj("Bear", "Arrrrr");

//animalBear.say()
//Bear goes Arrrrr
//=============================================================================================

// 3. function Uppercase(){}
// Тут уже не нужно создавать объект через Object.create
// и не нужно возвращать объект из функции.
// У функции есть объект prototype, в который можно записывать нужные методы
function Bird(name, voice) {
  this.name = name;
  this.voice = voice;
}

Bird.prototype.say = function () {
  console.log(`${this.name} goes ${this.voice}`);
};

const parrot = new Bird("Parrot", "My Name is Kesha");

//parrot.say()
//>>Parrot goes My Name is Kesha
