"use strict";
const stringify = require("./stringify");
const parseStyle = require("./parse-style");

module.exports = (split, defaultConfig) => {
	defaultConfig = defaultConfig || {};
	function parse (source, opts) {
		if (!opts) {
			opts = {};
		}
		if (!opts.syntax) {
			opts.syntax = this;
		}
		return parseStyle(source, opts, split(source, opts));
	}

	function initSyntax (syntax) {
		syntax.stringify = stringify.bind(syntax);
		syntax.parse = parse.bind(syntax);
		syntax.split = split.bind(syntax);
		return syntax;
	}

	function syntax (config) {
		return initSyntax({
			config: Object.assign({}, defaultConfig, config),
		});
	}

	initSyntax(syntax);
	syntax.config = defaultConfig;
	return syntax;
};
