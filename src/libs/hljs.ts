const hljs = require('highlight.js/lib/highlight')
const javascript = require('highlight.js/lib/languages/javascript')
const java = require('highlight.js/lib/languages/java')
const css = require('highlight.js/lib/languages/css')
const less = require('highlight.js/lib/languages/less')
const json = require('highlight.js/lib/languages/json')
const go = require('highlight.js/lib/languages/go')
const markdown = require('highlight.js/lib/languages/markdown')
const php = require('highlight.js/lib/languages/php')
const python = require('highlight.js/lib/languages/python')
const ruby = require('highlight.js/lib/languages/ruby')
const rust = require('highlight.js/lib/languages/rust')
const stylus = require('highlight.js/lib/languages/stylus')
const typescript = require('highlight.js/lib/languages/typescript')
const xml = require('highlight.js/lib/languages/xml')

interface IObj {
  [propName: string]: any
}
const languagesMapping: IObj = {
  javascript,
  java,
  css,
  less,
  json,
  markdown,
  go,
  php,
  python,
  ruby,
  rust,
  stylus,
  typescript,
  xml
}

Object.keys(languagesMapping).forEach(language => {
  hljs.registerLanguage(language, languagesMapping[language])
})

export default hljs
