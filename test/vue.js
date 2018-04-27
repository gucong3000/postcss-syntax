"use strict";

const expect = require("chai").expect;
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const syntax = require("../packages/postcss-html")({
	stylus: "css",
});

describe("vue tests", () => {
	it("autoprefixer", () => {
		return postcss([
			autoprefixer({
				browsers: ["Chrome >= 1"],
				cascade: false,
			}),
		]).process([
			"<style module=\"style\">",
			".red {",
			"  color: red;",
			"}",
			"@keyframes fade {",
			"  from { opacity: 1; } to { opacity: 0; }",
			"}",
			".animate {",
			"  animation: fade 1s;",
			"}",
			"</style>",
			"<style scoped lang=\"stylus\" module>",
			".red",
			"  color: red",
			"</style>",
			"<script lang='coffee'>",
			"should skip coffeescript)))",
			"</script>",
		].join("\n"), {
			syntax,
			from: "autoprefixer.vue",
		}).then(result => {
			expect(result.content).to.equal([
				"<style module=\"style\">",
				".red {",
				"  color: red;",
				"}",
				"@-webkit-keyframes fade {",
				"  from { opacity: 1; } to { opacity: 0; }",
				"}",
				"@keyframes fade {",
				"  from { opacity: 1; } to { opacity: 0; }",
				"}",
				".animate {",
				"  -webkit-animation: fade 1s;",
				"  animation: fade 1s;",
				"}",
				"</style>",
				"<style scoped lang=\"stylus\" module>",
				".red",
				"  color: red",
				"</style>",
				"<script lang='coffee'>",
				"should skip coffeescript)))",
				"</script>",
			].join("\n"));
		});
	});
	it("vue with empty <style>", () => {
		const vue = [
			"<style module=\"style\"></style>",
			"<style scoped lang=\"stylus\" module>",
			"</style>",
		].join("\n");
		const root = syntax.parse(vue, {
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
			"<style lang=\"scss?outputStyle=expanded\">",
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
