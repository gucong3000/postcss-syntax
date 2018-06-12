"use strict";

const parser = require("./parser");
const processor = require("./processor");

function parse (source, opts) {
	if (!opts) {
		opts = {};
	}
	if (!opts.syntax) {
		opts.syntax = this;
	}

	source = source.toString();

	let rules = opts.syntax.config.rules;
	const file = opts.from ? opts.from.replace(/^(\w+:\/\/.*?\.\w+)(?:[?#].*)?$/, "$1") : "";
	rules = rules && rules.filter(
		rule => rule.test.test ? rule.test.test(file) : rule.test(file, source)
	);

	return processor(source, rules, opts) || parser(file, source, rules, opts);
}

module.exports = parse;
