"use strict";

const parser = require("./parser");
const processor = require("./processor");
const getLang = require("./get-lang");

function parse (source, opts) {
	if (!opts) {
		opts = {};
	}
	if (!opts.syntax) {
		opts.syntax = this;
	}

	source = source.toString();
	const syntax = getLang(opts, source);
	const syntaxOpts = Object.assign({}, opts, syntax.opts);
	let root;
	if (syntax.extract) {
		root = processor(source, syntax.extract, syntaxOpts);
		root.source.lang = syntax.extract;
	} else {
		root = parser(source, syntax.lang, syntaxOpts);
		root.source.lang = syntax.lang;
	}
	return root;
}

module.exports = parse;
