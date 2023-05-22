---
highlighter: shiki
editor: dev
title: Fluent
---

# Fluent

## localization system for natural-sounding translations

<!--
Сьогодні я вам хочу розказати про систему для локалізації яку ми використовуємо на проєкті, її переваги та недоліки. Мова піде про Fluent.

Але давайте спочатку поговоримо про локалізацію загалом. Що це таке, чому це потрібно, які існують проблеми з наявними системами локалізації.

Хто може сказати що таке локалізація? Чим вона відрізняється від інтернаціоналізації?
-->

---

## What is the difference between localization and internationalization?

### What is Localization? (l10n)

Localization is the process of adapting a product or service to meet the language, cultural, and other specific requirements of a particular country or region.

Localization includes translation of content, but also includes adjustments to date and time formats, currency, images, and other factors that impact how the product or service is perceived and used.

### What is Internationalization? (i18n)

Internationalization is the process of designing and developing a product or service to be easily adapted for different languages, cultures, and regions.

Internationalization involves making the product or service flexible enough to accommodate local differences in content, without requiring significant changes to the core product or service.

<!--
Локалізація - це процес адаптації продукту або сервісу для відповідності мовним, культурним та іншим специфічним вимогам певної країни або регіону.

Це означає не тільки переклад контенту, але й адаптацію формату дати та часу, валюти, зображень та іншого, що впливає на сприйняття та використання продукту або сервісу.

Інтернаціоналізація - це процес проєктування та розробки продукту або сервісу, який легко локалізується.

Дуже часто розробники ігнорують інтернаціоналізацію, або роблять її пізно, коли вже відбулася локалізація. І це призводить до того, що локалізація стає дуже складною, або навіть неможливою.
-->

---

## Issues with current localization paradigm

Software localization has been dominated by an outdated paradigm: the translation is just a dictionary of strings which map one-to-one to the English copy.

This paradigm is unfair and limiting to languages with grammars more complex than English. For any grammatical feature not supported by English, a special case must be added to the source code, leaking logic into all translations. For example a lot of localization systems do not suppost pluralization that depends on multiple variables, forcing developers to split localization into multiple messages.

`vue-i18n` example:

```json
{
    "apples-and-bananas": "{appleCountText} and {bananaCountText}",
    "apples": "{appleCount} apple | {appleCount} apples",
    "bananas": "{bananaCount} banana | {bananaCount} bananas"
}
```

```ts
$t("apples-and-bananas", {
  appleCountText: $tc("apples", 1, { appleCount: 1 }),
  bananaCountText: $tc("banana", 5, { bananaCount: 5 }),
});
```

<!--
Та й багато систем локалізації роблять інтернаціоналізацію складнішою. Вони ігнорують складність граматики більшості мов, і просто перекладають слова та речення з англійської мови. Це призводить до того, що розробникам доводиться додавати додатковий код для кожної мови, що використовується в проєкті.

Наприклад більшість систем локалізації не підтримують плюралізацію декількох змінних, що призводить до того, що потрібно розбивати переклад на декілька стрічок і потім їх комбінувати.

Тут наведений приклад з `vue-i18n`. Як бачимо, синтаксис заставляє розбивати просте речення на три переклади. Додатково розробнику необхідно використовувати інший метод ($t) з додатковим параметром для того, щоб плюралізація працювала. Якщо розробник не використав спеціальний метод, перекладач не зможе додати плюралізований варіант перекладу.
-->

---

## What is Fluent?

- Fluent is a localization system designed for creating natural-sounding translations.
- Developed by Mozilla, the system uses a simpler syntax than traditional localization systems.
- It allows, when necessary, to express complex concepts from natural languages like gender, plurals, conjugations, and others.

```ftl
# Simple things are simple.
hello-user = Hello, {$userName}!

# Complex things are possible.
shared-photos =
    {$userName} {$photoCount ->
        [one] added a new photo
       *[other] added {$photoCount} new photos
    } to {$userGender ->
        [male] his stream
        [female] her stream
       *[other] their stream
    }.
```

<!--
Що ж таке Fluent і як він вирішує проблеми з локацізацією та інтернаціоналізацією?

Fluent це система локалізації, розроблена Mozilla. Версія 1.0 була випущена в 2019 році. Використовується в багатьох проектах Mozilla, таких як Firefox, Thunderbird та інших.

Вона використовує простий синтаксис, але дозволяє описувати складний синтаксис мови. Він дозволяє використовувати множину, відмінки, роди, і т.д.

Більшість цого підтримується додаванням підтримки
-->

---
layout: two-cols-header
---

## Example

::left::

<simple-input />

::right::

```ftl {all|2|5-13|6,9|6-8|9-12|all|8}
# Simple things are simple.
hello-user = Hello, {$userName}!

# Complex things are possible.
shared-photos =
    {$userName} {$photoCount ->
        [one] added a new photo
       *[other] added {$photoCount} new photos
    } to {$userGender ->
        [male] his stream
        [female] her stream
       *[other] their stream
    }.
```

<!--
Давайте ближче ознайомимось з Fluent синтаксисом.

На цьому прикладі показані дві локалізовані стрічки.

Перша стрічка проста, і вона не відрізняється від того як це було б в інших системах локалізації.
А друга стрічка демонструє як Fluent дозволяє описувати складні речення. 

