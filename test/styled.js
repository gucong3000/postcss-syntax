"use strict";
/* eslint-disable */
function testcase () {
	const Button = styled.button`
		/* Adapt the colours based on primary prop */
		background: ${props => props.primary ? 'palevioletred' : 'white'};
		color: ${props => props.primary ? 'white' : 'palevioletred'};

		font-size: 1em;
		margin: 1em;
		padding: 0.25em 1em;
		border: 2px solid palevioletred;
		border-radius: 3px;
	`;
}

/* eslint-enable */

const expect = require("chai").expect;
const postcss = require("postcss");
const syntax = require("../lib/syntax")(require("postcss-styled/lib/split"))();
const fs = require("fs");

describe("javascript tests", () => {
	it("styled-components", () => {
		let code = fs.readFileSync(__filename, "utf8");
		let codeStart = "function testcase () {";
		codeStart = code.indexOf(codeStart) + codeStart.length;
		code = code.slice(codeStart, code.indexOf("/* eslint-enable */", codeStart) - 3).trim();
		const lines = code.match(/^.+$/gm).map(line => (line.replace(/^\s*(.+?);?\s*$/, "$1")));
		lines.shift();

		const root = syntax.parse(code, {
			from: __filename,
		});

		expect(root.nodes).to.have.lengthOf(1);
		expect(root.first.nodes).to.have.lengthOf(8);
		root.first.nodes.forEach((decl, i) => {
			if (i) {
				expect(decl).to.have.property("type", "decl");
			} else {
				expect(decl).to.have.property("type", "comment");
			}
			expect(decl.toString()).to.equal(lines[i]);
		});

		expect(root.toString(), code);
	});

	it("empty template literal", () => {
		const code = [
			"function test() {",
			"  console.log(`debug`)",
			"  return ``;",
			"}",
			"",
		].join("\n");
		return postcss([
			root => {
				expect(root.nodes).to.have.lengthOf(0);
			},
		]).process(code, {
			syntax: syntax,
			from: "empty_template_literal.js",
		}).then(result => {
			expect(result.content).to.equal(code);
		});
	});

	it("skip javascript syntax error", () => {
		const code = "\\`";
		return postcss([
			root => {
				expect(root.nodes).to.have.lengthOf(0);
			},
		]).process(code, {
			syntax: syntax,
			from: "syntax_error.js",
		}).then(result => {
			expect(result.content).to.equal(code);
		});
	});

	it("skip CSS syntax error", () => {
		const code = "`a{`";
		const root = syntax.parse(code, {
			from: "css_syntax_error.js",
		});
		expect(root.nodes).to.have.lengthOf(0);
		expect(root.toString()).to.equal(code);
	});
});
