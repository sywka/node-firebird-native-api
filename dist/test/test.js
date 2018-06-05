"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("power-assert");
const fs = require("fs-extra-promise");
const tmp = require("temp-fs");
const lib_1 = require("../lib");
describe('node-firebird-native-api', function () {
    let master;
    let dispatcher;
    let tmpDir;
    function getTempFile(name) {
        return `${tmpDir}/${name}`;
    }
    this.timeout(5000);
    before(() => {
        const tempMaster = lib_1.getMaster(lib_1.getDefaultLibraryFilename());
        master = lib_1.getMaster(lib_1.getDefaultLibraryFilename());
        dispatcher = master.getDispatcherSync();
        tmpDir = tmp.mkdirSync().path.toString();
        // Test premature shutdown prevention. 'master' variable should still be usable.
        assert.equal(lib_1.disposeMaster(tempMaster), true);
    });
    after(() => {
        const status = master.getStatusSync();
        const fb_shutrsn_app_stopped = -3;
        dispatcher.shutdownSync(status, 0, fb_shutrsn_app_stopped);
        status.disposeSync();
        dispatcher.releaseSync();
        fs.rmdirSync(tmpDir);
        assert.equal(lib_1.disposeMaster(master), true);
        assert.equal(lib_1.disposeMaster(master), false);
    });
    describe('Master', () => {
        it('#getStatus()', () => {
            const status = master.getStatusSync();
            assert.notEqual(status, null);
            status.disposeSync();
        });
        it('#getDispatcher()', () => {
            const dispatcher = master.getDispatcherSync();
            assert.notEqual(dispatcher, null);
            dispatcher.addRefSync();
            assert.equal(dispatcher.releaseSync(), 1);
            assert.equal(dispatcher.releaseSync(), 0);
        });
        it('#getUtilInterface()', () => {
            const util = master.getUtilInterfaceSync();
            assert.notEqual(util, null);
        });
    });
    describe('Util', () => {
        const DATE_2016_10_14 = 57675;
        let util;
        before(() => {
            util = master.getUtilInterfaceSync();
        });
        it('#encodeDate()', () => {
            const n = util.encodeDateSync(2016, 10, 14);
            assert.equal(n, DATE_2016_10_14);
        });
        it('#decodeDate()', () => {
            const year = new Uint32Array(1);
            const month = new Uint32Array(1);
            const day = new Uint32Array(1);
            util.decodeDateSync(DATE_2016_10_14, year, month, day);
            assert.equal(year[0], 2016);
            assert.equal(month[0], 10);
            assert.equal(day[0], 14);
        });
        it('#getClientVersion()', () => {
            const rawVersion = util.getClientVersionSync();
            const majorVersion = rawVersion >> 8;
            assert.ok(majorVersion >= 3);
        });
    });
    describe('Provider', () => {
        it('#createDatabaseSync()', () => {
            const status = master.getStatusSync();
            try {
                const attachment = dispatcher.createDatabaseSync(status, getTempFile('Provider-createDatabaseSync.fdb'), 0, undefined);
                attachment.dropDatabaseSync(status);
            }
            finally {
                status.disposeSync();
            }
        });
        it('#createDatabaseAsync()', () => __awaiter(this, void 0, void 0, function* () {
            const status = master.getStatusSync();
            try {
                const attachment = (yield dispatcher.createDatabaseAsync(status, getTempFile('Attachment-createDatabase.fdb'), 0, undefined));
                yield attachment.dropDatabaseAsync(status);
            }
            finally {
                status.disposeSync();
            }
        }));
    });
    describe('Attachment', () => {
        it('#dropDatabaseSync()', () => {
            const status = master.getStatusSync();
            try {
                const attachment = dispatcher.createDatabaseSync(status, getTempFile('Attachment-dropDatabaseSync.fdb'), 0, undefined);
                attachment.dropDatabaseSync(status);
            }
            finally {
                status.disposeSync();
            }
        });
        it('#dropDatabaseAsync()', () => __awaiter(this, void 0, void 0, function* () {
            const status = master.getStatusSync();
            try {
                const attachment = (yield dispatcher.createDatabaseAsync(status, getTempFile('Attachment-dropDatabase.fdb'), 0, undefined));
                yield attachment.dropDatabaseAsync(status);
            }
            finally {
                status.disposeSync();
            }
        }));
        it('#detachSync()', () => {
            const status = master.getStatusSync();
            try {
                const filename = getTempFile('Attachment-detachSync.fdb');
                const attachment = dispatcher.createDatabaseSync(status, filename, 0, undefined);
                attachment.detachSync(status);
                fs.removeSync(filename);
            }
            finally {
                status.disposeSync();
            }
        });
        it('#detachAsync()', () => __awaiter(this, void 0, void 0, function* () {
            const status = master.getStatusSync();
            try {
                const filename = getTempFile('Attachment-detach.fdb');
                const attachment = (yield dispatcher.createDatabaseAsync(status, filename, 0, undefined));
                yield attachment.detachAsync(status);
                yield fs.removeAsync(filename);
            }
            finally {
                status.disposeSync();
            }
        }));
        it('#startTransactionSync()', () => {
            const status = master.getStatusSync();
            try {
                const filename = getTempFile('Attachment-startTransactionSync.fdb');
                const attachment = dispatcher.createDatabaseSync(status, filename, 0, undefined);
                try {
                    const transaction = attachment.startTransactionSync(status, 0, undefined);
                    transaction.commitSync(status);
                }
                finally {
                    attachment.dropDatabaseSync(status);
                }
            }
            finally {
                status.disposeSync();
            }
        });
        it('#startTransactionAsync()', () => __awaiter(this, void 0, void 0, function* () {
            const status = master.getStatusSync();
            try {
                const filename = getTempFile('Attachment-startTransaction.fdb');
                const attachment = (yield dispatcher.createDatabaseAsync(status, filename, 0, undefined));
                try {
                    const transaction = (yield attachment.startTransactionAsync(status, 0, undefined));
                    yield transaction.commitAsync(status);
                }
                finally {
                    yield attachment.dropDatabaseAsync(status);
                }
            }
            finally {
                status.disposeSync();
            }
        }));
        it('#executeSync()', () => {
            const status = master.getStatusSync();
            try {
                const filename = getTempFile('Attachment-executeSync.fdb');
                const stmt1 = 'create table t1 (n1 integer)';
                const stmt2 = 'insert into t1 values (1)';
                const stmt3 = 'select'; // error
                const attachment = dispatcher.createDatabaseSync(status, filename, 0, undefined);
                try {
                    const transaction = attachment.startTransactionSync(status, 0, undefined);
                    try {
                        attachment.executeSync(status, transaction, 0, stmt1, 3, undefined, undefined, undefined, undefined);
                        transaction.commitRetainingSync(status);
                        attachment.executeSync(status, transaction, 0, stmt2, 3, undefined, undefined, undefined, undefined);
                        let error;
                        try {
                            attachment.executeSync(status, transaction, 0, stmt3, 3, undefined, undefined, undefined, undefined);
                        }
                        catch (e) {
                            error = e;
                            assert.equal(error.message, 'Dynamic SQL Error\n' +
                                '-SQL error code = -104\n' +
                                '-Unexpected end of command - line 1, column 1');
                        }
                        assert.ok(error);
                    }
                    finally {
                        transaction.commitSync(status);
                    }
                }
                finally {
                    attachment.dropDatabaseSync(status);
                }
            }
            finally {
                status.disposeSync();
            }
        });
        it('#executeAsync()', () => __awaiter(this, void 0, void 0, function* () {
            const status = master.getStatusSync();
            try {
                const filename = getTempFile('Attachment-execute.fdb');
                const stmt1 = 'create table t1 (n1 integer)';
                const stmt2 = 'insert into t1 values (1)';
                const stmt3 = 'select'; // error
                const attachment = (yield dispatcher.createDatabaseAsync(status, filename, 0, undefined));
                try {
                    const transaction = (yield attachment.startTransactionAsync(status, 0, undefined));
                    try {
                        yield attachment.executeAsync(status, transaction, 0, stmt1, 3, undefined, undefined, undefined, undefined);
                        yield transaction.commitRetainingAsync(status);
                        yield attachment.executeAsync(status, transaction, 0, stmt2, 3, undefined, undefined, undefined, undefined);
                        let error;
                        try {
                            yield attachment.executeAsync(status, transaction, 0, stmt3, 3, undefined, undefined, undefined, undefined);
                        }
                        catch (e) {
                            error = e;
                            assert.equal(error.message, 'Dynamic SQL Error\n' +
                                '-SQL error code = -104\n' +
                                '-Unexpected end of command - line 1, column 1');
                        }
                        assert.notEqual(error, null);
                    }
                    finally {
                        yield transaction.commitAsync(status);
                    }
                }
                finally {
                    yield attachment.dropDatabaseAsync(status);
                }
            }
            finally {
                status.disposeSync();
            }
        }));
        it('#prepareSync()', () => {
            const status = master.getStatusSync();
            try {
                const filename = getTempFile('Attachment-prepareSync.fdb');
                const stmt1 = 'create table t1 (n1 integer)';
                const stmt2 = 'insert into t1 values (?)';
                const attachment = dispatcher.createDatabaseSync(status, filename, 0, undefined);
                try {
                    const transaction = attachment.startTransactionSync(status, 0, undefined);
                    try {
                        attachment.executeSync(status, transaction, 0, stmt1, 3, undefined, undefined, undefined, undefined);
                        transaction.commitRetainingSync(status);
                        const statement2 = attachment.prepareSync(status, transaction, 0, stmt2, 3, 0);
                        try {
                            const inputMetadata2 = statement2.getInputMetadataSync(status);
                            try {
                                assert.equal(inputMetadata2.getCountSync(status), 1);
                                assert.equal(inputMetadata2.getMessageLengthSync(status), 2 + 4);
                            }
                            finally {
                                inputMetadata2.releaseSync();
                            }
                            const outputMetadata2 = statement2.getOutputMetadataSync(status);
                            try {
                                assert.equal(outputMetadata2.getCountSync(status), 0);
                                assert.equal(outputMetadata2.getMessageLengthSync(status), 0);
                            }
                            finally {
                                outputMetadata2.releaseSync();
                            }
                        }
                        finally {
                            statement2.freeSync(status);
                        }
                    }
                    finally {
                        transaction.commitSync(status);
                    }
                }
                finally {
                    attachment.dropDatabaseSync(status);
                }
            }
            finally {
                status.disposeSync();
            }
        });
        it('#prepareAsync()', () => __awaiter(this, void 0, void 0, function* () {
            const status = master.getStatusSync();
            try {
                const filename = getTempFile('Attachment-prepare.fdb');
                const stmt1 = 'create table t1 (n1 integer)';
                const stmt2 = 'insert into t1 values (?)';
                const attachment = (yield dispatcher.createDatabaseAsync(status, filename, 0, undefined));
                try {
                    const transaction = (yield attachment.startTransactionAsync(status, 0, undefined));
                    try {
                        yield attachment.executeAsync(status, transaction, 0, stmt1, 3, undefined, undefined, undefined, undefined);
                        yield transaction.commitRetainingAsync(status);
                        const statement2 = (yield attachment.prepareAsync(status, transaction, 0, stmt2, 3, 0));
                        try {
                            const inputMetadata2 = (yield statement2.getInputMetadataAsync(status));
                            try {
                                assert.equal(inputMetadata2.getCountSync(status), 1);
                                assert.equal(inputMetadata2.getMessageLengthSync(status), 2 + 4);
                            }
                            finally {
                                inputMetadata2.releaseSync();
                            }
                            const outputMetadata2 = (yield statement2.getOutputMetadataSync(status));
                            try {
                                assert.equal(outputMetadata2.getCountSync(status), 0);
                                assert.equal(outputMetadata2.getMessageLengthSync(status), 0);
                            }
                            finally {
                                outputMetadata2.releaseSync();
                            }
                        }
                        finally {
                            yield statement2.freeAsync(status);
                        }
                    }
                    finally {
                        yield transaction.commitAsync(status);
                    }
                }
                finally {
                    yield attachment.dropDatabaseAsync(status);
                }
            }
            finally {
                status.disposeSync();
            }
        }));
    });
});
//# sourceMappingURL=test.js.map