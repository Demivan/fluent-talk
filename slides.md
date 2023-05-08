---
highlighter: shiki
editor: true
---

# Fluent

## localization system for natural-sounding translations

---
layout: statement
---

## What is the difference between localization and internationalization?

---

## What is Localization? (l10n)

### Definition

* Localization is the process of adapting a product or service to meet the language, cultural, and other specific requirements of a particular country or region.
* Localization includes translation of content, but also includes adjustments to date and time formats, currency, images, and other factors that impact how the product or service is perceived and used.

### Examples

* Translating a website into multiple languages to appeal to global audiences.
* Changing the date and time format on a software application to match local conventions.
* Adapting product packaging to meet local regulations and cultural norms.

### Benefits

* Better user experience for local customers.
* Improved customer satisfaction and loyalty.
* Legal compliance with local regulations.

---

## What is Internationalization? (i18n)

### Definition

* Internationalization is the process of designing and developing a product or service to be easily adapted for different languages, cultures, and regions.
* Internationalization involves making the product or service flexible enough to accommodate local differences in content, without requiring significant changes to the core product or service.

### Examples

* Designing software to support multiple character sets, such as Latin, Cyrillic, or Arabic.
* Using a content management system to easily update and manage multilingual content on a website.
* Separating content and presentation to make it easier to localize content for different markets.

### Benefits

* Increased efficiency and cost savings in the localization process.
* Faster time to market in new regions.
* Reduced risk of cultural missteps or errors in translation.

---

## Issues with current localization paradigm

Software localization has been dominated by an outdated paradigm: the translation is just a dictionary of strings which map one-to-one to the English (en-US) copy.

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

---

## What is Fluent

* Fluent is a localization system designed for creating natural-sounding translations.
* Developed by Mozilla, the system uses a simpler syntax than traditional localization systems.
* Fluent is easy to learn and use, making it an ideal choice for developers who want to provide high-quality translations for their users.

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

---
layout: two-cols-header
---

## Fluent features

::left::

### Asymmetric Localization

Natural-sounding translations with genders and grammatical cases only when necessary. Expressiveness is not limited by the grammar of the source language.

### Progressive Enhancement

Translations are isolated; locale-specific logic doesn't leak to other locales. Authors can iteratively improve translations without impact on other languages.

::right::

### Fully-Featured

Date, time, and number formatting. Plural categories. Bidirectionality support. Custom formatters. Easy-to-read syntax. Runtime translation and re-translation. Robust error handling.

### Open Source

Fluent Syntax 1.0 was released in April 2019. Client- and server-side implementations in JS, Python, and Rust. React bindings. Licensed under the Apache 2.0 License.

---
layout: two-cols-header
---

## Asymmetric Localization

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
