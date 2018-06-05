"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
/** Gets the default platform Firebird client library filename. */
function getDefaultLibraryFilename() {
    switch (os.platform()) {
        case 'win32':
            return 'fbclient.dll';
        case 'darwin':
            return 'libfbclient.dylib';
        default:
            return 'libfbclient.so';
    }
}
exports.getDefaultLibraryFilename = getDefaultLibraryFilename;
const native = require('bindings')('addon');
exports.getMaster = native.getMaster;
exports.disposeMaster = native.disposeMaster;
__export(require("./cloop-gen"));
//# sourceMappingURL=index.js.map