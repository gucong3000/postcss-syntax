PostCSS Syntax
====

[![Travis](https://img.shields.io/travis/gucong3000/postcss-syntax.svg)](https://travis-ci.org/gucong3000/postcss-syntax)
[![Codecov](https://img.shields.io/codecov/c/github/gucong3000/postcss-syntax.svg)](https://codecov.io/gh/gucong3000/postcss-syntax)
[![David](https://img.shields.io/david/dev/gucong3000/postcss-syntax.svg)](https://david-dm.org/gucong3000/postcss-syntax?type=dev)

<img align="right" width="95" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://postcss.github.io/postcss/lib/logo.svg">

postcss-syntax can automatically switch the required [PostCSS](https://github.com/postcss/lib/postcss) syntax by file extensions

## Getting Started

First thing's first, install the module:

```
npm install postcss-syntax --save-dev
```

If you want support SCSS/SASS/LESS/SugarSS syntax, you need to install these module:

- SCSS: [postcss-scss](https://github.com/postcss/lib/postcss-scss)
- SASS: [postcss-sass](https://github.com/aleshaoleg/postcss-sass)
- LESS: [postcss-less](https://github.com/shellscape/postcss-less)
- SugarSS: [sugarss](https://github.com/postcss/lib/sugarss)

If you want support HTML (and HTML-like)/Markdown/CSS-in-JS file format, you need to install these module:

- CSS-in-JS: [postcss-jsx](packages/postcss-jsx#readme)
- HTML (and HTML-like): [postcss-html](packages/postcss-html#readme)
- Markdown: [postcss-markdown](packages/postcss-markdown#readme)

## Use Cases

```js
const postcss = require('postcss');
const syntax = require('postcss-syntax');
postcss(plugins).process(source, { syntax: syntax }).then(function (result) {
	// An alias for the result.css property. Use it with syntaxes that generate non-CSS output.
	result.content
});
```

## Advanced Use Cases

See: [postcss-syntax](packages/postcss-syntax)
