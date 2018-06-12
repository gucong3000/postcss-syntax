"use strict";
const expect = require("chai").expect;
const Module = require("module");
const _findPath = Module._findPath;
let syntax;

describe("custom language", () => {
	before(() => {
		Module._findPath = (request, paths, isMain) => {
			if (request === "postcss-jsx") {
				return null;
			}
			return _findPath.apply(Module, [request, paths, isMain]);
		};

		delete require.cache[require.resolve("../")];
		syntax = require("../");
	});
	after(() => {
		Module._findPath = Module._findPath;
	});
	it("custom.postcss", () => {
		const code = "a { display: block; }";
		const document = syntax({
			rules: [
				{
					// custom language for file extension
					test: () => true,
					lang: "postcss",
				},
			],
			postcss: "css",
		}).parse(code, {
			from: "custom.postcss",
		});
		expect(document.source).to.haveOwnProperty("lang", "postcss");
		expect(document.toString()).to.equal(code);
	});
});
