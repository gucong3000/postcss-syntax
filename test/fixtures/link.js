"use strict";
const path = require("path");
const pkg = require("../../package.json");
const cwd = process.cwd();
const Module = require("module");
const _findPath = Module._findPath;
Module._findPath = (request, paths, isMain) => {
	if (request.startsWith(pkg.name)) {
		request = path.join(cwd, request.slice(pkg.name.length));
	}
	return _findPath.apply(Module, [request, paths, isMain]);
};
