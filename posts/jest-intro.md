---
title: 'Введение в тестирование с использованием Jest'
tags: ["javascript", "jest"]
published: true
date: '2020-07-30'
logo: 'logo-jest-intro.png'
---

# Введение в тестирование с использованием Jest

![featuredimage](../src/images/jest-intro/logo-jest-intro.png)

Начнем с самого начала...

["Jest"](https://jestjs.io) - это фреймворк для тестирования JavaScript приложений.

С его помощью можно быстро покрывать приложение unit-тестами, а при связке с дополнительными
инструментами, например с ["Puppeteer"](https://pptr.dev/), можно писать и End-to-End-тесты.

Об E2E-тестах поговорим как-нибудь в следующий раз, а в этой статье давайте разберемся чем "Jest"
отличается от других тестовых фреймворков.

Во-первых, по словам самих же разработчиков "Jest",
данный инструмент отлично подойдет для тестирования как приложений написанных на чистом JavaScript,
так и для тестирования приложений написанных на React, Angular или Vue.

> Кстати разработан "Jest" компанией Facebook, что может слегка намекать на то, что он неплохо интегрируется с "React"
> экосистемой.

А вот и отличительные особенности "Jest", описанные на главной странице официального [сайта](https://jestjs.io):

* **zero config** - Jest aims to work out of the box, config free, on most JavaScript projects.
* **snapshots** - Make tests which keep track of large objects with ease. Snapshots live either alongside your tests, or embedded inline.
* **isolated** - Tests are parallelized by running them in their own processes to maximize performance.
* **great api** - From it to expect - Jest has the entire toolkit in one place. Well documented, well maintained, well good.

Также нам обещают, далее вольный перевод:

* быстрый и надежный запуск тестов
* генерацию "code coverage" "из-под коробки"
* возможность легко "замокать" любой объект за пределами теста и превосходное описание исключений, в случае если что-то пошло не так.

Однако в чем истинная причина, по которой "Jest" все чаще выбирают для тестирования фронтенд приложений,
а в некоторых случаях, "Jest" становится де-факто стандартом (👋 привет "React")?

Одна из главных причин - **"Jest" быстрый**.
На больших масштабах скорость выполнения тестов становится одним из решающих критериев для выбора инструментов тестирования.

"Jest" выполняет тесты в "Node.js" среде и делает это чертовски быстро.
И дело тут не в хитроумном запуске тестов c помощью параллельных процессов или специальном алгоритме выделения памяти.

Суть в том, что "Jest" использует виртуальный DOM - специальную имплементацию браузерного DOM, но внутри Javascript.
И да, об этом ни слова не сказано на главной странице "Jest",
а упоминание есть только непосредственно внутри [документации](https://jestjs.io/docs/en/configuration#testenvironment-string)

Что же такое виртуальный DOM?

Если совсем просто - это некий JavaScript объект, который обладает теми же свойствами и методами, как и
DOM внутри браузера. А JavaScript, в свою очередь, работает на порядок быстрее браузерного DOM, что и обеспечивает
высокую скорость выполнения тестов.

По умолчанию **"Jest" использует в качестве среды выполнения ["jsdom"](https://github.com/jsdom/jsdom)** - имплементацию виртуального DOM, хотя
возможность задать другую среду выполнения, в том числе и собственную, также имеется.

Давайте разберемся с тем что же такое ["jsdom"](https://github.com/jsdom/jsdom).
Вот отрывок из официальной документации:

> jsdom is a pure-JavaScript implementation of many web standards, notably the WHATWG DOM and HTML Standards,
> for use with Node.js. In general, the goal of the project is to emulate enough of a subset
> of a web browser to be useful for testing and scraping real-world web applications.

Если коротко, "jsdom" это реализация DOM стандартов для использования в среде "Node.js".

И вот тут кроется основная проблема с которой сталкиваются разработчики когда начинаю писать тесты с использованием "Jest".
Звучит она так: ***The default environment in Jest is a browser-like environment through jsdom.***

Эту фразу следует понимать так: "jsdom" - это среда **browser-like**, она похожа на браузерную, обладает такими же свойствами и методами,
построена с учетом стандартов HTML и WHATWG DOM, однако настоящим браузерным окружением она не является.
И заметьте что про CSS и CSSOM нигде выше даже речи не было.

Именно по этой причине, такие методы как `getComputedStyle()` или `getBoundingClientRect()` при запуске "Jest" тестов
вернут нам совершенно ни те значения, которые мы получаем в браузерном окружении.

## Вывод

* "Jest" выполняет тесты в среде "Node.js"
* "Jest" использует виртуальный DOM, по умолчанию на основе "jsdom"
* "Jest" ничего не знает про CSS - стили элементов

### Читать далее 
→ [Конфигурация Jest](/jest-configuration)

