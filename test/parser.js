"use strict";
const proxyquire = require("proxyquire");
const expect = require("chai").expect;
const parser = proxyquire("../parser", {
	"./patch-postcss": () => {},
	"./get-syntax": () => ({
		parse: () => ({
			source: {},
		}),
	}),
});

function getSource (file, source) {
	return parser(file, source, []).source;
}

describe("parser tests", () => {
	function testcase (lang, extensions) {
		describe(lang, () => {
			extensions.forEach(ext => {
				it("foo." + ext, () => {
					expect(getSource("foo." + ext)).to.haveOwnProperty("lang", lang);
				});
			});
		});
	}
	it("foo.css", () => {
		expect(getSource("foo.css")).to.haveOwnProperty("lang", "css");
	});
	it("foo.pcss", () => {
		expect(getSource("foo.pcss")).to.haveOwnProperty("lang", "css");
	});
	it("foo.postcss", () => {
		expect(getSource("foo.postcss")).to.haveOwnProperty("lang", "css");
	});
	it("foo.wxss", () => {
		expect(getSource("foo.wxss")).to.haveOwnProperty("lang", "css");
	});
	it("foo.acss", () => {
		expect(getSource("foo.acss")).to.haveOwnProperty("lang", "css");
	});
	it("foo.less", () => {
		expect(getSource("foo.less")).to.haveOwnProperty("lang", "less");
	});
	it("foo.sass", () => {
		expect(getSource("foo.sass")).to.haveOwnProperty("lang", "sass");
	});
	it("foo.sass", () => {
		expect(getSource("foo.sass")).to.haveOwnProperty("lang", "sass");
	});
	it("foo.sss", () => {
		expect(getSource("foo.sss")).to.haveOwnProperty("lang", "sugarss");
	});
	it("foo.sugarss", () => {
		expect(getSource("foo.sugarss")).to.haveOwnProperty("lang", "sugarss");
	});
	testcase("html", [
		// https://github.com/Microsoft/vscode/blob/master/extensions/html/package.json
		"html",
		"htm",
		"shtml",
		"xhtml",
		"mdoc",
		"jsp",
		"asp",
		"aspx",
		"jshtm",
		"volt",
		"ejs",
		"rhtml",

		// https://github.com/jshttp/mime-db/blob/master/db.json
		// application/xhtml+xml
		"xht",

		// https://github.com/Microsoft/vscode/blob/master/extensions/xml/package.json #xsl
		"xsl",
		"xslt",
	]);
	it("<!DOCTYPE html>", () => {
		expect(getSource("", "<!DOCTYPE html>")).to.haveOwnProperty("lang", "html");
	});
	it("<html lang=\"zh-cn\">", () => {
		expect(getSource("", "\n<html lang=\"zh-cn\">")).to.haveOwnProperty("lang", "html");
	});
	it("<?xml version=\"1.0\"?>", () => {
		expect(getSource("", "\n<?xml version=\"1.0\"?>")).to.haveOwnProperty("lang", "html");
	});
	it("foo.vue", () => {
		expect(getSource("foo.vue")).to.haveOwnProperty("lang", "html");
	});
	it("foo.ux", () => {
		expect(getSource("foo.ux")).to.haveOwnProperty("lang", "html");
	});
	it("foo.php", () => {
		expect(getSource("foo.php")).to.haveOwnProperty("lang", "html");
	});
	testcase("markdown", [
		// https://github.com/Microsoft/vscode/blob/master/extensions/markdown-basics/package.json
		"md",
		"mdown",
		"markdown",
		"markdn",

		// https://github.com/jshttp/mime-db/blob/master/db.json
		// text/x-markdown
		"mkd",
	]);
	it("foo.js", () => {
		expect(getSource("foo.js")).to.haveOwnProperty("lang", "jsx");
	});
	it("foo.mjs", () => {
		expect(getSource("foo.mjs")).to.haveOwnProperty("lang", "jsx");
	});
	it("foo.jsx", () => {
		expect(getSource("foo.jsx")).to.haveOwnProperty("lang", "jsx");
	});
	it("foo.ts", () => {
		expect(getSource("foo.ts")).to.haveOwnProperty("lang", "jsx");
	});
	it("foo.tsx", () => {
		expect(getSource("foo.tsx")).to.haveOwnProperty("lang", "jsx");
	});
	it("foo.es6", () => {
		expect(getSource("foo.es6")).to.haveOwnProperty("lang", "jsx");
	});
	it("foo.es2017", () => {
		expect(getSource("foo.es2017")).to.haveOwnProperty("lang", "jsx");
	});
	// Just for fault tolerance, stylus & XML are not supported
	describe("Fault tolerant", () => {
		it("foo.styl", () => {
			expect(getSource("foo.styl")).to.haveOwnProperty("lang", "stylus");
		});
		it("foo.stylus", () => {
			expect(getSource("foo.stylus")).to.haveOwnProperty("lang", "stylus");
		});
		it("foo.xml", () => {
			expect(getSource("foo.xml")).to.haveOwnProperty("lang", "xml");
		});
		it("foo.svg", () => {
			expect(getSource("foo.svg")).to.haveOwnProperty("lang", "xml");
		});
	});
});
