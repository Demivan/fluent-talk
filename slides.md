---
highlighter: shiki
editor: dev
title: Fluent
---

# Fluent

## localization system for natural-sounding translations

<!--
Сьогодні я вам хочу розказати про систему для локалізації яку ми використовуємо в нас на проекті, її переваги та недоліки. Мова піде про Fluent.

Але давайте спочатку зробимо крок назад і поговоримо про локалізацію загалом. Що це таке, чому це потрібно, які існують проблеми з існуючими системами локалізації.

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

Це означає не тільки переклад контенту, але і адаптацію формату дати та часу, валюти, зображень та інших факторів, які впливають на сприйняття та використання продукту або сервісу.

Інтернаціоналізація - це процес проектування та розробки продукту або сервісу, який легко локалізується для різних мов, культур та регіонів.

Дуже часто розробники ігнорують інтернаціоналізацію, або роблять її пізно, коли вже відбулася локалізація. І це призводить до того, що локалізація стає дуже складною, або навіть неможливою.
-->

---

## Issues with current localization paradigm

Software localization has been dominated by an outdated paradigm: the translation is just a dictionary of strings which map one-to-one to the English copy.

```json
{
  "hello-user": "Hello, {{userName}}!",
  "shared-photos": "{{userName}} added {{photoCount}} new photos to his stream."  
}
```

This paradigm is unfair and limiting to languages with grammars more complex than English. For any grammatical feature not supported by English, a special case must be added to the source code, leaking logic into all translations. Furthermore, creating good UIs which depend on multiple external arguments is hard and requires the developer to understand the grammar of the languages the product targets.

```json
{
  "key_one": "{{count}} item",
  "key_other": "{{count}} items"
}
```

```ts
// The variable name must be count. And it must be present.
i18next.t('key', {count: 1}); // -> "1 item"
i18next.t('key', {count: 100}); // -> "100 items"
```

<!--
Багато систем локалізації роблять інтернаціоналізацію складнішо. Вони ігнорують складність граматики більшості мов, і просто перекладають слова та речення з англійської мови. Це призводить до того, що розробникам доводиться додавати додатковий код для кожної мови, що використовується в проекті.

Наприклад більшість систем локалізаці не підтримуть плюралізацію декількох змінних. І це призводить до того, що потрібно розбивати переклад на декілька стрічок і потім їх комбінувати.

Або як в цьому прикладі засобу локалізації i18next, для підтримки плюралізації розробник повинен використовувати змінну з іменем count, і вона є обов'язковою. Якщо розробник не передбачив що ця стрічка має бути плюрализована, то перекладач не зможе цього зробити.
-->

---

## What is Fluent?

* Fluent is a localization system designed for creating natural-sounding translations.
* Developed by Mozilla, the system uses a simpler syntax than traditional localization systems.
* It allows, when necessary, to express complex concepts from natural languages like gender, plurals, conjugations, and others.

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
-->

---
layout: two-cols-header
---

## Example

::left::

<simple-input />

::right::

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
На цьому прикладі показані дві локалізовані стрічки.

Перша стрічка проста, і вона не відрізняється від того як це було б в інших системах локалізації.
А друга стрічка демонструє як Fluent дозволяє описувати складні речення.

Тут ми бачимо що в залежності від значення змінної photoCount, ми можемо робити різні переклади. Якщо photoCount буде 1, то буде використана перша підстрічка, а якщо більше 1, то друга. А змінна userGender визначає який рід буде використаний в перекладі.

Це ефективно дозволяє об'єднати 6 варіантів речення в одну стрічку локалізації.

І це дозволяє розробникам не думати про те як буде виглядати переклад, а просто описувати речення, які потрібно перекласти.
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

Date, time, and number formatting. Plural categories. Bidirectionality support. Custom formatters. Easy-to-read syntax. Runtime translation and re-translation. Robust error handling.

### Progressive Enhancement

Translations are isolated; locale-specific logic doesn't leak to other locales. Authors can iteratively improve translations without impact on other languages.

<!--
Давайте
-->

---
layout: two-cols-header
---

## Asymmetric Localization and Progressive Enhancement

Each language is isolated and the localization logic of one language doesn't leak into other languages nor into the source code.

```js
$t('tabs-close-tooltip', { tabCount: 5 })
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
