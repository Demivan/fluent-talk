---
highlighter: shiki
editor: dev
css: unocss
transition: fade-out
---

<h1 class="flex flex-col">
<div>Fluent</div>
<div class="text-28px leading-tight">localization system for natural-sounding translations</div>
</h1>

<div class="mt-xl">Ivan Demchuk</div>

<!--
Привіт всім. Мене звуть Іван. Я техлід на проєкті Scor.

Якщо по ходу презентації будуть виникати питання, можете зразу їх задавати та не чекати кінця презентації.

Сьогодні я хочу вам розказати про систему для локалізації яку ми використовуємо на проєкті - Fluent. Поговоримо про її функціонал, переваги та недоліки.

Але спочатку поговорімо про локалізацію загалом. Що це таке, чому це потрібно, які існують проблеми з наявними системами локалізації.

Хто може сказати що таке локалізація? Чим вона відрізняється від інтернаціоналізації?
-->

---

## Localization vs internationalization

### What is Localization? (l10n)

Localization is the process of adapting a product or service to meet the language, cultural, and other specific requirements of a particular country or region.

Localization includes translation of content, but also includes adjustments to date and time formats, currency, images, and other.

### What is Internationalization? (i18n)

Internationalization is the process of designing and developing a product or service to be easily adapted for different languages, cultures, and regions.

Internationalization involves making the product or service flexible enough to accommodate local differences in content, without requiring significant changes to the core product or service.

<!--
Локалізація - це процес адаптації продукту відповідно мовним, культурним та іншим вимогам певної країни або регіону.

Це означає не тільки переклад контенту, але й адаптацію форматів дати та часу, валюти, зображень та іншого.

А інтернаціоналізація, це процес проєктування та розробки продукту, який легко локалізується.

Дуже часто розробники ігнорують інтернаціоналізацію, або задумуються про неї запізно, коли вже розпочався процес локалізації. Це приводить до того, що локалізація стає складнішою ніж могла б бути.
-->

---

## Issues with current localization paradigm

Software localization has been dominated by an outdated paradigm: the translation is just a dictionary of strings which map one-to-one to the English copy.

This paradigm is unfair and limiting to languages with grammars more complex than English. For any grammatical feature not supported by English, a special case must be added to the source code, leaking logic into all translations.

For example, a lot of localization systems do not support pluralization that depends on multiple variables, forcing developers to split localization into multiple messages (`vue-i18n`):

```json
{
    "apples-and-bananas": "{appleCountText} and {bananaCountText}",
    "apples": "{appleCount} apple|{appleCount} apples",
    "bananas": "{bananaCount} banana|{bananaCount} bananas"
}
```

```ts
$t("apples-and-bananas", {
  appleCountText: $tc("apples", 1, { appleCount: 1 }), // "1 apple"
  bananaCountText: $tc("bananas", 5, { bananaCount: 5 }), // "5 bananas"
}); // "1 apple and 5 bananas"
```

<!--
І багато систем локалізації роблять інтернаціоналізацію складнішою. Вони ігнорують складність граматик більшості мов, і просто перекладають слова та речення з базової (в більшості випадків англійської) мови. Це приводить до того, що часто розробникам доводиться додавати код для підтримки нових мов на проєкті.

Також простий синтаксис більшості систем локалізації не підтримує багато конструкцій реальних мов.

Наприклад відсутність підтримки перекладів які залежать він множини декількох змінних, змушує розробників розбивати переклади на декілька стрічок і потім їх комбінувати.

Тут наведений приклад з бібліотеки `vue-i18n`. Як бачимо, просте речення тут розбито на три стрічки перекладу. Вони не зв'язані між собою, що ускладнює роботу перекладачам. Та це потребує додаткового коду від розробника, щоб зібрати речення з декількох стрічок.

Додатково з цією системою локалізації розробнику необхідно використовувати інший метод (`$tc`) з додатковим параметром для того, щоб працювала локалізація множини. Якщо розробник не використав спеціальний метод, перекладач не зможе додати варіант перекладу з множиною навіть якщо використає правильний синтаксис.

І таких прикладів є дуже багато в різних системах локалізації.
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
Що ж таке Fluent і як він розв'язує проблеми з локалізацією?

Fluent це система локалізації, розроблена Mozilla. Версія 1.0 була випущена у 2019 році. Вона використовується в багатьох проєктах Mozilla, таких як Firefox, Thunderbird та інших.

Вона використовує простий синтаксис, але дозволяє описувати складні конструкції мов.
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
Розгляньмо переваги Fluent порівняно з іншими системами локалізації. 

Синтаксис Fluent легкий для вивчення, але потужний і дозволяє використовувати множину, відмінки, роди та інші особливості реальних мов.

