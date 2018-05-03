"use strict";

const expect = require("chai").expect;
const postcss = require("postcss");
const syntax = require("../packages/postcss-html");

describe("document tests", () => {
	it("stringify for append node", () => {
		const html = [
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n");
		const document = syntax.parse(html, {
			from: "append.html",
		});
		document.append({
			selector: "b",
		});
		expect(document.toString()).to.equal([
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"b {}",
			"</style>",
			"</html>",
		].join("\n"));
	});

	it("stringify for prepend node", () => {
		const html = [
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n");

		const document = syntax.parse(html, {
			from: "prepend.html",
		});
		document.prepend({
			selector: "b",
		});
		expect(document.toString()).to.equal([
			"<html>",
			"<style>",
			"b {}",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n"));
	});

	it("stringify for insertBefore node", () => {
		const html = [
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n");
		const document = syntax.parse(html, {
			from: "insertBefore.html",
		});
		document.insertBefore(document.last, {
			selector: "b",
		});
		expect(document.toString()).to.equal([
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"<style>",
			"b {}",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n"));
	});

	it("stringify for insertAfter node", () => {
		const html = [
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n");
		const document = syntax.parse(html, {
			from: "insertAfter.html",
		});
		document.insertAfter(document.first, {
			selector: "b",
		});
		expect(document.toString()).to.equal([
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"b {}",
			"</style>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n"));
	});

	it("each()", () => {
		const html = [
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"b {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"b {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n");
		const document = syntax.parse(html, {
			from: "insertAfter.html",
		});
		let count = 0;
		const result = document.each(() => {
			count++;
			return false;
		});
		expect(result).to.be.equal(false);
		expect(count).to.be.equal(2);
	});

	it("async plugin", () => {
		const html = [
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"<style>",
			"b {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n");
		return postcss([
			root => {
				return Promise.resolve().then(() => {
					root.nodes = [];
				});
			},
		]).process(html, {
			syntax: syntax,
			from: "async_plugin.html",
		}).then(result => {
			expect(result.content).to.equal([
				"<html>",
				"<style>",
				"",
				"</style>",
				"<style>",
				"",
				"</style>",
				"</html>",
			].join("\n"));
		});
	});

	it("plugin error", () => {
		const html = [
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n");
		const result = postcss([
			root => {
				throw new Error("mock plugin error");
			},
		]).process(html, {
			syntax: syntax,
			from: "plugin_error.html",
		});

		expect(() => {
			result.sync();
		}).to.throw(/^mock plugin error$/);
	});

	it("empty nodes", () => {
		const html = [
			"<html>",
			"<style>",
			"a {",
			"\tdisplay: flex;",
			"}",
			"</style>",
			"</html>",
		].join("\n");
		const result = postcss([
			root => {
				root.nodes = [];
			},
		]).process(html, {
			syntax: syntax,
			from: "empty_nodes.html",
		});

		expect(result.content).to.equal([
			"<html>",
			"<style>",
			"",
			"</style>",
			"</html>",
		].join("\n"));
	});
});
