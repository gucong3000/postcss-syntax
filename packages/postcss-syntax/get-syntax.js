"use strict";

function cssSyntax () {
	return {
		stringify: require("postcss/lib/stringify"),
		parse: require("postcss/lib/parse"),
	};
}
function normalize (syntax) {
	if (!syntax.parse) {
		syntax = {
			parse: syntax,
		};
	}
	return syntax;
}

function requireSyntax (lang) {
	if (/^css$/i.test(lang)) {
		return cssSyntax();
	} else if (/^sugarss$/i.test(lang)) {
		lang = "sugarss";
	} else {
		lang = lang.toLowerCase().replace(/^(postcss-)?/i, "postcss-");
	}
	return normalize(require(lang));
}

function getSyntax (lang, opts) {
	let syntax;
	if (opts.syntax.config[lang]) {
		syntax = opts.syntax.config[lang];
		if (typeof syntax === "string") {
			syntax = requireSyntax(syntax);
		} else {
			syntax = normalize(syntax);
		}
	} else if (/^css$/i.test(lang)) {
		syntax = cssSyntax();
	} else {
		return requireSyntax(lang);
	}
	if (!syntax.stringify) {
		if (/^css$/i.test(lang)) {
			syntax.stringify = require("postcss/lib/stringify");
		} else {
			syntax.stringify = getSyntax("css", opts).stringify;
		}
	}
	opts.syntax.config[lang] = syntax;
	return syntax;
}

module.exports = getSyntax;
