"use strict";

const expect = require("chai").expect;
const syntax = require("../");

describe("empty file tests", () => {
	it("empty.html", () => {
		const code = "";
		const document = syntax.parse(code, {
			from: "empty.html",
		});
		expect(document.toString()).to.equal(code);
	});
	it("empty.svg", () => {
		const code = "";
		const document = syntax.parse(code, {
			from: "empty.svg",
		});
		expect(document.toString()).to.equal(code);
	});
	it("empty.xml", () => {
		const code = "";
		const document = syntax.parse(code, {
			from: "empty.xml",
		});
		expect(document.source).to.haveOwnProperty("lang", "xml");
		expect(document.toString()).to.equal(code);
	});
	it("empty.styl", () => {
		const code = "";
		const document = syntax.parse(code, {
			from: "empty.styl",
		});
		expect(document.source).to.haveOwnProperty("lang", "stylus");
		expect(document.toString()).to.equal(code);
	});
	it("empty.xxx", () => {
		const code = "";
		const document = syntax.parse(code, {
			from: "empty.xxx",
		});
		expect(document.source).to.haveOwnProperty("lang", "css");
		expect(document.toString()).to.equal(code);
	});
});
