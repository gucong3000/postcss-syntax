"use strict";

const expect = require("chai").expect;
const postcss = require("postcss");
const syntax = require("../")({
	css: "postcss-safe-parser",
});

describe("postcss-safe-parser", () => {
	it("a{", () => {
		return postcss([
			root => {
				expect(root.nodes).to.have.lengthOf(1);
			},
		]).process("a{", {
			syntax,
			from: "postcss-safe-parser.css",
		}).then(result => {
			expect(result.content).to.equal("a{}");
		});
	});
});
