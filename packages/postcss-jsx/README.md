PostCSS JSX Syntax
====

[![NPM version](https://img.shields.io/npm/v/postcss-jsx.svg?style=flat-square)](https://www.npmjs.com/package/postcss-jsx)

<img align="right" width="95" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://postcss.github.io/postcss/lib/logo.svg">

[PostCSS](https://github.com/postcss/lib/postcss) syntax for parsing [CSS in JS](https://github.com/MicheleBertoli/css-in-js) literals

## Getting Started

First thing's first, install the module:

```
npm install postcss-syntax postcss-jsx --save-dev
```

## Use Cases

```js
const postcss = require('postcss');
const stylelint = require('stylelint');
const syntax = require('postcss-jsx');
postcss([stylelint({ fix: true })]).process(source, { syntax: syntax }).then(function (result) {
	// An alias for the result.css property. Use it with syntaxes that generate non-CSS output.
	result.content
});
```

input:
```javascript
import glm from 'glamorous';
const Component1 = glm.a({
	flexDirectionn: 'row',
	display: 'inline-block',
	color: '#fff',
});
```

output:
```javascript
import glm from 'glamorous';
const Component1 = glm.a({
	color: '#fff',
	display: 'inline-block',
	flexDirectionn: 'row',
});
```

## Advanced Use Cases

See: [postcss-syntax](../postcss-syntax#readme)

### Style Transformations

The main use case of this plugin is to apply PostCSS transformations to CSS code in template literals & styles as object literals.
