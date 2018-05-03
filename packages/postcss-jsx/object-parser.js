"use strict";
const getTemplate = require("./get-template");
const camelCase = require("./camel-case");
const Literal = require("./literal");
const Obj = require("./obj");
const postcss = require("postcss");

function forEach (arr, callback) {
	arr && arr.forEach(callback);
}

function unCamelCase (str) {
	return str.replace(/[A-Z]/g, (char) => "-" + char.toLowerCase()).replace(/(^|\b)ms-/, "$1-ms-");
}

const replaceProp = (fn) => (value) => (
	value.replace(/(\(\s*)(.*?)(\s*:)/g, (s, prefix, prop, suffix) => (
		prefix + fn(prop) + suffix
	))
);
const camelCaseProp = replaceProp(camelCase);
const unCamelCaseProp = replaceProp(unCamelCase);

function defineRaws (node, prop, prefix, suffix, props) {
	if (!props) {
		props = {};
	}
	const descriptor = {
		enumerable: true,
		get: () => (
			node[prop]
		),
		set: (value) => {
			node[prop] = value;
		},
	};

	if (!props.raw) {
		props.raw = descriptor;
	} else if (props.raw === "camel") {
		props.raw = {
			enumerable: true,
			get: () => (
				camelCase(node[prop])
			),
			set: (value) => {
				node[prop] = unCamelCase(value);
			},
		};
	}

	props.value = descriptor;

	node.raws[prop] = Object.defineProperties({
		prefix,
		suffix,
	}, props);
}

class objectParser {
	constructor (input) {
		this.input = input;
	}
	parse (node, source) {
		const root = postcss.root({
			source: {
				input: this.input,
				start: node.loc.start,
			},
		});
		root.raws.node = node;
		const obj = new Obj({
			raws: {
				node,
			},
		});
		root.push(obj);
		this.process(node, obj);
		this.sort(root);
		this.raws(root);

		const startNode = root.first.raws.node;
		const endNode = root.last.raws.node;

		root.source.start = startNode.loc.start;

		root.source.input.css = root.source.input.css.slice(startNode.start, endNode.end);

		this.root = root;
	}

	process (node, parent) {
		[
			"leadingComments",
			"innerComments",
			"trailingComments",
		].forEach(prop => {
			forEach(node[prop], child => {
				this.source(child, this.comment(child, parent));
			});
		});

		const child = (this[node.type] || this.literal).apply(this, [node, parent]);
		this.source(node, child);
		return child;
	}
	source (node, parent) {
		parent.source = {
			input: this.input,
			start: node.loc.start,
			end: node.loc.end,
		};
		return parent;
	}
	raws (parent, node) {
		const source = this.input.css;
		parent.nodes.forEach((child, i) => {
			if (i) {
				child.raws.before = source.slice(parent.nodes[i - 1].raws.node.end, child.raws.node.start).replace(/^\s*,+/, "");
			} else if (node) {
				child.raws.before = source.slice(node.start, child.raws.node.start).replace(/^\s*{+/, "");
			}
		});
		if (node) {
			let semicolon;
			let after;
			if (parent.nodes.length) {
				after = source.slice(parent.last.raws.node.end, node.end).replace(/^\s*,+/, () => {
					semicolon = true;
					return "";
				});
			} else {
				after = source.slice(node.start, node.end).replace(/^\s*{/, "");
			}
			parent.raws.after = after.replace(/}+\s*$/, "");
			parent.raws.semicolon = semicolon || false;
		}
	}

	sort (node) {
		node.nodes = node.nodes.sort((a, b) => (
			a.raws.node.start - b.raws.node.start
		));
	}

	getNodeValue (node, wrappedValue) {
		const source = this.input.css;
		let rawValue;
		let cookedValue;
		switch (node.type) {
			case "Identifier": {
				const isCssFloat = node.name === "cssFloat";
				return {
					prefix: "",
					suffix: "",
					raw: isCssFloat && node.name,
					value: isCssFloat ? "float" : node.name,
				};
			}
			case "StringLiteral": {
				rawValue = node.extra.raw.slice(1, -1);
				cookedValue = node.value;
				break;
			}
			case "TemplateLiteral": {
				rawValue = source.slice(node.quasis[0].start, node.quasis[node.quasis.length - 1].end);
				cookedValue = getTemplate(node, source).join("");
				break;
			}
			default: {
				rawValue = source.slice(node.start, node.end);
				break;
			}
		}
		const valueWrap = wrappedValue.split(rawValue);
		return {
			prefix: valueWrap[0],
			suffix: valueWrap[1],
			value: cookedValue || rawValue,
		};
	}

	ObjectExpression (node, parent) {
		forEach(node.properties, child => {
			this.process(child, parent);
		});
		this.sort(parent);
		this.raws(parent, node);
		return parent;
	}

	ObjectProperty (node, parent) {
		const source = this.input.css;
		let between = source.indexOf(":", node.key.end);
		const rawKey = source.slice(node.start, between).trimRight();
		const rawValue = source.slice(between + 1, node.end).trimLeft();
		between = source.slice(node.start + rawKey.length, node.end - rawValue.length);
		const key = this.getNodeValue(node.key, rawKey);
		if (node.value.type === "ObjectExpression") {
			let rule;
			if (/^@(\S+)(\s*)(.*)$/.test(key.value)) {
				const params = RegExp.$3;
				const atRule = postcss.atRule({
					name: unCamelCase(RegExp.$1),
					raws: {
						afterName: RegExp.$2,
					},
					nodes: [],
				});
				defineRaws(atRule, "name", key.prefix + "@", params ? "" : key.suffix, {
					raw: "camel",
				});
				if (params) {
					atRule.params = unCamelCaseProp(params);
					defineRaws(atRule, "params", "", key.suffix, {
						raw: {
							enumerable: true,
							get: () => (
								camelCaseProp(atRule.params)
							),
							set: (value) => {
								atRule.params = unCamelCaseProp(value);
							},
						},
					});
				}
				rule = atRule;
			} else {
				// rule = this.rule(key, keyWrap, node.value, parent);
				rule = postcss.rule({
					selector: key.value,
				});
				defineRaws(rule, "selector", key.prefix, key.suffix);
			}
			raw(rule);
			this.ObjectExpression(node.value, rule);
			return rule;
		}

		const value = this.getNodeValue(node.value, rawValue);

		if (key.value.startsWith("@")) {
			const atRule = postcss.atRule({
				name: unCamelCase(key.value),
				params: value.value,
			});
			defineRaws(atRule, "name", key.prefix, key.suffix, {
				raw: "camel",
			});

			defineRaws(atRule, "params", value.prefix, value.suffix);
			raw(atRule);
			return atRule;
		} else {
			let decl;
			if (key.raw) {
				decl = postcss.decl({
					prop: key.value,
					value: value.value,
					raws: {
						prop: key,
					},
				});
			} else {
				decl = postcss.decl({
					prop: unCamelCase(key.value),
					value: value.value,
				});

				defineRaws(decl, "prop", key.prefix, key.suffix, {
					raw: "camel",
				});
			}

			defineRaws(decl, "value", value.prefix, value.suffix);
			raw(decl);
			return decl;
		}

		function raw (postcssNode) {
			postcssNode.raws.between = between;
			postcssNode.raws.node = node;
			parent.push(postcssNode);
		}
	}

	literal (node, parent) {
		const literal = new Literal({
			text: this.input.css.slice(node.start, node.end),
			raws: {
				node,
			},
		});
		parent.push(literal);
		return literal;
	}

	comment (node, parent) {
		if (!parent.nodes || (node.start < parent.raws.node.start && parent.type !== "root" && parent.parent)) {
			return this.comment(node, parent.parent);
		}
		const text = node.value.match(/^(\s*)((?:\S[\s\S]*?)?)(\s*)$/);
		const comment = postcss.comment({
			text: text[2],
			raws: {
				node,
				left: text[1],
				right: text[3],
				inline: node.type === "CommentLine",
			},
		});

		parent.push(comment);
		return comment;
	}
}
module.exports = objectParser;
