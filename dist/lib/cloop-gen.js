"use strict";
// Auto-generated file. Do not edit!
Object.defineProperty(exports, "__esModule", { value: true });
var Status;
(function (Status) {
    Status.STATE_WARNINGS = 1;
    Status.STATE_ERRORS = 2;
    Status.RESULT_ERROR = (-1);
    Status.RESULT_OK = 0;
    Status.RESULT_NO_DATA = 1;
    Status.RESULT_SEGMENT = 2;
})(Status = exports.Status || (exports.Status = {}));
var PluginManager;
(function (PluginManager) {
    PluginManager.TYPE_PROVIDER = 1;
    PluginManager.TYPE_FIRST_NON_LIB = 2;
    PluginManager.TYPE_AUTH_SERVER = 3;
    PluginManager.TYPE_AUTH_CLIENT = 4;
    PluginManager.TYPE_AUTH_USER_MANAGEMENT = 5;
    PluginManager.TYPE_EXTERNAL_ENGINE = 6;
    PluginManager.TYPE_TRACE = 7;
    PluginManager.TYPE_WIRE_CRYPT = 8;
    PluginManager.TYPE_DB_CRYPT = 9;
    PluginManager.TYPE_KEY_HOLDER = 10;
    PluginManager.TYPE_COUNT = 11;
})(PluginManager = exports.PluginManager || (exports.PluginManager = {}));
var ConfigManager;
(function (ConfigManager) {
    ConfigManager.DIR_BIN = 0;
    ConfigManager.DIR_SBIN = 1;
    ConfigManager.DIR_CONF = 2;
    ConfigManager.DIR_LIB = 3;
    ConfigManager.DIR_INC = 4;
    ConfigManager.DIR_DOC = 5;
    ConfigManager.DIR_UDF = 6;
    ConfigManager.DIR_SAMPLE = 7;
    ConfigManager.DIR_SAMPLEDB = 8;
    ConfigManager.DIR_HELP = 9;
    ConfigManager.DIR_INTL = 10;
    ConfigManager.DIR_MISC = 11;
    ConfigManager.DIR_SECDB = 12;
    ConfigManager.DIR_MSG = 13;
    ConfigManager.DIR_LOG = 14;
    ConfigManager.DIR_GUARD = 15;
    ConfigManager.DIR_PLUGINS = 16;
    ConfigManager.DIR_COUNT = 17;
})(ConfigManager = exports.ConfigManager || (exports.ConfigManager = {}));
var Statement;
(function (Statement) {
    Statement.PREPARE_PREFETCH_NONE = 0;
    Statement.PREPARE_PREFETCH_TYPE = 1;
    Statement.PREPARE_PREFETCH_INPUT_PARAMETERS = 2;
    Statement.PREPARE_PREFETCH_OUTPUT_PARAMETERS = 4;
    Statement.PREPARE_PREFETCH_LEGACY_PLAN = 8;
    Statement.PREPARE_PREFETCH_DETAILED_PLAN = 16;
    Statement.PREPARE_PREFETCH_AFFECTED_RECORDS = 32;
    Statement.PREPARE_PREFETCH_FLAGS = 64;
    Statement.PREPARE_PREFETCH_METADATA = (Statement.PREPARE_PREFETCH_TYPE) | ((Statement.PREPARE_PREFETCH_FLAGS) | ((Statement.PREPARE_PREFETCH_INPUT_PARAMETERS) | (Statement.PREPARE_PREFETCH_OUTPUT_PARAMETERS)));
    Statement.PREPARE_PREFETCH_ALL = (Statement.PREPARE_PREFETCH_METADATA) | ((Statement.PREPARE_PREFETCH_LEGACY_PLAN) | ((Statement.PREPARE_PREFETCH_DETAILED_PLAN) | (Statement.PREPARE_PREFETCH_AFFECTED_RECORDS)));
    Statement.FLAG_HAS_CURSOR = 1;
    Statement.FLAG_REPEAT_EXECUTE = 2;
    Statement.CURSOR_TYPE_SCROLLABLE = 1;
})(Statement = exports.Statement || (exports.Statement = {}));
var Auth;
(function (Auth) {
    Auth.AUTH_FAILED = (-1);
    Auth.AUTH_SUCCESS = 0;
    Auth.AUTH_MORE_DATA = 1;
    Auth.AUTH_CONTINUE = 2;
})(Auth = exports.Auth || (exports.Auth = {}));
var User;
(function (User) {
    User.OP_USER_ADD = 1;
    User.OP_USER_MODIFY = 2;
    User.OP_USER_DELETE = 3;
    User.OP_USER_DISPLAY = 4;
    User.OP_USER_SET_MAP = 5;
    User.OP_USER_DROP_MAP = 6;
})(User = exports.User || (exports.User = {}));
var ExternalTrigger;
(function (ExternalTrigger) {
    ExternalTrigger.TYPE_BEFORE = 1;
    ExternalTrigger.TYPE_AFTER = 2;
    ExternalTrigger.TYPE_DATABASE = 3;
    ExternalTrigger.ACTION_INSERT = 1;
    ExternalTrigger.ACTION_UPDATE = 2;
    ExternalTrigger.ACTION_DELETE = 3;
    ExternalTrigger.ACTION_CONNECT = 4;
    ExternalTrigger.ACTION_DISCONNECT = 5;
    ExternalTrigger.ACTION_TRANS_START = 6;
    ExternalTrigger.ACTION_TRANS_COMMIT = 7;
    ExternalTrigger.ACTION_TRANS_ROLLBACK = 8;
    ExternalTrigger.ACTION_DDL = 9;
})(ExternalTrigger = exports.ExternalTrigger || (exports.ExternalTrigger = {}));
var XpbBuilder;
(function (XpbBuilder) {
    XpbBuilder.DPB = 1;
    XpbBuilder.SPB_ATTACH = 2;
    XpbBuilder.SPB_START = 3;
    XpbBuilder.TPB = 4;
})(XpbBuilder = exports.XpbBuilder || (exports.XpbBuilder = {}));
var TraceConnection;
(function (TraceConnection) {
    TraceConnection.KIND_DATABASE = 1;
    TraceConnection.KIND_SERVICE = 2;
})(TraceConnection = exports.TraceConnection || (exports.TraceConnection = {}));
var TraceTransaction;
(function (TraceTransaction) {
    TraceTransaction.ISOLATION_CONSISTENCY = 1;
    TraceTransaction.ISOLATION_CONCURRENCY = 2;
    TraceTransaction.ISOLATION_READ_COMMITTED_RECVER = 3;
    TraceTransaction.ISOLATION_READ_COMMITTED_NORECVER = 4;
})(TraceTransaction = exports.TraceTransaction || (exports.TraceTransaction = {}));
var TraceTrigger;
(function (TraceTrigger) {
    TraceTrigger.TYPE_ALL = 0;
    TraceTrigger.TYPE_BEFORE = 1;
    TraceTrigger.TYPE_AFTER = 2;
})(TraceTrigger = exports.TraceTrigger || (exports.TraceTrigger = {}));
var TracePlugin;
(function (TracePlugin) {
    TracePlugin.RESULT_SUCCESS = 0;
    TracePlugin.RESULT_FAILED = 1;
    TracePlugin.RESULT_UNAUTHORIZED = 2;
    TracePlugin.SWEEP_STATE_STARTED = 1;
    TracePlugin.SWEEP_STATE_FINISHED = 2;
    TracePlugin.SWEEP_STATE_FAILED = 3;
    TracePlugin.SWEEP_STATE_PROGRESS = 4;
})(TracePlugin = exports.TracePlugin || (exports.TracePlugin = {}));
var TraceFactory;
(function (TraceFactory) {
    TraceFactory.TRACE_EVENT_ATTACH = 0;
    TraceFactory.TRACE_EVENT_DETACH = 1;
    TraceFactory.TRACE_EVENT_TRANSACTION_START = 2;
    TraceFactory.TRACE_EVENT_TRANSACTION_END = 3;
    TraceFactory.TRACE_EVENT_SET_CONTEXT = 4;
    TraceFactory.TRACE_EVENT_PROC_EXECUTE = 5;
    TraceFactory.TRACE_EVENT_TRIGGER_EXECUTE = 6;
    TraceFactory.TRACE_EVENT_DSQL_PREPARE = 7;
    TraceFactory.TRACE_EVENT_DSQL_FREE = 8;
    TraceFactory.TRACE_EVENT_DSQL_EXECUTE = 9;
    TraceFactory.TRACE_EVENT_BLR_COMPILE = 10;
    TraceFactory.TRACE_EVENT_BLR_EXECUTE = 11;
    TraceFactory.TRACE_EVENT_DYN_EXECUTE = 12;
    TraceFactory.TRACE_EVENT_SERVICE_ATTACH = 13;
    TraceFactory.TRACE_EVENT_SERVICE_START = 14;
    TraceFactory.TRACE_EVENT_SERVICE_QUERY = 15;
    TraceFactory.TRACE_EVENT_SERVICE_DETACH = 16;
    TraceFactory.TRACE_EVENT_ERROR = 17;
    TraceFactory.TRACE_EVENT_SWEEP = 18;
    TraceFactory.TRACE_EVENT_FUNC_EXECUTE = 19;
    TraceFactory.TRACE_EVENT_MAX = 20;
})(TraceFactory = exports.TraceFactory || (exports.TraceFactory = {}));
//# sourceMappingURL=cloop-gen.js.map