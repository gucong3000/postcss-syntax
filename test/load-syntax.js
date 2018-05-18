"use strict";

const expect = require("chai").expect;
const postcss = require("postcss");
const syntax = require("../syntax")(require("postcss-html/extract"));

describe("load-syntax", () => {
	it("template value in quickapp", () => {
		return postcss().process([
			"<template>",
			"\t<span style=\"color:{{notice.color}};font-size:{{notice.font_size}}px\" for=\"{{(index,notice) in showModalData.notice}}\">{{notice.txt}}</span>",
			"\t<span style=\"color:{{notice.color}};font-size:{{notice.font_size}}px\" for=\"{{(index,notice) in showModalData.notice}}\">{{notice.txt}}</span>",
			"</template>",

		].join("\n"), {
			syntax,
			from: "quickapp.ax",
		}).then(result => {
			expect(result.root.nodes).to.have.lengthOf(2);
		});
	});
	it("template value in quickapp with `postcss-safe-parser`", () => {
		return postcss().process([
			"<template>",
			"\t<span style=\"color:{{notice.color}};font-size:{{notice.font_size}}px\" for=\"{{(index,notice) in showModalData.notice}}\">{{notice.txt}}</span>",
			"\t<span style=\"color:{{notice.color}};font-size:{{notice.font_size}}px\" for=\"{{(index,notice) in showModalData.notice}}\">{{notice.txt}}</span>",
			"</template>",

		].join("\n"), {
			syntax: syntax({
				css: "postcss-safe-parser",
			}),
			from: "quickapp.ax",
		}).then(result => {
			expect(result.root.nodes).to.have.lengthOf(2);
		});
	});
});
