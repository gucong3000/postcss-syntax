"use strict";

// https://github.com/Microsoft/vscode/blob/master/extensions/markdown-basics/package.json
// https://github.com/Microsoft/vscode/blob/master/extensions/html/package.json
// https://github.com/Microsoft/vscode/blob/master/extensions/javascript/package.json
// https://github.com/Microsoft/vscode/blob/master/extensions/typescript-basics/package.json
// https://github.com/Microsoft/vscode/blob/master/extensions/xml/package.json
// https://github.com/Microsoft/vscode/blob/master/extensions/css/package.json
// https://github.com/Microsoft/vscode/blob/master/extensions/less/package.json
// https://github.com/vuejs/vetur/blob/master/package.json

const languages = {
	sass: /\.sass$/i,
	scss: /\.scss$/i,
	less: /\.less$/i,
	sugarss: /\.s(?:ugar)?ss$/i,
	stylus: /\.styl(?:us)?$/i,
	// WXSS(WeiXin Style Sheets) See: https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html
	// acss(AntFinancial Style Sheet) See: https://docs.alipay.com/mini/framework/acss
	// `*.pcss`, `*.postcss`
	css: /\.(?:wx|\w*c)ss$/i,
	jsx: /\.(?:m?[jt]sx?|es\d*|pac)$/i,
	html: /\.(?:\w*html?|x(?:ht|slt?)|mdoc|jsp|aspx?|volt|ejs|php|vue|ux)$/i,
	markdown: /\.(?:m(?:ark)?d(?:ow)?n|mk?d)$/i,
	xml: /\.(?:xml|xsd|ascx|atom|axml|bpmn|config|cpt|csl|csproj|csproj|user|dita|ditamap|dtd|dtml|fsproj|fxml|iml|isml|jmx|launch|menu|mxml|nuspec|opml|owl|proj|props|pt|publishsettings|pubxml|pubxml|user|rdf|rng|rss|shproj|storyboard|svg|targets|tld|tmx|vbproj|vbproj|user|vcxproj|vcxproj|filters|wsdl|wxi|wxl|wxs|xaml|xbl|xib|xlf|xliff|xpdl|xul|xoml)$/i,
};

module.exports = languages;
