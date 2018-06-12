"use strict";

const stringify = require("./stringify");
const parse = require("./parse");
const reIsHtml = require("./is-html");
// https://github.com/Microsoft/vscode/blob/master/extensions/xml/package.json#L11
const languages = require("./languages");

const defaultConfig = {
	rules: [
		{
			test: languages.sass,
			lang: "sass",
		},
		{
			test: languages.scss,
			lang: "scss",
		},
		{
			test: languages.less,
			lang: "less",
		},
		{
			test: languages.sugarss,
			lang: "sugarss",
		},
		{
			test: languages.stylus,
			lang: "stylus",
		},
		{
			test: languages.xml,
			lang: "xml",
		},
		{
			// WXSS(WeiXin Style Sheets) See: https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html
			// acss(AntFinancial Style Sheet) See: https://docs.alipay.com/mini/framework/acss
			// `*.pcss`, `*.postcss`
			test: languages.css,
			lang: "css",
		},
		{
			// *.xslt?	https://msdn.microsoft.com/en-us/library/ms764661(v=vs.85).aspx
			// *.vue	https://vue-loader.vuejs.org/spec.html
			// *.ux		https://doc.quickapp.cn/framework/source-file.html
			// MTML
			// Markdown
			// XML		Just for fault tolerance, XML is not supported except XSLT
			test: (file, source) => (
				(file && [
					languages.html,
					languages.markdown,
				].some(re => re.test(file))) || reIsHtml.test(source)
			),
			extract: "html",
		},
		{
			test: languages.markdown,
			extract: "markdown",
		},
		{
			test: languages.jsx,
			extract: "jsx",
		},
	],
	postcss: "css",
	stylus: "css",
	xml: "html",
};

function initSyntax (syntax) {
	syntax.stringify = stringify.bind(syntax);
	syntax.parse = parse.bind(syntax);
	return syntax;
}

function syntax (config) {
	return initSyntax({
		config: Object.assign({}, defaultConfig, config),
	});
}

initSyntax(syntax);
syntax.config = defaultConfig;
module.exports = syntax;
