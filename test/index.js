"use strict";

const expect = require("chai").expect;
const syntax = require("../");
describe("api", () => {
	it("default", () => {
		const root = syntax.parse("a{b:c}");
		expect(root.nodes).to.have.lengthOf(1);
		expect(root.first).to.have.property("type", "rule");
		expect(root.first).to.have.property("selector", "a");
		expect(root.first.nodes).to.have.lengthOf(1);
		expect(root.first.first).to.have.property("type", "decl");
		expect(root.first.first).to.have.property("prop", "b");
		expect(root.first.first).to.have.property("value", "c");
	});

	it("parse error", () => {
		const syntax = require("../lib/syntax")(require("postcss-html/lib/split"))({
			css: {
				parse: () => {
					throw new Error("mock parse error");
				},
			},
		});
		expect(() => {
			syntax.parse("<style></style>");
		}).to.throw(/^mock parse error$/);
	});

	it("loader return null", () => {
		const root = syntax({
			rules: [
				{
					test: /.*/,
					split: () => null,
				},
				{
					test: /.*/,
					split: "html",
				},
			],
		}).parse(
			"<style>a{b:c}</style>\n".repeat(3)
		);
		expect(root.nodes).to.have.lengthOf(3);
	});

	it("loader opts", () => {
		let result;
		syntax({
			rules: [
				{
					test: /.*/,
					opts: {
						loaderOpts: "mock",
					},
					split: (source, opts) => {
						result = opts;
					},
				},
			],
		}).parse(
			"<style>a{b:c}</style>\n".repeat(3),
			{
				from: "mock.html",
			}
		);
		expect(result).to.have.property("from", "mock.html");
		expect(result).to.have.property("loaderOpts", "mock");
	});

	describe("standalone with syntax set by extension", () => {
		const opts = {
			rules: [],
		};
		[
			"css",
			"less",
			"sass",
			"scss",
			"sugarss",
			"stylus",
		].forEach(lang => {
			opts[lang] = {
				parse: () => ({
					source: {},
					lang,
				}),
			};
		});
		const mockSyntax = syntax(opts);
		function lang (extension) {
			return mockSyntax.parse("", {
				from: "*." + extension,
			}).lang;
		}

		it("css", () => {
			expect(lang("css")).to.be.equal("css");
		});
		it("pcss", () => {
			expect(lang("pcss")).to.be.equal("css");
		});
		it("postcss", () => {
			expect(lang("postcss")).to.be.equal("css");
		});
		it("acss", () => {
			expect(lang("acss")).to.be.equal("css");
		});
		it("wxss", () => {
			expect(lang("wxss")).to.be.equal("css");
		});
		it("sass", () => {
			expect(lang("sass")).to.be.equal("sass");
		});
		it("scss", () => {
			expect(lang("scss")).to.be.equal("scss");
		});
		it("less", () => {
			expect(lang("less")).to.be.equal("less");
		});
		it("sugarss", () => {
			expect(lang("sss")).to.be.equal("sugarss");
		});
		it("stylus", () => {
			expect(lang("styl")).to.be.equal("stylus");
		});
	});

	describe("standalone with syntax set by rules", () => {
		const opts = {
			rules: [
				{
					test: /.*/,
					lang: "mockLang",
				},
			],
		};
		opts.mockLang = {
			parse: () => ({
				source: {},
				lang: "mock lang",
			}),
		};
		const mockSyntax = syntax(opts);
		function lang (extension) {
			return mockSyntax.parse("", {
				from: "*." + extension,
			}).lang;
		}

		[
			"css",
			"pcss",
			"postcss",
			"acss",
			"wxss",
			"sass",
			"scss",
			"less",
			"sugarss",
			"stylus",
		].forEach(extension => {
			it(extension, () => {
				expect(lang(extension)).to.be.equal("mock lang");
			});
		});
	});
});
