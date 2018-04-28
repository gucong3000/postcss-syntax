PostCSS Syntax
====

[![NPM version](https://img.shields.io/npm/v/postcss-syntax.svg?style=flat-square)](https://www.npmjs.com/package/postcss-syntax)

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

- CSS-in-JS: [postcss-jsx](../postcss-jsx)
- HTML (and HTML-like): [postcss-html](../postcss-html)
- Markdown: [postcss-markdown](../postcss-markdown)

## Use Cases

```js
const postcss = require('postcss');
const syntax = require('postcss-syntax')({
	processors: [
		{
			test: /\.(?:[sx]?html?|[sx]ht|vue|ux|php)$/i,
			extract: 'html',
		},
		{
			test: /\.(?:markdown|md)$/i,
			extract: 'markdown',
		},
		{
			test: /\.(?:m?[jt]sx?|es\d*|pac)$/i,
			extract: 'styled',
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
