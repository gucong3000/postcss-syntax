"use strict";

const expect = require("chai").expect;
const syntax = require("../")({
	rules: [
		{
			test: /\.md$/,
			extract: require("postcss-html/lib/extract"),
		},
		{
			test: /\.md$/,
			extract: require("postcss-markdown/lib/extract"),
		},
	],
});

describe("markdown tests", () => {
	it("CSS", () => {
		const md = [
			"---",
			"title: Something Special",
			"---",
			"Here is some text.",
			"```css",
			".foo {}",
			"```",
			"And some other text.",
			"```css",
			"    .foo { color: pink; }",
			"      .bar {}",
			"```",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"```scss",
			"// Parser-breaking comment",
			"$foo: bar;",
			".foo {}",
			"```",
			"```js",
			"<style>",
			"js {}",
			"</style>",
			"```",
			"```html",
			"<style>",
			"html {}",
			"</style>",
			"```",
			"And the end.",
		].join("\n");
		const root = syntax.parse(md, {
			from: "markdown.md",
		});
		expect(root.nodes).to.have.lengthOf(5);
		expect(root.toString()).to.equal(md);
	});

	it("empty code block", () => {
		const source = [
			"hi",
			"",
			"```css",
			"",
			"```",
			"",
		].join("\n");
		const root = syntax.parse(source, {
			from: "empty_code_block.md",
		});
		expect(root.nodes).to.have.lengthOf(1);
		const css = root.first.source;
		expect(css.lang).equal("css");
		expect(css.input.css).equal("\n");
		expect(css.start.line).equal(4);
		expect(css.start.column).equal(1);
	});

	it("empty file", () => {
		const root = syntax.parse("", {
			from: "empty_file.md",
		});
		expect(root.nodes).have.lengthOf(0);
		expect(root.toString()).to.equal("");
	});

	it("without code blocks", () => {
		const root = syntax.parse("# Hi\n", {
			from: "without_code_blocks.md",
		});
		expect(root.nodes).to.have.lengthOf(0);
		expect(root.toString()).to.equal("# Hi\n");
	});
});
