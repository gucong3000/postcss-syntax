"use strict";

const getSyntax = require("./get-syntax");
const patch = require("./patch-postcss");
const reIsHtml = require("./is-html");
const languages = require("./languages");

function getLang (file, source, opts) {
	if (file && /\.\w+$/.test(file)) {
		for (const langName in languages) {
			if (languages[langName].test(file)) {
				return langName;
			}
		}
	}
	if (reIsHtml.test(source)) {
		return "html";
	}
	return "css";
}

function parser (file, source, rules, opts) {
	patch();
	let lang = rules.find(rule => rule.lang);
	if (lang) {
		lang = lang.lang;
	} else {
		lang = getLang(file, source, opts);
	}

	const syntax = getSyntax(lang, opts);
	const root = syntax.parse(source, opts);

	root.source.syntax = syntax;
	root.source.lang = lang;

	return root;
}

module.exports = parser;
