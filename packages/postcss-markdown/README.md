PostCSS Markdown Syntax
====

[![NPM version](https://img.shields.io/npm/v/postcss-markdown.svg?style=flat-square)](https://www.npmjs.com/package/postcss-markdown)

<img align="right" width="95" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://postcss.github.io/postcss/lib/logo.svg">

[PostCSS](https://github.com/postcss/lib/postcss) Syntax for parsing [Markdown](https://daringfireball.net/projects/markdown/syntax)

## Getting Started

First thing's first, install the module:

```
npm install postcss-syntax postcss-markdown --save-dev
```

If you want support SCSS/SASS/LESS/SugarSS syntax, you need to install the corresponding module.

- SCSS: [PostCSS-SCSS](https://github.com/postcss/lib/postcss-scss)
- SASS: [PostCSS-SASS](https://github.com/aleshaoleg/postcss-sass)
- LESS: [PostCSS-LESS](https://github.com/shellscape/postcss-less)
- SugarSS: [SugarSS](https://github.com/postcss/lib/sugarss)

## Use Cases

```js
var syntax = require('postcss-markdown')({
	// Enable support for HTML (default: false) See: https://github.com/gucong3000/postcss-syntax/tree/master/packages/postcss-html
	html: true,
	// syntax for parse scss (non-required options)
	scss: require('postcss-scss'),
	// syntax for parse less (non-required options)
	less: require('postcss-less'),
	// syntax for parse css blocks (non-required options)
	css: require('postcss-safe-parser'),
});
var autoprefixer = require('autoprefixer');
postcss([ autoprefixer ]).process(source, { syntax: syntax }).then(function (result) {
	// An alias for the result.css property. Use it with syntaxes that generate non-CSS output.
	result.content
});
```
input:
<pre><code># title

```css
::placeholder {
  color: gray;
}
```
</code></pre>


output:
<pre><code># title

```css
::-webkit-input-placeholder {
  color: gray;
}
:-ms-input-placeholder {
  color: gray;
}
::-ms-input-placeholder {
  color: gray;
}
::placeholder {
  color: gray;
}
```
</code></pre>

If you want support SCSS/SASS/LESS/SugarSS syntax, you need to install these module:

- SCSS: [PostCSS-SCSS](https://github.com/postcss/lib/postcss-scss)
- SASS: [PostCSS-SASS](https://github.com/aleshaoleg/postcss-sass)
- LESS: [PostCSS-LESS](https://github.com/shellscape/postcss-less)
- SugarSS: [SugarSS](https://github.com/postcss/lib/sugarss)

## Advanced Use Cases

See: [postcss-syntax](../postcss-syntax#readme)

### Style Transformations

The main use case of this plugin is apply PostCSS transformations to CSS (and CSS-like) code blocks in markdown file.
