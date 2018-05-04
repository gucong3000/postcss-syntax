"use strict";
const parseStyle = require("../parse-style");
const postcss = require("postcss");
const expect = require("chai").expect;

describe("parse-style", () => {
	it("style.ignoreErrors", () => {
		parseStyle("test", {}, [
			{
				syntax: {
				},
				ignoreErrors: true,
			},
		]);
	});

	it("fix error.column", () => {
		let error;
		try {
			parseStyle("test", {}, [
				{
					startIndex: 9,
					content: "a {",
					syntax: postcss,
				},
			]);
		} catch (ex) {
			error = ex;
		}
		expect(error.column).to.equal(10);
	});

	it("skipConvert error.column", () => {
		let error;
		try {
			parseStyle("test", {}, [
				{
					startIndex: 9,
					skipConvert: true,
					content: "a {",
					syntax: postcss,
				},
			]);
		} catch (ex) {
			error = ex;
		}
		expect(error.column).to.equal(1);
	});
});