Fluent має вбудоване форматування дат та чисел і можливість додавати нові функції форматування. Також має підтримку категорій множини (потім поясню що це таке) та мов з різними напрямками письма.

Найголовніше, Fluent дозволяє поступово вдосконалювати переклади однієї мови без впливу на інші та на код проєкту.
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
Давайте ближче ознайомимось з синтаксисом Fluent.

На цьому прикладі показані дві локалізовані стрічки.

Перша стрічка проста, і вона не відрізняється від того як це було б в інших системах локалізації.
А друга стрічка демонструє як Fluent дозволяє описувати складні речення. 

Тут використовується `select` синтаксис, в мовах програмування його еквівалентом буде `switch` чи `if/else`.

Ми бачимо що в залежності від значення змінної `photoCount`, використовуються різні переклади. Якщо `photoCount` буде 1, то буде використана перша під-стрічка, а якщо більше ніж 1, то друга. Тут використані "категорії множини" 'one' та 'other', для кожної мови вони свої, наприклад в українській мові їх більше і в категорію 'one' попадає не тільки 1, а й 21, 31 і т.д. 
В другій частині речення змінна `userGender` визначає який рід буде використаний в перекладі.

Це ефективно об'єднує 6 варіантів речення в одну стрічку локалізації. І дозволяє розробникам не думати про те як буде виглядати переклад, а просто описувати речення, які потрібно перекласти.

Тут показана ще одна функціональність яку легко пропустити. Змінна `photoCount` тут теж буде локалізована. І в перекладачів навіть є можливість впливати на те як вона буде відформатована.

Поговорімо більше за локалізацію чисел та дат у Fluent.
-->

---

## Date, time and number formatting

Fluent will automatically select the right formatter for the argument and format it into a given locale.

This is done using built-in functions: `NUMBER` and `DATETIME`. Both of them use `Intl` browser feature to format numbers and dates.


```ftl
emails = You have { $unreadEmails } unread emails.
emails2 = You have { NUMBER($unreadEmails) } unread emails.
```

Fluent enables localizers to have limited control over a selected subset of arguments to formatters. This means that, for example, the developer decides what currency the passed number is in, but the localizer can override the defaults on whether the currency should be displayed as a symbol or currency code.

```ftl
amount-owed = You owe { NUMBER($amount, currencyDisplay: "code", useGrouping: "false") }
```

```ts
$t('amount-owed', { amount: Fluent.NumberArgument(50.35, { currency: "USD" }) }) // You owe USD 50.35
```

In addition, Fluent functions are extendable. You can easily add other functions, for example, if you want to format dates using `date-fns` or other date formatting library.

<!--
Fluent автоматично форматує змінні які є числами та датами використовуючи вбудовані в браузер API `Intl.NumberFormat` та `Intl.DateTimeFormat`. Під капотом форматування перетворюється в виклик відповідних функцій `NUMBER` та `DATETIME`.

В наведеному тут прикладі, ці дві стрічки є еквівалентними.

На відміну від інших систем локалізації які дозволяють контролювати форматування лише розробникам або лише перекладачам, у Fluent це можуть робити обоє. Наприклад для форматування ціни, розробник може передати валюту, а перекладач може передати параметри які впливають на відображення самого числа.

Список функцій Fluent можна розширити, наприклад зробити форматування дат використовуючи бібліотеку, яка вже використовується на проєкті, чи додати функцію яка вертає поточну операційну систему, щоб локалізувати шорткати.
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

```ftl {all|1-3|6-8|all}
tabs-close-warning =
    You are about to close {$tabCount} tabs.
    Are you sure you want to continue?

# -sync-brand-name is a terms that can be reused
-sync-brand-name = Firefox Account
login-sync = Sign in to {-sync-brand-name}
logout-sync = Sign out of {-sync-brand-name}
```

::right::

### Ukrainian:

```ftl {all|10-15|all}
tabs-close-warning = {$tabCount ->
     [one] {$tapCount} вкладку буде закрито.
           Ви хочете продовжити?
     [few] {$tabCount} вкладки буде закрито.
           Ви хочете продовжити?
    *[other] {$tabCount} вкладок буде закрито.
             Ви хочете продовжити?
}

-sync-brand-name = {$case ->
   *[nominative] обліковий запис Firefox
    [genitive] облікового запису Firefox
}
login-sync = Увійти у {-sync-brand-name}
logout-sync = Вийти з {-sync-brand-name(case: "genitive")}
```

<!--
Ще одною перевагою Fluent є те що зміни перекладів в одній мові не приводять до змін в коді проєкту чи перекладах інших мов.

Тут переклад `tabs-close-warning` в англійській мові не має додатково варіанту множини. Але додавання цієї логіки в український варіант перекладу не потребує змін в коді - єдиним параметром залишається змінна `$tabCount`.

