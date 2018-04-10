PostCSS Syntax
====

[![NPM version](https://img.shields.io/npm/v/postcss-syntax.svg?style=flat-square)](https://www.npmjs.com/package/postcss-syntax)
[![Travis](https://img.shields.io/travis/gucong3000/postcss-syntax.svg)](https://travis-ci.org/gucong3000/postcss-syntax)
[![Codecov](https://img.shields.io/codecov/c/github/gucong3000/postcss-syntax.svg)](https://codecov.io/gh/gucong3000/postcss-syntax)
[![David](https://img.shields.io/david/gucong3000/postcss-syntax.svg)](https://david-dm.org/gucong3000/postcss-syntax)

<img align="right" width="95" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://postcss.github.io/postcss/logo.svg">

[PostCSS](https://github.com/postcss/postcss) auto syntax switch tool

## Getting Started

First thing's first, install the module:

```
npm install postcss-syntax --save-dev
```

If you want support SCSS/SASS/LESS/SugarSS syntax, you need to install these module:

- SCSS: [PostCSS-SCSS](https://github.com/postcss/postcss-scss)
- SASS: [PostCSS-SASS](https://github.com/aleshaoleg/postcss-sass)
- LESS: [PostCSS-LESS](https://github.com/shellscape/postcss-less)
- SugarSS: [SugarSS](https://github.com/postcss/sugarss)

If you want support HTML (and HTML-like)/Markdown/styled-components file format, you need to install these module:

- SASS: [PostCSS-Markdown](https://github.com/gucong3000/postcss-markdown)
- LESS: [PostCSS-Styled](https://github.com/gucong3000/postcss-styled)
- SCSS: [PostCSS-HTML](https://github.com/gucong3000/postcss-html)

## Use Cases

```js
const postcss = require('postcss');
const syntax = require('postcss-syntax')({
	processors: [
		{
			test: /\.(?:[sx]?html?|[sx]ht|vue|ux|php)$/i,
			split: 'html',
		},
		{
			test: /\.(?:markdown|md)$/i,
			split: 'markdown',
		},
		{
			test: /\.(?:m?[jt]sx?|es\d*|pac)$/i,
			split: 'styled',
		},
		{
			// custom file extension
			test: /\.postcss$/i,
			lang: 'scss'
		},
		{
			// custom syntax engine
			test: /\.customcss$/i,
			lang: 'custom'
		},
	],
	css: postcss,
	sass: require('postcss-sass'),
	scss: require('postcss-scss'),
	less: require('postcss-less'),
	sugarss: require('sugarss'),
	// custom syntax engine
	custom: require('postcss-custom-syntax'),

});
postcss(plugins).process(source, { syntax: syntax }).then(function (result) {
	// An alias for the result.css property. Use it with syntaxes that generate non-CSS output.
	result.content
});
```
