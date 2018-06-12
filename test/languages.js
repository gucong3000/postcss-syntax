"use strict";
const expect = require("chai").expect;
const syntax = require("../");

// https://github.com/Microsoft/vscode/blob/master/extensions/xml/package.json
// https://github.com/Microsoft/vscode/blob/master/extensions/css/package.json
// https://github.com/Microsoft/vscode/blob/master/extensions/less/package.json
// https://github.com/vuejs/vetur/blob/master/package.json
const normalCode = {
	xml: `
		<?xml version="1.0" standalone="no"?>
		<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
		"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

		<svg width="100%" height="100%" version="1.1"
		xmlns="http://www.w3.org/2000/svg">

		<rect width="300" height="100"
		style="fill:rgb(0,0,255);stroke-width:1;
		stroke:rgb(0,0,0)"/>

		</svg>
	`,
	xsl: `
		<?xml version='1.0'?>
		<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

		<xsl:template match="book">
			<HTML>
			<HEAD>
				<TITLE>Book Info</TITLE>
				<STYLE>
						H1 {
							font-family: Arial,Univers,sans-serif;
							font-size: 36pt
						}
				</STYLE>
			</HEAD>
			<BODY><xsl:apply-templates/></BODY>
			</HTML>
		</xsl:template>

		<xsl:template match="book_title">
			<H1><xsl:value-of select="."/></H1>
		</xsl:template>

		</xsl:stylesheet>
	`,
	stylus: "a { display: block; }",
};
function testcase (lang, extensions, source) {
	describe(lang, () => {
		const code = normalCode[lang] || "";
		extensions.forEach(ext => {
			const file = ext.replace(/^\.*/, "empty.");
			it(file, () => {
				const document = syntax.parse(code, {
					from: file,
				});
				expect(document.source).to.haveOwnProperty("lang", lang);
				expect(document.toString()).to.equal(code);
			});
		});
		if (!source) {
			return;
		}
		source.forEach(code => {
			it(JSON.stringify(code), () => {
				const document = syntax.parse(code, {
					from: undefined,
				});
				expect(document.source).to.haveOwnProperty("lang", lang);
				expect(document.toString()).to.equal(code);
			});
		});
	});
}

describe("language tests", () => {
	testcase("markdown", [
		// https://github.com/Microsoft/vscode/blob/master/extensions/markdown-basics/package.json
		".md",
		".mdown",
		".markdown",
		".markdn",
	], [
		"# asdadsad",
		"# asdadsad\n",
		"asdadsad\n====",
		"asdadsad\n====\n",
	]);

	testcase("html", [
		// https://github.com/Microsoft/vscode/blob/master/extensions/html/package.json
		".html",
		".htm",
		".shtml",
		".xhtml",
		".mdoc",
		".jsp",
		".asp",
		".aspx",
		".jshtm",
		".volt",
		".ejs",
		".rhtml",
		// https://github.com/vuejs/vetur/blob/master/package.json
		// *.Vue	Single-File Component (SFC) Spec	https://vue-loader.vuejs.org/spec.html
		".vue",
		// *.ux		quickapp	https://doc.quickapp.cn/framework/source-file.html
		".ux",
		// https://github.com/Tencent/wepy/blob/master/docs/md/doc.md#wpy文件说明
		".wpy",
	], [
		"<!DOCTYPE html PUBLIC\n\t\"-//W3C//DTD XHTML 1.1//EN\"\n\t\"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">",
		"<!DOCTYPE html>",
		"<html lang=\"zh-cn\">",
		"<html>",
		"<HTML>",
		"<body></body>",
		"<template></template>",
	]);

	testcase("jsx", [
		// https://github.com/Microsoft/vscode/blob/master/extensions/javascript/package.json
		// javascriptreact
		".jsx",
		// javascript
		".js",
		".es6",
		".mjs",
		".pac",
		// https://github.com/Microsoft/vscode/blob/master/extensions/typescript-basics/package.json
		// typescriptreact
		".tsx",
		// typescript
		".ts",
	], [
		"#!/usr/bin/env node",
		"\"use strict\";",
		"'use strict';",
		"\"use strict\"",
		"'use strict'",
		"\"use strict\";\nalert(0)",
		"import defaultExport from \"module-name\";",
		"import * as name from \"module-name\";",
		"import { export } from \"module-name\";",
		"import { export as alias } from \"module-name\";",
		"import { export1 , export2 } from \"module-name\";",
		"import { export1 , export2 as alias2 , [...] } from \"module-name\";",
		"import defaultExport, { export [ , [...] ] } from \"module-name\";",
		"import defaultExport, * as name from \"module-name\";",
		"import \"module-name\";",
		"require('a');",
		"var a = require('a');",
		"var a=require('a');",
		"import(\"a\");",
		"const a = import('a');",
	]);

	testcase("css", [
		// WXSS(WeiXin Style Sheets) See: https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html
		// acss(AntFinancial Style Sheet) See: https://docs.alipay.com/mini/framework/acss
		// `*.pcss`, `*.postcss`
		".css",
		".acss",
		".wxss",
		".pcss",
		".postcss",
		".Unknown",
	], [
		"",
		"a{b:c}",
	]);

	testcase("xml", [
		// https://github.com/Microsoft/vscode/blob/master/extensions/xml/package.json
		".xml",
		".xsd",
		".ascx",
		".atom",
		".axml",
		".bpmn",
		".config",
		".cpt",
		".csl",
		".csproj",
		".csproj.user",
		".dita",
		".ditamap",
		".dtd",
		".dtml",
		".fsproj",
		".fxml",
		".iml",
		".isml",
		".jmx",
		".launch",
		".menu",
		".mxml",
		".nuspec",
		".opml",
		".owl",
		".proj",
		".props",
		".pt",
		".publishsettings",
		".pubxml",
		".pubxml.user",
		".rdf",
		".rng",
		".rss",
		".shproj",
		".storyboard",
		".svg",
		".targets",
		".tld",
		".tmx",
		".vbproj",
		".vbproj.user",
		".vcxproj",
		".vcxproj.filters",
		".wsdl",
		".wxi",
		".wxl",
		".wxs",
		".xaml",
		".xbl",
		".xib",
		".xlf",
		".xliff",
		".xpdl",
		".xul",
		".xoml",
	], [
		"<?xml version=\"1.0\"?>",
		"<?xml?>",
	]);

	testcase("xsl", [
		// https://github.com/Microsoft/vscode/blob/master/extensions/xml/package.json
		".xsl",
		".xslt",
	], [
		"<?xml version=\"1.0\"?>\n<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">\n</xsl:stylesheet>",
		"<?xml version=\"1.0\"?>\n<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">",
		"<?xml version=\"1.0\"?>\n<xsl:stylesheet>",
		"<?xml version=\"1.0\"?></xsl:stylesheet>",
	]);

	testcase("stylus", [
		// https://github.com/d4rkr00t/language-stylus/blob/master/package.json
		".styl",
		".stylus",
	]);
});
