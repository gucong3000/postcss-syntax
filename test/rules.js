"use strict";
const rules = require("../").config.rules;
const expect = require("chai").expect;
function getRule (file) {
	let rst = rules.filter(rule => rule.test.test(file));
	if (rst.length === 1) {
		rst = rst[0];
	}
	return rst;
}

describe("default config rules", () => {
	it("foo.css", () => {
		expect(getRule("foo.css")).to.haveOwnProperty("lang", "css");
	});
	it("foo.pcss", () => {
		expect(getRule("foo.pcss")).to.haveOwnProperty("lang", "css");
	});
	it("foo.postcss", () => {
		expect(getRule("foo.postcss")).to.haveOwnProperty("lang", "css");
	});
	it("foo.wxss", () => {
		expect(getRule("foo.wxss")).to.haveOwnProperty("lang", "css");
	});
	it("foo.acss", () => {
		expect(getRule("foo.acss")).to.haveOwnProperty("lang", "css");
	});
	it("foo.less", () => {
		expect(getRule("foo.less")).to.haveOwnProperty("lang", "less");
	});
	it("foo.sass", () => {
		expect(getRule("foo.sass")).to.haveOwnProperty("lang", "sass");
	});
	it("foo.sass", () => {
		expect(getRule("foo.sass")).to.haveOwnProperty("lang", "sass");
	});
	it("foo.sss", () => {
		expect(getRule("foo.sss")).to.haveOwnProperty("lang", "sugarss");
	});
	it("foo.sugarss", () => {
		expect(getRule("foo.sugarss")).to.haveOwnProperty("lang", "sugarss");
	});
	it("foo.styl", () => {
		expect(getRule("foo.styl")).to.haveOwnProperty("lang", "stylus");
	});
	it("foo.stylus", () => {
		expect(getRule("foo.stylus")).to.haveOwnProperty("lang", "stylus");
	});
	it("foo.html", () => {
		expect(getRule("foo.html")).to.haveOwnProperty("extract", "html");
	});
	it("foo.htm", () => {
		expect(getRule("foo.htm")).to.haveOwnProperty("extract", "html");
	});
	it("foo.xht", () => {
		expect(getRule("foo.xht")).to.haveOwnProperty("extract", "html");
	});
	it("foo.shtml", () => {
		expect(getRule("foo.shtml")).to.haveOwnProperty("extract", "html");
	});
	it("foo.php", () => {
		expect(getRule("foo.php")).to.haveOwnProperty("extract", "html");
	});
	it("foo.md", () => {
		const rst = getRule("foo.md");
		expect(rst).to.lengthOf(2);
		expect(rst[0]).to.haveOwnProperty("extract", "html");
		expect(rst[1]).to.haveOwnProperty("extract", "markdown");
	});
	it("foo.markdown", () => {
		const rst = getRule("foo.markdown");
		expect(rst).to.lengthOf(2);
		expect(rst[0]).to.haveOwnProperty("extract", "html");
		expect(rst[1]).to.haveOwnProperty("extract", "markdown");
	});
	it("foo.js", () => {
		expect(getRule("foo.js")).to.haveOwnProperty("extract", "jsx");
	});
	it("foo.mjs", () => {
		expect(getRule("foo.mjs")).to.haveOwnProperty("extract", "jsx");
	});
	it("foo.jsx", () => {
		expect(getRule("foo.jsx")).to.haveOwnProperty("extract", "jsx");
	});
	it("foo.ts", () => {
		expect(getRule("foo.ts")).to.haveOwnProperty("extract", "jsx");
	});
	it("foo.tsx", () => {
		expect(getRule("foo.tsx")).to.haveOwnProperty("extract", "jsx");
	});
	it("foo.es6", () => {
		expect(getRule("foo.es6")).to.haveOwnProperty("extract", "jsx");
	});
	it("foo.es2017", () => {
		expect(getRule("foo.es2017")).to.haveOwnProperty("extract", "jsx");
	});
});
