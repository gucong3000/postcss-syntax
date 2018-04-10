"use strict";

const parseStyle = require("./parse-style");

function processor (source, rules, opts) {
	rules = rules && rules.filter(rule => rule.split).map(rule => {
		if (typeof rule.split === "string") {
			rule.split = rule.split.toLowerCase().replace(/^(postcss-)?/i, "postcss-");
			rule.split = require(rule.split + "/lib/split");
		}
		return rule;
	});

	if (!rules || !rules.length) {
		return;
	}
	const styles = rules.reduce(
		(styles, rule) => (
			rule.split(source, Object.assign({}, opts, rule.opts), styles) || styles
		),
		[]
	);

	return parseStyle(source, opts, styles);
}

module.exports = processor;
