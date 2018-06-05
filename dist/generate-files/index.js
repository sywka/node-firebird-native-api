"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
const node_cloop_gen_1 = require("node-cloop-gen");
const patch_1 = require("./patch");
const root = process.cwd();
const inputFile = `${root}/src/generate-files/firebird.cloop.json`;
const outputCpp = `${root}/src/native/cloop-gen.h`;
const outputTs = `${root}/src/lib/cloop-gen.ts`;
const library = node_cloop_gen_1.load(inputFile);
patch_1.patch(library);
node_cloop_gen_1.generate({
    library,
    outputCpp,
    outputTs,
    namespace: 'fb'
});
//# sourceMappingURL=index.js.map