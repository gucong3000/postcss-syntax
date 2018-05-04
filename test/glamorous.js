"use strict";
const expect = require("chai").expect;
const syntax = require("../syntax")(require("postcss-jsx/extract"));
const fs = require("fs");

describe("javascript tests", () => {
	it("glamorous", () => {
		const filename = require.resolve("./fixtures/glamorous.jsx");
		let code = fs.readFileSync(filename);

		const document = syntax.parse(code, {
			from: filename,
		});

		code = code.toString();

		expect(document.toString(syntax)).to.equal(code);
		document.nodes.forEach(root => {
			expect(root.source).to.haveOwnProperty("input");

			expect(code).to.includes(root.source.input.css);
			expect(root.source.input.css.length).lessThan(code.length);
			expect(root.source).to.haveOwnProperty("start").to.haveOwnProperty("line").to.greaterThan(1);

			root.walk(node => {
				expect(node).to.haveOwnProperty("source");

				expect(node.source).to.haveOwnProperty("input").to.haveOwnProperty("css").equal(root.source.input.css);

				expect(node.source).to.haveOwnProperty("start").to.haveOwnProperty("line");
				expect(node.source).to.haveOwnProperty("end").to.haveOwnProperty("line");
			});
		});
	});
});
