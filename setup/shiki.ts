import { defineShikiSetup } from '@slidev/types'

import { BUNDLED_LANGUAGES, Theme, getHighlighter } from 'shiki'

import VueGrammar from 'shiki/languages/vue.tmLanguage.json'
import FluentGrammar from './fluent.tmLanguage.json'

const shikiLanguages = BUNDLED_LANGUAGES
  .filter(lang => lang.id !== 'vue')

Object.assign(VueGrammar.repository, FluentGrammar.repository)

// Add fluent support to shiki Vue lang definition
VueGrammar.patterns.unshift(
  {
    "begin": "(<)(fluent)",
    "beginCaptures": {
      "1": {
        "name": "punctuation.definition.tag.begin.html"
      },
      "2": {
        "name": "entity.name.tag.style.html"
      }
    },
    "end": "(</)(fluent)(>)",
    "endCaptures": {
      "1": {
        "name": "punctuation.definition.tag.begin.html"
      },
      "2": {
        "name": "entity.name.tag.style.html"
      },
      "3": {
        "name": "punctuation.definition.tag.end.html"
      }
    },
    "patterns": [
      {
        "begin": "(>)",
        "end": "(?=</fluent>)",
        "contentName": "source.ftl",
        "patterns": [{
          "include": "#comment"
        },{
          "include": "#message"
        }]
      }
    ]
  }
)

export default defineShikiSetup(() => {
  return {
    langs: [
      ...shikiLanguages, {
        id: 'vue',
        scopeName: 'source.vue',
        grammar: VueGrammar,
      }, {
        id: 'ftl',
        scopeName: 'source.ftl',
        grammar: FluentGrammar
      }
    ],  
    theme: {
      dark: 'dark-plus',
      light: 'light-plus',
    },
  }
})
