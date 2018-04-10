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
	return processor(source, rules, opts) || parser(source, rules, opts);
}

module.exports = parse;

const Node = require("postcss/lib/node").prototype;
const NodeToString = Node.toString;
Node.toString = function toString (stringifier) {
	return NodeToString.call(this, stringifier || this.root().source.syntax);
};
