---
title: 'Arrow functions vs "classical" functions'
tags: ["javascript"]
published: true
date: '2021-12-23'
---

# Arrow functions

Функції-стрілки з'явилися у стандарті ES6 (ECMAScript 2015) та їх поява дозволила писати JS розробникам
більш компактний та локонічний код.

Приклад без використання функції-стрілки:

```javascript
const result = [1, 2, 3].map(function (item) {
  return item * 2;
});
```

З використанням функції-стрілки приклад вище може виглядати так:

```javascript
const result = [1, 2, 3].map(item => item * 2);
```

Код став компактнішим за рахунок того, що ми позбулись:

* Кругих дужок навколо єдиного аргументу функції (при використанні більше одного аргументу, дужки обов'язкові)
* фігурних дужок навколо тіла функції
* ключового слова `function`
* ключового слова `return`

Ці синтаксичні особливості також дозволяють використовувати такий короткий запис:

```javascript
const sum = a => b => c => a + b + c;
```

Код, наведений вище, еквівалентний запису з використанням ключового слова `function`:

```javascript
function sum (a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    }
  }
}
```

Погодьтеся, ми заощадили порядну кількість рядків коду.

Окрім компактності та лаконічності, які дає використання стрілочної-функції, вона має ряд наступних відмінностей
від функції оголошеної через ключове слово `function` 

## "Arrow function" не має свого власного `this`

```javascript
const someArrowFunction = () => {
  console.log(this);
}

someArrowFunction() // window
```

У прикладі вище ми не використовуємо директиву `use strict`, тому виклик функції-стрілки у глобальній області дає
очікуваний результат - значення `window` (домовимось, що ми запускаємо код у браузері, для іншого середовища виконання
це значення може бути іншим).

А якщо стрілочна-функція буде використовуватися як метод об'єкта? Давайте порівняємо її поведінку зі звичайною функцією:

```javascript
const user = {
  firstName: 'John',
  getNameArrow: () => {
    return this.firstName;
  },
  getName() {
    return this.firstName;
  } 
};

console.log(user.getNameArrow()); // undefined
console.log(user.getName()); // "John"
```

Виклик методу `getName`, як і передбачалося, повернув нам очікуваний результат - "John", значення якого міститься
як об'єкт `firstName`.

А ось виклик методу `getNameArrow` повернув `undefined` - не зовсім те, що ми би хотіли отримати.
Хоча, звичайно, така поведінка є абсолютно коректною.

Вся справа саме в тому, що у стрілочної-функції відсутній власний `this`,
а використовується значення `this` навколишнього контексту, або іншими словами батьківського
лексичного оточення (LexicalEnvironment)

Чим же така особливість може бути корисною? Давайте трохи модифікуємо наш приклад:

* додамо в `user` масив зі списком друзів та метод який дозволить сказати "hi" кожному другу;
* відмовимося від стрілочної-функції і використаємо звичайну функцію в методі `forEach`

```javascript
const user = {
  firstName: 'John',
  friends: ['Peter', 'Kevin', 'Nick'],
  seyHi() {
    this.friends.forEach(function (friend) {
      console.log(this.firstName + ' says hi 👋 to ', friend);
    });
  }
};

user.seyHi();
// undefined says hi 👋 to Peter
// undefined says hi 👋 to Kevin
// undefined says hi 👋 to Nick
```

Знову не зовсім те, чого ми хотіли отримати, правда?

У `undefined` не може бути друзів! А якщо без жартів, що конкретно пішло не за планом?
Адже ми відмовилися від використання стрілочної-функції.

Саме з цією особливістю поведінки "звичайних" функцій пов'язана ще одна причина появи стрілочних-функцій,
окрім бажання JavaScript розробників писати менше коду, економлячи на слові "function" 😀

Справа в тому, що в JavaScript кожна зі "звичайних" функцій має свій контекст виконання, 
або свій `this` простіше кажучи. У цьому прикладі `this` для функції всередині методу `forEach` 
буде посилатися на глобальний об'єкт.

Чому глобальний об'єкт? Справа в тому, що функція всередині методу `forEach` викликається окремо від об'єкта, 
по суті на кожну ітерацію буде виконано наступний виклик:

```javascript
(function (friend) {
  console.log(this.firstName + ' says hi 👋 to ', friend);
})()
```

JavaScript динамічно вираховує значення `this` - не знаходить у рамках або контексті якого об'єкта повинна 
бути виконана функція і підставляє `window` як значення `this` у даній функції.

Раніше для вирішення цієї проблеми використовували кілька підходів:

* зберігали значення `this` батьківського оточення в якусь змінну з назвою `self` або `that`

```javascript
const user = {
  firstName: 'John',
  friends: ['Peter', 'Kevin', 'Nick'],
  seyHi() {
    const self = this;
  
    this.friends.forEach(function (friend) {
      console.log(self.firstName + ' says hi 👋 to ', friend);
    });
  }
};
```

* якщо сигнатура методу дозволяла, а `forEach` дозволяє, передавали, як другий аргумент, значення `this` для колбека

```javascript
const user = {
  firstName: 'John',
  friends: ['Peter', 'Kevin', 'Nick'],
  seyHi() {    
    this.friends.forEach(function (friend) {
      console.log(this.firstName + ' says hi 👋 to ', friend);
    }, this); // highlight-line
  }
};
```

Думаю тепер стало ясно, чому такі методи масивів, наприклад: 
[`forEach`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), 
[`filter`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), 
[`some`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/some), 
[`every`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
історично мають необов'язковий `thisArg` аргумент.

## Стрілочна-функція не має свого власного псевдомасиву `arguments`

Логіка абсолютно така ж як і з використанням `this` - найчастіше у функціях-колбеках були необхідні 
саме аргументи з батьківської функції. 
Але з приходом "спред синтаксису" ([spread syntax](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax))
використання псевдомасив `arguments` пропало як явище.

При необхідності отримати всі аргументи функції або методу застосовують наступний підхід:

```javascript
function someFunction (...props) {
 console.log(props, Array.isArray(props)); // true - 👍 
 console.log(arguments, Array.isArray(arguments)); // false - 👎 
}
```

## До стрілочної-функції неможливо "прибіндити" контекст

Метод `bind`, власного кажучи як `call` та `apply`, не працює у зв'язці зі стрілочною-функцією,
причина наступна – відсутність власного контексту (`this`) який може бути замінений
при використанні методу `bind`.

```javascript
const obj = {
  firstName: 'John'
};
   
const arrow = () => console.error(this.firstName);
   
console.log(arrow.call(obj)); // undefined
console.log(arrow.apply(obj)); // undefined
console.log(arrow.bind(obj)()); // undefined
```

## Стрілочну-функцію неможливо викликати з ключовим словом `new`

До появи в JavaScript класів та функцій стрілок, створення однотипних об'єктів здійснювалося з
використанням функцій-конструкторів. Функцією конструктором могла бути будь-яка функція, викликана з
використанням ключового слова `new`.

Наприклад ось такий виклик, поверне порожній об'єкт:

```javascript
function SomeFunction () {}

const obj = new SomeFunction(); // {}
```

Справа в тому, що даний підхід - використання ключового слова `new`, мав на меті спростити життя розробникам,
і робив деякі речі "під капотом", а саме привласнював у `this`
порожній об'єкт і автоматично повертав його з функції

```javascript
function SomeFunction () {
  // this = {};

  // return this;
}
```

І як можно здогадатися, стрілочна-функція не може бути викликана з ключовим словом `new` все з тієї ж причини,
за якою її не можливо "прибіндити", або іншими словами, використовувати
у зв'язці з методами `call`, `apply`, `bind` 
(отримаємо помилку: "Uncaught TypeError: <function name> is not a constructor")

## У класах стрілочна-функція має жорстку прив'язку до `this`

Давайте спочатку розглянемо приклад з об'єктом, в якому ми втратимо контекст:

```javascript{numberLines: true}
const user = {
  firstName: 'John',
  getFirstName () {
    return this.firstName;
  }
};

const getName = user.getFirstName; // highlight-line

console.log(getName()); // undefined
```

Ми зберегли посилання на метод об'єкта `getFirstName` у змінну `getName` у рядку **8** та спробували його викликати.

В результаті отримали `undefined`, тому що JavaScript не зміг визначити в контексті якого об'єкта ми викликали
функцію `getName`, точніше так: JavaScript для цієї функції визначив контекст як глобальний об'єкт `window`.

Давайте трохи модифікуємо наш приклад. Тепер метод `getFirstName` повертатиме стрілочну-функцію,
яка у свою чергу повертатиме значення `firstName` об'єкту `user`.

```javascript
const user = {
  firstName: 'John',
  getFirstName () {
    return () => this.firstName;
  }
};

const getName = user.getFirstName();

console.log(getName()); // John
```

В даному випадку все відпрацювало коректно, контекст не було втрачено.

Тепер давайте подивимося на поведінку стрілочної-функції у рамках класу:

```javascript
class User {
 constructor (name) {
   this.name = name;
   this.getName = () => this.name;
 }
}

const user = new User('John');
const getName = user.getName;

console.log(getName()); // John
```

Як видно з прикладу вище, контекст не було втрачено. Стрілочна-функція надійно прив'язана до
об'єкту який було сконструйовано за допомогою класу.

Даний прийом зручно використовувати при додаванні/видаленні обробників подій усередині класу:

```javascript
class User {
  onHandleClick = () => {
    console.log(this.firstName);
  };

  constructor(firstName) {
    this.firstName = firstName;
    this.render();
    this.initEventListeners();
  }

  initEventListeners() {
    this.element.addEventListener('click', this.onHandleClick);
  }

 removeEventListeners() {
   this.element.removeEventListener('click', this.onHandleClick);
 }

 render() {
   const element = document.createElement('div');

   element.innerHTML = `<button>Click me maybe!</button>`;

   this.element = element;
 }

 destroy() {
   this.element.remove();
   this.removeEventListeners();
 }
}
```

## У класах стрілочна-функція завжди прив'язана до об'єкта, а не до його прототипу

При створенні об'єкта за допомогою класу, стрілочна-функція потрапить на сам об'єкт, а не на його прототип.

Давайте подивимося на приклад.

```javascript
class User {
  getNameArrow = () => {
    return this.firstName;
  }
        
  constructor (firstName) {
    this.firstName = firstName;
  }
        
  getName() {
    return this.firstName;
  }
}
    
const user = new User('John');
    
console.log(user);
```

При виведенні об'єкта в консоль, можна побачити, що стрілочна-функція належить до властивостей створеного об'єкта.

![arrow-function](../src/images/static-gifs/arrow-function.png)


## Висновок

Використання стрілочних-функцій в якості функцій-колбеків: `forEach`, `map`, `reduce`,
і т.д - це добрий підхід, намагайтеся його дотримуватися.

Звичайні функції оголошені через ключове слово "function" слід використовувати лише там,
де потрібний власний `this`.

Що стосується класів, зручно додавати обробники подій через стрілочні-функції,
через те, що такі функції будуть мати жорстко прив'язаний `this` і надалі це позбавить від проблем
зі зняттям обробників подій.

Увага! Не зловживайте стрілочними функціями у класах, оскільки вони стають властивостями самого об'єкта, а не його
прототипу, це може вплинути на продуктивність під час використання такого підходу у великих масштабах

