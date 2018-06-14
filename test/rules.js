"use strict";
let rules;
const expect = require("chai").expect;
function getRule (file, source) {
	let rst = rules.filter(
		rule => rule.test.test ? rule.test.test(file) : rule.test(file, source || "")
	);
	if (rst.length === 1) {
		rst = rst[0];
	}
	return rst;
}

describe("default config rules", () => {
	before(() => {
		delete require.cache[require.resolve("../")];
		rules = require("../").config.rules;
	});
	function testcase (lang, extensions) {
		describe(lang, () => {
			extensions.forEach(ext => {
				it("foo." + ext, () => {
					let rst = getRule("foo." + ext);
					if (lang === "markdown") {
						expect(rst).to.lengthOf(2);
						expect(rst[0]).to.haveOwnProperty("extract", "html");
						rst = rst[1];
					}
					expect(rst).to.haveOwnProperty("extract", lang);
				});
			});
		});
	}
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
		expect(getRule("", "<!DOCTYPE html>")).to.haveOwnProperty("extract", "html");
	});
	it("<html lang=\"zh-cn\">", () => {
		expect(getRule("", "\n<html lang=\"zh-cn\">")).to.haveOwnProperty("extract", "html");
	});
	it("<?xml version=\"1.0\"?>", () => {
		expect(getRule("", "\n<?xml version=\"1.0\"?>")).to.haveOwnProperty("extract", "html");
	});
	it("foo.vue", () => {
		expect(getRule("foo.vue")).to.haveOwnProperty("extract", "html");
	});
	it("foo.ux", () => {
		expect(getRule("foo.ux")).to.haveOwnProperty("extract", "html");
	});
	it("foo.php", () => {
		expect(getRule("foo.php")).to.haveOwnProperty("extract", "html");
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
	// Just for fault tolerance, stylus & XML are not supported
	describe("Fault tolerant", () => {
		it("foo.styl", () => {
			expect(getRule("foo.styl")).to.haveOwnProperty("lang", "stylus");
		});
		it("foo.stylus", () => {
			expect(getRule("foo.stylus")).to.haveOwnProperty("lang", "stylus");
		});
		it("foo.xml", () => {
			expect(getRule("foo.xml")).to.haveOwnProperty("lang", "xml");
		});
		it("foo.svg", () => {
			expect(getRule("foo.svg")).to.haveOwnProperty("lang", "xml");
		});
	});
});
