// В JS функции являются объектами.
// Ф. можно передавать как аргументы в другие функции.(очень удобно)
//    можно присваивать как значения переменным.
//    можно возвращать как результат из других функций.
//    можно использовать как обработчик событий event listener
//==================================================================================================================

// Другими словами, у ф-стрелки нет своего this, она наследует контекст родителя. (Личная интерпретация).

// Помимо компактности и читаемости кода, главная особенность функции-стрелки в том, что  (!!)
// она сохраняет значение ключевого слова this.
// т.е ф-стрелка сохраняет this той функции, внутри которой она была объявлена:
// для функции greeterAll контекстом this является объект sayHello
// коллбэк ф-стрелка сохранила контекст внешней функции greeterAll, внутри которой она была создана, как свой контекст.
// в отличие от обычной функции, для которой контекстом была бы сама функция greeterAll, внутри которой, как мы видим,
// нет функции greeter, которую мы вызываем.

const sayHello = {
  greeter: function (name) {
    console.log(`Hello, ${name}`);
  },
  greeterAll: function (names) {
    names.forEach((el) => {
      this.greeter(el);
    });
  },
};

sayHello.greeterAll(["Pete", "Jessica", "Mary"]);

// >>Hello, Pete
// >>Hello, Jessica
// >>Hello, Mary
//====================================================================================================================

// У ф-стрелок нет свойства prototype. (!!)
// ф-стрелки не предназначены для того, чтобы из них делать новые объекты.

// В обычных функциях prototype используется дл ООП, чтобы добавлять новые функции.
// Обычная функция как конструктор без синтаксиса class:
function NatureSounds() {}
NatureSounds.prototype.sound1 = function () {
  console.log("FrFrFr");
};

const fox = new NatureSounds();
fox.sound1();
//>>FrFrFr
//================================================================================================================

const sq = (x) => x * x;

const sqSeveralStrings = (x) => {
  const res = x * x;
  console.log(`The result is: ${res}`);
};

// Найти наибольшее нечетное число.
const arr = ["2", "1", "5", "22"];
const res = arr
  .map((el) => parseInt(el))
  .filter((el) => el % 2)
  .reduce((curr, next) => Math.max(curr, next), 0);
//>>5
console.log(res);
