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
	let rules = opts.syntax.config.rules;
	rules = rules && rules.filter(
		rule => rule.test.test(opts.from || "")
	);
	source = source.toString();
	return processor(source, rules, opts) || parser(source, rules, opts);
}

module.exports = parse;
