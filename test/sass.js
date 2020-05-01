"use strict";
const postcss = require("postcss");
const expect = require("chai").expect;
const syntax = require("../")({
	css: "sass",
});

describe("sass", () => {
    it("test", () => {
        const sass = `
        $sizes: 40px, 50px, 80px
        @each $size in $sizes
            .icon-#{$size}
                font-size: $size
        `.trim();
        return postcss([
            function (root) {
                root.nodes.forEach(node => {
                    node.toString();
                });
            }
        ]).process(sass, {
            syntax,
            from: 'style.sass',
        }).then(result => {
            expect(result.css).to.equal(sass);
        });
    });
})
