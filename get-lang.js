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
	sass: /^sass$/i,
	scss: /^scss$/i,
	less: /^less$/i,
	sugarss: /^s(?:ugar)?ss$/i,
	stylus: /^styl(?:us)?$/i,
	// WXSS(WeiXin Style Sheets) See: https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html
	// acss(AntFinancial Style Sheet) See: https://docs.alipay.com/mini/framework/acss
	// `*.pcss`, `*.postcss`
	css: /^(?:wx|\w*c)ss$/i,
};

const extracts = {
	jsx: /^(?:m?[jt]sx?|es\d*|pac)$/i,
	// *.xslt?	XSLT		https://msdn.microsoft.com/en-us/library/ms764661(v=vs.85).aspx
	// *.vue	VUE 		https://vue-loader.vuejs.org/spec.html
	// *.ux		quickapp	https://doc.quickapp.cn/framework/source-file.html
	// *.wpy	WePY		https://github.com/Tencent/wepy/blob/master/docs/md/doc.md#wpy文件说明
	html: /^(?:\w*html?|xht|mdoc|jsp|aspx?|volt|ejs|php|vue|ux|wpy)$/i,
	markdown: /^(?:m(?:ark)?d(?:ow)?n|mk?d)$/i,
	xsl: /^xslt?$/i,
	xml: /^(?:xml|xsd|ascx|atom|axml|bpmn|config|cpt|csl|csproj|csproj|user|dita|ditamap|dtd|dtml|fsproj|fxml|iml|isml|jmx|launch|menu|mxml|nuspec|opml|owl|proj|props|pt|publishsettings|pubxml|pubxml|user|rdf|rng|rss|shproj|storyboard|svg|targets|tld|tmx|vbproj|vbproj|user|vcxproj|vcxproj|filters|wsdl|wxi|wxl|wxs|xaml|xbl|xib|xlf|xliff|xpdl|xul|xoml)$/i,
};

function sourceType (source) {
	source = source && source.trim();
	if (!source) {
		return;
	}
	let extract;
	if ((/^#!([^\r\n]+)/.test(source) && /(?:^|\s+)(?:ts-)?node(?:\.\w+)?(?:\s+|$)$/.test(RegExp.$1)) || /^("|')use strict\1;*\s*(\r?\n|$)/.test(source) || /^import(?:\s+[^;]+\s+from)?\s+("|')[^'"]+?\1;*\s*(\r?\n|$)/.test(source) || /^(?:(?:var|let|const)\s+[^;]+\s*=)?\s*(?:require|import)\(.+\)/.test(source)) {
		// https://en.wikipedia.org/wiki/Shebang_(Unix)
		// or start with strict mode
		// or start with import code
		extract = "jsx";
	} else if (/^<(?:!DOCTYPE\s+)?html(\s+[^<>]*)?>/i.test(source)) {
		extract = "html";
	} else if (/^<\?xml(\s+[^<>]*)?\?>/i.test(source)) {
		// https://msdn.microsoft.com/en-us/library/ms764661(v=vs.85).aspx
		if (/<xsl:\w+\b[^<>]*>/.test(source) || /<\/xsl:\w+>/i.test(source)) {
			extract = "xsl";
		} else {
			extract = "xml";
		}
	} else if (/^#+\s+\S+/.test(source) || /^\S+[^\r\n]*\r?\n=+(\r?\n|$)/.test(source)) {
		extract = "markdown";
	} else if (/<(\w+)(?:\s+[^<>]*)?>[\s\S]*?<\/\1>/.test(source)) {
		extract = "html";
	} else {
		return;
	}
	return {
		extract,
	};
}

function extType (extName, languages) {
	for (const langName in languages) {
		if (languages[langName].test(extName)) {
			return langName;
		}
	}
}

function fileType (file) {
	if (file && /\.(\w+)(?:[?#].*?)?$/.test(file)) {
		const extName = RegExp.$1;
		const extract = extType(extName, extracts);
		if (extract) {
			return {
				extract,
			};
		}
		const lang = extType(extName, languages);
		if (lang) {
			return {
				lang,
			};
		}
	}
}

function getLang (opts, source) {
	const file = opts.from;
	const rules = opts.syntax.config.rules;
	return (rules && rules.find(
		rule => rule.test.test ? rule.test.test(file) : rule.test(file, source)
	)) || fileType(file) || sourceType(source) || {
		lang: "css",
	};
}

module.exports = getLang;
