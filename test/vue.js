"use strict";

const expect = require("chai").expect;
const syntax = require("../syntax")(require("postcss-html/extract"));

describe("vue tests", () => {
	it("vue with empty <style>", () => {
		const vue = [
			"<style module=\"style\"></style>",
			"<style scoped lang=\"stylus\" module>",
			"</style>",
		].join("\n");
		const root = syntax({
			"css": "css",
		}).parse(vue, {
			from: "empty.vue",
		});
		expect(root.first.source.lang).to.equal("css");
		expect(root.last.source.lang).to.equal("stylus");
		expect(root.nodes).to.have.lengthOf(2);
		root.nodes.forEach(root => {
			expect(root.nodes).to.have.lengthOf(0);
		});
		expect(root.toString()).to.equal(vue);
	});

	it("safe-parser", () => {
		const vue = [
			"<style module=\"style\"></style>",
			"<style scoped lang=\"stylus\" module>",
			"</style>",
		].join("\n");
		const root = syntax({
			css: "postcss-safe-parser",
		}).parse(vue, {
			from: "empty.vue",
		});
		expect(root.first.source.lang).to.equal("css");
		expect(root.last.source.lang).to.equal("stylus");
		expect(root.nodes).to.have.lengthOf(2);
		root.nodes.forEach(root => {
			expect(root.nodes).to.have.lengthOf(0);
		});
		expect(root.toString()).to.equal(vue);
	});

	it("vue with lang(s)", () => {
		const vue = [
			"<style lang=\"scss\">",
			"//sass style",
			"//-----------------------------------",
			"$fontStack:    Helvetica, sans-serif;",
			"$primaryColor: #333;",

			"body {",
			"  font-family: $fontStack;",
			"  color: $primaryColor;",
			"}",
			"</style>",
			"<style lang=\"less\">",
			"@base: #f938ab;",

			".box-shadow(@style, @c) when (iscolor(@c)) {",
			"  -webkit-box-shadow: @style @c;",
			"  box-shadow:         @style @c;",
			"}",
			".box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {",
			"  .box-shadow(@style, rgba(0, 0, 0, @alpha));",
			"}",
			".box {",
			"  color: saturate(@base, 5%);",
			"  border-color: lighten(@base, 30%);",
			"  div { .box-shadow(0 0 5px, 30%) }",
			"}",
			"</style>",
		].join("\n");
		const root = syntax.parse(vue, {
			from: "lang.vue",
		});
		expect(root.nodes).to.have.lengthOf(2);
		expect(root.first.source.lang).to.equal("scss");
		expect(root.last.source.lang).to.equal("less");
		expect(root.toString()).to.equal(vue);
	});

	it("single line syntax error", () => {
		expect(() => {
			syntax.parse("<style>a {</style>", {
				from: "SyntaxError.vue",
			});
		}).to.throw(/SyntaxError.vue:1:8: Unclosed block\b/);
	});
});