Також потужною функцією є "терміни". Це змінні які можна використовувати в інших стрічках перекладів. Якщо ви хочете змінити назву "Firefox Account", ви можете змінити її в одному місці.

Додатково терміни можуть мати параметри, наприклад відмінки як видно на прикладі українському перекладі.
-->

---

## Fluent drawbacks

- Learning Curve  
  Unique syntax and concepts may require additional time for developers and translators to learn.

- Limited Tooling  
  Fewer available integrated development environments (IDEs) and localization-specific tools.

- Adoption and Support  
  Relatively new system with limited resources, documentation, and community support.

- Integration Challenges  
  Difficulty integrating Fluent into existing codebases or platforms using different localization systems.

<!--
Хоча Fluent має багато переваг, він також має деякі недоліки.

Синтаксис та концепції Fluent можуть потребувати додаткового часу для опановування як розробниками, так і перекладачами.

Також Fluent є порівняно новою та менш популярною системою, тому він має обмежену кількість інструментів та документації.

Залежності від мови програмування та фреймворку, інтеграція може бути складною або відсутньою.
-->

---

## Pontoon

<img src="/pontoon.png" class="p-4 mx-auto" />

<!--
Pontoon вирішує деякі з цих проблем. Це система управління перекладами, розроблена Mozilla і використовується для перекладу багатьох продуктів компанії.

Pontoon спрощує роботу перекладачів. Він нативно підтримує Fluent та має автодоповнення змінних і функцій та простіше відображення перекладів які використовують `select` синтаксис.

Pontoon також має багато іншої корисної функціональності для перекладачів: ревю, коментування, машинний переклад і т.д.
-->

---

## Implementations

### Official

- The JavaScript implementation at [`fluent.js`](https://github.com/projectfluent/fluent.js), including the [React bindings](https://github.com/projectfluent/fluent.js/tree/master/fluent-react).
- The Python implementation at [`python-fluent`](https://github.com/projectfluent/python-fluent).
- The Rust implementation at [`fluent-rs`](https://github.com/projectfluent/fluent-rs).

### Community

- [`fluent-vue`](https://github.com/demivan/fluent-vue) - Vue.js plugin - integration for `fluent.js`
- [`i18next-fluent`](https://github.com/i18next/i18next-fluent) - i18next Fluent syntax plugin
- [`Fluent.Net`](https://github.com/blushingpenguin/Fluent.Net) - .NET implementation
- [`fluent.go`](https://github.com/lus/fluent.go) - a Golang implementation
- [`elm-fluent`](https://github.com/elm-fluent/elm-fluent) - an Elm implementation
- [`fluent-dart`](https://github.com/ryanhz/fluent-dart) as a Dart runtime implementation

<!--
Хоча Fluent порівняно менш популярний ніж деякі інші системи локалізації, він має реалізації на різних мовах програмування, включаючи три офіційних на JavaScript, Python, Rust, та багато інших, наприклад на Go, Dart, Elm, .NET, та інших.

Також Fluent синтаксис підтримується популярною бібліотекою `i18next`. Це може бути зручно для тих хто вже її використовує, або хоче мати швидке рішення яке охоплює всі необхідні інструменти.

Інтеграція з Vue - `fluent-vue` розроблена мною, саме її ми використовуємо на проєкті.
-->

---

## Future of Fluent

`ICU MessageFormat` is the closest localization system to Fluent in terms of functionality.

Currently, the team behind Fluent is working with Unicode team on a new version of `MessageFormat 2` that extends MessageFormat 1 with features from Fluent.

In addition to new, improved syntax, there is a proposal to introduce new web APIs for `MessageFormat 2` support - `Intl.MessageFormat`. So we might get a browser-native localization system that is as powerful as Fluent in the future.

Cool thing is that Fluent is already compatible with MessageFormat 2 and can be easily converted to MessageFormat 2 syntax.

So with Fluent, you get a powerful localization system today that is easily compatible with the future of Web i18n.

<!--
ICU MessageFormat є однією з найбільш популярних систем локалізації та дуже схожою з Fluent за функціональністю.

Наразі команда, що стоїть за Fluent, співпрацює з командою Unicode над новою версією MessageFormat (2), яка розширює можливості MessageFormat 1 функціоналом з Fluent.

Крім цього існує пропозиція про додавання нових веб-API для підтримки MessageFormat 2 - Intl.MessageFormat. Отже, у майбутньому ми можемо отримати вбудовану в браузер систему локалізації.

Цікаво, що Fluent вже сумісний з MessageFormat 2. Синтаксис Fluent можна легко конвертувати в синтаксис MessageFormat 2.

Таким чином, завдяки Fluent ви можете отримати потужну систему локалізації вже сьогодні, яка легко сумісна з майбутніми технологіями веб.
-->

---
layout: fact
---

## Thank you!

Any questions?