Тут використовується `select` синтаксис, в мовах програмування його еквівалентом буде `switch` чи `if/else`. Ми бачимо що в залежності від значення змінної `photoCount`, використовуються різні переклади. Якщо `photoCount` буде 1, то буде використана перша під-стрічка, а якщо більше ніж 1, то друга. А змінна `userGender` визначає який рід буде використаний в перекладі.

Це ефективно дозволяє об'єднати 6 варіантів речення в одну стрічку локалізації. І це дозволяє розробникам не думати про те як буде виглядати переклад, а просто описувати речення, які потрібно перекласти.

Тут показана ще одна функціональність яку легко пропустити. Змінна `photoCount` тут теж буде локалізована. І в перекладачів навіть є можливість впливати на те як вона буде локалізована.

Поговорімо більше за локалізацію чисел та дат у Fluent.
-->

---

## Date, time and number formatting

Fluent will automatically select the right formatter for the argument and format it into a given locale.

This is done using build-in functions: `NUMBER` and `DATETIME`. Both of them use `Intl` browser feature to format numbers and dates.


```ftl
emails = You have { $unreadEmails } unread emails.
emails2 = You have { NUMBER($unreadEmails) } unread emails.
```

Fluent enables localizers to have limited control over selected subset of arguments to formatters. This means that, for example, the developer decides what currency the passed number is in, but the localizer can override the defaults on whether the currency should be displayed as a symbol or currency code.

```ftl
amount-owed = You owe { NUMBER($amount, currencyDisplay: "code", useGrouping: "false") }
```

```ts
$t('amount-owed', { amount: Fluent.NumberArgument(50.35, { currency: "USD" }) }) // You owe USD 50.35
```

In addition Fluent functions are extendable. You can easily add other functions, for example if you want to format dates using `date-fns` or other date formatting library.

<!--
Fluent автоматично форматує змінні які є числами та датами використовуючи вбудовані в браузер `Intl.NumberFormat` та `Intl.DateTimeFormat`. Під капотом форматування перетворюється в виклик відповідних функцій `NUMBER` та `DATETIME`.

В наведеному тут прикладі, ці дві стрічки є еквівалентними.

На відміну від інших систем локалізації які дозволяють контролювати форматування лише розробникам або лише перекладачам, у Fluent це можуть робити обоє. Наприклад розробник може передати валюту якою була зроблена покупка, а перекладач може передати параметри які впливають на відображення.

Список функцій Fluent можна розширити, наприклад зробити форматування дат використовуючи бібліотеку, яка вже використовується на проєкті, чи додати функцію яка повертає поточну операційну систему, щоб локалізувати шорткати.
-->

---
layout: two-cols-header
---

## Fluent features

::left::

### Easy to Learn

Fluent is a small, expressive, and unambiguous language. It is simple enough to be learned quickly, but powerful enough to express complex UI translations.

### Asymmetric Localization

Natural-sounding translations with genders and grammatical cases only when necessary. Expressiveness is not limited by the grammar of the source language.

::right::

### Fully-Featured

Date, time, and number formatting. Plural categories. Bidirectionality support. Custom formatters. Easy-to-read syntax. Robust error handling.

### Progressive Enhancement

Translations are isolated; locale-specific logic doesn't leak to other locales. Authors can iteratively improve translations without impact on other languages.

<!--
Давайте поговоримо 
-->

---
layout: two-cols-header
---

## Asymmetric Localization and Progressive Enhancement

Each language is isolated and the localization logic of one language doesn't leak into other languages nor into the source code.

```js
$t("tabs-close-warning", { tabCount: 5 });
```

::left::

### English:

```ftl
tabs-close-button = Close
tabs-close-tooltip = {$tabCount ->
    [one] Close {$tabCount} tab
   *[other] Close {$tabCount} tabs
}
tabs-close-warning =
    You are about to close {$tabCount} tabs.
    Are you sure you want to continue?
```

::right::

### Ukrainian:

```ftl
tabs-close-button = Закрити
tabs-close-tooltip = {$tabCount ->
     [1] Закрити вкладку
     [one] Закрити {$tapCount} вкладку
     [few] Закрити {$tabCount} вкладки
    *[other] Закрити {$tabCount} вкладок
}
tabs-close-warning = {$tabCount ->
     [one] {$tapCount} вкладку буде закрито.
           Ви хочете продовжити?
     [few] {$tabCount} вкладки буде закрито.
           Ви хочете продовжити?
    *[other] {$tabCount} вкладок буде закрито.
             Ви хочете продовжити?
}
```

---

## Comparison with ICU MessageFormat

ICU MessageFormat is the closest localization system to Fluent in terms of functionality.
Fluent shares a lot of philosophy that drove the design of MessageFormat, but improves on it.

```
hello-user = Hello, {userName}!

shared-photos = {userName} {photoCount, plural,
    =1 {added a new photo}
    other {added {photoCount} new photos}
} to {userGender, select,
    male {his stream}
    female {her stream}
    other {their stream}
}.
```

Features that Fluent adds compared to MessageFormat: comments, BiDi support, message refences.

Fluent has formatters that work out of the box, or you can extend them easily. MessageFormat provides formatters that must be applied by the developer.

Additionally, Fluent allows translators to override formatting arguments when appropriate (e.g. translator can decide to show currency symbol or code).

---

## Pontoon

<img src="/pontoon.png" class="p-4 mx-auto" />
 />
>
>
 />
>
