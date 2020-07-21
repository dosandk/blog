---
title: 'Вам не нужен "use strict"'
tags: ["javascript", "use-strict"]
published: true
date: '2020-21-07'
---  

# Вам не нужен "use strict"

`"use strict"` -- это директива, которая появилась в Javascript вместе со стандартом 
["ECMAScript 5th Edition (ES5)"](https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262%205th%20edition%20December%202009.pdf) 
в декабре 2009 года.

> <small>Перечень всех стандартов javascript можно посмотреть вот по этой 
> [ссылке](https://www.ecma-international.org/publications/standards/Ecma-262-arch.htm)</small>

Её цель -- показать что код, следующий за ней, будет обработан в "строгом режиме".

Строгий режим работает следующим образом:

* **исправляет** некоторые **недостатки языка Javascript** 
* **запрещает** использовать **некоторые элементы синтаксиса**
* **обеспечивает** более **строгую проверку** на наличие ошибок

Строгий режим можно включить для всего тега `<script>` или файла,

```html
<script>
'use strict';

/* Включили строгий режим для всего тега скрипт */
</script>
```

так и для отдельной функции с помощью директивы `"use strict"`

```javascript
/* Обычный режим здесь */

function mySuperFoo () {
  'use strict';

  /* Строгий режим здесь */
}

/* Обычный режим здесь */
```

**Важно:** Директива `"use strict"` должна находиться в начале (на первой исполняемой строке)
файла или тега `<script>`, либо на первой исполняемой строке функции.

Давайте посмотрим чем строгий режим отличается от обычного режима:

## В строгом режиме нельзя создать глобальную переменную
 
В строгом режиме нельзя создать глобальную переменную, или другими словами, переменную
без использования ключевых слов `var`, `let` или `const`.

```javascript
'use strict'

myLonelyVariable = 1; // Uncaught ReferenceError: myLonelyVariable is not defined
```

Такое объявление в строгом режиме бросит ошибку **"Uncaught ReferenceError"**.
В нестрогом режиме такая попытка просто создаст новую глобальную переменную
и добавит ее в виде свойства в глобальный объект.

## В строгом режиме функции не получают ссылку на глобальный объект в качестве значения `this`

В строгом режиме функции, которые вызываются как функции, а не как методы объектов, 
получат `undefined` в качестве значения `this`

```javascript
'use strict'

function getName () {
  console.log(this);
}

getName(); // undefined
```

Более того, в строгом режиме, значение `this` всегда соответствует значению, переданному в качестве контекста выполнения в 
методах `call`, `apply` и `bind`

```javascript
'use strict'

function getName () {
  console.log(this);
}

getName.call(undefined); // undefined
getName.apply(null); // null
getName.bind()(); // undefined
```

А в нестрогом режиме `null` и `undefined` будут заменены ссылкой на глобальный объект.

```javascript
function getName () {
  console.log(this);
}

getName.call(undefined); // Window
getName.apply(null); // Window
getName.bind()(); // Window
```

## В строгом режиме функциональные выражения видны только внутри блока

В строгом режиме функциональные выражения (Function Declaration) видны только внутри блока,
в котором объявлены, поэтому в примере ниже мы получим ошибку **`ReferenceError`**

```javascript
'use strict'

if (true) {  
  function hi() {
    console.error('hi 👋');
  }
}

hi(); // Uncaught ReferenceError: hi is not defined
```

Без `"use strict"` мы бы увидели в консоли "hi 👋"

## В строгом режиме нельзя присвоить значения свойствам, которые недоступны для записи

В строгом режиме нельзя присвоить значения свойствам, которые недоступны для записи, или
создать свойства в нерасширяемых объектах

```javascript
'use strict'

Infinity = 1; // Uncaught TypeError: Cannot assign to read only property 'Infinity' of object '#<Window>'

const obj = {};
const frozenObj = Object.freeze(obj);

frozenObj.newProp = 1; // Uncaught TypeError: Cannot add property newProp, object is not extensible
``` 

В обоих случаях в строгом режиме такие операции вызовут ошибку **TypeError**, а в обычном режиме такое присвоение просто будет
проигнорировано.

## В строгом режиме псевдомассив `arguments` хранит статическую копию значений

В строгом режиме псевдомассив `arguments` хранит статическую копию значений аргументов, переданных в функцию.

```javascript{numberLines: true}
'use strict'
// highlight-range{4}
function foo(x) {
  console.log(x === arguments[0]); // true

  arguments[0] = 2;

  console.log(x === arguments[0]); // false 
  console.log(x); // 1 
}

foo(1);
```

В примере выше в строке **5** мы переопределили значение `arguments[0]`, при этом значение `x` не изменилось.

В нестрогом режиме элементы `arguments` и именованные параметры функции ссылаются на одни и те же значения,
поэтому данное переопределение затронуло бы значение `x` 

* В строгом режиме определение двух или более параметров с одинаковыми
именами в объявлении функции считается синтаксической ошибкой. 

```javascript
'use strict'

function foo(x, x) {
  console.error('x', x);
  console.error('x', x);
}

foo(1, 2);
```

В нестрогом режиме ошибка не возникает.

## Менее значимые особенности работы строгого режима 

* В строгом режиме нельзя использовать конструкцию `with`. 
Если вы не слышали про неё, то, возможно, уже не стоит о 
ней беспокоиться, но для самых любопытных оставлю [ссылку](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/with)  

* Также в строгом режиме устранены некоторые моменты связанные с поведением метода `eval`.
Без `"use strict"` у `eval` не будет своего лексического окружения, поэтому переменные, 
объявленные внутри `eval`, могут переопределить переменные лексического окружения родительской функции.

* В строгом режиме свойства `arguments.callee` и `arguments.callee.caller` больше не поддерживаются

* В строгом режиме запрещено использовать следующие зарезервированные слова: 
`implements`, `let`, `interface`, `package`, `private`, `protected`, `public`, `static`, `yield`

## Вывод

Все эти особенности работы строгого и обычного режимов важны для понимания тонкостей языка
Javascript, но на практике, в большинстве случаев, мы работаем с **классами** и **модулями**, а **в них 
строгий режим включен по умолчанию**. 
