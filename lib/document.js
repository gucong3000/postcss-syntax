"use strict";
const PostCssRoot = require("postcss/lib/root");
const LazyResult = require("postcss/lib/lazy-result").prototype;
const runRoot = LazyResult.run;

class Document extends PostCssRoot {
	toString (stringifier) {
		return super.toString(stringifier || {
			stringify: require("./stringify"),
		});
	}

	each (callback) {
		const result = this.nodes.map(node => node.each(callback));
		return result.every(result => result !== false) && result.pop();
	}

	append () {
		this.last.append.apply(
			this.last,
			Array.from(arguments)
		);
		return this;
	}

	prepend () {
		this.first.prepend.apply(
			this.first,
			Array.from(arguments)
		);
		return this;
	}

	insertBefore (exist, add) {
		exist.prepend(add);
		return this;
	}

	insertAfter (exist, add) {
		exist.append(add);
		return this;
	}
}

function isPromise (obj) {
	return typeof obj === "object" && typeof obj.then === "function";
}

function runDocument (plugin) {
	let result = this.result;
	result.lastPlugin = plugin;
	result = result.root.nodes.map(root => {
		const childResult = root.toResult(result.opts);
		try {
			return plugin(root, childResult);
		} catch (error) {
			this.handleError(error, plugin);
			throw error;
		}
	});
	if (result.some(isPromise)) {
		result = Promise.all(result);
	}
	return result;
}

LazyResult.run = function run () {
	return (this.result.root instanceof Document ? runDocument : runRoot).apply(this, arguments);
};

module.exports = Document;
