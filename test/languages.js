"use strict";
const expect = require("chai").expect;
const syntax = require("../");

// https://github.com/Microsoft/vscode/blob/master/extensions/css/package.json
// https://github.com/Microsoft/vscode/blob/master/extensions/less/package.json

function testcase (lang, extensions, source) {
	describe(lang, () => {
		const code = "";
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
		// https://github.com/jshttp/mime-db/blob/master/db.json
		// text/x-markdown
		".mkd",
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
		// https://github.com/jshttp/mime-db/blob/master/db.json
		// application/xhtml+xml
		".xht",
		// https://github.com/Microsoft/vscode/blob/master/extensions/xml/package.json
		".xsl",
		".xslt",
		// https://vue-loader.vuejs.org/spec.html
		// https://github.com/vuejs/vetur/blob/master/package.json
		".vue",
		// https://doc.quickapp.cn/framework/source-file.html
		".ux",
		// https://github.com/Tencent/wepy/blob/master/docs/md/doc.md#wpy文件说明
		".wpy",
		// https://github.com/mblode/vscode-twig-language/blob/master/package.json
		".twig",
		// https://github.com/GingerBear/vscode-liquid/blob/master/package.json
		".liquid",
		// https://github.com/Microsoft/vscode/blob/master/extensions/php/package.json
		".php",
		".php4",
		".php5",
		".phtml",
		".ctp",
	], [
		"<!DOCTYPE html PUBLIC\n\t\"-//W3C//DTD XHTML 1.1//EN\"\n\t\"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">",
		"<!DOCTYPE html>",
		"<html lang=\"zh-cn\">",
		"<html>",
		"<HTML>",
		"<body></body>",
		"<template></template>",
		"<div class=\"btn\"></div>",
		"<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\n\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">",
		"<?xml version=\"1.0\"?>\n<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">\n</xsl:stylesheet>",
		"<?xml version=\"1.0\"?>\n<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">",
		"<?xml version=\"1.0\"?>\n<xsl:stylesheet>",
		"<?xml version=\"1.0\"?></xsl:stylesheet>",
		"<?php /*php followed by space*/ echo \"a\"?>",
		"<?php\necho \"Hello world\";",
		"<?php",
		"<?xxx?>\n<!DOCTYPE html>",
	]);

	testcase("jsx", [
		// https://github.com/michaelgmcd/vscode-language-babel/blob/master/package.json
		// javascript
		".js",
		".es6",
		".mjs",
		".pac",
		// javascriptreact
		".jsx",
		// https://github.com/Microsoft/vscode/blob/master/extensions/typescript-basics/package.json
		// typescript
		".ts",
		// typescriptreact
		".tsx",
		// https://github.com/michaelgmcd/vscode-language-babel/blob/master/package.json
		".babel",
		".flow",
	], [
		"#!/usr/bin/env node",
		"#!~/.nvm/versions/node/v8.9.1/bin/node",
		"#!/c/Program Files/nodejs/node.exe",

		"\"use strict\";",
		"'use strict';",
		"\"use strict\"",
		"'use strict'",
		"\"use strict\";\nalert(0)",

		"// @flow\n'use strict';",
		"/* @flow */\n'use strict';",
		"// @flow\n/* @flow */'use strict';",

		"// @flow\nrequire('flow');",
		"/* @flow */\nrequire('flow');",
		"// @flow\n/* @flow */require('flow');",

		"// @flow\nimport('flow');",
		"/* @flow */\nimport('flow');",
		"// @flow\n/* @flow */import('flow');",

		"import React from 'react'",
		"import defaultExport from \"module-name\";",
		"import * as name from \"module-name\";",
		"import { export } from \"module-name\";",
		"import { export as alias } from \"module-name\";",
		"import { export1 , export2 } from \"module-name\";",
		"import { export1 , export2 as alias2 , [...] } from \"module-name\";",
		"import defaultExport, { export [ , [...] ] } from \"module-name\";",
		"import defaultExport, * as name from \"module-name\";",
		"import \"module-name\";",
		"import styled from 'styled-components';export default styled.div`padding-left: 10px; padding: 20px`;",

		"const styled=require('styled-components');module.exports=styled.div`padding-left: 10px; padding: 20px`;",
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
		".pcss",
		".postcss",
		".acss",
		".wxss",
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

	testcase("stylus", [
		// https://github.com/d4rkr00t/language-stylus/blob/master/package.json
		".styl",
		".stylus",
	]);
});
