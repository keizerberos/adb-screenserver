/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./vendor/Genymobile/scrcpy/scrcpy-server.jar":
/*!****************************************************!*\
  !*** ./vendor/Genymobile/scrcpy/scrcpy-server.jar ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "vendor/Genymobile/scrcpy/scrcpy-server.jar");

/***/ }),

/***/ "./vendor/Genymobile/scrcpy/LICENSE":
/*!******************************************!*\
  !*** ./vendor/Genymobile/scrcpy/LICENSE ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "vendor/Genymobile/scrcpy/LICENSE");

/***/ }),

/***/ "./src/app/Util.ts":
/*!*************************!*\
  !*** ./src/app/Util.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Util = (function () {
    function Util() {
    }
    Util.filterTrailingZeroes = function (bytes) {
        var b = 0;
        return bytes
            .reverse()
            .filter(function (i) { return b || (b = i); })
            .reverse();
    };
    Util.prettyBytes = function (value) {
        var suffix = 0;
        while (value >= 512) {
            suffix++;
            value /= 1024;
        }
        return "".concat(value.toFixed(suffix ? 1 : 0)).concat(Util.SUFFIX[suffix]);
    };
    Util.escapeUdid = function (udid) {
        return 'udid_' + udid.replace(/[. :]/g, '_');
    };
    Util.parse = function (params, name, required) {
        var value = params.get(name);
        if (required && value === null) {
            throw TypeError("Missing required parameter \"".concat(name, "\""));
        }
        return value;
    };
    Util.parseString = function (params, name, required) {
        var value = params.get(name);
        if (required && value === null) {
            throw TypeError("Missing required parameter \"".concat(name, "\""));
        }
        return value || '';
    };
    Util.parseBoolean = function (params, name, required) {
        var value = this.parse(params, name, required);
        return value === '1' || (!!value && value.toString() === 'true');
    };
    Util.parseInt = function (params, name, required) {
        var value = this.parse(params, name, required);
        if (value === null) {
            return 0;
        }
        var int = parseInt(value, 10);
        if (isNaN(int)) {
            return 0;
        }
        return int;
    };
    Util.parseBooleanEnv = function (input) {
        if (typeof input === 'boolean') {
            return input;
        }
        if (typeof input === 'undefined' || input === null) {
            return undefined;
        }
        if (Array.isArray(input)) {
            input = input[input.length - 1];
        }
        return input === '1' || input.toLowerCase() === 'true';
    };
    Util.parseStringEnv = function (input) {
        if (typeof input === 'undefined' || input === null) {
            return undefined;
        }
        if (Array.isArray(input)) {
            input = input[input.length - 1];
        }
        return input;
    };
    Util.parseIntEnv = function (input) {
        if (typeof input === 'number') {
            return input;
        }
        if (typeof input === 'undefined' || input === null) {
            return undefined;
        }
        if (Array.isArray(input)) {
            input = input[input.length - 1];
        }
        var int = parseInt(input, 10);
        if (isNaN(int)) {
            return undefined;
        }
        return int;
    };
    Util.utf8ByteArrayToString = function (bytes) {
        var out = [], pos = 0, c = 0;
        while (pos < bytes.length) {
            var c1 = bytes[pos++];
            if (c1 < 128) {
                out[c++] = String.fromCharCode(c1);
            }
            else if (c1 > 191 && c1 < 224) {
                var c2 = bytes[pos++];
                out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
            }
            else if (c1 > 239 && c1 < 365) {
                var c2 = bytes[pos++];
                var c3 = bytes[pos++];
                var c4 = bytes[pos++];
                var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) -
                    0x10000;
                out[c++] = String.fromCharCode(0xD800 + (u >> 10));
                out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
            }
            else {
                var c2 = bytes[pos++];
                var c3 = bytes[pos++];
                out[c++] =
                    String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            }
        }
        return out.join('');
    };
    ;
    Util.supportsPassive = function () {
        if (typeof Util.supportsPassiveValue === 'boolean') {
            return Util.supportsPassiveValue;
        }
        var supportsPassive = false;
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassive = true;
                }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        }
        catch (error) { }
        return Util.supportsPassiveValue = supportsPassive;
    };
    Util.setImmediate = function (fn) {
        Promise.resolve().then(fn);
    };
    Util.SUFFIX = {
        0: 'B',
        1: 'KiB',
        2: 'MiB',
        3: 'GiB',
        4: 'TiB',
    };
    Util.stringToUtf8ByteArray = function (str) {
        var out = [], p = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c < 128) {
                out[p++] = c;
            }
            else if (c < 2048) {
                out[p++] = (c >> 6) | 192;
                out[p++] = (c & 63) | 128;
            }
            else if (((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
                ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
                c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
                out[p++] = (c >> 18) | 240;
                out[p++] = ((c >> 12) & 63) | 128;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
            else {
                out[p++] = (c >> 12) | 224;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
        }
        return Uint8Array.from(out);
    };
    return Util;
}());
exports["default"] = Util;


/***/ }),

/***/ "./src/common/Action.ts":
/*!******************************!*\
  !*** ./src/common/Action.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ACTION = void 0;
var ACTION;
(function (ACTION) {
    ACTION["LIST_HOSTS"] = "list-hosts";
    ACTION["APPL_DEVICE_LIST"] = "appl-device-list";
    ACTION["GOOG_DEVICE_LIST"] = "goog-device-list";
    ACTION["MULTIPLEX"] = "multiplex";
    ACTION["SHELL"] = "shell";
    ACTION["PROXY_WS"] = "proxy-ws";
    ACTION["PROXY_ADB"] = "proxy-adb";
    ACTION["DEVTOOLS"] = "devtools";
    ACTION["STREAM_SCRCPY"] = "stream";
    ACTION["STREAM_WS_QVH"] = "stream-qvh";
    ACTION["STREAM_MJPEG"] = "stream-mjpeg";
    ACTION["PROXY_WDA"] = "proxy-wda";
    ACTION["FILE_LISTING"] = "list-files";
})(ACTION = exports.ACTION || (exports.ACTION = {}));


/***/ }),

/***/ "./src/common/ChannelCode.ts":
/*!***********************************!*\
  !*** ./src/common/ChannelCode.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChannelCode = void 0;
var ChannelCode;
(function (ChannelCode) {
    ChannelCode["FSLS"] = "FSLS";
    ChannelCode["HSTS"] = "HSTS";
    ChannelCode["SHEL"] = "SHEL";
    ChannelCode["GTRC"] = "GTRC";
    ChannelCode["ATRC"] = "ATRC";
    ChannelCode["WDAP"] = "WDAP";
    ChannelCode["QVHS"] = "QVHS";
})(ChannelCode = exports.ChannelCode || (exports.ChannelCode = {}));


/***/ }),

/***/ "./src/common/Constants.ts":
/*!*********************************!*\
  !*** ./src/common/Constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ARGS_STRING = exports.SERVER_PROCESS_NAME = exports.LOG_LEVEL = exports.SERVER_TYPE = exports.SERVER_VERSION = exports.SERVER_PORT = exports.SERVER_PACKAGE = void 0;
exports.SERVER_PACKAGE = 'com.genymobile.scrcpy.Server';
exports.SERVER_PORT = 8886;
exports.SERVER_VERSION = '1.19-ws6';
exports.SERVER_TYPE = 'web';
exports.LOG_LEVEL = 'ERROR';
var SCRCPY_LISTENS_ON_ALL_INTERFACES;
SCRCPY_LISTENS_ON_ALL_INTERFACES = true;
var ARGUMENTS = [exports.SERVER_VERSION, exports.SERVER_TYPE, exports.LOG_LEVEL, exports.SERVER_PORT, SCRCPY_LISTENS_ON_ALL_INTERFACES];
exports.SERVER_PROCESS_NAME = 'app_process';
exports.ARGS_STRING = "/ ".concat(exports.SERVER_PACKAGE, " ").concat(ARGUMENTS.join(' '), " 2>&1 > /dev/null");


/***/ }),

/***/ "./src/common/ControlCenterCommand.ts":
/*!********************************************!*\
  !*** ./src/common/ControlCenterCommand.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControlCenterCommand = void 0;
var ControlCenterCommand = (function () {
    function ControlCenterCommand() {
        this.id = -1;
        this.type = '';
        this.pid = 0;
        this.udid = '';
        this.method = '';
    }
    ControlCenterCommand.fromJSON = function (json) {
        var body = JSON.parse(json);
        if (!body) {
            throw new Error('Invalid input');
        }
        var command = new ControlCenterCommand();
        var data = (command.data = body.data);
        command.id = body.id;
        command.type = body.type;
        if (typeof data.udid === 'string') {
            command.udid = data.udid;
        }
        switch (body.type) {
            case this.KILL_SERVER:
                if (typeof data.pid !== 'number' && data.pid <= 0) {
                    throw new Error('Invalid "pid" value');
                }
                command.pid = data.pid;
                return command;
            case this.REQUEST_WDA:
                if (typeof data.method !== 'string') {
                    throw new Error('Invalid "method" value');
                }
                command.method = data.method;
                command.args = data.args;
                return command;
            case this.START_SERVER:
            case this.UPDATE_INTERFACES:
            case this.CONFIGURE_STREAM:
            case this.RUN_WDA:
                return command;
            default:
                throw new Error("Unknown command \"".concat(body.command, "\""));
        }
    };
    ControlCenterCommand.prototype.getType = function () {
        return this.type;
    };
    ControlCenterCommand.prototype.getPid = function () {
        return this.pid;
    };
    ControlCenterCommand.prototype.getUdid = function () {
        return this.udid;
    };
    ControlCenterCommand.prototype.getId = function () {
        return this.id;
    };
    ControlCenterCommand.prototype.getMethod = function () {
        return this.method;
    };
    ControlCenterCommand.prototype.getData = function () {
        return this.data;
    };
    ControlCenterCommand.prototype.getArgs = function () {
        return this.args;
    };
    ControlCenterCommand.KILL_SERVER = 'kill_server';
    ControlCenterCommand.START_SERVER = 'start_server';
    ControlCenterCommand.UPDATE_INTERFACES = 'update_interfaces';
    ControlCenterCommand.CONFIGURE_STREAM = 'configure_stream';
    ControlCenterCommand.RUN_WDA = 'run-wda';
    ControlCenterCommand.REQUEST_WDA = 'request-wda';
    return ControlCenterCommand;
}());
exports.ControlCenterCommand = ControlCenterCommand;


/***/ }),

/***/ "./src/common/DeviceState.ts":
/*!***********************************!*\
  !*** ./src/common/DeviceState.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceState = void 0;
var DeviceState;
(function (DeviceState) {
    DeviceState["DEVICE"] = "device";
    DeviceState["DISCONNECTED"] = "disconnected";
    DeviceState["CONNECTED"] = "Connected";
})(DeviceState = exports.DeviceState || (exports.DeviceState = {}));


/***/ }),

/***/ "./src/common/HostTrackerMessage.ts":
/*!******************************************!*\
  !*** ./src/common/HostTrackerMessage.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["HOSTS"] = "hosts";
    MessageType["ERROR"] = "error";
})(MessageType = exports.MessageType || (exports.MessageType = {}));


/***/ }),

/***/ "./src/common/TypedEmitter.ts":
/*!************************************!*\
  !*** ./src/common/TypedEmitter.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypedEmitter = void 0;
var events_1 = __webpack_require__(/*! events */ "events");
var TypedEmitter = (function () {
    function TypedEmitter() {
        this.emitter = new events_1.EventEmitter();
    }
    TypedEmitter.prototype.addEventListener = function (eventName, fn) {
        this.emitter.on(eventName, fn);
    };
    TypedEmitter.prototype.removeEventListener = function (eventName, fn) {
        this.emitter.off(eventName, fn);
    };
    TypedEmitter.prototype.dispatchEvent = function (event) {
        return this.emitter.emit(event.type, event);
    };
    TypedEmitter.prototype.on = function (eventName, fn) {
        this.emitter.on(eventName, fn);
    };
    TypedEmitter.prototype.once = function (eventName, fn) {
        this.emitter.once(eventName, fn);
    };
    TypedEmitter.prototype.off = function (eventName, fn) {
        this.emitter.off(eventName, fn);
    };
    TypedEmitter.prototype.emit = function (eventName, params) {
        return this.emitter.emit(eventName, params);
    };
    return TypedEmitter;
}());
exports.TypedEmitter = TypedEmitter;


/***/ }),

/***/ "./src/packages/multiplexer/CloseEventClass.ts":
/*!*****************************************************!*\
  !*** ./src/packages/multiplexer/CloseEventClass.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloseEventClass = exports.CloseEvent2 = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var Event_1 = __webpack_require__(/*! ./Event */ "./src/packages/multiplexer/Event.ts");
var CloseEvent2 = (function (_super) {
    tslib_1.__extends(CloseEvent2, _super);
    function CloseEvent2(type, _a) {
        var _b = _a === void 0 ? {} : _a, code = _b.code, reason = _b.reason;
        var _this = _super.call(this, type) || this;
        _this.code = code || 0;
        _this.reason = reason || '';
        _this.wasClean = _this.code === 0;
        return _this;
    }
    return CloseEvent2;
}(Event_1.Event2));
exports.CloseEvent2 = CloseEvent2;
exports.CloseEventClass = typeof CloseEvent !== 'undefined' ? CloseEvent : CloseEvent2;


/***/ }),

/***/ "./src/packages/multiplexer/ErrorEventClass.ts":
/*!*****************************************************!*\
  !*** ./src/packages/multiplexer/ErrorEventClass.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorEventClass = exports.ErrorEvent2 = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var Event_1 = __webpack_require__(/*! ./Event */ "./src/packages/multiplexer/Event.ts");
var ErrorEvent2 = (function (_super) {
    tslib_1.__extends(ErrorEvent2, _super);
    function ErrorEvent2(type, _a) {
        var _b = _a === void 0 ? {} : _a, colno = _b.colno, error = _b.error, filename = _b.filename, lineno = _b.lineno, message = _b.message;
        var _this = _super.call(this, type) || this;
        _this.error = error;
        _this.colno = colno || 0;
        _this.filename = filename || '';
        _this.lineno = lineno || 0;
        _this.message = message || '';
        return _this;
    }
    return ErrorEvent2;
}(Event_1.Event2));
exports.ErrorEvent2 = ErrorEvent2;
exports.ErrorEventClass = typeof ErrorEvent !== 'undefined' ? ErrorEvent : ErrorEvent2;


/***/ }),

/***/ "./src/packages/multiplexer/Event.ts":
/*!*******************************************!*\
  !*** ./src/packages/multiplexer/Event.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventClass = exports.Event2 = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var Event2 = (function () {
    function Event2(type, options) {
        if (options === void 0) { options = { cancelable: true, bubbles: true, composed: false }; }
        this.isTrusted = true;
        this.AT_TARGET = 0;
        this.BUBBLING_PHASE = 0;
        this.CAPTURING_PHASE = 0;
        this.NONE = 0;
        var _a = tslib_1.__assign({}, options), cancelable = _a.cancelable, bubbles = _a.bubbles, composed = _a.composed;
        this.cancelable = !!cancelable;
        this.bubbles = !!bubbles;
        this.composed = !!composed;
        this.type = "".concat(type);
        this.defaultPrevented = false;
        this.timeStamp = Date.now();
        this.target = null;
    }
    Event2.prototype.stopImmediatePropagation = function () {
    };
    Event2.prototype.preventDefault = function () {
        this.defaultPrevented = true;
    };
    Object.defineProperty(Event2.prototype, "currentTarget", {
        get: function () {
            return this.target;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Event2.prototype, "srcElement", {
        get: function () {
            return this.target;
        },
        enumerable: false,
        configurable: true
    });
    Event2.prototype.composedPath = function () {
        return this.target ? [this.target] : [];
    };
    Object.defineProperty(Event2.prototype, "returnValue", {
        get: function () {
            return !this.defaultPrevented;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Event2.prototype, "eventPhase", {
        get: function () {
            return this.target ? Event.AT_TARGET : Event.NONE;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Event2.prototype, "cancelBubble", {
        get: function () {
            return false;
        },
        set: function (value) {
            if (value) {
                this.stopPropagation();
            }
        },
        enumerable: false,
        configurable: true
    });
    Event2.prototype.stopPropagation = function () {
    };
    Event2.prototype.initEvent = function (type, bubbles, cancelable) {
        this.type = type;
        if (arguments.length > 1) {
            this.bubbles = !!bubbles;
        }
        if (arguments.length > 2) {
            this.cancelable = !!cancelable;
        }
    };
    Event2.NONE = 0;
    Event2.CAPTURING_PHASE = 1;
    Event2.AT_TARGET = 2;
    Event2.BUBBLING_PHASE = 3;
    return Event2;
}());
exports.Event2 = Event2;
exports.EventClass = typeof Event !== 'undefined' ? Event : Event2;


/***/ }),

/***/ "./src/packages/multiplexer/Message.ts":
/*!*********************************************!*\
  !*** ./src/packages/multiplexer/Message.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Message = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var MessageType_1 = __webpack_require__(/*! ./MessageType */ "./src/packages/multiplexer/MessageType.ts");
var Util_1 = tslib_1.__importDefault(__webpack_require__(/*! ../../app/Util */ "./src/app/Util.ts"));
var CloseEventClass_1 = __webpack_require__(/*! ./CloseEventClass */ "./src/packages/multiplexer/CloseEventClass.ts");
var Message = (function () {
    function Message(type, channelId, data) {
        this.type = type;
        this.channelId = channelId;
        this.data = data;
    }
    Message.parse = function (buffer) {
        var view = Buffer.from(buffer);
        var type = view.readUInt8(0);
        var channelId = view.readUInt32LE(1);
        var data = buffer.slice(5);
        return new Message(type, channelId, data);
    };
    Message.fromCloseEvent = function (id, code, reason) {
        var reasonBuffer = reason ? Util_1.default.stringToUtf8ByteArray(reason) : Buffer.alloc(0);
        var buffer = Buffer.alloc(2 + 4 + reasonBuffer.byteLength);
        buffer.writeUInt16LE(code, 0);
        if (reasonBuffer.byteLength) {
            buffer.writeUInt32LE(reasonBuffer.byteLength, 2);
            buffer.set(reasonBuffer, 6);
        }
        return new Message(MessageType_1.MessageType.CloseChannel, id, buffer);
    };
    Message.createBuffer = function (type, channelId, data) {
        var result = Buffer.alloc(5 + (data ? data.byteLength : 0));
        result.writeUInt8(type, 0);
        result.writeUInt32LE(channelId, 1);
        if (data === null || data === void 0 ? void 0 : data.byteLength) {
            result.set(Buffer.from(data), 5);
        }
        return result;
    };
    Message.prototype.toCloseEvent = function () {
        var code;
        var reason;
        if (this.data && this.data.byteLength) {
            var buffer = Buffer.from(this.data);
            code = buffer.readUInt16LE(0);
            if (buffer.byteLength > 6) {
                var length_1 = buffer.readUInt32LE(2);
                reason = Util_1.default.utf8ByteArrayToString(buffer.slice(6, 6 + length_1));
            }
        }
        return new CloseEventClass_1.CloseEventClass('close', {
            code: code,
            reason: reason,
            wasClean: code === 1000,
        });
    };
    Message.prototype.toBuffer = function () {
        return Message.createBuffer(this.type, this.channelId, this.data);
    };
    return Message;
}());
exports.Message = Message;


/***/ }),

/***/ "./src/packages/multiplexer/MessageEventClass.ts":
/*!*******************************************************!*\
  !*** ./src/packages/multiplexer/MessageEventClass.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageEventClass = exports.MessageEvent2 = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var Event_1 = __webpack_require__(/*! ./Event */ "./src/packages/multiplexer/Event.ts");
var MessageEvent2 = (function (_super) {
    tslib_1.__extends(MessageEvent2, _super);
    function MessageEvent2(type, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.data, data = _c === void 0 ? null : _c, _d = _b.origin, origin = _d === void 0 ? '' : _d, _e = _b.lastEventId, lastEventId = _e === void 0 ? '' : _e, _f = _b.source, source = _f === void 0 ? null : _f, _g = _b.ports, ports = _g === void 0 ? [] : _g;
        var _this = _super.call(this, type) || this;
        _this.data = data;
        _this.origin = "".concat(origin);
        _this.lastEventId = "".concat(lastEventId);
        _this.source = source;
        _this.ports = tslib_1.__spreadArray([], tslib_1.__read(ports), false);
        return _this;
    }
    MessageEvent2.prototype.initMessageEvent = function () {
        throw Error('Deprecated method');
    };
    return MessageEvent2;
}(Event_1.Event2));
exports.MessageEvent2 = MessageEvent2;
exports.MessageEventClass = typeof MessageEvent !== 'undefined' ? MessageEvent : MessageEvent2;


/***/ }),

/***/ "./src/packages/multiplexer/MessageType.ts":
/*!*************************************************!*\
  !*** ./src/packages/multiplexer/MessageType.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["CreateChannel"] = 4] = "CreateChannel";
    MessageType[MessageType["CloseChannel"] = 8] = "CloseChannel";
    MessageType[MessageType["RawBinaryData"] = 16] = "RawBinaryData";
    MessageType[MessageType["RawStringData"] = 32] = "RawStringData";
    MessageType[MessageType["Data"] = 64] = "Data";
})(MessageType = exports.MessageType || (exports.MessageType = {}));


/***/ }),

/***/ "./src/packages/multiplexer/Multiplexer.ts":
/*!*************************************************!*\
  !*** ./src/packages/multiplexer/Multiplexer.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Multiplexer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var TypedEmitter_1 = __webpack_require__(/*! ../../common/TypedEmitter */ "./src/common/TypedEmitter.ts");
var Message_1 = __webpack_require__(/*! ./Message */ "./src/packages/multiplexer/Message.ts");
var MessageType_1 = __webpack_require__(/*! ./MessageType */ "./src/packages/multiplexer/MessageType.ts");
var Event_1 = __webpack_require__(/*! ./Event */ "./src/packages/multiplexer/Event.ts");
var CloseEventClass_1 = __webpack_require__(/*! ./CloseEventClass */ "./src/packages/multiplexer/CloseEventClass.ts");
var ErrorEventClass_1 = __webpack_require__(/*! ./ErrorEventClass */ "./src/packages/multiplexer/ErrorEventClass.ts");
var MessageEventClass_1 = __webpack_require__(/*! ./MessageEventClass */ "./src/packages/multiplexer/MessageEventClass.ts");
var Util_1 = tslib_1.__importDefault(__webpack_require__(/*! ../../app/Util */ "./src/app/Util.ts"));
var Multiplexer = (function (_super) {
    tslib_1.__extends(Multiplexer, _super);
    function Multiplexer(ws, _id, emitter) {
        if (_id === void 0) { _id = 0; }
        var _this = _super.call(this) || this;
        _this.ws = ws;
        _this._id = _id;
        _this.CONNECTING = 0;
        _this.OPEN = 1;
        _this.CLOSING = 2;
        _this.CLOSED = 3;
        _this.binaryType = 'blob';
        _this.channels = new Map();
        _this.nextId = 0;
        _this.maxId = 4294967296;
        _this.storage = [];
        _this.emptyTimerScheduled = false;
        _this.onclose = null;
        _this.onerror = null;
        _this.onmessage = null;
        _this.onopen = null;
        _this.url = '';
        _this.readyState = _this.CONNECTING;
        if (_this._id === 0) {
            ws.binaryType = 'arraybuffer';
            _this.readyState = _this.ws.readyState;
        }
        _this.messageEmitter = emitter || ws;
        var onOpenHandler = function (event) {
            _this.readyState = _this.ws.readyState;
            _this.dispatchEvent(event);
        };
        var onCloseHandler = function (event) {
            _this.readyState = _this.ws.readyState;
            _this.dispatchEvent(event);
            _this.channels.clear();
        };
        var onErrorHandler = function (event) {
            _this.readyState = _this.ws.readyState;
            _this.dispatchEvent(event);
            _this.channels.clear();
        };
        var onMessageHandler = function (event) {
            var data = event.data;
            var message = Message_1.Message.parse(data);
            switch (message.type) {
                case MessageType_1.MessageType.CreateChannel: {
                    var channelId = message.channelId, data_1 = message.data;
                    if (_this.nextId < channelId) {
                        _this.nextId = channelId;
                    }
                    var channel = _this._createChannel(channelId, false);
                    _this.emit('channel', { channel: channel, data: data_1 });
                    break;
                }
                case MessageType_1.MessageType.RawStringData: {
                    var data_2 = _this.channels.get(message.channelId);
                    if (data_2) {
                        var channel = data_2.channel;
                        var msg = new MessageEventClass_1.MessageEventClass('message', {
                            data: Util_1.default.utf8ByteArrayToString(Buffer.from(message.data)),
                            lastEventId: event.lastEventId,
                            origin: event.origin,
                            source: event.source,
                        });
                        channel.dispatchEvent(msg);
                    }
                    else {
                        console.error("Channel with id (".concat(message.channelId, ") not found"));
                    }
                    break;
                }
                case MessageType_1.MessageType.RawBinaryData: {
                    var data_3 = _this.channels.get(message.channelId);
                    if (data_3) {
                        var channel = data_3.channel;
                        var msg = new MessageEventClass_1.MessageEventClass('message', {
                            data: message.data,
                            lastEventId: event.lastEventId,
                            origin: event.origin,
                            source: event.source,
                        });
                        channel.dispatchEvent(msg);
                    }
                    else {
                        console.error("Channel with id (".concat(message.channelId, ") not found"));
                    }
                    break;
                }
                case MessageType_1.MessageType.Data: {
                    var data_4 = _this.channels.get(message.channelId);
                    if (data_4) {
                        var emitter_1 = data_4.emitter;
                        var msg = new MessageEventClass_1.MessageEventClass('message', {
                            data: message.data,
                            lastEventId: event.lastEventId,
                            origin: event.origin,
                            source: event.source,
                        });
                        emitter_1.dispatchEvent(msg);
                    }
                    else {
                        console.error("Channel with id (".concat(message.channelId, ") not found"));
                    }
                    break;
                }
                case MessageType_1.MessageType.CloseChannel: {
                    var data_5 = _this.channels.get(message.channelId);
                    if (data_5) {
                        var channel = data_5.channel;
                        channel.readyState = channel.CLOSING;
                        try {
                            channel.dispatchEvent(message.toCloseEvent());
                        }
                        finally {
                            channel.readyState = channel.CLOSED;
                        }
                    }
                    else {
                        console.error("Channel with id (".concat(message.channelId, ") not found"));
                    }
                    break;
                }
                default:
                    var error = new Error("Unsupported message type: ".concat(message.type));
                    _this.dispatchEvent(new ErrorEventClass_1.ErrorEventClass('error', { error: error }));
            }
        };
        var onThisOpenHandler = function () {
            if (!_this.storage.length) {
                return;
            }
            var ws = _this.ws;
            if (ws instanceof Multiplexer) {
                _this.storage.forEach(function (data) { return ws.sendData(data); });
            }
            else {
                _this.storage.forEach(function (data) { return ws.send(data); });
            }
            _this.storage.length = 0;
        };
        var onThisCloseHandler = function () {
            ws.removeEventListener('open', onOpenHandler);
            ws.removeEventListener('error', onErrorHandler);
            ws.removeEventListener('close', onCloseHandler);
            _this.messageEmitter.removeEventListener('message', onMessageHandler);
            _this.off('close', onThisCloseHandler);
            _this.off('open', onThisOpenHandler);
        };
        ws.addEventListener('open', onOpenHandler);
        ws.addEventListener('error', onErrorHandler);
        ws.addEventListener('close', onCloseHandler);
        _this.messageEmitter.addEventListener('message', onMessageHandler);
        _this.on('close', onThisCloseHandler);
        _this.on('open', onThisOpenHandler);
        _this.scheduleEmptyEvent();
        return _this;
    }
    Multiplexer.wrap = function (ws) {
        return new Multiplexer(ws);
    };
    Object.defineProperty(Multiplexer.prototype, "bufferedAmount", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Multiplexer.prototype, "extensions", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Multiplexer.prototype, "protocol", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Multiplexer.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Multiplexer.prototype.scheduleEmptyEvent = function () {
        var _this = this;
        if (this.emptyTimerScheduled) {
            return;
        }
        this.emptyTimerScheduled = true;
        Promise.resolve().then(function () {
            if (_this.emptyTimerScheduled) {
                _this.emptyTimerScheduled = false;
                _this.emit('empty', _this);
            }
        });
    };
    Multiplexer.prototype.clearEmptyEvent = function () {
        if (this.emptyTimerScheduled) {
            this.emptyTimerScheduled = false;
        }
    };
    Multiplexer.prototype.close = function (code, reason) {
        if (code === void 0) { code = 1000; }
        if (this.readyState === this.CLOSED || this.readyState === this.CLOSING) {
            return;
        }
        if (this._id) {
            this.readyState = this.CLOSING;
            try {
                var message = Message_1.Message.fromCloseEvent(this._id, code, reason).toBuffer();
                if (this.ws instanceof Multiplexer) {
                    this.ws.sendData(message);
                }
                else {
                    this.ws.send(message);
                }
                this.emit('close', new CloseEventClass_1.CloseEventClass('close', { code: code, reason: reason }));
            }
            finally {
                this.readyState = this.CLOSED;
            }
        }
        else {
            this.ws.close(code, reason);
        }
    };
    Multiplexer.prototype.send = function (data) {
        if (this.ws instanceof Multiplexer) {
            if (typeof data === 'string') {
                data = Message_1.Message.createBuffer(MessageType_1.MessageType.RawStringData, this._id, Buffer.from(data));
            }
            else {
                data = Message_1.Message.createBuffer(MessageType_1.MessageType.RawBinaryData, this._id, Buffer.from(data));
            }
        }
        this._send(data);
    };
    Multiplexer.prototype.sendData = function (data) {
        if (this.ws instanceof Multiplexer) {
            data = Message_1.Message.createBuffer(MessageType_1.MessageType.Data, this._id, Buffer.from(data));
        }
        this._send(data);
    };
    Multiplexer.prototype._send = function (data) {
        var readyState = this.readyState;
        if (readyState === this.OPEN) {
            if (this.ws instanceof Multiplexer) {
                this.ws.sendData(data);
            }
            else {
                this.ws.send(data);
            }
        }
        else if (readyState === this.ws.CONNECTING) {
            this.storage.push(data);
        }
        else {
            throw Error("Socket is already in CLOSING or CLOSED state.");
        }
    };
    Multiplexer.prototype._createChannel = function (id, sendOpenEvent) {
        var _this = this;
        var emitter = new TypedEmitter_1.TypedEmitter();
        var channel = new Multiplexer(this, id, emitter);
        this.channels.set(id, { channel: channel, emitter: emitter });
        if (sendOpenEvent) {
            if (this.readyState === this.OPEN) {
                Util_1.default.setImmediate(function () {
                    channel.readyState = _this.OPEN;
                    channel.dispatchEvent(new Event_1.EventClass('open'));
                });
            }
        }
        else {
            channel.readyState = this.readyState;
        }
        channel.addEventListener('close', function () {
            _this.channels.delete(id);
            if (!_this.channels.size) {
                _this.scheduleEmptyEvent();
            }
        });
        this.clearEmptyEvent();
        return channel;
    };
    Multiplexer.prototype.createChannel = function (data) {
        if (this.readyState === this.CLOSING || this.readyState === this.CLOSED) {
            throw Error('Incorrect socket state');
        }
        var id = this.getNextId();
        var channel = this._createChannel(id, true);
        this.sendData(Message_1.Message.createBuffer(MessageType_1.MessageType.CreateChannel, id, data));
        return channel;
    };
    Multiplexer.prototype.getNextId = function () {
        var hitTop = false;
        while (this.channels.has(++this.nextId)) {
            if (this.nextId === this.maxId) {
                if (hitTop) {
                    throw Error('No available id');
                }
                this.nextId = 0;
                hitTop = true;
            }
        }
        return this.nextId;
    };
    Multiplexer.prototype.dispatchEvent = function (event) {
        if (event.type === 'close' && typeof this.onclose === 'function') {
            Reflect.apply(this.onclose, this, [event]);
        }
        if (event.type === 'open' && typeof this.onopen === 'function') {
            Reflect.apply(this.onopen, this, [event]);
        }
        if (event.type === 'message' && typeof this.onmessage === 'function') {
            Reflect.apply(this.onmessage, this, [event]);
        }
        if (event.type === 'error' && typeof this.onerror === 'function') {
            Reflect.apply(this.onerror, this, [event]);
        }
        return _super.prototype.dispatchEvent.call(this, event);
    };
    return Multiplexer;
}(TypedEmitter_1.TypedEmitter));
exports.Multiplexer = Multiplexer;


/***/ }),

/***/ "./src/server/Config.ts":
/*!******************************!*\
  !*** ./src/server/Config.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Config = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var process = tslib_1.__importStar(__webpack_require__(/*! process */ "process"));
var fs = tslib_1.__importStar(__webpack_require__(/*! fs */ "fs"));
var path = tslib_1.__importStar(__webpack_require__(/*! path */ "path"));
var EnvName_1 = __webpack_require__(/*! ./EnvName */ "./src/server/EnvName.ts");
var yaml_1 = tslib_1.__importDefault(__webpack_require__(/*! yaml */ "yaml"));
var DEFAULT_PORT = 8000;
var YAML_RE = /^.+\.(yaml|yml)$/i;
var JSON_RE = /^.+\.(json|js)$/i;
var Config = (function () {
    function Config(fullConfig) {
        this.fullConfig = fullConfig;
    }
    Config.initConfig = function (userConfig) {
        var _this = this;
        if (userConfig === void 0) { userConfig = {}; }
        var runGoogTracker = false;
        var announceGoogTracker = false;
        runGoogTracker = true;
        announceGoogTracker = true;
        var runApplTracker = false;
        var announceApplTracker = false;
        var server = [
            {
                secure: false,
                port: DEFAULT_PORT,
            },
        ];
        var defaultConfig = {
            runGoogTracker: runGoogTracker,
            runApplTracker: runApplTracker,
            announceGoogTracker: announceGoogTracker,
            announceApplTracker: announceApplTracker,
            server: server,
            remoteHostList: [],
        };
        var merged = Object.assign({}, defaultConfig, userConfig);
        merged.server = merged.server.map(function (item) { return _this.parseServerItem(item); });
        return merged;
    };
    Config.parseServerItem = function (config) {
        if (config === void 0) { config = {}; }
        var secure = config.secure || false;
        var port = config.port || (secure ? 443 : 80);
        var options = config.options;
        var redirectToSecure = config.redirectToSecure || false;
        if (secure && !options) {
            throw Error('Must provide "options" for secure server configuration');
        }
        if (options === null || options === void 0 ? void 0 : options.certPath) {
            if (options.cert) {
                throw Error("Can't use \"cert\" and \"certPath\" together");
            }
            options.cert = this.readFile(options.certPath);
        }
        if (options === null || options === void 0 ? void 0 : options.keyPath) {
            if (options.key) {
                throw Error("Can't use \"key\" and \"keyPath\" together");
            }
            options.key = this.readFile(options.keyPath);
        }
        var serverItem = {
            secure: secure,
            port: port,
            redirectToSecure: redirectToSecure,
        };
        if (typeof options !== 'undefined') {
            serverItem.options = options;
        }
        if (typeof redirectToSecure === 'boolean') {
            serverItem.redirectToSecure = redirectToSecure;
        }
        return serverItem;
    };
    Config.getInstance = function () {
        if (!this.instance) {
            var configPath = process.env[EnvName_1.EnvName.CONFIG_PATH];
            var userConfig = void 0;
            if (!configPath) {
                userConfig = {};
            }
            else {
                if (configPath.match(YAML_RE)) {
                    userConfig = yaml_1.default.parse(this.readFile(configPath));
                }
                else if (configPath.match(JSON_RE)) {
                    userConfig = JSON.parse(this.readFile(configPath));
                }
                else {
                    throw Error("Unknown file type: ".concat(configPath));
                }
            }
            var fullConfig = this.initConfig(userConfig);
            this.instance = new Config(fullConfig);
        }
        return this.instance;
    };
    Config.readFile = function (pathString) {
        var isAbsolute = pathString.startsWith('/');
        var absolutePath = isAbsolute ? pathString : path.resolve(process.cwd(), pathString);
        if (!fs.existsSync(absolutePath)) {
            throw Error("Can't find file \"".concat(absolutePath, "\""));
        }
        return fs.readFileSync(absolutePath).toString();
    };
    Config.prototype.getHostList = function () {
        if (!this.fullConfig.remoteHostList || !this.fullConfig.remoteHostList.length) {
            return [];
        }
        var hostList = [];
        this.fullConfig.remoteHostList.forEach(function (item) {
            var hostname = item.hostname, port = item.port, pathname = item.pathname, secure = item.secure, useProxy = item.useProxy;
            if (Array.isArray(item.type)) {
                item.type.forEach(function (type) {
                    hostList.push({
                        hostname: hostname,
                        port: port,
                        pathname: pathname,
                        secure: secure,
                        useProxy: useProxy,
                        type: type,
                    });
                });
            }
            else {
                hostList.push({ hostname: hostname, port: port, pathname: pathname, secure: secure, useProxy: useProxy, type: item.type });
            }
        });
        return hostList;
    };
    Object.defineProperty(Config.prototype, "runLocalGoogTracker", {
        get: function () {
            return this.fullConfig.runGoogTracker;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "announceLocalGoogTracker", {
        get: function () {
            return this.fullConfig.runGoogTracker;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "runLocalApplTracker", {
        get: function () {
            return this.fullConfig.runApplTracker;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "announceLocalApplTracker", {
        get: function () {
            return this.fullConfig.runApplTracker;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "servers", {
        get: function () {
            return this.fullConfig.server;
        },
        enumerable: false,
        configurable: true
    });
    return Config;
}());
exports.Config = Config;


/***/ }),

/***/ "./src/server/EnvName.ts":
/*!*******************************!*\
  !*** ./src/server/EnvName.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnvName = void 0;
var EnvName;
(function (EnvName) {
    EnvName["CONFIG_PATH"] = "WS_SCRCPY_CONFIG";
    EnvName["WS_SCRCPY_PATHNAME"] = "WS_SCRCPY_PATHNAME";
})(EnvName = exports.EnvName || (exports.EnvName = {}));


/***/ }),

/***/ "./src/server/Utils.ts":
/*!*****************************!*\
  !*** ./src/server/Utils.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Utils = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var os = tslib_1.__importStar(__webpack_require__(/*! os */ "os"));
var Utils = (function () {
    function Utils() {
    }
    Utils.printListeningMsg = function (proto, port, pathname) {
        var ipv4List = [];
        var ipv6List = [];
        var formatAddress = function (ip, scopeid) {
            if (typeof scopeid === 'undefined') {
                ipv4List.push("".concat(proto, "://").concat(ip, ":").concat(port).concat(pathname));
                return;
            }
            if (scopeid === 0) {
                ipv6List.push("".concat(proto, "://[").concat(ip, "]:").concat(port).concat(pathname));
            }
            else {
                return;
            }
        };
        Object.keys(os.networkInterfaces())
            .map(function (key) { return os.networkInterfaces()[key]; })
            .forEach(function (info) {
            info.forEach(function (iface) {
                var scopeid;
                if (iface.family === 'IPv6') {
                    scopeid = iface.scopeid;
                }
                else if (iface.family === 'IPv4') {
                    scopeid = undefined;
                }
                else {
                    return;
                }
                formatAddress(iface.address, scopeid);
            });
        });
        console.log('Screen server started ');
    };
    return Utils;
}());
exports.Utils = Utils;


/***/ }),

/***/ "./src/server/goog-device/AdbUtils.ts":
/*!********************************************!*\
  !*** ./src/server/goog-device/AdbUtils.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdbUtils = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var portfinder = tslib_1.__importStar(__webpack_require__(/*! portfinder */ "portfinder"));
var http = tslib_1.__importStar(__webpack_require__(/*! http */ "http"));
var path = tslib_1.__importStar(__webpack_require__(/*! path */ "path"));
var Action_1 = __webpack_require__(/*! ../../common/Action */ "./src/common/Action.ts");
var adb_1 = __webpack_require__(/*! ./adb */ "./src/server/goog-device/adb/index.ts");
var url_1 = __webpack_require__(/*! url */ "url");
var entry_1 = tslib_1.__importDefault(__webpack_require__(/*! @dead50f7/adbkit/lib/adb/sync/entry */ "@dead50f7/adbkit/lib/adb/sync/entry"));
var protocol_1 = tslib_1.__importDefault(__webpack_require__(/*! @dead50f7/adbkit/lib/adb/protocol */ "@dead50f7/adbkit/lib/adb/protocol"));
var proto = 'http://';
var fakeHost = '127.0.0.1:6666';
var fakeHostRe = /127\.0\.0\.1:6666/;
var AdbUtils = (function () {
    function AdbUtils() {
    }
    AdbUtils.formatStatsMin = function (entry) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, {
                        name: entry.name,
                        isDir: entry.isDirectory() ? 1 : 0,
                        size: entry.size,
                        dateModified: entry.mtimeMs ? entry.mtimeMs : entry.mtime.getTime(),
                    }];
            });
        });
    };
    AdbUtils.push = function (serial, stream, pathString) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, transfer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = adb_1.AdbExtended.createClient();
                        return [4, client.push(serial, stream, pathString)];
                    case 1:
                        transfer = _a.sent();
                        client.on('error', function (error) {
                            transfer.emit('error', error);
                        });
                        return [2, transfer];
                }
            });
        });
    };
    AdbUtils.stats = function (serial, pathString, stats, deep) {
        if (deep === void 0) { deep = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!stats || (stats.isSymbolicLink() && pathString.endsWith('/')))) return [3, 2];
                        client = adb_1.AdbExtended.createClient();
                        return [4, client.stat(serial, pathString)];
                    case 1:
                        stats = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!stats.isSymbolicLink()) return [3, 7];
                        if (deep === 5) {
                            throw Error('Too deep');
                        }
                        if (!pathString.endsWith('/')) {
                            pathString += '/';
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4, this.stats(serial, pathString, stats, deep++)];
                    case 4:
                        stats = _a.sent();
                        return [3, 6];
                    case 5:
                        error_1 = _a.sent();
                        if (error_1.message === 'Too deep') {
                            if (deep === 0) {
                                console.error("Symlink is too deep: ".concat(pathString));
                                return [2, stats];
                            }
                            throw error_1;
                        }
                        if (error_1.code !== 'ENOENT') {
                            console.error(error_1.message);
                        }
                        return [3, 6];
                    case 6: return [2, stats];
                    case 7: return [2, stats];
                }
            });
        });
    };
    AdbUtils.readdir = function (serial, pathString) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, list, all;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = adb_1.AdbExtended.createClient();
                        return [4, client.readdir(serial, pathString)];
                    case 1:
                        list = _a.sent();
                        all = list.map(function (entry) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var stat, mtime;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!entry.isSymbolicLink()) return [3, 2];
                                        return [4, this.stats(serial, path.join(pathString, entry.name))];
                                    case 1:
                                        stat = _a.sent();
                                        mtime = stat.mtimeMs ? stat.mtimeMs : stat.mtime.getTime();
                                        entry = new entry_1.default(entry.name, stat.mode, stat.size, (mtime / 1000) | 0);
                                        _a.label = 2;
                                    case 2: return [2, AdbUtils.formatStatsMin(entry)];
                                }
                            });
                        }); });
                        return [2, Promise.all(all)];
                }
            });
        });
    };
    AdbUtils.pipePullFile = function (serial, pathString) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, transfer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = adb_1.AdbExtended.createClient();
                        return [4, client.pull(serial, pathString)];
                    case 1:
                        transfer = _a.sent();
                        transfer.on('progress', function (stats) {
                            console.log('[%s] [%s] Pulled %d bytes so far', serial, pathString, stats.bytesTransferred);
                        });
                        transfer.on('end', function () {
                            console.log('[%s] [%s] Pull complete', serial, pathString);
                        });
                        return [2, new Promise(function (resolve, reject) {
                                transfer.on('readable', function () {
                                    resolve(transfer);
                                });
                                transfer.on('error', function (e) {
                                    reject(e);
                                });
                            })];
                }
            });
        });
    };
    AdbUtils.pipeStatToStream = function (serial, pathString, stream) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client;
            return tslib_1.__generator(this, function (_a) {
                client = adb_1.AdbExtended.createClient();
                return [2, client.pipeStat(serial, pathString, stream)];
            });
        });
    };
    AdbUtils.pipeReadDirToStream = function (serial, pathString, stream) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client;
            return tslib_1.__generator(this, function (_a) {
                client = adb_1.AdbExtended.createClient();
                return [2, client.pipeReadDir(serial, pathString, stream)];
            });
        });
    };
    AdbUtils.pipePullFileToStream = function (serial, pathString, stream) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, transfer;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = adb_1.AdbExtended.createClient();
                        return [4, client.pull(serial, pathString)];
                    case 1:
                        transfer = _a.sent();
                        transfer.on('data', function (data) {
                            stream.send(Buffer.concat([Buffer.from(protocol_1.default.DATA, 'ascii'), data]));
                        });
                        return [2, new Promise(function (resolve, reject) {
                                transfer.on('end', function () {
                                    stream.send(Buffer.from(protocol_1.default.DONE, 'ascii'));
                                    stream.close();
                                    resolve();
                                });
                                transfer.on('error', function (e) {
                                    reject(e);
                                });
                            })];
                }
            });
        });
    };
    AdbUtils.forward = function (serial, remote) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, forwards, forward, local_1, port, local;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = adb_1.AdbExtended.createClient();
                        return [4, client.listForwards(serial)];
                    case 1:
                        forwards = _a.sent();
                        forward = forwards.find(function (item) {
                            return item.remote === remote && item.local.startsWith('tcp:') && item.serial === serial;
                        });
                        if (forward) {
                            local_1 = forward.local;
                            return [2, parseInt(local_1.split('tcp:')[1], 10)];
                        }
                        return [4, portfinder.getPortPromise()];
                    case 2:
                        port = _a.sent();
                        local = "tcp:".concat(port);
                        return [4, client.forward(serial, local, remote)];
                    case 3:
                        _a.sent();
                        return [2, port];
                }
            });
        });
    };
    AdbUtils.getDevtoolsRemoteList = function (serial) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, stream, buffer, lines, names;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = adb_1.AdbExtended.createClient();
                        return [4, client.shell(serial, 'cat /proc/net/unix')];
                    case 1:
                        stream = _a.sent();
                        return [4, adb_1.AdbExtended.util.readAll(stream)];
                    case 2:
                        buffer = _a.sent();
                        lines = buffer
                            .toString()
                            .split('\n')
                            .filter(function (s) {
                            if (!s) {
                                return false;
                            }
                            return s.includes('devtools_remote');
                        });
                        names = [];
                        lines.forEach(function (line) {
                            var temp = line.split(' ');
                            if (temp.length !== 8) {
                                return;
                            }
                            if (temp[5] === '01') {
                                var name_1 = temp[7].substr(1);
                                names.push(name_1);
                            }
                        });
                        return [2, names];
                }
            });
        });
    };
    AdbUtils.createHttpRequest = function (serial, unixSocketName, url) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, socket, request, message, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = adb_1.AdbExtended.createClient();
                        return [4, client.openLocal(serial, "localabstract:".concat(unixSocketName))];
                    case 1:
                        socket = _a.sent();
                        request = new http.ClientRequest(url, {
                            createConnection: function () {
                                return socket;
                            },
                        });
                        return [4, new Promise(function (resolve, reject) {
                                request.on('response', function (r) {
                                    resolve(r);
                                });
                                request.on('socket', function () {
                                    request.end();
                                });
                                request.on('error', function (error) {
                                    reject(error);
                                });
                            })];
                    case 2:
                        message = _a.sent();
                        data = '';
                        return [2, new Promise(function (resolve, reject) {
                                message.on('data', function (d) {
                                    data += d;
                                });
                                message.on('end', function () {
                                    var statusCode = message.statusCode;
                                    resolve({
                                        statusCode: statusCode,
                                        contentType: message.headers['content-type'],
                                        body: data,
                                    });
                                });
                                message.on('error', function (e) {
                                    reject(e);
                                });
                            })];
                }
            });
        });
    };
    AdbUtils.parseResponse = function (message) {
        if (!message) {
            throw Error('empty response');
        }
        var contentType = message.contentType, statusCode = message.statusCode;
        if (typeof statusCode !== 'number' || statusCode !== 200) {
            throw Error("wrong status code: ".concat(statusCode));
        }
        if (!(contentType === null || contentType === void 0 ? void 0 : contentType.startsWith('application/json'))) {
            throw Error("wrong content type: ".concat(contentType));
        }
        var json = JSON.parse(message.body);
        return json;
    };
    AdbUtils.patchWebSocketDebuggerUrl = function (host, serial, socket, url) {
        if (url) {
            var remote = "localabstract:".concat(socket);
            var path_1 = url.replace(/ws:\/\//, '').replace(fakeHostRe, '');
            return "".concat(host, "/").concat(Action_1.ACTION.PROXY_ADB, "/").concat(serial, "/").concat(remote, "/").concat(path_1);
        }
        return url;
    };
    AdbUtils.getRemoteDevtoolsVersion = function (host, serial, socket) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, metadata;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.createHttpRequest(serial, socket, "".concat(proto).concat(fakeHost, "/json/version"))];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            throw Error('Empty response');
                        }
                        metadata = this.parseResponse(data);
                        if (metadata.webSocketDebuggerUrl) {
                            metadata.webSocketDebuggerUrl = this.patchWebSocketDebuggerUrl(host, serial, socket, metadata.webSocketDebuggerUrl);
                        }
                        return [2, metadata];
                }
            });
        });
    };
    AdbUtils.getRemoteDevtoolsTargets = function (host, serial, socket) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, list;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.createHttpRequest(serial, socket, "".concat(proto).concat(fakeHost, "/json"))];
                    case 1:
                        data = _a.sent();
                        list = this.parseResponse(data);
                        if (!list || !list.length) {
                            return [2, []];
                        }
                        return [2, list.map(function (target) {
                                var devtoolsFrontendUrl = target.devtoolsFrontendUrl, webSocketDebuggerUrl = target.webSocketDebuggerUrl;
                                if (devtoolsFrontendUrl) {
                                    var temp = devtoolsFrontendUrl;
                                    var bundledOnDevice = false;
                                    var ws = _this.patchWebSocketDebuggerUrl(host, serial, socket, webSocketDebuggerUrl);
                                    if (!temp.startsWith('http')) {
                                        bundledOnDevice = true;
                                        temp = "".concat(proto).concat(fakeHost).concat(temp);
                                    }
                                    var url = new url_1.URL(temp);
                                    url.searchParams.delete('ws');
                                    var urlString = url.toString();
                                    if (urlString.includes('?')) {
                                        urlString += '&';
                                    }
                                    else {
                                        urlString += '?';
                                    }
                                    urlString += "ws=".concat(ws);
                                    if (bundledOnDevice) {
                                        urlString = urlString.substr("".concat(proto).concat(fakeHost).length);
                                    }
                                    target.devtoolsFrontendUrl = urlString;
                                    target.webSocketDebuggerUrl = ws;
                                }
                                return target;
                            })];
                }
            });
        });
    };
    AdbUtils.getRemoteDevtoolsInfo = function (host, serial) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var list, deviceName_1, all, result, deviceName, browsers;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getDevtoolsRemoteList(serial)];
                    case 1:
                        list = _a.sent();
                        if (!(!list || !list.length)) return [3, 3];
                        return [4, this.getDeviceName(serial)];
                    case 2:
                        deviceName_1 = _a.sent();
                        return [2, {
                                deviceName: deviceName_1,
                                deviceSerial: serial,
                                browsers: [],
                            }];
                    case 3:
                        all = [];
                        list.forEach(function (socket) {
                            var v = _this.getRemoteDevtoolsVersion(host, serial, socket).catch(function (error) {
                                console.error('getRemoteDevtoolsVersion failed:', error.message);
                                return {
                                    'Android-Package': 'string',
                                    Browser: 'string',
                                    'Protocol-Version': 'string',
                                    'User-Agent': 'string',
                                    'V8-Version': 'string',
                                    'WebKit-Version': 'string',
                                    webSocketDebuggerUrl: 'string',
                                };
                            });
                            var t = _this.getRemoteDevtoolsTargets(host, serial, socket).catch(function (error) {
                                console.error('getRemoteDevtoolsTargets failed:', error.message);
                                return [];
                            });
                            var p = Promise.all([v, t]).then(function (result) {
                                var _a = tslib_1.__read(result, 2), version = _a[0], targets = _a[1];
                                return {
                                    socket: socket,
                                    version: version,
                                    targets: targets,
                                };
                            });
                            all.push(p);
                        });
                        all.unshift(this.getDeviceName(serial));
                        return [4, Promise.all(all)];
                    case 4:
                        result = _a.sent();
                        deviceName = result.shift();
                        browsers = result;
                        return [2, {
                                deviceName: deviceName,
                                deviceSerial: serial,
                                browsers: browsers,
                            }];
                }
            });
        });
    };
    AdbUtils.getDeviceName = function (serial) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, props;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = adb_1.AdbExtended.createClient();
                        return [4, client.getProperties(serial)];
                    case 1:
                        props = _a.sent();
                        return [2, props['ro.product.model'] || 'Unknown device'];
                }
            });
        });
    };
    return AdbUtils;
}());
exports.AdbUtils = AdbUtils;


/***/ }),

/***/ "./src/server/goog-device/Device.ts":
/*!******************************************!*\
  !*** ./src/server/goog-device/Device.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Device = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var adb_1 = __webpack_require__(/*! ./adb */ "./src/server/goog-device/adb/index.ts");
var child_process_1 = __webpack_require__(/*! child_process */ "child_process");
var TypedEmitter_1 = __webpack_require__(/*! ../../common/TypedEmitter */ "./src/common/TypedEmitter.ts");
var ScrcpyServer_1 = __webpack_require__(/*! ./ScrcpyServer */ "./src/server/goog-device/ScrcpyServer.ts");
var Properties_1 = __webpack_require__(/*! ./Properties */ "./src/server/goog-device/Properties.ts");
var PID_DETECTION;
(function (PID_DETECTION) {
    PID_DETECTION[PID_DETECTION["UNKNOWN"] = 0] = "UNKNOWN";
    PID_DETECTION[PID_DETECTION["PIDOF"] = 1] = "PIDOF";
    PID_DETECTION[PID_DETECTION["GREP_PS"] = 2] = "GREP_PS";
    PID_DETECTION[PID_DETECTION["GREP_PS_A"] = 3] = "GREP_PS_A";
    PID_DETECTION[PID_DETECTION["LS_PROC"] = 4] = "LS_PROC";
})(PID_DETECTION || (PID_DETECTION = {}));
var Device = (function (_super) {
    tslib_1.__extends(Device, _super);
    function Device(udid, state) {
        var _this = _super.call(this) || this;
        _this.udid = udid;
        _this.connected = true;
        _this.pidDetectionVariant = PID_DETECTION.UNKNOWN;
        _this.spawnServer = true;
        _this.updateTimeout = Device.INITIAL_UPDATE_TIMEOUT;
        _this.updateCount = 0;
        _this.lastEmit = 0;
        _this.interfacesSort = function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        };
        _this.fetchDeviceInfo = function () {
            if (_this.connected) {
                var propsPromise = _this.getProperties().then(function (props) {
                    if (!props) {
                        return false;
                    }
                    var changed = false;
                    Properties_1.Properties.forEach(function (propName) {
                        if (props[propName] !== _this.descriptor[propName]) {
                            changed = true;
                            _this.descriptor[propName] = props[propName];
                        }
                    });
                    if (changed) {
                        _this.emitUpdate();
                    }
                    return true;
                });
                var netIntPromise = _this.updateInterfaces().then(function (interfaces) {
                    return !!interfaces.length;
                });
                var pidPromise = void 0;
                if (_this.spawnServer) {
                    pidPromise = _this.startServer();
                }
                else {
                    pidPromise = _this.getServerPid();
                }
                var serverPromise = pidPromise.then(function () {
                    return !(_this.descriptor.pid === -1 && _this.spawnServer);
                });
                Promise.all([propsPromise, netIntPromise, serverPromise])
                    .then(function (results) {
                    _this.updateTimeoutId = undefined;
                    var failedCount = results.filter(function (result) { return !result; }).length;
                    if (!failedCount) {
                        _this.updateCount = 0;
                        _this.updateTimeout = Device.INITIAL_UPDATE_TIMEOUT;
                    }
                    else {
                        _this.scheduleInfoUpdate();
                    }
                })
                    .catch(function () {
                    _this.updateTimeoutId = undefined;
                    _this.scheduleInfoUpdate();
                });
            }
            else {
                _this.updateCount = 0;
                _this.updateTimeout = Device.INITIAL_UPDATE_TIMEOUT;
                _this.updateTimeoutId = undefined;
                _this.emitUpdate();
            }
            return;
        };
        _this.TAG = "[".concat(udid, "]");
        _this.descriptor = {
            udid: udid,
            state: state,
            interfaces: [],
            pid: -1,
            'wifi.interface': '',
            'ro.build.version.release': '',
            'ro.build.version.sdk': '',
            'ro.product.manufacturer': '',
            'ro.product.model': '',
            'ro.product.cpu.abi': '',
            'last.update.timestamp': 0,
        };
        _this.client = adb_1.AdbExtended.createClient();
        _this.setState(state);
        return _this;
    }
    Device.prototype.setState = function (state) {
        if (state === 'device') {
            this.connected = true;
            this.properties = undefined;
        }
        else {
            this.connected = false;
        }
        this.descriptor.state = state;
        this.emitUpdate();
        this.fetchDeviceInfo();
    };
    Device.prototype.isConnected = function () {
        return this.connected;
    };
    Device.prototype.getPidOf = function (processName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.connected) {
                            return [2];
                        }
                        if (!(this.pidDetectionVariant === PID_DETECTION.UNKNOWN)) return [3, 2];
                        _a = this;
                        return [4, this.findDetectionVariant()];
                    case 1:
                        _a.pidDetectionVariant = _b.sent();
                        _b.label = 2;
                    case 2:
                        switch (this.pidDetectionVariant) {
                            case PID_DETECTION.PIDOF:
                                return [2, this.pidOf(processName)];
                            case PID_DETECTION.GREP_PS:
                                return [2, this.grepPs(processName)];
                            case PID_DETECTION.GREP_PS_A:
                                return [2, this.grepPs_A(processName)];
                            default:
                                return [2, this.listProc(processName)];
                        }
                        return [2];
                }
            });
        });
    };
    Device.prototype.killProcess = function (pid) {
        var command = "kill ".concat(pid);
        return this.runShellCommandAdbKit(command);
    };
    Device.prototype.runShellCommandAdb = function (command) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var cmd = 'adb';
                        var args = ['-s', "".concat(_this.udid), 'shell', command];
                        var adb = (0, child_process_1.spawn)(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
                        var output = '';
                        adb.stdout.on('data', function (data) {
                            output += data.toString();
                            console.log(_this.TAG, "stdout: ".concat(data.toString().replace(/\n$/, '')));
                        });
                        adb.stderr.on('data', function (data) {
                            console.error(_this.TAG, "stderr: ".concat(data));
                        });
                        adb.on('error', function (error) {
                            console.error(_this.TAG, "failed to spawn adb process.\n".concat(error.stack));
                            reject(error);
                        });
                        adb.on('close', function (code) {
                            console.log(_this.TAG, "adb process (".concat(args.join(' '), ") exited with code ").concat(code));
                            resolve(output);
                        });
                    })];
            });
        });
    };
    Device.prototype.runShellCommandAdbKit = function (command) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.client
                        .shell(this.udid, command)
                        .then(adb_1.AdbExtended.util.readAll)
                        .then(function (output) { return output.toString().trim(); })];
            });
        });
    };
    Device.prototype.push = function (contents, path) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.client.push(this.udid, contents, path)];
            });
        });
    };
    Device.prototype.getProperties = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.properties) {
                            return [2, this.properties];
                        }
                        if (!this.connected) {
                            return [2];
                        }
                        _a = this;
                        return [4, this.client.getProperties(this.udid)];
                    case 1:
                        _a.properties = _b.sent();
                        return [2, this.properties];
                }
            });
        });
    };
    Device.prototype.getNetInterfaces = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var list, output, lines;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            return [2, []];
                        }
                        list = [];
                        return [4, this.runShellCommandAdbKit("ip -4 -f inet -o a | grep 'scope global'")];
                    case 1:
                        output = _a.sent();
                        lines = output.split('\n').filter(function (i) { return !!i; });
                        lines.forEach(function (value) {
                            var temp = value.split(' ').filter(function (i) { return !!i; });
                            var name = temp[1];
                            var ipAndMask = temp[3];
                            var ipv4 = ipAndMask.split('/')[0];
                            list.push({ name: name, ipv4: ipv4 });
                        });
                        return [2, list.sort(this.interfacesSort)];
                }
            });
        });
    };
    Device.prototype.pidOf = function (processName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.runShellCommandAdbKit("pidof ".concat(processName))
                        .then(function (output) {
                        return output
                            .split(' ')
                            .map(function (pid) { return parseInt(pid, 10); })
                            .filter(function (num) { return !isNaN(num); });
                    })
                        .catch(function () {
                        return [];
                    })];
            });
        });
    };
    Device.prototype.filterPsOutput = function (processName, output) {
        var list = [];
        var processes = output.split('\n');
        processes.map(function (line) {
            var cols = line
                .trim()
                .split(' ')
                .filter(function (item) { return item.length; });
            if (cols[cols.length - 1] === processName) {
                var pid = parseInt(cols[1], 10);
                if (!isNaN(pid)) {
                    list.push(pid);
                }
            }
        });
        return list;
    };
    Device.prototype.grepPs_A = function (processName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2, this.runShellCommandAdbKit("ps -A | grep ".concat(processName))
                        .then(function (output) {
                        return _this.filterPsOutput(processName, output);
                    })
                        .catch(function () {
                        return [];
                    })];
            });
        });
    };
    Device.prototype.grepPs = function (processName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2, this.runShellCommandAdbKit("ps | grep ".concat(processName))
                        .then(function (output) {
                        return _this.filterPsOutput(processName, output);
                    })
                        .catch(function () {
                        return [];
                    })];
            });
        });
    };
    Device.prototype.listProc = function (processName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var find, lines, re, list;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        find = "find /proc -maxdepth 2 -name cmdline  2>/dev/null";
                        return [4, this.runShellCommandAdbKit("for L in `".concat(find, "`; do grep -sae '^").concat(processName, "' $L 2>&1 >/dev/null && echo $L; done"))];
                    case 1:
                        lines = _a.sent();
                        re = /\/proc\/([0-9]+)\/cmdline/;
                        list = [];
                        lines.split('\n').map(function (line) {
                            var trim = line.trim();
                            var m = trim.match(re);
                            if (m) {
                                list.push(parseInt(m[1], 10));
                            }
                        });
                        return [2, list];
                }
            });
        });
    };
    Device.prototype.executedWithoutError = function (command) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.runShellCommandAdbKit(command)
                        .then(function (output) {
                        var err = parseInt(output, 10);
                        return err === 0;
                    })
                        .catch(function () {
                        return false;
                    })];
            });
        });
    };
    Device.prototype.hasPs = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.executedWithoutError('ps | grep init 2>&1 >/dev/null; echo $?')];
            });
        });
    };
    Device.prototype.hasPs_A = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.executedWithoutError('ps -A | grep init 2>&1 >/dev/null; echo $?')];
            });
        });
    };
    Device.prototype.hasPidOf = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ok;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.executedWithoutError('which pidof 2>&1 >/dev/null && echo $?')];
                    case 1:
                        ok = _a.sent();
                        if (!ok) {
                            return [2, false];
                        }
                        return [2, this.runShellCommandAdbKit('echo $PPID; pidof init')
                                .then(function (output) {
                                var pids = output.split('\n').filter(function (a) { return a.length; });
                                if (pids.length < 2) {
                                    return false;
                                }
                                var parentPid = pids[0].replace('\r', '');
                                var list = pids[1].split(' ');
                                if (list.includes(parentPid)) {
                                    return false;
                                }
                                return list.includes('1');
                            })
                                .catch(function () {
                                return false;
                            })];
                }
            });
        });
    };
    Device.prototype.findDetectionVariant = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.hasPidOf()];
                    case 1:
                        if (_a.sent()) {
                            return [2, PID_DETECTION.PIDOF];
                        }
                        return [4, this.hasPs_A()];
                    case 2:
                        if (_a.sent()) {
                            return [2, PID_DETECTION.GREP_PS_A];
                        }
                        return [4, this.hasPs()];
                    case 3:
                        if (_a.sent()) {
                            return [2, PID_DETECTION.GREP_PS];
                        }
                        return [2, PID_DETECTION.LS_PROC];
                }
            });
        });
    };
    Device.prototype.scheduleInfoUpdate = function () {
        if (this.updateTimeoutId) {
            return;
        }
        if (++this.updateCount > Device.MAX_UPDATES_COUNT) {
            console.error(this.TAG, 'The maximum number of attempts to fetch device info has been reached.');
            return;
        }
        this.updateTimeoutId = setTimeout(this.fetchDeviceInfo, this.updateTimeout);
        this.updateTimeout *= 2;
    };
    Device.prototype.emitUpdate = function (setUpdateTime) {
        var _this = this;
        if (setUpdateTime === void 0) { setUpdateTime = true; }
        var THROTTLE = 300;
        var now = Date.now();
        var time = now - this.lastEmit;
        if (setUpdateTime) {
            this.descriptor['last.update.timestamp'] = now;
        }
        if (time > THROTTLE) {
            this.lastEmit = now;
            this.emit('update', this);
            return;
        }
        if (!this.throttleTimeoutId) {
            this.throttleTimeoutId = setTimeout(function () {
                delete _this.throttleTimeoutId;
                _this.emitUpdate(false);
            }, THROTTLE - time);
        }
    };
    Device.prototype.getServerPid = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var pids, pid;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ScrcpyServer_1.ScrcpyServer.getServerPid(this)];
                    case 1:
                        pids = _a.sent();
                        if (!Array.isArray(pids) || !pids.length) {
                            pid = -1;
                        }
                        else {
                            pid = pids[0];
                        }
                        if (this.descriptor.pid !== pid) {
                            this.descriptor.pid = pid;
                            this.emitUpdate();
                        }
                        if (pid !== -1) {
                            return [2, pid];
                        }
                        else {
                            return [2];
                        }
                        return [2];
                }
            });
        });
    };
    Device.prototype.updateInterfaces = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2, this.getNetInterfaces().then(function (interfaces) {
                        var changed = false;
                        var old = _this.descriptor.interfaces;
                        if (old.length !== interfaces.length) {
                            changed = true;
                        }
                        else {
                            old.forEach(function (value, idx) {
                                if (value.name !== interfaces[idx].name || value.ipv4 !== interfaces[idx].ipv4) {
                                    changed = true;
                                }
                            });
                        }
                        if (changed) {
                            _this.descriptor.interfaces = interfaces;
                            _this.emitUpdate();
                        }
                        return _this.descriptor.interfaces;
                    })];
            });
        });
    };
    Device.prototype.killServer = function (pid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var realPid, output, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spawnServer = false;
                        return [4, this.getServerPid()];
                    case 1:
                        realPid = _a.sent();
                        if (typeof realPid !== 'number') {
                            return [2];
                        }
                        if (realPid !== pid) {
                            console.error(this.TAG, "Requested to kill server with PID ".concat(pid, ". Real server PID is ").concat(realPid, "."));
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this.killProcess(realPid)];
                    case 3:
                        output = _a.sent();
                        if (output) {
                            console.log(this.TAG, "kill server: \"".concat(output, "\""));
                        }
                        this.descriptor.pid = -1;
                        this.emitUpdate();
                        return [3, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error(this.TAG, "Error: ".concat(error_1.message));
                        throw error_1;
                    case 5: return [2];
                }
            });
        });
    };
    Device.prototype.startServer = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var pid, output, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spawnServer = true;
                        return [4, this.getServerPid()];
                    case 1:
                        pid = _a.sent();
                        if (typeof pid === 'number') {
                            return [2, pid];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, ScrcpyServer_1.ScrcpyServer.run(this)];
                    case 3:
                        output = _a.sent();
                        if (output) {
                            console.log(this.TAG, "start server: \"".concat(output, "\""));
                        }
                        return [2, this.getServerPid()];
                    case 4:
                        error_2 = _a.sent();
                        console.error(this.TAG, "Error: ".concat(error_2.message));
                        throw error_2;
                    case 5: return [2];
                }
            });
        });
    };
    Device.INITIAL_UPDATE_TIMEOUT = 1500;
    Device.MAX_UPDATES_COUNT = 7;
    return Device;
}(TypedEmitter_1.TypedEmitter));
exports.Device = Device;


/***/ }),

/***/ "./src/server/goog-device/Properties.ts":
/*!**********************************************!*\
  !*** ./src/server/goog-device/Properties.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Properties = void 0;
exports.Properties = [
    'ro.product.cpu.abi',
    'ro.product.manufacturer',
    'ro.product.model',
    'ro.build.version.release',
    'ro.build.version.sdk',
    'wifi.interface',
];


/***/ }),

/***/ "./src/server/goog-device/ScrcpyServer.ts":
/*!************************************************!*\
  !*** ./src/server/goog-device/ScrcpyServer.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScrcpyServer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! ../../../vendor/Genymobile/scrcpy/scrcpy-server.jar */ "./vendor/Genymobile/scrcpy/scrcpy-server.jar");
__webpack_require__(/*! ../../../vendor/Genymobile/scrcpy/LICENSE */ "./vendor/Genymobile/scrcpy/LICENSE");
var Constants_1 = __webpack_require__(/*! ../../common/Constants */ "./src/common/Constants.ts");
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
var ServerVersion_1 = __webpack_require__(/*! ./ServerVersion */ "./src/server/goog-device/ServerVersion.ts");
var TEMP_PATH = '/data/local/tmp/';
var FILE_DIR = path_1.default.join(__dirname, 'vendor/Genymobile/scrcpy');
var FILE_NAME = 'scrcpy-server.jar';
var RUN_COMMAND = "CLASSPATH=".concat(TEMP_PATH).concat(FILE_NAME, " nohup app_process ").concat(Constants_1.ARGS_STRING);
var ScrcpyServer = (function () {
    function ScrcpyServer() {
    }
    ScrcpyServer.copyServer = function (device) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var src, dst;
            return tslib_1.__generator(this, function (_a) {
                src = path_1.default.join(FILE_DIR, FILE_NAME);
                dst = TEMP_PATH + FILE_NAME;
                return [2, device.push(src, dst)];
            });
        });
    };
    ScrcpyServer.waitForServerPid = function (device, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tryCounter, processExited, lookPidFile, timeout, fileName, content, pid, realPid, list;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tryCounter = params.tryCounter, processExited = params.processExited, lookPidFile = params.lookPidFile;
                        if (processExited) {
                            return [2];
                        }
                        timeout = 500 + 100 * tryCounter;
                        if (!lookPidFile) return [3, 4];
                        fileName = ScrcpyServer.PID_FILE_PATH;
                        return [4, device.runShellCommandAdbKit("test -f ".concat(fileName, " && cat ").concat(fileName))];
                    case 1:
                        content = _a.sent();
                        if (!content.trim()) return [3, 3];
                        pid = parseInt(content, 10);
                        if (!(pid && !isNaN(pid))) return [3, 3];
                        return [4, this.getServerPid(device)];
                    case 2:
                        realPid = _a.sent();
                        if (realPid === null || realPid === void 0 ? void 0 : realPid.includes(pid)) {
                            return [2, realPid];
                        }
                        else {
                            params.lookPidFile = false;
                        }
                        _a.label = 3;
                    case 3: return [3, 6];
                    case 4: return [4, this.getServerPid(device)];
                    case 5:
                        list = _a.sent();
                        if (Array.isArray(list) && list.length) {
                            return [2, list];
                        }
                        _a.label = 6;
                    case 6:
                        if (++params.tryCounter > 5) {
                            throw new Error('Failed to start server');
                        }
                        return [2, new Promise(function (resolve) {
                                setTimeout(function () {
                                    resolve(_this.waitForServerPid(device, params));
                                }, timeout);
                            })];
                }
            });
        });
    };
    ScrcpyServer.getServerPid = function (device) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var list, serverPid, promises;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!device.isConnected()) {
                            return [2];
                        }
                        return [4, device.getPidOf(Constants_1.SERVER_PROCESS_NAME)];
                    case 1:
                        list = _a.sent();
                        if (!Array.isArray(list) || !list.length) {
                            return [2];
                        }
                        serverPid = [];
                        promises = list.map(function (pid) {
                            return device.runShellCommandAdbKit("cat /proc/".concat(pid, "/cmdline")).then(function (output) {
                                var args = output.split('\0');
                                if (!args.length || args[0] !== Constants_1.SERVER_PROCESS_NAME) {
                                    return;
                                }
                                var first = args[0];
                                while (args.length && first !== Constants_1.SERVER_PACKAGE) {
                                    args.shift();
                                    first = args[0];
                                }
                                if (args.length < 3) {
                                    return;
                                }
                                var versionString = args[1];
                                if (versionString === Constants_1.SERVER_VERSION) {
                                    serverPid.push(pid);
                                }
                                else {
                                    var currentVersion = new ServerVersion_1.ServerVersion(versionString);
                                    if (currentVersion.isCompatible()) {
                                        var desired = new ServerVersion_1.ServerVersion(Constants_1.SERVER_VERSION);
                                        if (desired.gt(currentVersion)) {
                                            console.log(device.TAG, "Found old server version running (PID: ".concat(pid, ", Version: ").concat(versionString, ")"));
                                            console.log(device.TAG, 'Perform kill now');
                                            device.killProcess(pid);
                                        }
                                    }
                                }
                                return;
                            });
                        });
                        return [4, Promise.all(promises)];
                    case 2:
                        _a.sent();
                        return [2, serverPid];
                }
            });
        });
    };
    ScrcpyServer.run = function (device) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var list, params, runPromise;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!device.isConnected()) {
                            return [2];
                        }
                        return [4, this.getServerPid(device)];
                    case 1:
                        list = _a.sent();
                        if (Array.isArray(list) && list.length) {
                            return [2, list];
                        }
                        return [4, this.copyServer(device)];
                    case 2:
                        _a.sent();
                        params = { tryCounter: 0, processExited: false, lookPidFile: true };
                        runPromise = device.runShellCommandAdb(RUN_COMMAND);
                        runPromise
                            .then(function (out) {
                            if (device.isConnected()) {
                                console.log(device.TAG, 'Server exited:', out);
                            }
                        })
                            .catch(function (e) {
                            console.log(device.TAG, 'Error:', e.message);
                        })
                            .finally(function () {
                            params.processExited = true;
                        });
                        return [4, Promise.race([runPromise, this.waitForServerPid(device, params)])];
                    case 3:
                        list = _a.sent();
                        if (Array.isArray(list) && list.length) {
                            return [2, list];
                        }
                        return [2];
                }
            });
        });
    };
    ScrcpyServer.PID_FILE_PATH = '/data/local/tmp/ws_scrcpy.pid';
    return ScrcpyServer;
}());
exports.ScrcpyServer = ScrcpyServer;


/***/ }),

/***/ "./src/server/goog-device/ServerVersion.ts":
/*!*************************************************!*\
  !*** ./src/server/goog-device/ServerVersion.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerVersion = void 0;
var ServerVersion = (function () {
    function ServerVersion(versionString) {
        this.versionString = versionString;
        this.parts = [];
        var temp = versionString.split('-');
        var main = temp.shift();
        this.suffix = temp.join('-');
        if (main) {
            this.parts = main.split('.');
        }
        this.compatible = this.suffix.startsWith('ws') && this.parts.length >= 2;
    }
    ServerVersion.prototype.equals = function (a) {
        var versionString = typeof a === 'string' ? a : a.versionString;
        return this.versionString === versionString;
    };
    ServerVersion.prototype.gt = function (a) {
        if (this.equals(a)) {
            return false;
        }
        if (typeof a === 'string') {
            a = new ServerVersion(a);
        }
        var minLength = Math.min(this.parts.length, a.parts.length);
        for (var i = 0; i < minLength; i++) {
            if (this.parts[i] > a.parts[i]) {
                return true;
            }
        }
        if (this.parts.length > a.parts.length) {
            return true;
        }
        if (this.parts.length < a.parts.length) {
            return false;
        }
        return this.suffix > a.suffix;
    };
    ServerVersion.prototype.isCompatible = function () {
        return this.compatible;
    };
    return ServerVersion;
}());
exports.ServerVersion = ServerVersion;


/***/ }),

/***/ "./src/server/goog-device/adb/ExtendedClient.ts":
/*!******************************************************!*\
  !*** ./src/server/goog-device/adb/ExtendedClient.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtendedClient = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var client_1 = tslib_1.__importDefault(__webpack_require__(/*! @dead50f7/adbkit/lib/adb/client */ "@dead50f7/adbkit/lib/adb/client"));
var sync_1 = __webpack_require__(/*! ./command/host-transport/sync */ "./src/server/goog-device/adb/command/host-transport/sync.ts");
var ExtendedClient = (function (_super) {
    tslib_1.__extends(ExtendedClient, _super);
    function ExtendedClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtendedClient.prototype.pipeSyncService = function (serial) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var transport;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.transport(serial)];
                    case 1:
                        transport = _a.sent();
                        return [2, new sync_1.SyncCommand(transport).execute()];
                }
            });
        });
    };
    ExtendedClient.prototype.pipeReadDir = function (serial, pathString, stream) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sync;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.pipeSyncService(serial)];
                    case 1:
                        sync = _a.sent();
                        return [2, sync.pipeReadDir(pathString, stream).then(function () {
                                sync.end();
                            })];
                }
            });
        });
    };
    ExtendedClient.prototype.pipePull = function (serial, path, stream) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sync;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.pipeSyncService(serial)];
                    case 1:
                        sync = _a.sent();
                        return [2, sync.pipePull(path, stream).then(function () {
                                sync.end();
                            })];
                }
            });
        });
    };
    ExtendedClient.prototype.pipeStat = function (serial, path, stream) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sync;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.pipeSyncService(serial)];
                    case 1:
                        sync = _a.sent();
                        return [2, sync.pipeStat(path, stream).then(function () {
                                sync.end();
                            })];
                }
            });
        });
    };
    return ExtendedClient;
}(client_1.default));
exports.ExtendedClient = ExtendedClient;


/***/ }),

/***/ "./src/server/goog-device/adb/ExtendedSync.ts":
/*!****************************************************!*\
  !*** ./src/server/goog-device/adb/ExtendedSync.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtendedSync = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var protocol_1 = tslib_1.__importDefault(__webpack_require__(/*! @dead50f7/adbkit/lib/adb/protocol */ "@dead50f7/adbkit/lib/adb/protocol"));
var ExtendedSync = (function () {
    function ExtendedSync(connection) {
        this.connection = connection;
        this.connection = connection;
        this.parser = this.connection.parser;
    }
    ExtendedSync.prototype.pipeReadDir = function (path, stream) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var readNext;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                readNext = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var reply, _a, stat, namelen, name_1;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, this.parser.readAscii(4)];
                            case 1:
                                reply = _b.sent();
                                _a = reply;
                                switch (_a) {
                                    case protocol_1.default.DENT: return [3, 2];
                                    case protocol_1.default.DONE: return [3, 5];
                                    case protocol_1.default.FAIL: return [3, 7];
                                }
                                return [3, 8];
                            case 2: return [4, this.parser.readBytes(16)];
                            case 3:
                                stat = _b.sent();
                                namelen = stat.readUInt32LE(12);
                                return [4, this.parser.readBytes(namelen)];
                            case 4:
                                name_1 = _b.sent();
                                stream.send(Buffer.concat([Buffer.from(reply), stat, name_1]));
                                return [2, readNext()];
                            case 5: return [4, this.parser.readBytes(16)];
                            case 6:
                                _b.sent();
                                stream.close(0);
                                return [2];
                            case 7: return [2, this._readError(stream)];
                            case 8: return [2, this.parser.unexpected(reply, 'DENT, DONE or FAIL')];
                        }
                    });
                }); };
                this._sendCommandWithArg(protocol_1.default.LIST, path);
                return [2, readNext()];
            });
        });
    };
    ExtendedSync.prototype.pipePull = function (path, stream) {
        this._sendCommandWithArg(protocol_1.default.RECV, "".concat(path));
        return this._readData(stream);
    };
    ExtendedSync.prototype.pipeStat = function (path, stream) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var reply, _a, stat;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._sendCommandWithArg(protocol_1.default.STAT, "".concat(path));
                        return [4, this.parser.readAscii(4)];
                    case 1:
                        reply = _b.sent();
                        _a = reply;
                        switch (_a) {
                            case protocol_1.default.STAT: return [3, 2];
                            case protocol_1.default.FAIL: return [3, 4];
                        }
                        return [3, 5];
                    case 2: return [4, this.parser.readBytes(12)];
                    case 3:
                        stat = _b.sent();
                        stream.send(Buffer.concat([Buffer.from(reply), stat]));
                        stream.close(1000);
                        return [3, 6];
                    case 4: return [2, this._readError(stream)];
                    case 5: return [2, this.parser.unexpected(reply, 'STAT or FAIL')];
                    case 6: return [2];
                }
            });
        });
    };
    ExtendedSync.prototype._readData = function (stream) {
        var _this = this;
        var readNext = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var reply, _a, lengthData, length_1, data;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.parser.readAscii(4)];
                    case 1:
                        reply = _b.sent();
                        _a = reply;
                        switch (_a) {
                            case protocol_1.default.DATA: return [3, 2];
                            case protocol_1.default.DONE: return [3, 5];
                            case protocol_1.default.FAIL: return [3, 7];
                        }
                        return [3, 8];
                    case 2: return [4, this.parser.readBytes(4)];
                    case 3:
                        lengthData = _b.sent();
                        length_1 = lengthData.readUInt32LE(0);
                        return [4, this.parser.readBytes(length_1)];
                    case 4:
                        data = _b.sent();
                        stream.send(Buffer.concat([Buffer.from(reply), data]));
                        return [2, readNext()];
                    case 5: return [4, this.parser.readBytes(4)];
                    case 6:
                        _b.sent();
                        stream.close(1000);
                        return [2];
                    case 7: return [2, this._readError(stream)];
                    case 8: return [2, this.parser.unexpected(reply, 'DATA, DONE or FAIL')];
                }
            });
        }); };
        return readNext();
    };
    ExtendedSync.prototype._sendCommandWithArg = function (cmd, arg) {
        var arglen = Buffer.byteLength(arg, 'utf-8');
        var payload = Buffer.alloc(cmd.length + 4 + arglen);
        var pos = 0;
        payload.write(cmd, pos, cmd.length);
        pos += cmd.length;
        payload.writeUInt32LE(arglen, pos);
        pos += 4;
        payload.write(arg, pos);
        return this.connection.write(payload);
    };
    ExtendedSync.prototype._readError = function (stream) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var length, message;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.parser.readBytes(4)];
                    case 1:
                        length = _a.sent();
                        return [4, this.parser.readAscii(length.readUInt32LE(0))];
                    case 2:
                        message = _a.sent();
                        stream.close(4000, message);
                        return [4, this.parser.end()];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ExtendedSync.prototype.end = function () {
        this.connection.end();
        return this;
    };
    return ExtendedSync;
}());
exports.ExtendedSync = ExtendedSync;


/***/ }),

/***/ "./src/server/goog-device/adb/command/host-transport/sync.ts":
/*!*******************************************************************!*\
  !*** ./src/server/goog-device/adb/command/host-transport/sync.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SyncCommand = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var protocol_1 = tslib_1.__importDefault(__webpack_require__(/*! @dead50f7/adbkit/lib/adb/protocol */ "@dead50f7/adbkit/lib/adb/protocol"));
var command_1 = tslib_1.__importDefault(__webpack_require__(/*! @dead50f7/adbkit/lib/adb/command */ "@dead50f7/adbkit/lib/adb/command"));
var ExtendedSync_1 = __webpack_require__(/*! ../../ExtendedSync */ "./src/server/goog-device/adb/ExtendedSync.ts");
var SyncCommand = (function (_super) {
    tslib_1.__extends(SyncCommand, _super);
    function SyncCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SyncCommand.prototype.execute = function () {
        var _this = this;
        this._send('sync:');
        return this.parser.readAscii(4).then(function (reply) {
            switch (reply) {
                case protocol_1.default.OKAY:
                    return new ExtendedSync_1.ExtendedSync(_this.connection);
                case protocol_1.default.FAIL:
                    return _this.parser.readError();
                default:
                    return _this.parser.unexpected(reply, 'OKAY or FAIL');
            }
        });
    };
    return SyncCommand;
}(command_1.default));
exports.SyncCommand = SyncCommand;


/***/ }),

/***/ "./src/server/goog-device/adb/index.ts":
/*!*********************************************!*\
  !*** ./src/server/goog-device/adb/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdbExtended = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var adb_1 = tslib_1.__importDefault(__webpack_require__(/*! @dead50f7/adbkit/lib/adb */ "@dead50f7/adbkit/lib/adb"));
var ExtendedClient_1 = __webpack_require__(/*! ./ExtendedClient */ "./src/server/goog-device/adb/ExtendedClient.ts");
var AdbExtended = (function (_super) {
    tslib_1.__extends(AdbExtended, _super);
    function AdbExtended() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdbExtended.createClient = function (options) {
        if (options === void 0) { options = {}; }
        var opts = {
            bin: options.bin,
            host: options.host || process.env.ADB_HOST || '127.0.0.1',
            port: options.port || 0,
        };
        if (!opts.port) {
            var port = parseInt(process.env.ADB_PORT || '', 10);
            if (!isNaN(port)) {
                opts.port = port;
            }
            else {
                opts.port = 5037;
            }
        }
        return new ExtendedClient_1.ExtendedClient(opts);
    };
    return AdbExtended;
}(adb_1.default));
exports.AdbExtended = AdbExtended;


/***/ }),

/***/ "./src/server/goog-device/mw/DeviceTracker.ts":
/*!****************************************************!*\
  !*** ./src/server/goog-device/mw/DeviceTracker.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceTracker = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var Mw_1 = __webpack_require__(/*! ../../mw/Mw */ "./src/server/mw/Mw.ts");
var ControlCenterCommand_1 = __webpack_require__(/*! ../../../common/ControlCenterCommand */ "./src/common/ControlCenterCommand.ts");
var ControlCenter_1 = __webpack_require__(/*! ../services/ControlCenter */ "./src/server/goog-device/services/ControlCenter.ts");
var Action_1 = __webpack_require__(/*! ../../../common/Action */ "./src/common/Action.ts");
var ChannelCode_1 = __webpack_require__(/*! ../../../common/ChannelCode */ "./src/common/ChannelCode.ts");
var DeviceTracker = (function (_super) {
    tslib_1.__extends(DeviceTracker, _super);
    function DeviceTracker(ws) {
        var _this = _super.call(this, ws) || this;
        _this.adt = ControlCenter_1.ControlCenter.getInstance();
        _this.sendDeviceMessage = function (device) {
            var data = {
                device: device,
                id: _this.id,
                name: _this.adt.getName(),
            };
            _this.sendMessage({
                id: -1,
                type: 'device',
                data: data,
            });
        };
        _this.buildAndSendMessage = function (list) {
            var data = {
                list: list,
                id: _this.id,
                name: _this.adt.getName(),
            };
            _this.sendMessage({
                id: -1,
                type: 'devicelist',
                data: data,
            });
        };
        _this.id = _this.adt.getId();
        _this.adt
            .init()
            .then(function () {
            _this.adt.on('device', _this.sendDeviceMessage);
            _this.buildAndSendMessage(_this.adt.getDevices());
        })
            .catch(function (error) {
            console.error("[".concat(DeviceTracker.TAG, "] Error: ").concat(error.message));
        });
        return _this;
    }
    DeviceTracker.processChannel = function (ws, code) {
        if (code !== ChannelCode_1.ChannelCode.GTRC) {
            return;
        }
        return new DeviceTracker(ws);
    };
    DeviceTracker.processRequest = function (ws, params) {
        if (params.action !== Action_1.ACTION.GOOG_DEVICE_LIST) {
            return;
        }
        return new DeviceTracker(ws);
    };
    DeviceTracker.prototype.onSocketMessage = function (event) {
        var command;
        try {
            command = ControlCenterCommand_1.ControlCenterCommand.fromJSON(event.data.toString());
        }
        catch (error) {
            console.error("[".concat(DeviceTracker.TAG, "], Received message: ").concat(event.data, ". Error: ").concat(error === null || error === void 0 ? void 0 : error.message));
            return;
        }
        this.adt.runCommand(command).catch(function (e) {
            console.error("[".concat(DeviceTracker.TAG, "], Received message: ").concat(event.data, ". Error: ").concat(e.message));
        });
    };
    DeviceTracker.prototype.release = function () {
        _super.prototype.release.call(this);
        this.adt.off('device', this.sendDeviceMessage);
    };
    DeviceTracker.TAG = 'DeviceTracker';
    DeviceTracker.type = 'android';
    return DeviceTracker;
}(Mw_1.Mw));
exports.DeviceTracker = DeviceTracker;


/***/ }),

/***/ "./src/server/goog-device/mw/WebsocketProxyOverAdb.ts":
/*!************************************************************!*\
  !*** ./src/server/goog-device/mw/WebsocketProxyOverAdb.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketProxyOverAdb = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var WebsocketProxy_1 = __webpack_require__(/*! ../../mw/WebsocketProxy */ "./src/server/mw/WebsocketProxy.ts");
var AdbUtils_1 = __webpack_require__(/*! ../AdbUtils */ "./src/server/goog-device/AdbUtils.ts");
var Action_1 = __webpack_require__(/*! ../../../common/Action */ "./src/common/Action.ts");
var WebsocketProxyOverAdb = (function (_super) {
    tslib_1.__extends(WebsocketProxyOverAdb, _super);
    function WebsocketProxyOverAdb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebsocketProxyOverAdb.processRequest = function (ws, params) {
        var action = params.action, url = params.url;
        var udid = '';
        var remote = '';
        var path = '';
        var isSuitable = false;
        if (action === Action_1.ACTION.PROXY_ADB) {
            isSuitable = true;
            remote = url.searchParams.get('remote');
            udid = url.searchParams.get('udid');
            path = url.searchParams.get('path');
        }
        if (url && url.pathname) {
            var temp = url.pathname.split('/');
            if (temp.length >= 4 && temp[0] === '' && temp[1] === Action_1.ACTION.PROXY_ADB) {
                isSuitable = true;
                temp.splice(0, 2);
                udid = decodeURIComponent(temp.shift() || '');
                remote = decodeURIComponent(temp.shift() || '');
                path = temp.join('/') || '/';
            }
        }
        if (!isSuitable) {
            return;
        }
        if (typeof remote !== 'string' || !remote) {
            ws.close(4003, "[".concat(this.TAG, "] Invalid value \"").concat(remote, "\" for \"remote\" parameter"));
            return;
        }
        if (typeof udid !== 'string' || !udid) {
            ws.close(4003, "[".concat(this.TAG, "] Invalid value \"").concat(udid, "\" for \"udid\" parameter"));
            return;
        }
        if (path && typeof path !== 'string') {
            ws.close(4003, "[".concat(this.TAG, "] Invalid value \"").concat(path, "\" for \"path\" parameter"));
            return;
        }
        return this.createProxyOverAdb(ws, udid, remote, path);
    };
    WebsocketProxyOverAdb.createProxyOverAdb = function (ws, udid, remote, path) {
        var _this = this;
        var service = new WebsocketProxy_1.WebsocketProxy(ws);
        AdbUtils_1.AdbUtils.forward(udid, remote)
            .then(function (port) {
            return service.init("ws://127.0.0.1:".concat(port).concat(path ? path : ''));
        })
            .catch(function (e) {
            var msg = "[".concat(_this.TAG, "] Failed to start service: ").concat(e.message);
            console.error(msg);
            ws.close(4005, msg);
        });
        return service;
    };
    return WebsocketProxyOverAdb;
}(WebsocketProxy_1.WebsocketProxy));
exports.WebsocketProxyOverAdb = WebsocketProxyOverAdb;


/***/ }),

/***/ "./src/server/goog-device/services/ControlCenter.ts":
/*!**********************************************************!*\
  !*** ./src/server/goog-device/services/ControlCenter.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControlCenter = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var Device_1 = __webpack_require__(/*! ../Device */ "./src/server/goog-device/Device.ts");
var adb_1 = __webpack_require__(/*! ../adb */ "./src/server/goog-device/adb/index.ts");
var BaseControlCenter_1 = __webpack_require__(/*! ../../services/BaseControlCenter */ "./src/server/services/BaseControlCenter.ts");
var ControlCenterCommand_1 = __webpack_require__(/*! ../../../common/ControlCenterCommand */ "./src/common/ControlCenterCommand.ts");
var os = tslib_1.__importStar(__webpack_require__(/*! os */ "os"));
var crypto = tslib_1.__importStar(__webpack_require__(/*! crypto */ "crypto"));
var DeviceState_1 = __webpack_require__(/*! ../../../common/DeviceState */ "./src/common/DeviceState.ts");
var ControlCenter = (function (_super) {
    tslib_1.__extends(ControlCenter, _super);
    function ControlCenter() {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.client = adb_1.AdbExtended.createClient();
        _this.waitAfterError = 1000;
        _this.deviceMap = new Map();
        _this.descriptors = new Map();
        _this.restartTracker = function () {
            if (_this.restartTimeoutId) {
                return;
            }
            console.log("Device tracker is down. Will try to restart in ".concat(_this.waitAfterError, "ms"));
            _this.restartTimeoutId = setTimeout(function () {
                _this.stopTracker();
                _this.waitAfterError *= 1.2;
                _this.init();
            }, _this.waitAfterError);
        };
        _this.onChangeSet = function (changes) {
            var e_1, _a, e_2, _b, e_3, _c;
            _this.waitAfterError = ControlCenter.defaultWaitAfterError;
            if (changes.added.length) {
                try {
                    for (var _d = tslib_1.__values(changes.added), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var item = _e.value;
                        var id = item.id, type = item.type;
                        _this.handleConnected(id, type);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (changes.removed.length) {
                try {
                    for (var _f = tslib_1.__values(changes.removed), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var item = _g.value;
                        var id = item.id;
                        _this.handleConnected(id, DeviceState_1.DeviceState.DISCONNECTED);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (changes.changed.length) {
                try {
                    for (var _h = tslib_1.__values(changes.changed), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var item = _j.value;
                        var id = item.id, type = item.type;
                        _this.handleConnected(id, type);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        };
        _this.onDeviceUpdate = function (device) {
            var udid = device.udid, descriptor = device.descriptor;
            _this.descriptors.set(udid, descriptor);
            _this.emit('device', descriptor);
        };
        var idString = "goog|".concat(os.hostname(), "|").concat(os.uptime());
        _this.id = crypto.createHash('md5').update(idString).digest('hex');
        return _this;
    }
    ControlCenter.getInstance = function () {
        if (!this.instance) {
            this.instance = new ControlCenter();
        }
        return this.instance;
    };
    ControlCenter.hasInstance = function () {
        return !!ControlCenter.instance;
    };
    ControlCenter.prototype.handleConnected = function (udid, state) {
        var device = this.deviceMap.get(udid);
        if (device) {
            device.setState(state);
        }
        else {
            device = new Device_1.Device(udid, state);
            device.on('update', this.onDeviceUpdate);
            this.deviceMap.set(udid, device);
        }
    };
    ControlCenter.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, list;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.initialized) {
                            return [2];
                        }
                        _a = this;
                        return [4, this.startTracker()];
                    case 1:
                        _a.tracker = _b.sent();
                        return [4, this.client.listDevices()];
                    case 2:
                        list = _b.sent();
                        list.forEach(function (device) {
                            var id = device.id, type = device.type;
                            _this.handleConnected(id, type);
                        });
                        this.initialized = true;
                        return [2];
                }
            });
        });
    };
    ControlCenter.prototype.startTracker = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tracker;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tracker) {
                            return [2, this.tracker];
                        }
                        return [4, this.client.trackDevices()];
                    case 1:
                        tracker = _a.sent();
                        tracker.on('changeSet', this.onChangeSet);
                        tracker.on('end', this.restartTracker);
                        tracker.on('error', this.restartTracker);
                        return [2, tracker];
                }
            });
        });
    };
    ControlCenter.prototype.stopTracker = function () {
        if (this.tracker) {
            this.tracker.off('changeSet', this.onChangeSet);
            this.tracker.off('end', this.restartTracker);
            this.tracker.off('error', this.restartTracker);
            this.tracker.end();
            this.tracker = undefined;
        }
        this.tracker = undefined;
        this.initialized = false;
    };
    ControlCenter.prototype.getDevices = function () {
        return Array.from(this.descriptors.values());
    };
    ControlCenter.prototype.getDevice = function (udid) {
        return this.deviceMap.get(udid);
    };
    ControlCenter.prototype.getId = function () {
        return this.id;
    };
    ControlCenter.prototype.getName = function () {
        return "aDevice Tracker [".concat(os.hostname(), "]");
    };
    ControlCenter.prototype.start = function () {
        var _this = this;
        return this.init().catch(function (e) {
            console.error("Error: Failed to init \"".concat(_this.getName(), "\". ").concat(e.message));
        });
    };
    ControlCenter.prototype.release = function () {
        this.stopTracker();
    };
    ControlCenter.prototype.runCommand = function (command) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var udid, device, type, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        udid = command.getUdid();
                        device = this.getDevice(udid);
                        if (!device) {
                            console.error("Device with udid:\"".concat(udid, "\" not found"));
                            return [2];
                        }
                        type = command.getType();
                        _a = type;
                        switch (_a) {
                            case ControlCenterCommand_1.ControlCenterCommand.KILL_SERVER: return [3, 1];
                            case ControlCenterCommand_1.ControlCenterCommand.START_SERVER: return [3, 3];
                            case ControlCenterCommand_1.ControlCenterCommand.UPDATE_INTERFACES: return [3, 5];
                        }
                        return [3, 7];
                    case 1: return [4, device.killServer(command.getPid())];
                    case 2:
                        _b.sent();
                        return [2];
                    case 3: return [4, device.startServer()];
                    case 4:
                        _b.sent();
                        return [2];
                    case 5: return [4, device.updateInterfaces()];
                    case 6:
                        _b.sent();
                        return [2];
                    case 7: throw new Error("Unsupported command: \"".concat(type, "\""));
                }
            });
        });
    };
    ControlCenter.defaultWaitAfterError = 1000;
    return ControlCenter;
}(BaseControlCenter_1.BaseControlCenter));
exports.ControlCenter = ControlCenter;


/***/ }),

/***/ "./src/server/mw/HostTracker.ts":
/*!**************************************!*\
  !*** ./src/server/mw/HostTracker.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HostTracker = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var Mw_1 = __webpack_require__(/*! ./Mw */ "./src/server/mw/Mw.ts");
var Config_1 = __webpack_require__(/*! ../Config */ "./src/server/Config.ts");
var HostTrackerMessage_1 = __webpack_require__(/*! ../../common/HostTrackerMessage */ "./src/common/HostTrackerMessage.ts");
var ChannelCode_1 = __webpack_require__(/*! ../../common/ChannelCode */ "./src/common/ChannelCode.ts");
var HostTracker = (function (_super) {
    tslib_1.__extends(HostTracker, _super);
    function HostTracker(ws) {
        var _this = _super.call(this, ws) || this;
        var local = Array.from(HostTracker.localTrackers.keys()).map(function (tracker) {
            return { type: tracker.type };
        });
        if (!HostTracker.remoteHostItems) {
            var config = Config_1.Config.getInstance();
            HostTracker.remoteHostItems = Array.from(config.getHostList());
        }
        var message = {
            id: -1,
            type: HostTrackerMessage_1.MessageType.HOSTS,
            data: {
                local: local,
                remote: HostTracker.remoteHostItems,
            },
        };
        _this.sendMessage(message);
        return _this;
    }
    HostTracker.processChannel = function (ws, code) {
        if (code !== ChannelCode_1.ChannelCode.HSTS) {
            return;
        }
        return new HostTracker(ws);
    };
    HostTracker.registerLocalTracker = function (tracker) {
        this.localTrackers.add(tracker);
    };
    HostTracker.prototype.onSocketMessage = function (event) {
        var message = {
            id: -1,
            type: HostTrackerMessage_1.MessageType.ERROR,
            data: "Unsupported message: \"".concat(event.data.toString(), "\""),
        };
        this.sendMessage(message);
    };
    HostTracker.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    HostTracker.TAG = 'HostTracker';
    HostTracker.localTrackers = new Set();
    return HostTracker;
}(Mw_1.Mw));
exports.HostTracker = HostTracker;


/***/ }),

/***/ "./src/server/mw/Mw.ts":
/*!*****************************!*\
  !*** ./src/server/mw/Mw.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mw = void 0;
var Mw = (function () {
    function Mw(ws) {
        var _this = this;
        this.ws = ws;
        this.name = 'Mw';
        this.sendMessage = function (data) {
            if (_this.ws.readyState !== _this.ws.OPEN) {
                return;
            }
            _this.ws.send(JSON.stringify(data));
        };
        this.ws.addEventListener('message', this.onSocketMessage.bind(this));
        this.ws.addEventListener('close', this.onSocketClose.bind(this));
    }
    Mw.processChannel = function (_ws, _code, _data) {
        return;
    };
    Mw.processRequest = function (_ws, _params) {
        return;
    };
    Mw.prototype.onSocketClose = function () {
        this.release();
    };
    Mw.prototype.release = function () {
        var _a = this.ws, readyState = _a.readyState, CLOSED = _a.CLOSED, CLOSING = _a.CLOSING;
        if (readyState !== CLOSED && readyState !== CLOSING) {
            this.ws.close();
        }
    };
    return Mw;
}());
exports.Mw = Mw;


/***/ }),

/***/ "./src/server/mw/WebsocketMultiplexer.ts":
/*!***********************************************!*\
  !*** ./src/server/mw/WebsocketMultiplexer.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketMultiplexer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var Mw_1 = __webpack_require__(/*! ./Mw */ "./src/server/mw/Mw.ts");
var Action_1 = __webpack_require__(/*! ../../common/Action */ "./src/common/Action.ts");
var Multiplexer_1 = __webpack_require__(/*! ../../packages/multiplexer/Multiplexer */ "./src/packages/multiplexer/Multiplexer.ts");
var Util_1 = tslib_1.__importDefault(__webpack_require__(/*! ../../app/Util */ "./src/app/Util.ts"));
var WebsocketMultiplexer = (function (_super) {
    tslib_1.__extends(WebsocketMultiplexer, _super);
    function WebsocketMultiplexer(ws) {
        var _this = _super.call(this, ws) || this;
        _this.multiplexer = Multiplexer_1.Multiplexer.wrap(ws);
        return _this;
    }
    WebsocketMultiplexer.processRequest = function (ws, params) {
        var action = params.action;
        if (action !== Action_1.ACTION.MULTIPLEX) {
            return;
        }
        return this.createMultiplexer(ws);
    };
    WebsocketMultiplexer.createMultiplexer = function (ws) {
        var _this = this;
        var service = new WebsocketMultiplexer(ws);
        service.init().catch(function (e) {
            var msg = "[".concat(_this.TAG, "] Failed to start service: ").concat(e.message);
            console.error(msg);
            ws.close(4005, msg);
        });
        return service;
    };
    WebsocketMultiplexer.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.multiplexer.addEventListener('channel', this.onChannel);
                return [2];
            });
        });
    };
    WebsocketMultiplexer.registerMw = function (mwFactory) {
        this.mwFactories.add(mwFactory);
    };
    WebsocketMultiplexer.prototype.onSocketMessage = function (_event) {
    };
    WebsocketMultiplexer.prototype.onChannel = function (_a) {
        var e_1, _b;
        var channel = _a.channel, data = _a.data;
        var processed = false;
        try {
            for (var _c = tslib_1.__values(WebsocketMultiplexer.mwFactories.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var mwFactory = _d.value;
                try {
                    var code = Util_1.default.utf8ByteArrayToString(Buffer.from(data).slice(0, 4));
                    var buffer = data.byteLength > 4 ? data.slice(4) : undefined;
                    var mw = mwFactory.processChannel(channel, code, buffer);
                    if (mw) {
                        processed = true;
                    }
                }
                finally {
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!processed) {
            channel.close(4002, "[".concat(WebsocketMultiplexer.TAG, "] Unsupported request"));
        }
    };
    WebsocketMultiplexer.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    WebsocketMultiplexer.TAG = 'WebsocketMultiplexer';
    WebsocketMultiplexer.mwFactories = new Set();
    return WebsocketMultiplexer;
}(Mw_1.Mw));
exports.WebsocketMultiplexer = WebsocketMultiplexer;


/***/ }),

/***/ "./src/server/mw/WebsocketProxy.ts":
/*!*****************************************!*\
  !*** ./src/server/mw/WebsocketProxy.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketProxy = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var Mw_1 = __webpack_require__(/*! ./Mw */ "./src/server/mw/Mw.ts");
var ws_1 = tslib_1.__importDefault(__webpack_require__(/*! ws */ "ws"));
var Action_1 = __webpack_require__(/*! ../../common/Action */ "./src/common/Action.ts");
var WebsocketProxy = (function (_super) {
    tslib_1.__extends(WebsocketProxy, _super);
    function WebsocketProxy(ws) {
        var _this = _super.call(this, ws) || this;
        _this.released = false;
        _this.storage = [];
        return _this;
    }
    WebsocketProxy.processRequest = function (ws, params) {
        var action = params.action, url = params.url;
        if (action !== Action_1.ACTION.PROXY_WS) {
            return;
        }
        var wsString = url.searchParams.get('ws');
        if (!wsString) {
            ws.close(4003, "[".concat(this.TAG, "] Invalid value \"").concat(ws, "\" for \"ws\" parameter"));
            return;
        }
        return this.createProxy(ws, wsString);
    };
    WebsocketProxy.createProxy = function (ws, remoteUrl) {
        var _this = this;
        var service = new WebsocketProxy(ws);
        service.init(remoteUrl).catch(function (e) {
            var msg = "[".concat(_this.TAG, "] Failed to start service: ").concat(e.message);
            console.error(msg);
            ws.close(4005, msg);
        });
        return service;
    };
    WebsocketProxy.prototype.init = function (remoteUrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var remoteSocket;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.name = "[".concat(WebsocketProxy.TAG, "{$").concat(remoteUrl, "}]");
                remoteSocket = new ws_1.default(remoteUrl);
                remoteSocket.onopen = function () {
                    _this.remoteSocket = remoteSocket;
                    _this.flush();
                };
                remoteSocket.onmessage = function (event) {
                    if (_this.ws && _this.ws.readyState === _this.ws.OPEN) {
                        if (Array.isArray(event.data)) {
                            event.data.forEach(function (data) { return _this.ws.send(data); });
                        }
                        else {
                            _this.ws.send(event.data);
                        }
                    }
                };
                remoteSocket.onclose = function (e) {
                    if (_this.ws.readyState === _this.ws.OPEN) {
                        _this.ws.close(e.wasClean ? 1000 : 4010);
                    }
                };
                remoteSocket.onerror = function (e) {
                    if (_this.ws.readyState === _this.ws.OPEN) {
                        _this.ws.close(4011, e.message);
                    }
                };
                return [2];
            });
        });
    };
    WebsocketProxy.prototype.flush = function () {
        if (this.remoteSocket) {
            while (this.storage.length) {
                var event_1 = this.storage.shift();
                if (event_1 && event_1.data) {
                    this.remoteSocket.send(event_1.data);
                }
            }
            if (this.released) {
                this.remoteSocket.close();
            }
        }
        this.storage.length = 0;
    };
    WebsocketProxy.prototype.onSocketMessage = function (event) {
        if (this.remoteSocket) {
            this.remoteSocket.send(event.data);
        }
        else {
            this.storage.push(event);
        }
    };
    WebsocketProxy.prototype.release = function () {
        if (this.released) {
            return;
        }
        _super.prototype.release.call(this);
        this.released = true;
        this.flush();
    };
    WebsocketProxy.TAG = 'WebsocketProxy';
    return WebsocketProxy;
}(Mw_1.Mw));
exports.WebsocketProxy = WebsocketProxy;


/***/ }),

/***/ "./src/server/services/BaseControlCenter.ts":
/*!**************************************************!*\
  !*** ./src/server/services/BaseControlCenter.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseControlCenter = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var TypedEmitter_1 = __webpack_require__(/*! ../../common/TypedEmitter */ "./src/common/TypedEmitter.ts");
var BaseControlCenter = (function (_super) {
    tslib_1.__extends(BaseControlCenter, _super);
    function BaseControlCenter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseControlCenter;
}(TypedEmitter_1.TypedEmitter));
exports.BaseControlCenter = BaseControlCenter;


/***/ }),

/***/ "./src/server/services/HttpServer.ts":
/*!*******************************************!*\
  !*** ./src/server/services/HttpServer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpServer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var http = tslib_1.__importStar(__webpack_require__(/*! http */ "http"));
var https = tslib_1.__importStar(__webpack_require__(/*! https */ "https"));
var path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ "path"));
var Utils_1 = __webpack_require__(/*! ../Utils */ "./src/server/Utils.ts");
var express_1 = tslib_1.__importDefault(__webpack_require__(/*! express */ "express"));
var Config_1 = __webpack_require__(/*! ../Config */ "./src/server/Config.ts");
var TypedEmitter_1 = __webpack_require__(/*! ../../common/TypedEmitter */ "./src/common/TypedEmitter.ts");
var process = tslib_1.__importStar(__webpack_require__(/*! process */ "process"));
var EnvName_1 = __webpack_require__(/*! ../EnvName */ "./src/server/EnvName.ts");
var DEFAULT_STATIC_DIR = path_1.default.join(__dirname, './public');
var PATHNAME = process.env[EnvName_1.EnvName.WS_SCRCPY_PATHNAME] || "/";
var HttpServer = (function (_super) {
    tslib_1.__extends(HttpServer, _super);
    function HttpServer() {
        var _this = _super.call(this) || this;
        _this.servers = [];
        _this.started = false;
        return _this;
    }
    HttpServer.getInstance = function () {
        if (!this.instance) {
            this.instance = new HttpServer();
        }
        return this.instance;
    };
    HttpServer.hasInstance = function () {
        return !!this.instance;
    };
    HttpServer.setPublicDir = function (dir) {
        if (HttpServer.instance) {
            throw Error('Unable to change value after instantiation');
        }
        HttpServer.PUBLIC_DIR = dir;
    };
    HttpServer.setServeStatic = function (enabled) {
        if (HttpServer.instance) {
            throw Error('Unable to change value after instantiation');
        }
        HttpServer.SERVE_STATIC = enabled;
    };
    HttpServer.prototype.getServers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (this.started) {
                    return [2, tslib_1.__spreadArray([], tslib_1.__read(this.servers), false)];
                }
                return [2, new Promise(function (resolve) {
                        _this.once('started', function () {
                            resolve(tslib_1.__spreadArray([], tslib_1.__read(_this.servers), false));
                        });
                    })];
            });
        });
    };
    HttpServer.prototype.getName = function () {
        return "HTTP(s) Server Service";
    };
    HttpServer.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var config;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.mainApp = (0, express_1.default)();
                if (HttpServer.SERVE_STATIC && HttpServer.PUBLIC_DIR) {
                    this.mainApp.use(PATHNAME, express_1.default.static(HttpServer.PUBLIC_DIR));
                }
                config = Config_1.Config.getInstance();
                config.servers.forEach(function (serverItem) {
                    var secure = serverItem.secure, port = serverItem.port, redirectToSecure = serverItem.redirectToSecure;
                    var proto;
                    var server;
                    if (secure) {
                        if (!serverItem.options) {
                            throw Error('Must provide option for secure server configuration');
                        }
                        server = https.createServer(serverItem.options, _this.mainApp);
                        proto = 'https';
                    }
                    else {
                        var options = serverItem.options ? tslib_1.__assign({}, serverItem.options) : {};
                        proto = 'http';
                        var currentApp = _this.mainApp;
                        var host_1 = '';
                        var port_1 = 443;
                        var doRedirect = false;
                        if (redirectToSecure === true) {
                            doRedirect = true;
                        }
                        else if (typeof redirectToSecure === 'object') {
                            doRedirect = true;
                            if (typeof redirectToSecure.port === 'number') {
                                port_1 = redirectToSecure.port;
                            }
                            if (typeof redirectToSecure.host === 'string') {
                                host_1 = redirectToSecure.host;
                            }
                        }
                        if (doRedirect) {
                            currentApp = (0, express_1.default)();
                            currentApp.use(function (req, res) {
                                var url = new URL("https://".concat(host_1 ? host_1 : req.headers.host).concat(req.url));
                                if (port_1 && port_1 !== 443) {
                                    url.port = port_1.toString();
                                }
                                return res.redirect(301, url.toString());
                            });
                        }
                        server = http.createServer(options, currentApp);
                    }
                    _this.servers.push({ server: server, port: port });
                    server.listen(port, function () {
                        Utils_1.Utils.printListeningMsg(proto, port, PATHNAME);
                    });
                });
                this.started = true;
                this.emit('started', true);
                return [2];
            });
        });
    };
    HttpServer.prototype.release = function () {
        this.servers.forEach(function (item) {
            item.server.close();
        });
    };
    HttpServer.PUBLIC_DIR = DEFAULT_STATIC_DIR;
    HttpServer.SERVE_STATIC = true;
    return HttpServer;
}(TypedEmitter_1.TypedEmitter));
exports.HttpServer = HttpServer;


/***/ }),

/***/ "./src/server/services/WebSocketServer.ts":
/*!************************************************!*\
  !*** ./src/server/services/WebSocketServer.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebSocketServer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var ws_1 = __webpack_require__(/*! ws */ "ws");
var HttpServer_1 = __webpack_require__(/*! ./HttpServer */ "./src/server/services/HttpServer.ts");
var WebSocketServer = (function () {
    function WebSocketServer() {
        this.servers = [];
        this.mwFactories = new Set();
    }
    WebSocketServer.getInstance = function () {
        if (!this.instance) {
            this.instance = new WebSocketServer();
        }
        return this.instance;
    };
    WebSocketServer.hasInstance = function () {
        return !!this.instance;
    };
    WebSocketServer.prototype.registerMw = function (mwFactory) {
        this.mwFactories.add(mwFactory);
    };
    WebSocketServer.prototype.attachToServer = function (item) {
        var _this = this;
        var server = item.server, port = item.port;
        var TAG = "WebSocket Server {tcp:".concat(port, "}");
        var wss = new ws_1.Server({ server: server });
        wss.on('connection', function (ws, request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var url, action, processed, _a, _b, mwFactory, service;
            var e_1, _c;
            return tslib_1.__generator(this, function (_d) {
                if (!request.url) {
                    ws.close(4001, "[".concat(TAG, "] Invalid url"));
                    return [2];
                }
                url = new URL(request.url, 'https://example.org/');
                action = url.searchParams.get('action') || '';
                processed = false;
                try {
                    for (_a = tslib_1.__values(this.mwFactories.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        mwFactory = _b.value;
                        service = mwFactory.processRequest(ws, { action: action, request: request, url: url });
                        if (service) {
                            processed = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (!processed) {
                    ws.close(4002, "[".concat(TAG, "] Unsupported request"));
                }
                return [2];
            });
        }); });
        wss.on('close', function () {
            console.log("".concat(TAG, " stopped"));
        });
        this.servers.push(wss);
        return wss;
    };
    WebSocketServer.prototype.getServers = function () {
        return this.servers;
    };
    WebSocketServer.prototype.getName = function () {
        return "WebSocket Server Service";
    };
    WebSocketServer.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var service, servers;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = HttpServer_1.HttpServer.getInstance();
                        return [4, service.getServers()];
                    case 1:
                        servers = _a.sent();
                        servers.forEach(function (item) {
                            _this.attachToServer(item);
                        });
                        return [2];
                }
            });
        });
    };
    WebSocketServer.prototype.release = function () {
        this.servers.forEach(function (server) {
            server.close();
        });
    };
    return WebSocketServer;
}());
exports.WebSocketServer = WebSocketServer;


/***/ }),

/***/ "@dead50f7/adbkit/lib/adb":
/*!*******************************************!*\
  !*** external "@dead50f7/adbkit/lib/adb" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@dead50f7/adbkit/lib/adb");

/***/ }),

/***/ "@dead50f7/adbkit/lib/adb/client":
/*!**************************************************!*\
  !*** external "@dead50f7/adbkit/lib/adb/client" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("@dead50f7/adbkit/lib/adb/client");

/***/ }),

/***/ "@dead50f7/adbkit/lib/adb/command":
/*!***************************************************!*\
  !*** external "@dead50f7/adbkit/lib/adb/command" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@dead50f7/adbkit/lib/adb/command");

/***/ }),

/***/ "@dead50f7/adbkit/lib/adb/protocol":
/*!****************************************************!*\
  !*** external "@dead50f7/adbkit/lib/adb/protocol" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("@dead50f7/adbkit/lib/adb/protocol");

/***/ }),

/***/ "@dead50f7/adbkit/lib/adb/sync/entry":
/*!******************************************************!*\
  !*** external "@dead50f7/adbkit/lib/adb/sync/entry" ***!
  \******************************************************/
/***/ ((module) => {

module.exports = require("@dead50f7/adbkit/lib/adb/sync/entry");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "portfinder":
/*!*****************************!*\
  !*** external "portfinder" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("portfinder");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("process");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("ws");

/***/ }),

/***/ "yaml":
/*!***********************!*\
  !*** external "yaml" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("yaml");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("readline");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var readline = tslib_1.__importStar(__webpack_require__(/*! readline */ "readline"));
var Config_1 = __webpack_require__(/*! ./Config */ "./src/server/Config.ts");
var HttpServer_1 = __webpack_require__(/*! ./services/HttpServer */ "./src/server/services/HttpServer.ts");
var WebSocketServer_1 = __webpack_require__(/*! ./services/WebSocketServer */ "./src/server/services/WebSocketServer.ts");
var WebsocketProxy_1 = __webpack_require__(/*! ./mw/WebsocketProxy */ "./src/server/mw/WebsocketProxy.ts");
var HostTracker_1 = __webpack_require__(/*! ./mw/HostTracker */ "./src/server/mw/HostTracker.ts");
var WebsocketMultiplexer_1 = __webpack_require__(/*! ./mw/WebsocketMultiplexer */ "./src/server/mw/WebsocketMultiplexer.ts");
var servicesToStart = [HttpServer_1.HttpServer, WebSocketServer_1.WebSocketServer];
var mwList = [WebsocketProxy_1.WebsocketProxy, WebsocketMultiplexer_1.WebsocketMultiplexer];
var mw2List = [HostTracker_1.HostTracker];
var runningServices = [];
var loadPlatformModulesPromises = [];
var config = Config_1.Config.getInstance();
function loadGoogModules() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ControlCenter, DeviceTracker, WebsocketProxyOverAdb;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Promise.resolve().then(function () { return tslib_1.__importStar(__webpack_require__(/*! ./goog-device/services/ControlCenter */ "./src/server/goog-device/services/ControlCenter.ts")); })];
                case 1:
                    ControlCenter = (_a.sent()).ControlCenter;
                    return [4, Promise.resolve().then(function () { return tslib_1.__importStar(__webpack_require__(/*! ./goog-device/mw/DeviceTracker */ "./src/server/goog-device/mw/DeviceTracker.ts")); })];
                case 2:
                    DeviceTracker = (_a.sent()).DeviceTracker;
                    return [4, Promise.resolve().then(function () { return tslib_1.__importStar(__webpack_require__(/*! ./goog-device/mw/WebsocketProxyOverAdb */ "./src/server/goog-device/mw/WebsocketProxyOverAdb.ts")); })];
                case 3:
                    WebsocketProxyOverAdb = (_a.sent()).WebsocketProxyOverAdb;
                    if (config.runLocalGoogTracker) {
                        mw2List.push(DeviceTracker);
                    }
                    if (config.announceLocalGoogTracker) {
                        HostTracker_1.HostTracker.registerLocalTracker(DeviceTracker);
                    }
                    servicesToStart.push(ControlCenter);
                    mwList.push(WebsocketProxyOverAdb);
                    return [2];
            }
        });
    });
}
loadPlatformModulesPromises.push(loadGoogModules());
Promise.all(loadPlatformModulesPromises)
    .then(function () {
    return servicesToStart.map(function (serviceClass) {
        var service = serviceClass.getInstance();
        runningServices.push(service);
        return service.start();
    });
})
    .then(function () {
    var wsService = WebSocketServer_1.WebSocketServer.getInstance();
    mwList.forEach(function (mwFactory) {
        wsService.registerMw(mwFactory);
    });
    mw2List.forEach(function (mwFactory) {
        WebsocketMultiplexer_1.WebsocketMultiplexer.registerMw(mwFactory);
    });
    if (process.platform === 'win32') {
        readline
            .createInterface({
            input: process.stdin,
            output: process.stdout,
        })
            .on('SIGINT', exit);
    }
    process.on('SIGINT', exit);
    process.on('SIGTERM', exit);
})
    .catch(function (error) {
    console.error(error.message);
    exit('1');
});
var interrupted = false;
function exit(signal) {
    console.log("\nReceived signal ".concat(signal));
    if (interrupted) {
        console.log('Force exit');
        process.exit(0);
        return;
    }
    interrupted = true;
    runningServices.forEach(function (service) {
        var serviceName = service.getName();
        console.log("Stopping ".concat(serviceName, " ..."));
        service.release();
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dmVuZG9yL0dlbnltb2JpbGUvc2NyY3B5L3NjcmNweS1zZXJ2ZXIuamFyIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi92ZW5kb3IvR2VueW1vYmlsZS9zY3JjcHkvTElDRU5TRSIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL2FwcC9VdGlsLnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvY29tbW9uL0FjdGlvbi50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL2NvbW1vbi9DaGFubmVsQ29kZS50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL2NvbW1vbi9Db25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS8uL3NyYy9jb21tb24vQ29udHJvbENlbnRlckNvbW1hbmQudHMiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS8uL3NyYy9jb21tb24vRGV2aWNlU3RhdGUudHMiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS8uL3NyYy9jb21tb24vSG9zdFRyYWNrZXJNZXNzYWdlLnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvY29tbW9uL1R5cGVkRW1pdHRlci50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3BhY2thZ2VzL211bHRpcGxleGVyL0Nsb3NlRXZlbnRDbGFzcy50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3BhY2thZ2VzL211bHRpcGxleGVyL0Vycm9yRXZlbnRDbGFzcy50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3BhY2thZ2VzL211bHRpcGxleGVyL0V2ZW50LnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvcGFja2FnZXMvbXVsdGlwbGV4ZXIvTWVzc2FnZS50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3BhY2thZ2VzL211bHRpcGxleGVyL01lc3NhZ2VFdmVudENsYXNzLnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvcGFja2FnZXMvbXVsdGlwbGV4ZXIvTWVzc2FnZVR5cGUudHMiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS8uL3NyYy9wYWNrYWdlcy9tdWx0aXBsZXhlci9NdWx0aXBsZXhlci50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3NlcnZlci9Db25maWcudHMiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS8uL3NyYy9zZXJ2ZXIvRW52TmFtZS50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3NlcnZlci9VdGlscy50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3NlcnZlci9nb29nLWRldmljZS9BZGJVdGlscy50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3NlcnZlci9nb29nLWRldmljZS9EZXZpY2UudHMiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS8uL3NyYy9zZXJ2ZXIvZ29vZy1kZXZpY2UvUHJvcGVydGllcy50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3NlcnZlci9nb29nLWRldmljZS9TY3JjcHlTZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS8uL3NyYy9zZXJ2ZXIvZ29vZy1kZXZpY2UvU2VydmVyVmVyc2lvbi50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3NlcnZlci9nb29nLWRldmljZS9hZGIvRXh0ZW5kZWRDbGllbnQudHMiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS8uL3NyYy9zZXJ2ZXIvZ29vZy1kZXZpY2UvYWRiL0V4dGVuZGVkU3luYy50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3NlcnZlci9nb29nLWRldmljZS9hZGIvY29tbWFuZC9ob3N0LXRyYW5zcG9ydC9zeW5jLnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvc2VydmVyL2dvb2ctZGV2aWNlL2FkYi9pbmRleC50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3NlcnZlci9nb29nLWRldmljZS9tdy9EZXZpY2VUcmFja2VyLnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvc2VydmVyL2dvb2ctZGV2aWNlL213L1dlYnNvY2tldFByb3h5T3ZlckFkYi50cyIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5Ly4vc3JjL3NlcnZlci9nb29nLWRldmljZS9zZXJ2aWNlcy9Db250cm9sQ2VudGVyLnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvc2VydmVyL213L0hvc3RUcmFja2VyLnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvc2VydmVyL213L013LnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvc2VydmVyL213L1dlYnNvY2tldE11bHRpcGxleGVyLnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvc2VydmVyL213L1dlYnNvY2tldFByb3h5LnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvc2VydmVyL3NlcnZpY2VzL0Jhc2VDb250cm9sQ2VudGVyLnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvc2VydmVyL3NlcnZpY2VzL0h0dHBTZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS8uL3NyYy9zZXJ2ZXIvc2VydmljZXMvV2ViU29ja2V0U2VydmVyLnRzIiwid2VicGFjazovL2F0eC1zY3JjcHkvZXh0ZXJuYWwgY29tbW9uanMgXCJAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGJcIiIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5L2V4dGVybmFsIGNvbW1vbmpzIFwiQGRlYWQ1MGY3L2FkYmtpdC9saWIvYWRiL2NsaWVudFwiIiwid2VicGFjazovL2F0eC1zY3JjcHkvZXh0ZXJuYWwgY29tbW9uanMgXCJAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGIvY29tbWFuZFwiIiwid2VicGFjazovL2F0eC1zY3JjcHkvZXh0ZXJuYWwgY29tbW9uanMgXCJAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGIvcHJvdG9jb2xcIiIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5L2V4dGVybmFsIGNvbW1vbmpzIFwiQGRlYWQ1MGY3L2FkYmtpdC9saWIvYWRiL3N5bmMvZW50cnlcIiIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5L2V4dGVybmFsIGNvbW1vbmpzIFwiZXZlbnRzXCIiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS9leHRlcm5hbCBjb21tb25qcyBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5L2V4dGVybmFsIGNvbW1vbmpzIFwicG9ydGZpbmRlclwiIiwid2VicGFjazovL2F0eC1zY3JjcHkvZXh0ZXJuYWwgY29tbW9uanMgXCJwcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS9leHRlcm5hbCBjb21tb25qcyBcInRzbGliXCIiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS9leHRlcm5hbCBjb21tb25qcyBcIndzXCIiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS9leHRlcm5hbCBjb21tb25qcyBcInlhbWxcIiIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZnNcIiIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJvc1wiIiwid2VicGFjazovL2F0eC1zY3JjcHkvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInBhdGhcIiIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJyZWFkbGluZVwiIiwid2VicGFjazovL2F0eC1zY3JjcHkvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInVybFwiIiwid2VicGFjazovL2F0eC1zY3JjcHkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXR4LXNjcmNweS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2F0eC1zY3JjcHkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hdHgtc2NyY3B5L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2F0eC1zY3JjcHkvLi9zcmMvc2VydmVyL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJ2ZW5kb3IvR2VueW1vYmlsZS9zY3JjcHkvc2NyY3B5LXNlcnZlci5qYXJcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwidmVuZG9yL0dlbnltb2JpbGUvc2NyY3B5L0xJQ0VOU0VcIjsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlsIHtcclxuICAgIHByaXZhdGUgc3RhdGljIFNVRkZJWDogUmVjb3JkPG51bWJlciwgc3RyaW5nPiA9IHtcclxuICAgICAgICAwOiAnQicsXHJcbiAgICAgICAgMTogJ0tpQicsXHJcbiAgICAgICAgMjogJ01pQicsXHJcbiAgICAgICAgMzogJ0dpQicsXHJcbiAgICAgICAgNDogJ1RpQicsXHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3VwcG9ydHNQYXNzaXZlVmFsdWU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmaWx0ZXJUcmFpbGluZ1plcm9lcyhieXRlczogVWludDhBcnJheSk6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIGxldCBiID0gMDtcclxuICAgICAgICByZXR1cm4gYnl0ZXNcclxuICAgICAgICAgICAgLnJldmVyc2UoKVxyXG4gICAgICAgICAgICAuZmlsdGVyKChpKSA9PiBiIHx8IChiID0gaSkpXHJcbiAgICAgICAgICAgIC5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwcmV0dHlCeXRlcyh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgc3VmZml4ID0gMDtcclxuICAgICAgICB3aGlsZSAodmFsdWUgPj0gNTEyKSB7XHJcbiAgICAgICAgICAgIHN1ZmZpeCsrO1xyXG4gICAgICAgICAgICB2YWx1ZSAvPSAxMDI0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7dmFsdWUudG9GaXhlZChzdWZmaXggPyAxIDogMCl9JHtVdGlsLlNVRkZJWFtzdWZmaXhdfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlc2NhcGVVZGlkKHVkaWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICd1ZGlkXycgKyB1ZGlkLnJlcGxhY2UoL1suIDpdL2csICdfJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZShwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcywgbmFtZTogc3RyaW5nLCByZXF1aXJlZD86IGJvb2xlYW4pOiBzdHJpbmcgfCBudWxsIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcmFtcy5nZXQobmFtZSk7XHJcbiAgICAgICAgaWYgKHJlcXVpcmVkICYmIHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihgTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCIke25hbWV9XCJgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2VTdHJpbmcocGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMsIG5hbWU6IHN0cmluZywgcmVxdWlyZWQ/OiBib29sZWFuKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHBhcmFtcy5nZXQobmFtZSk7XHJcbiAgICAgICAgaWYgKHJlcXVpcmVkICYmIHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihgTWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCIke25hbWV9XCJgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2VCb29sZWFuKHBhcmFtczogVVJMU2VhcmNoUGFyYW1zLCBuYW1lOiBzdHJpbmcsIHJlcXVpcmVkPzogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJzZShwYXJhbXMsIG5hbWUsIHJlcXVpcmVkKTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT09ICcxJyB8fCAoISF2YWx1ZSAmJiB2YWx1ZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyAgc3RhdGljIHBhcnNlSW50KHBhcmFtczogVVJMU2VhcmNoUGFyYW1zLCBuYW1lOiBzdHJpbmcsIHJlcXVpcmVkPzogYm9vbGVhbik6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlKHBhcmFtcywgbmFtZSwgcmVxdWlyZWQpO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaW50ID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcclxuICAgICAgICBpZiAoaXNOYU4oaW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGludDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhcnNlQm9vbGVhbkVudihpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10gfCBib29sZWFuIHwgdW5kZWZpbmVkIHwgbnVsbCk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICd1bmRlZmluZWQnIHx8IGlucHV0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0W2lucHV0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5wdXQgPT09ICcxJyB8fCBpbnB1dC50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZVN0cmluZ0VudihpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQgfCBudWxsKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAndW5kZWZpbmVkJyB8fCBpbnB1dCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dFtpbnB1dC5sZW5ndGggLSAxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZUludEVudihpbnB1dDogc3RyaW5nIHwgc3RyaW5nW10gfCBudW1iZXIgfCB1bmRlZmluZWQgfCBudWxsKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICd1bmRlZmluZWQnIHx8IGlucHV0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0W2lucHV0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpbnQgPSBwYXJzZUludChpbnB1dCwgMTApO1xyXG4gICAgICAgIGlmIChpc05hTihpbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1saWJyYXJ5L2Jsb2IvNTFlNWE1YWMzNzNhZWZhMzU0YTk5MTgxNmVjNDE4ZDczMGUyOWE3ZS9jbG9zdXJlL2dvb2cvY3J5cHQvY3J5cHQuanMjTDExN1xyXG4vKlxyXG4gICAgQ29weXJpZ2h0IDIwMDggVGhlIENsb3N1cmUgTGlicmFyeSBBdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICAgIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICAgIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG5cclxuICAgICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG4gICAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gICAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUy1JU1wiIEJBU0lTLFxyXG4gICAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAgICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAgICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIEpTIHN0cmluZyB0byBhIFVURi04IFwiYnl0ZVwiIGFycmF5LlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAxNi1iaXQgdW5pY29kZSBzdHJpbmcuXHJcbiAgICAgKiBAcmV0dXJuIHshQXJyYXk8bnVtYmVyPn0gVVRGLTggYnl0ZSBhcnJheS5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHN0cmluZ1RvVXRmOEJ5dGVBcnJheSA9IGZ1bmN0aW9uKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gVE9ETyh1c2VyKTogVXNlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbnMgaWYvd2hlbiBhdmFpbGFibGVcclxuICAgICAgICB2YXIgb3V0ID0gW10sIHAgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgIGlmIChjIDwgMTI4KSB7XHJcbiAgICAgICAgICAgICAgICBvdXRbcCsrXSA9IGM7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA8IDIwNDgpIHtcclxuICAgICAgICAgICAgICAgIG91dFtwKytdID0gKGMgPj4gNikgfCAxOTI7XHJcbiAgICAgICAgICAgICAgICBvdXRbcCsrXSA9IChjICYgNjMpIHwgMTI4O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgKChjICYgMHhGQzAwKSA9PSAweEQ4MDApICYmIChpICsgMSkgPCBzdHIubGVuZ3RoICYmXHJcbiAgICAgICAgICAgICAgICAoKHN0ci5jaGFyQ29kZUF0KGkgKyAxKSAmIDB4RkMwMCkgPT0gMHhEQzAwKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gU3Vycm9nYXRlIFBhaXJcclxuICAgICAgICAgICAgICAgIGMgPSAweDEwMDAwICsgKChjICYgMHgwM0ZGKSA8PCAxMCkgKyAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4MDNGRik7XHJcbiAgICAgICAgICAgICAgICBvdXRbcCsrXSA9IChjID4+IDE4KSB8IDI0MDtcclxuICAgICAgICAgICAgICAgIG91dFtwKytdID0gKChjID4+IDEyKSAmIDYzKSB8IDEyODtcclxuICAgICAgICAgICAgICAgIG91dFtwKytdID0gKChjID4+IDYpICYgNjMpIHwgMTI4O1xyXG4gICAgICAgICAgICAgICAgb3V0W3ArK10gPSAoYyAmIDYzKSB8IDEyODtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG91dFtwKytdID0gKGMgPj4gMTIpIHwgMjI0O1xyXG4gICAgICAgICAgICAgICAgb3V0W3ArK10gPSAoKGMgPj4gNikgJiA2MykgfCAxMjg7XHJcbiAgICAgICAgICAgICAgICBvdXRbcCsrXSA9IChjICYgNjMpIHwgMTI4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LmZyb20ob3V0KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIFVURi04IGJ5dGUgYXJyYXkgdG8gSmF2YVNjcmlwdCdzIDE2LWJpdCBVbmljb2RlLlxyXG4gICAgICogQHBhcmFtIHtVaW50OEFycmF5fEFycmF5PG51bWJlcj59IGJ5dGVzIFVURi04IGJ5dGUgYXJyYXkuXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IDE2LWJpdCBVbmljb2RlIHN0cmluZy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHV0ZjhCeXRlQXJyYXlUb1N0cmluZyhieXRlczogVWludDhBcnJheSk6IHN0cmluZyB7XHJcbiAgICAgICAgLy8gVE9ETyh1c2VyKTogVXNlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbnMgaWYvd2hlbiBhdmFpbGFibGVcclxuICAgICAgICB2YXIgb3V0ID0gW10sIHBvcyA9IDAsIGMgPSAwO1xyXG4gICAgICAgIHdoaWxlIChwb3MgPCBieXRlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmFyIGMxID0gYnl0ZXNbcG9zKytdO1xyXG4gICAgICAgICAgICBpZiAoYzEgPCAxMjgpIHtcclxuICAgICAgICAgICAgICAgIG91dFtjKytdID0gU3RyaW5nLmZyb21DaGFyQ29kZShjMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYzEgPiAxOTEgJiYgYzEgPCAyMjQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjMiA9IGJ5dGVzW3BvcysrXTtcclxuICAgICAgICAgICAgICAgIG91dFtjKytdID0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYzEgJiAzMSkgPDwgNiB8IGMyICYgNjMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMxID4gMjM5ICYmIGMxIDwgMzY1KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdXJyb2dhdGUgUGFpclxyXG4gICAgICAgICAgICAgICAgdmFyIGMyID0gYnl0ZXNbcG9zKytdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGMzID0gYnl0ZXNbcG9zKytdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGM0ID0gYnl0ZXNbcG9zKytdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHUgPSAoKGMxICYgNykgPDwgMTggfCAoYzIgJiA2MykgPDwgMTIgfCAoYzMgJiA2MykgPDwgNiB8IGM0ICYgNjMpIC1cclxuICAgICAgICAgICAgICAgICAgICAweDEwMDAwO1xyXG4gICAgICAgICAgICAgICAgb3V0W2MrK10gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RDgwMCArICh1ID4+IDEwKSk7XHJcbiAgICAgICAgICAgICAgICBvdXRbYysrXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhEQzAwICsgKHUgJiAxMDIzKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYzIgPSBieXRlc1twb3MrK107XHJcbiAgICAgICAgICAgICAgICB2YXIgYzMgPSBieXRlc1twb3MrK107XHJcbiAgICAgICAgICAgICAgICBvdXRbYysrXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZSgoYzEgJiAxNSkgPDwgMTIgfCAoYzIgJiA2MykgPDwgNiB8IGMzICYgNjMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQuam9pbignJyk7XHJcbiAgICB9O1xyXG4gICAgLyogdHNsaW50OmVuYWJsZSAqL1xyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL0V2ZW50TGlzdGVuZXJPcHRpb25zL2Jsb2IvZ2gtcGFnZXMvZXhwbGFpbmVyLm1kXHJcbiAgICBzdGF0aWMgc3VwcG9ydHNQYXNzaXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgVXRpbC5zdXBwb3J0c1Bhc3NpdmVWYWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlsLnN1cHBvcnRzUGFzc2l2ZVZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGVzdCB2aWEgYSBnZXR0ZXIgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IHRvIHNlZSBpZiB0aGUgcGFzc2l2ZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZFxyXG4gICAgICAgIGxldCBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHt9XHJcblxyXG4gICAgICAgIHJldHVybiBVdGlsLnN1cHBvcnRzUGFzc2l2ZVZhbHVlID0gc3VwcG9ydHNQYXNzaXZlO1xyXG5cclxuICAgICAgICAvLyBVc2Ugb3VyIGRldGVjdCdzIHJlc3VsdHMuIHBhc3NpdmUgYXBwbGllZCBpZiBzdXBwb3J0ZWQsIGNhcHR1cmUgd2lsbCBiZSBmYWxzZSBlaXRoZXIgd2F5LlxyXG4gICAgICAgIC8vIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZuLCBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0SW1tZWRpYXRlKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZuKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZW51bSBBQ1RJT04ge1xyXG4gICAgTElTVF9IT1NUUyA9ICdsaXN0LWhvc3RzJyxcclxuICAgIEFQUExfREVWSUNFX0xJU1QgPSAnYXBwbC1kZXZpY2UtbGlzdCcsXHJcbiAgICBHT09HX0RFVklDRV9MSVNUID0gJ2dvb2ctZGV2aWNlLWxpc3QnLFxyXG4gICAgTVVMVElQTEVYID0gJ211bHRpcGxleCcsXHJcbiAgICBTSEVMTCA9ICdzaGVsbCcsXHJcbiAgICBQUk9YWV9XUyA9ICdwcm94eS13cycsXHJcbiAgICBQUk9YWV9BREIgPSAncHJveHktYWRiJyxcclxuICAgIERFVlRPT0xTID0gJ2RldnRvb2xzJyxcclxuICAgIFNUUkVBTV9TQ1JDUFkgPSAnc3RyZWFtJyxcclxuICAgIFNUUkVBTV9XU19RVkggPSAnc3RyZWFtLXF2aCcsXHJcbiAgICBTVFJFQU1fTUpQRUcgPSAnc3RyZWFtLW1qcGVnJyxcclxuICAgIFBST1hZX1dEQSA9ICdwcm94eS13ZGEnLFxyXG4gICAgRklMRV9MSVNUSU5HID0gJ2xpc3QtZmlsZXMnLFxyXG59XHJcbiIsImV4cG9ydCBlbnVtIENoYW5uZWxDb2RlIHtcclxuICAgIEZTTFMgPSAnRlNMUycsIC8vIEZpbGUgU3lzdGVtIExpU3RcclxuICAgIEhTVFMgPSAnSFNUUycsIC8vIEhvU1RTIExpc3RcclxuICAgIFNIRUwgPSAnU0hFTCcsIC8vIFNIRUxsXHJcbiAgICBHVFJDID0gJ0dUUkMnLCAvLyBHb29nIGRldmljZSBUUmFDZXJcclxuICAgIEFUUkMgPSAnQVRSQycsIC8vIEFwcGwgZGV2aWNlIFRSYUNlclxyXG4gICAgV0RBUCA9ICdXREFQJywgLy8gV2ViRHJpdmVyQWdlbnQgUHJveHlcclxuICAgIFFWSFMgPSAnUVZIUycsIC8vIFF1aWNrdGltZV9WaWRlb19IYWNrIFN0cmVhbVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBTRVJWRVJfUEFDS0FHRSA9ICdjb20uZ2VueW1vYmlsZS5zY3JjcHkuU2VydmVyJztcbmV4cG9ydCBjb25zdCBTRVJWRVJfUE9SVCA9IDg4ODY7XG5leHBvcnQgY29uc3QgU0VSVkVSX1ZFUlNJT04gPSAnMS4xOS13czYnO1xuXG5leHBvcnQgY29uc3QgU0VSVkVSX1RZUEUgPSAnd2ViJztcblxuZXhwb3J0IGNvbnN0IExPR19MRVZFTCA9ICdFUlJPUic7XG5cbmxldCBTQ1JDUFlfTElTVEVOU19PTl9BTExfSU5URVJGQUNFUztcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblNDUkNQWV9MSVNURU5TX09OX0FMTF9JTlRFUkZBQ0VTID0gdHJ1ZTtcbi8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy9cblxuY29uc3QgQVJHVU1FTlRTID0gW1NFUlZFUl9WRVJTSU9OLCBTRVJWRVJfVFlQRSwgTE9HX0xFVkVMLCBTRVJWRVJfUE9SVCwgU0NSQ1BZX0xJU1RFTlNfT05fQUxMX0lOVEVSRkFDRVNdO1xuXG5leHBvcnQgY29uc3QgU0VSVkVSX1BST0NFU1NfTkFNRSA9ICdhcHBfcHJvY2Vzcyc7XG5cbmV4cG9ydCBjb25zdCBBUkdTX1NUUklORyA9IGAvICR7U0VSVkVSX1BBQ0tBR0V9ICR7QVJHVU1FTlRTLmpvaW4oJyAnKX0gMj4mMSA+IC9kZXYvbnVsbGA7XG4iLCJpbXBvcnQgeyBXREFNZXRob2QgfSBmcm9tICcuL1dEQU1ldGhvZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbENlbnRlckNvbW1hbmQge1xyXG4gICAgcHVibGljIHN0YXRpYyBLSUxMX1NFUlZFUiA9ICdraWxsX3NlcnZlcic7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUQVJUX1NFUlZFUiA9ICdzdGFydF9zZXJ2ZXInO1xyXG4gICAgcHVibGljIHN0YXRpYyBVUERBVEVfSU5URVJGQUNFUyA9ICd1cGRhdGVfaW50ZXJmYWNlcyc7XHJcbiAgICBwdWJsaWMgc3RhdGljIENPTkZJR1VSRV9TVFJFQU0gPSAnY29uZmlndXJlX3N0cmVhbSc7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJVTl9XREEgPSAncnVuLXdkYSc7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJFUVVFU1RfV0RBID0gJ3JlcXVlc3Qtd2RhJztcclxuXHJcbiAgICBwcml2YXRlIGlkID0gLTE7XHJcbiAgICBwcml2YXRlIHR5cGUgPSAnJztcclxuICAgIHByaXZhdGUgcGlkID0gMDtcclxuICAgIHByaXZhdGUgdWRpZCA9ICcnO1xyXG4gICAgcHJpdmF0ZSBtZXRob2QgPSAnJztcclxuICAgIHByaXZhdGUgYXJncz86IGFueTtcclxuICAgIHByaXZhdGUgZGF0YT86IGFueTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21KU09OKGpzb246IHN0cmluZyk6IENvbnRyb2xDZW50ZXJDb21tYW5kIHtcclxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5wYXJzZShqc29uKTtcclxuICAgICAgICBpZiAoIWJvZHkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGlucHV0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBuZXcgQ29udHJvbENlbnRlckNvbW1hbmQoKTtcclxuICAgICAgICBjb25zdCBkYXRhID0gKGNvbW1hbmQuZGF0YSA9IGJvZHkuZGF0YSk7XHJcbiAgICAgICAgY29tbWFuZC5pZCA9IGJvZHkuaWQ7XHJcbiAgICAgICAgY29tbWFuZC50eXBlID0gYm9keS50eXBlO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGRhdGEudWRpZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29tbWFuZC51ZGlkID0gZGF0YS51ZGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGJvZHkudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuS0lMTF9TRVJWRVI6XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEucGlkICE9PSAnbnVtYmVyJyAmJiBkYXRhLnBpZCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwicGlkXCIgdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbW1hbmQucGlkID0gZGF0YS5waWQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZDtcclxuICAgICAgICAgICAgY2FzZSB0aGlzLlJFUVVFU1RfV0RBOlxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLm1ldGhvZCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJtZXRob2RcIiB2YWx1ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29tbWFuZC5tZXRob2QgPSBkYXRhLm1ldGhvZDtcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQuYXJncyA9IGRhdGEuYXJncztcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kO1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuU1RBUlRfU0VSVkVSOlxyXG4gICAgICAgICAgICBjYXNlIHRoaXMuVVBEQVRFX0lOVEVSRkFDRVM6XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5DT05GSUdVUkVfU1RSRUFNOlxyXG4gICAgICAgICAgICBjYXNlIHRoaXMuUlVOX1dEQTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNvbW1hbmQgXCIke2JvZHkuY29tbWFuZH1cImApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UGlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFVkaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51ZGlkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldElkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0TWV0aG9kKCk6IFdEQU1ldGhvZCB8IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWV0aG9kO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldERhdGEoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFyZ3MoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcmdzO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBlbnVtIERldmljZVN0YXRlIHtcclxuICAgIERFVklDRSA9ICdkZXZpY2UnLFxyXG4gICAgRElTQ09OTkVDVEVEID0gJ2Rpc2Nvbm5lY3RlZCcsXHJcblxyXG4gICAgQ09OTkVDVEVEID0gJ0Nvbm5lY3RlZCcsXHJcbn1cclxuIiwiaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4uL3R5cGVzL01lc3NhZ2UnO1xyXG5pbXBvcnQgeyBIb3N0SXRlbSB9IGZyb20gJy4uL3R5cGVzL0NvbmZpZ3VyYXRpb24nO1xyXG5cclxuZXhwb3J0IGVudW0gTWVzc2FnZVR5cGUge1xyXG4gICAgSE9TVFMgPSAnaG9zdHMnLFxyXG4gICAgRVJST1IgPSAnZXJyb3InLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2VIb3N0cyBleHRlbmRzIE1lc3NhZ2Uge1xyXG4gICAgdHlwZTogJ2hvc3RzJztcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBsb2NhbD86IHsgdHlwZTogc3RyaW5nIH1bXTtcclxuICAgICAgICByZW1vdGU/OiBIb3N0SXRlbVtdO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlRXJyb3IgZXh0ZW5kcyBNZXNzYWdlIHtcclxuICAgIHR5cGU6ICdlcnJvcic7XHJcbiAgICBkYXRhOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbmV4cG9ydCB0eXBlIEV2ZW50TWFwID0gUmVjb3JkPHN0cmluZywgYW55PjtcclxuZXhwb3J0IHR5cGUgRXZlbnRLZXk8VCBleHRlbmRzIEV2ZW50TWFwPiA9IHN0cmluZyAmIGtleW9mIFQ7XHJcbmV4cG9ydCB0eXBlIEV2ZW50UmVjZWl2ZXI8VD4gPSAocGFyYW1zOiBUKSA9PiB2b2lkO1xyXG5cclxuaW50ZXJmYWNlIEVtaXR0ZXI8VCBleHRlbmRzIEV2ZW50TWFwPiB7XHJcbiAgICBvbjxLIGV4dGVuZHMgRXZlbnRLZXk8VD4+KGV2ZW50TmFtZTogSywgZm46IEV2ZW50UmVjZWl2ZXI8VFtLXT4pOiB2b2lkO1xyXG4gICAgb2ZmPEsgZXh0ZW5kcyBFdmVudEtleTxUPj4oZXZlbnROYW1lOiBLLCBmbjogRXZlbnRSZWNlaXZlcjxUW0tdPik6IHZvaWQ7XHJcbiAgICBlbWl0PEsgZXh0ZW5kcyBFdmVudEtleTxUPj4oZXZlbnROYW1lOiBLLCBwYXJhbXM6IFRbS10pOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVHlwZWRFbWl0dGVyPFQgZXh0ZW5kcyBFdmVudE1hcD4gaW1wbGVtZW50cyBFbWl0dGVyPFQ+IHtcclxuICAgIHByaXZhdGUgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGFkZEV2ZW50TGlzdGVuZXI8SyBleHRlbmRzIEV2ZW50S2V5PFQ+PihldmVudE5hbWU6IEssIGZuOiBFdmVudFJlY2VpdmVyPFRbS10+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbWl0dGVyLm9uKGV2ZW50TmFtZSwgZm4pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI8SyBleHRlbmRzIEV2ZW50S2V5PFQ+PihldmVudE5hbWU6IEssIGZuOiBFdmVudFJlY2VpdmVyPFRbS10+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbWl0dGVyLm9mZihldmVudE5hbWUsIGZuKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwYXRjaEV2ZW50KGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtaXR0ZXIuZW1pdChldmVudC50eXBlLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgb248SyBleHRlbmRzIEV2ZW50S2V5PFQ+PihldmVudE5hbWU6IEssIGZuOiBFdmVudFJlY2VpdmVyPFRbS10+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbWl0dGVyLm9uKGV2ZW50TmFtZSwgZm4pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uY2U8SyBleHRlbmRzIEV2ZW50S2V5PFQ+PihldmVudE5hbWU6IEssIGZuOiBFdmVudFJlY2VpdmVyPFRbS10+KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbWl0dGVyLm9uY2UoZXZlbnROYW1lLCBmbik7XHJcbiAgICB9XHJcblxyXG4gICAgb2ZmPEsgZXh0ZW5kcyBFdmVudEtleTxUPj4oZXZlbnROYW1lOiBLLCBmbjogRXZlbnRSZWNlaXZlcjxUW0tdPik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZW1pdHRlci5vZmYoZXZlbnROYW1lLCBmbik7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdDxLIGV4dGVuZHMgRXZlbnRLZXk8VD4+KGV2ZW50TmFtZTogSywgcGFyYW1zOiBUW0tdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdHRlci5lbWl0KGV2ZW50TmFtZSwgcGFyYW1zKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFdmVudDIgfSBmcm9tICcuL0V2ZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBDbG9zZUV2ZW50MiBleHRlbmRzIEV2ZW50MiBpbXBsZW1lbnRzIENsb3NlRXZlbnQge1xyXG4gICAgcmVhZG9ubHkgY29kZTogbnVtYmVyO1xyXG4gICAgcmVhZG9ubHkgcmVhc29uOiBzdHJpbmc7XHJcbiAgICByZWFkb25seSB3YXNDbGVhbjogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgeyBjb2RlLCByZWFzb24gfTogQ2xvc2VFdmVudEluaXQgPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKHR5cGUpO1xyXG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGUgfHwgMDtcclxuICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbiB8fCAnJztcclxuICAgICAgICB0aGlzLndhc0NsZWFuID0gdGhpcy5jb2RlID09PSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ2xvc2VFdmVudENsYXNzID0gdHlwZW9mIENsb3NlRXZlbnQgIT09ICd1bmRlZmluZWQnID8gQ2xvc2VFdmVudCA6IENsb3NlRXZlbnQyO1xyXG4iLCJpbXBvcnQgeyBFdmVudDIgfSBmcm9tICcuL0V2ZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBFcnJvckV2ZW50MiBleHRlbmRzIEV2ZW50MiBpbXBsZW1lbnRzIEVycm9yRXZlbnQge1xyXG4gICAgcmVhZG9ubHkgY29sbm86IG51bWJlcjtcclxuICAgIHJlYWRvbmx5IGVycm9yOiBhbnk7XHJcbiAgICByZWFkb25seSBmaWxlbmFtZTogc3RyaW5nO1xyXG4gICAgcmVhZG9ubHkgbGluZW5vOiBudW1iZXI7XHJcbiAgICByZWFkb25seSBtZXNzYWdlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCB7IGNvbG5vLCBlcnJvciwgZmlsZW5hbWUsIGxpbmVubywgbWVzc2FnZSB9OiBFcnJvckV2ZW50SW5pdCA9IHt9KSB7XHJcbiAgICAgICAgc3VwZXIodHlwZSk7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgIHRoaXMuY29sbm8gPSBjb2xubyB8fCAwO1xyXG4gICAgICAgIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZSB8fCAnJztcclxuICAgICAgICB0aGlzLmxpbmVubyA9IGxpbmVubyB8fCAwO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgJyc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBFcnJvckV2ZW50Q2xhc3MgPSB0eXBlb2YgRXJyb3JFdmVudCAhPT0gJ3VuZGVmaW5lZCcgPyBFcnJvckV2ZW50IDogRXJyb3JFdmVudDI7XHJcbiIsImV4cG9ydCBjbGFzcyBFdmVudDIge1xyXG4gICAgc3RhdGljIE5PTkUgPSAwO1xyXG4gICAgc3RhdGljIENBUFRVUklOR19QSEFTRSA9IDE7XHJcbiAgICBzdGF0aWMgQVRfVEFSR0VUID0gMjtcclxuICAgIHN0YXRpYyBCVUJCTElOR19QSEFTRSA9IDM7XHJcblxyXG4gICAgcHVibGljIGNhbmNlbGFibGU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgYnViYmxlczogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBjb21wb3NlZDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGVmYXVsdFByZXZlbnRlZDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyB0aW1lU3RhbXA6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0YXJnZXQ6IGFueTtcclxuICAgIHB1YmxpYyByZWFkb25seSBpc1RydXN0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcmVhZG9ubHkgQVRfVEFSR0VUOiBudW1iZXIgPSAwO1xyXG4gICAgcmVhZG9ubHkgQlVCQkxJTkdfUEhBU0U6IG51bWJlciA9IDA7XHJcbiAgICByZWFkb25seSBDQVBUVVJJTkdfUEhBU0U6IG51bWJlciA9IDA7XHJcbiAgICByZWFkb25seSBOT05FOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgb3B0aW9ucyA9IHsgY2FuY2VsYWJsZTogdHJ1ZSwgYnViYmxlczogdHJ1ZSwgY29tcG9zZWQ6IGZhbHNlIH0pIHtcclxuICAgICAgICBjb25zdCB7IGNhbmNlbGFibGUsIGJ1YmJsZXMsIGNvbXBvc2VkIH0gPSB7IC4uLm9wdGlvbnMgfTtcclxuICAgICAgICB0aGlzLmNhbmNlbGFibGUgPSAhIWNhbmNlbGFibGU7XHJcbiAgICAgICAgdGhpcy5idWJibGVzID0gISFidWJibGVzO1xyXG4gICAgICAgIHRoaXMuY29tcG9zZWQgPSAhIWNvbXBvc2VkO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IGAke3R5cGV9YDtcclxuICAgICAgICB0aGlzLmRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIHtcclxuICAgICAgICAvLyB0aGlzW2tTdG9wXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJldmVudERlZmF1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY3VycmVudFRhcmdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQ7XHJcbiAgICB9XHJcbiAgICBnZXQgc3JjRWxlbWVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9zZWRQYXRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldCA/IFt0aGlzLnRhcmdldF0gOiBbXTtcclxuICAgIH1cclxuICAgIGdldCByZXR1cm5WYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuZGVmYXVsdFByZXZlbnRlZDtcclxuICAgIH1cclxuICAgIGdldCBldmVudFBoYXNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldCA/IEV2ZW50LkFUX1RBUkdFVCA6IEV2ZW50Lk5PTkU7XHJcbiAgICB9XHJcbiAgICBnZXQgY2FuY2VsQnViYmxlKCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyByZXR1cm4gdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQ7XHJcbiAgICB9XHJcbiAgICBzZXQgY2FuY2VsQnViYmxlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdG9wUHJvcGFnYXRpb24oKSB7XHJcbiAgICAgICAgLy8gdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaW5pdEV2ZW50KHR5cGU6IHN0cmluZywgYnViYmxlcz86IGJvb2xlYW4sIGNhbmNlbGFibGU/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5idWJibGVzID0gISFidWJibGVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxhYmxlID0gISFjYW5jZWxhYmxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEV2ZW50Q2xhc3MgPSB0eXBlb2YgRXZlbnQgIT09ICd1bmRlZmluZWQnID8gRXZlbnQgOiBFdmVudDI7XHJcbiIsImltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9NZXNzYWdlVHlwZSc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uLy4uL2FwcC9VdGlsJztcclxuaW1wb3J0IHsgQ2xvc2VFdmVudENsYXNzIH0gZnJvbSAnLi9DbG9zZUV2ZW50Q2xhc3MnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZShidWZmZXI6IEFycmF5QnVmZmVyKTogTWVzc2FnZSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IEJ1ZmZlci5mcm9tKGJ1ZmZlcik7XHJcblxyXG4gICAgICAgIGNvbnN0IHR5cGU6IE1lc3NhZ2VUeXBlID0gdmlldy5yZWFkVUludDgoMCk7XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbElkID0gdmlldy5yZWFkVUludDMyTEUoMSk7XHJcbiAgICAgICAgY29uc3QgZGF0YTogQXJyYXlCdWZmZXIgPSBidWZmZXIuc2xpY2UoNSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZSh0eXBlLCBjaGFubmVsSWQsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUNsb3NlRXZlbnQoaWQ6IG51bWJlciwgY29kZTogbnVtYmVyLCByZWFzb24/OiBzdHJpbmcpOiBNZXNzYWdlIHtcclxuICAgICAgICBjb25zdCByZWFzb25CdWZmZXIgPSByZWFzb24gPyBVdGlsLnN0cmluZ1RvVXRmOEJ5dGVBcnJheShyZWFzb24pIDogQnVmZmVyLmFsbG9jKDApO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvYygyICsgNCArIHJlYXNvbkJ1ZmZlci5ieXRlTGVuZ3RoKTtcclxuICAgICAgICBidWZmZXIud3JpdGVVSW50MTZMRShjb2RlLCAwKTtcclxuICAgICAgICBpZiAocmVhc29uQnVmZmVyLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgYnVmZmVyLndyaXRlVUludDMyTEUocmVhc29uQnVmZmVyLmJ5dGVMZW5ndGgsIDIpO1xyXG4gICAgICAgICAgICBidWZmZXIuc2V0KHJlYXNvbkJ1ZmZlciwgNik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZShNZXNzYWdlVHlwZS5DbG9zZUNoYW5uZWwsIGlkLCBidWZmZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQnVmZmVyKHR5cGU6IE1lc3NhZ2VUeXBlLCBjaGFubmVsSWQ6IG51bWJlciwgZGF0YT86IEFycmF5QnVmZmVyKTogQnVmZmVyIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBCdWZmZXIuYWxsb2MoNSArIChkYXRhID8gZGF0YS5ieXRlTGVuZ3RoIDogMCkpO1xyXG4gICAgICAgIHJlc3VsdC53cml0ZVVJbnQ4KHR5cGUsIDApO1xyXG4gICAgICAgIHJlc3VsdC53cml0ZVVJbnQzMkxFKGNoYW5uZWxJZCwgMSk7XHJcbiAgICAgICAgaWYgKGRhdGE/LmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnNldChCdWZmZXIuZnJvbShkYXRhKSwgNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSB0eXBlOiBNZXNzYWdlVHlwZSxcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgY2hhbm5lbElkOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGRhdGE6IEFycmF5QnVmZmVyLFxyXG4gICAgKSB7fVxyXG5cclxuICAgIHB1YmxpYyB0b0Nsb3NlRXZlbnQoKTogQ2xvc2VFdmVudCB7XHJcbiAgICAgICAgbGV0IGNvZGU6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgcmVhc29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbSh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICBjb2RlID0gYnVmZmVyLnJlYWRVSW50MTZMRSgwKTtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZlci5ieXRlTGVuZ3RoID4gNikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLnJlYWRVSW50MzJMRSgyKTtcclxuICAgICAgICAgICAgICAgIHJlYXNvbiA9IFV0aWwudXRmOEJ5dGVBcnJheVRvU3RyaW5nKGJ1ZmZlci5zbGljZSg2LCA2ICsgbGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDbG9zZUV2ZW50Q2xhc3MoJ2Nsb3NlJywge1xyXG4gICAgICAgICAgICBjb2RlLFxyXG4gICAgICAgICAgICByZWFzb24sXHJcbiAgICAgICAgICAgIHdhc0NsZWFuOiBjb2RlID09PSAxMDAwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b0J1ZmZlcigpOiBBcnJheUJ1ZmZlciB7XHJcbiAgICAgICAgcmV0dXJuIE1lc3NhZ2UuY3JlYXRlQnVmZmVyKHRoaXMudHlwZSwgdGhpcy5jaGFubmVsSWQsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnQyIH0gZnJvbSAnLi9FdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUV2ZW50MiBleHRlbmRzIEV2ZW50MiBpbXBsZW1lbnRzIE1lc3NhZ2VFdmVudCB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGF0YTogYW55O1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9yaWdpbjogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGxhc3RFdmVudElkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc291cmNlOiBhbnk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgcG9ydHM6IFJlYWRvbmx5QXJyYXk8YW55PjtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHR5cGU6IHN0cmluZyxcclxuICAgICAgICB7IGRhdGEgPSBudWxsLCBvcmlnaW4gPSAnJywgbGFzdEV2ZW50SWQgPSAnJywgc291cmNlID0gbnVsbCwgcG9ydHMgPSBbXSB9OiBNZXNzYWdlRXZlbnRJbml0ID0ge30sXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcih0eXBlKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMub3JpZ2luID0gYCR7b3JpZ2lufWA7XHJcbiAgICAgICAgdGhpcy5sYXN0RXZlbnRJZCA9IGAke2xhc3RFdmVudElkfWA7XHJcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5wb3J0cyA9IFsuLi5wb3J0c107XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE1lc3NhZ2VFdmVudCgpOiB2b2lkIHtcclxuICAgICAgICB0aHJvdyBFcnJvcignRGVwcmVjYXRlZCBtZXRob2QnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VFdmVudENsYXNzID0gdHlwZW9mIE1lc3NhZ2VFdmVudCAhPT0gJ3VuZGVmaW5lZCcgPyBNZXNzYWdlRXZlbnQgOiBNZXNzYWdlRXZlbnQyO1xyXG4iLCJleHBvcnQgZW51bSBNZXNzYWdlVHlwZSB7XHJcbiAgICBDcmVhdGVDaGFubmVsID0gNCxcclxuICAgIENsb3NlQ2hhbm5lbCA9IDgsXHJcbiAgICBSYXdCaW5hcnlEYXRhID0gMTYsXHJcbiAgICBSYXdTdHJpbmdEYXRhID0gMzIsXHJcbiAgICBEYXRhID0gNjQsXHJcbn1cclxuIiwiaW1wb3J0IHsgVHlwZWRFbWl0dGVyIH0gZnJvbSAnLi4vLi4vY29tbW9uL1R5cGVkRW1pdHRlcic7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuL01lc3NhZ2UnO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJy4vTWVzc2FnZVR5cGUnO1xyXG5pbXBvcnQgeyBFdmVudENsYXNzIH0gZnJvbSAnLi9FdmVudCc7XHJcbmltcG9ydCB7IENsb3NlRXZlbnRDbGFzcyB9IGZyb20gJy4vQ2xvc2VFdmVudENsYXNzJztcclxuaW1wb3J0IHsgRXJyb3JFdmVudENsYXNzIH0gZnJvbSAnLi9FcnJvckV2ZW50Q2xhc3MnO1xyXG5pbXBvcnQgeyBNZXNzYWdlRXZlbnRDbGFzcyB9IGZyb20gJy4vTWVzc2FnZUV2ZW50Q2xhc3MnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi8uLi9hcHAvVXRpbCc7XHJcblxyXG5pbnRlcmZhY2UgTXVsdGlwbGV4ZXJFdmVudHMgZXh0ZW5kcyBXZWJTb2NrZXRFdmVudE1hcCB7XHJcbiAgICBlbXB0eTogTXVsdGlwbGV4ZXI7XHJcbiAgICBjaGFubmVsOiB7IGNoYW5uZWw6IE11bHRpcGxleGVyOyBkYXRhOiBBcnJheUJ1ZmZlciB9O1xyXG4gICAgb3BlbjogRXZlbnQ7XHJcbiAgICBjbG9zZTogQ2xvc2VFdmVudDtcclxuICAgIG1lc3NhZ2U6IE1lc3NhZ2VFdmVudDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWJzb2NrZXRFdmVudEVtaXR0ZXIge1xyXG4gICAgZGlzcGF0Y2hFdmVudChldmVudDogRXZlbnQpOiBib29sZWFuO1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcjxLIGV4dGVuZHMga2V5b2YgV2ViU29ja2V0RXZlbnRNYXA+KFxyXG4gICAgICAgIHR5cGU6IEssXHJcbiAgICAgICAgbGlzdGVuZXI6ICh0aGlzOiBXZWJTb2NrZXQsIGV2OiBXZWJTb2NrZXRFdmVudE1hcFtLXSkgPT4gYW55LFxyXG4gICAgICAgIG9wdGlvbnM/OiBib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMsXHJcbiAgICApOiB2b2lkO1xyXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjxLIGV4dGVuZHMga2V5b2YgV2ViU29ja2V0RXZlbnRNYXA+KFxyXG4gICAgICAgIHR5cGU6IEssXHJcbiAgICAgICAgbGlzdGVuZXI6ICh0aGlzOiBXZWJTb2NrZXQsIGV2OiBXZWJTb2NrZXRFdmVudE1hcFtLXSkgPT4gYW55LFxyXG4gICAgICAgIG9wdGlvbnM/OiBib29sZWFuIHwgRXZlbnRMaXN0ZW5lck9wdGlvbnMsXHJcbiAgICApOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTXVsdGlwbGV4ZXIgZXh0ZW5kcyBUeXBlZEVtaXR0ZXI8TXVsdGlwbGV4ZXJFdmVudHM+IGltcGxlbWVudHMgV2ViU29ja2V0IHtcclxuICAgIHJlYWRvbmx5IENPTk5FQ1RJTkcgPSAwO1xyXG4gICAgcmVhZG9ubHkgT1BFTiA9IDE7XHJcbiAgICByZWFkb25seSBDTE9TSU5HID0gMjtcclxuICAgIHJlYWRvbmx5IENMT1NFRCA9IDM7XHJcbiAgICBwdWJsaWMgYmluYXJ5VHlwZTogQmluYXJ5VHlwZSA9ICdibG9iJztcclxuICAgIHB1YmxpYyByZWFkeVN0YXRlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNoYW5uZWxzOiBNYXA8bnVtYmVyLCB7IGNoYW5uZWw6IE11bHRpcGxleGVyOyBlbWl0dGVyOiBXZWJzb2NrZXRFdmVudEVtaXR0ZXIgfT4gPSBuZXcgTWFwKCk7XHJcbiAgICBwcml2YXRlIG5leHRJZCA9IDA7XHJcbiAgICBwcml2YXRlIG1heElkID0gNDI5NDk2NzI5NjtcclxuICAgIHByaXZhdGUgc3RvcmFnZTogQXJyYXk8c3RyaW5nIHwgQXJyYXlCdWZmZXJMaWtlIHwgQmxvYiB8IEFycmF5QnVmZmVyVmlldz4gPSBbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZUVtaXR0ZXI6IFdlYnNvY2tldEV2ZW50RW1pdHRlcjtcclxuICAgIHByaXZhdGUgZW1wdHlUaW1lclNjaGVkdWxlZCA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBvbmNsb3NlOiAoKHRoaXM6IFdlYlNvY2tldCwgZXY6IENsb3NlRXZlbnQpID0+IGFueSkgfCBudWxsID0gbnVsbDtcclxuICAgIHB1YmxpYyBvbmVycm9yOiAoKHRoaXM6IFdlYlNvY2tldCwgZXY6IEV2ZW50KSA9PiBhbnkpIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwdWJsaWMgb25tZXNzYWdlOiAoKHRoaXM6IFdlYlNvY2tldCwgZXY6IE1lc3NhZ2VFdmVudCkgPT4gYW55KSB8IG51bGwgPSBudWxsO1xyXG4gICAgcHVibGljIG9ub3BlbjogKCh0aGlzOiBXZWJTb2NrZXQsIGV2OiBFdmVudCkgPT4gYW55KSB8IG51bGwgPSBudWxsO1xyXG4gICAgcHVibGljIHVybCA9ICcnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgd3JhcCh3czogV2ViU29ja2V0KTogTXVsdGlwbGV4ZXIge1xyXG4gICAgICAgIHJldHVybiBuZXcgTXVsdGlwbGV4ZXIod3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgd3M6IFdlYlNvY2tldCwgcHJpdmF0ZSBfaWQgPSAwLCBlbWl0dGVyPzogV2Vic29ja2V0RXZlbnRFbWl0dGVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSB0aGlzLkNPTk5FQ1RJTkc7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lkID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdzLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSB0aGlzLndzLnJlYWR5U3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWVzc2FnZUVtaXR0ZXIgPSBlbWl0dGVyIHx8IHdzO1xyXG5cclxuICAgICAgICBjb25zdCBvbk9wZW5IYW5kbGVyID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSB0aGlzLndzLnJlYWR5U3RhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgb25DbG9zZUhhbmRsZXIgPSAoZXZlbnQ6IENsb3NlRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gdGhpcy53cy5yZWFkeVN0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5uZWxzLmNsZWFyKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgb25FcnJvckhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IHRoaXMud3MucmVhZHlTdGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5jaGFubmVscy5jbGVhcigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IG9uTWVzc2FnZUhhbmRsZXIgPSAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGV2ZW50O1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gTWVzc2FnZS5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuQ3JlYXRlQ2hhbm5lbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgY2hhbm5lbElkLCBkYXRhIH0gPSBtZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5leHRJZCA8IGNoYW5uZWxJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRJZCA9IGNoYW5uZWxJZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbm5lbCA9IHRoaXMuX2NyZWF0ZUNoYW5uZWwoY2hhbm5lbElkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdjaGFubmVsJywgeyBjaGFubmVsLCBkYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5SYXdTdHJpbmdEYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuY2hhbm5lbHMuZ2V0KG1lc3NhZ2UuY2hhbm5lbElkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGNoYW5uZWwgfSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IG5ldyBNZXNzYWdlRXZlbnRDbGFzcygnbWVzc2FnZScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFV0aWwudXRmOEJ5dGVBcnJheVRvU3RyaW5nKEJ1ZmZlci5mcm9tKG1lc3NhZ2UuZGF0YSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEV2ZW50SWQ6IGV2ZW50Lmxhc3RFdmVudElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luOiBldmVudC5vcmlnaW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGV2ZW50LnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuZGlzcGF0Y2hFdmVudChtc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENoYW5uZWwgd2l0aCBpZCAoJHttZXNzYWdlLmNoYW5uZWxJZH0pIG5vdCBmb3VuZGApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuUmF3QmluYXJ5RGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNoYW5uZWxzLmdldChtZXNzYWdlLmNoYW5uZWxJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBjaGFubmVsIH0gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSBuZXcgTWVzc2FnZUV2ZW50Q2xhc3MoJ21lc3NhZ2UnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBtZXNzYWdlLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RXZlbnRJZDogZXZlbnQubGFzdEV2ZW50SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW46IGV2ZW50Lm9yaWdpbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZXZlbnQuc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5kaXNwYXRjaEV2ZW50KG1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQ2hhbm5lbCB3aXRoIGlkICgke21lc3NhZ2UuY2hhbm5lbElkfSkgbm90IGZvdW5kYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5EYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuY2hhbm5lbHMuZ2V0KG1lc3NhZ2UuY2hhbm5lbElkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGVtaXR0ZXIgfSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IG5ldyBNZXNzYWdlRXZlbnRDbGFzcygnbWVzc2FnZScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG1lc3NhZ2UuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RFdmVudElkOiBldmVudC5sYXN0RXZlbnRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbjogZXZlbnQub3JpZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBldmVudC5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmRpc3BhdGNoRXZlbnQobXNnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBDaGFubmVsIHdpdGggaWQgKCR7bWVzc2FnZS5jaGFubmVsSWR9KSBub3QgZm91bmRgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLkNsb3NlQ2hhbm5lbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNoYW5uZWxzLmdldChtZXNzYWdlLmNoYW5uZWxJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBjaGFubmVsIH0gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLnJlYWR5U3RhdGUgPSBjaGFubmVsLkNMT1NJTkc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLmRpc3BhdGNoRXZlbnQobWVzc2FnZS50b0Nsb3NlRXZlbnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLnJlYWR5U3RhdGUgPSBjaGFubmVsLkNMT1NFRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENoYW5uZWwgd2l0aCBpZCAoJHttZXNzYWdlLmNoYW5uZWxJZH0pIG5vdCBmb3VuZGApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIG1lc3NhZ2UgdHlwZTogJHttZXNzYWdlLnR5cGV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFcnJvckV2ZW50Q2xhc3MoJ2Vycm9yJywgeyBlcnJvciB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBvblRoaXNPcGVuSGFuZGxlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0b3JhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgd3MgPSB0aGlzLndzO1xyXG4gICAgICAgICAgICBpZiAod3MgaW5zdGFuY2VvZiBNdWx0aXBsZXhlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLmZvckVhY2goKGRhdGEpID0+IHdzLnNlbmREYXRhKGRhdGEpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5mb3JFYWNoKChkYXRhKSA9PiB3cy5zZW5kKGRhdGEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UubGVuZ3RoID0gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBvblRoaXNDbG9zZUhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHdzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29wZW4nLCBvbk9wZW5IYW5kbGVyKTtcclxuICAgICAgICAgICAgd3MucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9ySGFuZGxlcik7XHJcbiAgICAgICAgICAgIHdzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgb25DbG9zZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VFbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2VIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5vZmYoJ2Nsb3NlJywgb25UaGlzQ2xvc2VIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5vZmYoJ29wZW4nLCBvblRoaXNPcGVuSGFuZGxlcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd3MuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsIG9uT3BlbkhhbmRsZXIpO1xyXG4gICAgICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvckhhbmRsZXIpO1xyXG4gICAgICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgb25DbG9zZUhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZUVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZUhhbmRsZXIpO1xyXG5cclxuICAgICAgICB0aGlzLm9uKCdjbG9zZScsIG9uVGhpc0Nsb3NlSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5vbignb3BlbicsIG9uVGhpc09wZW5IYW5kbGVyKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlRW1wdHlFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYnVmZmVyZWRBbW91bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGV4dGVuc2lvbnMoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwcm90b2NvbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2NoZWR1bGVFbXB0eUV2ZW50KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmVtcHR5VGltZXJTY2hlZHVsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVtcHR5VGltZXJTY2hlZHVsZWQgPSB0cnVlO1xyXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbXB0eVRpbWVyU2NoZWR1bGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHR5VGltZXJTY2hlZHVsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZW1wdHknLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJFbXB0eUV2ZW50KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmVtcHR5VGltZXJTY2hlZHVsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbXB0eVRpbWVyU2NoZWR1bGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZShjb2RlID0gMTAwMCwgcmVhc29uPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5DTE9TRUQgfHwgdGhpcy5yZWFkeVN0YXRlID09PSB0aGlzLkNMT1NJTkcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gdGhpcy5DTE9TSU5HO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBNZXNzYWdlLmZyb21DbG9zZUV2ZW50KHRoaXMuX2lkLCBjb2RlLCByZWFzb24pLnRvQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53cyBpbnN0YW5jZW9mIE11bHRpcGxleGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kRGF0YShtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdjbG9zZScsIG5ldyBDbG9zZUV2ZW50Q2xhc3MoJ2Nsb3NlJywgeyBjb2RlLCByZWFzb24gfSkpO1xyXG4gICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gdGhpcy5DTE9TRUQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndzLmNsb3NlKGNvZGUsIHJlYXNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kKGRhdGE6IHN0cmluZyB8IEFycmF5QnVmZmVyTGlrZSB8IEJsb2IgfCBBcnJheUJ1ZmZlclZpZXcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy53cyBpbnN0YW5jZW9mIE11bHRpcGxleGVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBNZXNzYWdlLmNyZWF0ZUJ1ZmZlcihNZXNzYWdlVHlwZS5SYXdTdHJpbmdEYXRhLCB0aGlzLl9pZCwgQnVmZmVyLmZyb20oZGF0YSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IE1lc3NhZ2UuY3JlYXRlQnVmZmVyKE1lc3NhZ2VUeXBlLlJhd0JpbmFyeURhdGEsIHRoaXMuX2lkLCBCdWZmZXIuZnJvbShkYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2VuZChkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZERhdGEoZGF0YTogc3RyaW5nIHwgQXJyYXlCdWZmZXJMaWtlIHwgQmxvYiB8IEFycmF5QnVmZmVyVmlldyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLndzIGluc3RhbmNlb2YgTXVsdGlwbGV4ZXIpIHtcclxuICAgICAgICAgICAgZGF0YSA9IE1lc3NhZ2UuY3JlYXRlQnVmZmVyKE1lc3NhZ2VUeXBlLkRhdGEsIHRoaXMuX2lkLCBCdWZmZXIuZnJvbShkYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NlbmQoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VuZChkYXRhOiBzdHJpbmcgfCBBcnJheUJ1ZmZlckxpa2UgfCBCbG9iIHwgQXJyYXlCdWZmZXJWaWV3KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgeyByZWFkeVN0YXRlIH0gPSB0aGlzO1xyXG4gICAgICAgIGlmIChyZWFkeVN0YXRlID09PSB0aGlzLk9QRU4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud3MgaW5zdGFuY2VvZiBNdWx0aXBsZXhlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kRGF0YShkYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZChkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAocmVhZHlTdGF0ZSA9PT0gdGhpcy53cy5DT05ORUNUSU5HKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBTb2NrZXQgaXMgYWxyZWFkeSBpbiBDTE9TSU5HIG9yIENMT1NFRCBzdGF0ZS5gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3JlYXRlQ2hhbm5lbChpZDogbnVtYmVyLCBzZW5kT3BlbkV2ZW50OiBib29sZWFuKTogTXVsdGlwbGV4ZXIge1xyXG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgVHlwZWRFbWl0dGVyPE11bHRpcGxleGVyRXZlbnRzPigpO1xyXG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSBuZXcgTXVsdGlwbGV4ZXIodGhpcywgaWQsIGVtaXR0ZXIpO1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbHMuc2V0KGlkLCB7IGNoYW5uZWwsIGVtaXR0ZXIgfSk7XHJcbiAgICAgICAgaWYgKHNlbmRPcGVuRXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5PUEVOKSB7XHJcbiAgICAgICAgICAgICAgICBVdGlsLnNldEltbWVkaWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5yZWFkeVN0YXRlID0gdGhpcy5PUEVOO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnRDbGFzcygnb3BlbicpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hhbm5lbC5yZWFkeVN0YXRlID0gdGhpcy5yZWFkeVN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjaGFubmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5uZWxzLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGFubmVscy5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlRW1wdHlFdmVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jbGVhckVtcHR5RXZlbnQoKTtcclxuICAgICAgICByZXR1cm4gY2hhbm5lbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQ2hhbm5lbChkYXRhOiBCdWZmZXIpOiBNdWx0aXBsZXhlciB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5DTE9TSU5HIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gdGhpcy5DTE9TRUQpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0luY29ycmVjdCBzb2NrZXQgc3RhdGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdldE5leHRJZCgpO1xyXG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSB0aGlzLl9jcmVhdGVDaGFubmVsKGlkLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNlbmREYXRhKE1lc3NhZ2UuY3JlYXRlQnVmZmVyKE1lc3NhZ2VUeXBlLkNyZWF0ZUNoYW5uZWwsIGlkLCBkYXRhKSk7XHJcbiAgICAgICAgcmV0dXJuIGNoYW5uZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROZXh0SWQoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgaGl0VG9wID0gZmFsc2U7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuY2hhbm5lbHMuaGFzKCsrdGhpcy5uZXh0SWQpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5leHRJZCA9PT0gdGhpcy5tYXhJZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhpdFRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdObyBhdmFpbGFibGUgaWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dElkID0gMDtcclxuICAgICAgICAgICAgICAgIGhpdFRvcCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmV4dElkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwYXRjaEV2ZW50KGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChldmVudC50eXBlID09PSAnY2xvc2UnICYmIHR5cGVvZiB0aGlzLm9uY2xvc2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgUmVmbGVjdC5hcHBseSh0aGlzLm9uY2xvc2UsIHRoaXMsIFtldmVudF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ29wZW4nICYmIHR5cGVvZiB0aGlzLm9ub3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBSZWZsZWN0LmFwcGx5KHRoaXMub25vcGVuLCB0aGlzLCBbZXZlbnRdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdtZXNzYWdlJyAmJiB0eXBlb2YgdGhpcy5vbm1lc3NhZ2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgUmVmbGVjdC5hcHBseSh0aGlzLm9ubWVzc2FnZSwgdGhpcywgW2V2ZW50XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldmVudC50eXBlID09PSAnZXJyb3InICYmIHR5cGVvZiB0aGlzLm9uZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgUmVmbGVjdC5hcHBseSh0aGlzLm9uZXJyb3IsIHRoaXMsIFtldmVudF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VwZXIuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcHJvY2VzcyBmcm9tICdwcm9jZXNzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBIb3N0SXRlbSwgU2VydmVySXRlbSB9IGZyb20gJy4uL3R5cGVzL0NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgRW52TmFtZSB9IGZyb20gJy4vRW52TmFtZSc7XG5pbXBvcnQgWUFNTCBmcm9tICd5YW1sJztcblxuY29uc3QgREVGQVVMVF9QT1JUID0gODAwMDtcblxuY29uc3QgWUFNTF9SRSA9IC9eLitcXC4oeWFtbHx5bWwpJC9pO1xuY29uc3QgSlNPTl9SRSA9IC9eLitcXC4oanNvbnxqcykkL2k7XG5cbmV4cG9ydCBjbGFzcyBDb25maWcge1xuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlPzogQ29uZmlnO1xuICAgIHByaXZhdGUgc3RhdGljIGluaXRDb25maWcodXNlckNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHt9KTogUmVxdWlyZWQ8Q29uZmlndXJhdGlvbj4ge1xuICAgICAgICBsZXQgcnVuR29vZ1RyYWNrZXIgPSBmYWxzZTtcbiAgICAgICAgbGV0IGFubm91bmNlR29vZ1RyYWNrZXIgPSBmYWxzZTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgcnVuR29vZ1RyYWNrZXIgPSB0cnVlO1xuICAgICAgICBhbm5vdW5jZUdvb2dUcmFja2VyID0gdHJ1ZTtcbi8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIGxldCBydW5BcHBsVHJhY2tlciA9IGZhbHNlO1xuICAgICAgICBsZXQgYW5ub3VuY2VBcHBsVHJhY2tlciA9IGZhbHNlO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIGNvbnN0IHNlcnZlcjogU2VydmVySXRlbVtdID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgcG9ydDogREVGQVVMVF9QT1JULFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgZGVmYXVsdENvbmZpZzogUmVxdWlyZWQ8Q29uZmlndXJhdGlvbj4gPSB7XG4gICAgICAgICAgICBydW5Hb29nVHJhY2tlcixcbiAgICAgICAgICAgIHJ1bkFwcGxUcmFja2VyLFxuICAgICAgICAgICAgYW5ub3VuY2VHb29nVHJhY2tlcixcbiAgICAgICAgICAgIGFubm91bmNlQXBwbFRyYWNrZXIsXG4gICAgICAgICAgICBzZXJ2ZXIsXG4gICAgICAgICAgICByZW1vdGVIb3N0TGlzdDogW10sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG1lcmdlZCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDb25maWcsIHVzZXJDb25maWcpO1xuICAgICAgICBtZXJnZWQuc2VydmVyID0gbWVyZ2VkLnNlcnZlci5tYXAoKGl0ZW0pID0+IHRoaXMucGFyc2VTZXJ2ZXJJdGVtKGl0ZW0pKTtcbiAgICAgICAgcmV0dXJuIG1lcmdlZDtcbiAgICB9XG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFyc2VTZXJ2ZXJJdGVtKGNvbmZpZzogUGFydGlhbDxTZXJ2ZXJJdGVtPiA9IHt9KTogU2VydmVySXRlbSB7XG4gICAgICAgIGNvbnN0IHNlY3VyZSA9IGNvbmZpZy5zZWN1cmUgfHwgZmFsc2U7XG4gICAgICAgIGNvbnN0IHBvcnQgPSBjb25maWcucG9ydCB8fCAoc2VjdXJlID8gNDQzIDogODApO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29uZmlnLm9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHJlZGlyZWN0VG9TZWN1cmUgPSBjb25maWcucmVkaXJlY3RUb1NlY3VyZSB8fCBmYWxzZTtcbiAgICAgICAgaWYgKHNlY3VyZSAmJiAhb3B0aW9ucykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ011c3QgcHJvdmlkZSBcIm9wdGlvbnNcIiBmb3Igc2VjdXJlIHNlcnZlciBjb25maWd1cmF0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnM/LmNlcnRQYXRoKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jZXJ0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYENhbid0IHVzZSBcImNlcnRcIiBhbmQgXCJjZXJ0UGF0aFwiIHRvZ2V0aGVyYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHRpb25zLmNlcnQgPSB0aGlzLnJlYWRGaWxlKG9wdGlvbnMuY2VydFBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zPy5rZXlQYXRoKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5rZXkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgQ2FuJ3QgdXNlIFwia2V5XCIgYW5kIFwia2V5UGF0aFwiIHRvZ2V0aGVyYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHRpb25zLmtleSA9IHRoaXMucmVhZEZpbGUob3B0aW9ucy5rZXlQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXJ2ZXJJdGVtOiBTZXJ2ZXJJdGVtID0ge1xuICAgICAgICAgICAgc2VjdXJlLFxuICAgICAgICAgICAgcG9ydCxcbiAgICAgICAgICAgIHJlZGlyZWN0VG9TZWN1cmUsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHNlcnZlckl0ZW0ub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiByZWRpcmVjdFRvU2VjdXJlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHNlcnZlckl0ZW0ucmVkaXJlY3RUb1NlY3VyZSA9IHJlZGlyZWN0VG9TZWN1cmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlcnZlckl0ZW07XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQ29uZmlnIHtcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWdQYXRoID0gcHJvY2Vzcy5lbnZbRW52TmFtZS5DT05GSUdfUEFUSF07XG4gICAgICAgICAgICBsZXQgdXNlckNvbmZpZzogQ29uZmlndXJhdGlvbjtcbiAgICAgICAgICAgIGlmICghY29uZmlnUGF0aCkge1xuICAgICAgICAgICAgICAgIHVzZXJDb25maWcgPSB7fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ1BhdGgubWF0Y2goWUFNTF9SRSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckNvbmZpZyA9IFlBTUwucGFyc2UodGhpcy5yZWFkRmlsZShjb25maWdQYXRoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb25maWdQYXRoLm1hdGNoKEpTT05fUkUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJDb25maWcgPSBKU09OLnBhcnNlKHRoaXMucmVhZEZpbGUoY29uZmlnUGF0aCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBVbmtub3duIGZpbGUgdHlwZTogJHtjb25maWdQYXRofWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZ1bGxDb25maWcgPSB0aGlzLmluaXRDb25maWcodXNlckNvbmZpZyk7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IENvbmZpZyhmdWxsQ29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRGaWxlKHBhdGhTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGlzQWJzb2x1dGUgPSBwYXRoU3RyaW5nLnN0YXJ0c1dpdGgoJy8nKTtcbiAgICAgICAgY29uc3QgYWJzb2x1dGVQYXRoID0gaXNBYnNvbHV0ZSA/IHBhdGhTdHJpbmcgOiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcGF0aFN0cmluZyk7XG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhhYnNvbHV0ZVBhdGgpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgQ2FuJ3QgZmluZCBmaWxlIFwiJHthYnNvbHV0ZVBhdGh9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKGFic29sdXRlUGF0aCkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZ1bGxDb25maWc6IFJlcXVpcmVkPENvbmZpZ3VyYXRpb24+KSB7fVxuXG4gICAgcHVibGljIGdldEhvc3RMaXN0KCk6IEhvc3RJdGVtW10ge1xuICAgICAgICBpZiAoIXRoaXMuZnVsbENvbmZpZy5yZW1vdGVIb3N0TGlzdCB8fCAhdGhpcy5mdWxsQ29uZmlnLnJlbW90ZUhvc3RMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhvc3RMaXN0OiBIb3N0SXRlbVtdID0gW107XG4gICAgICAgIHRoaXMuZnVsbENvbmZpZy5yZW1vdGVIb3N0TGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGhvc3RuYW1lLCBwb3J0LCBwYXRobmFtZSwgc2VjdXJlLCB1c2VQcm94eSB9ID0gaXRlbTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0udHlwZSkpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnR5cGUuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBob3N0TGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvc3RuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VjdXJlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlUHJveHksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaG9zdExpc3QucHVzaCh7IGhvc3RuYW1lLCBwb3J0LCBwYXRobmFtZSwgc2VjdXJlLCB1c2VQcm94eSwgdHlwZTogaXRlbS50eXBlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGhvc3RMaXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcnVuTG9jYWxHb29nVHJhY2tlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnVsbENvbmZpZy5ydW5Hb29nVHJhY2tlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGFubm91bmNlTG9jYWxHb29nVHJhY2tlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnVsbENvbmZpZy5ydW5Hb29nVHJhY2tlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJ1bkxvY2FsQXBwbFRyYWNrZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bGxDb25maWcucnVuQXBwbFRyYWNrZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhbm5vdW5jZUxvY2FsQXBwbFRyYWNrZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bGxDb25maWcucnVuQXBwbFRyYWNrZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXJ2ZXJzKCk6IFNlcnZlckl0ZW1bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bGxDb25maWcuc2VydmVyO1xuICAgIH1cbn1cbiIsImV4cG9ydCBlbnVtIEVudk5hbWUge1xyXG4gICAgQ09ORklHX1BBVEggPSAnV1NfU0NSQ1BZX0NPTkZJRycsXHJcbiAgICBXU19TQ1JDUFlfUEFUSE5BTUUgPSAnV1NfU0NSQ1BZX1BBVEhOQU1FJyxcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gICAgcHVibGljIHN0YXRpYyBwcmludExpc3RlbmluZ01zZyhwcm90bzogc3RyaW5nLCBwb3J0OiBudW1iZXIsIHBhdGhuYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpcHY0TGlzdDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBjb25zdCBpcHY2TGlzdDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBjb25zdCBmb3JtYXRBZGRyZXNzID0gKGlwOiBzdHJpbmcsIHNjb3BlaWQ6IG51bWJlciB8IHVuZGVmaW5lZCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjb3BlaWQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpcHY0TGlzdC5wdXNoKGAke3Byb3RvfTovLyR7aXB9OiR7cG9ydH0ke3BhdGhuYW1lfWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzY29wZWlkID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpcHY2TGlzdC5wdXNoKGAke3Byb3RvfTovL1ske2lwfV06JHtwb3J0fSR7cGF0aG5hbWV9YCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvLyBza2lwXHJcbiAgICAgICAgICAgICAgICAvLyBpcHY2TGlzdC5wdXNoKGAke3Byb3RvfTovL1ske2lwfSUke3Njb3BlaWR9XToke3BvcnR9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9zLm5ldHdvcmtJbnRlcmZhY2VzKCkpXHJcbiAgICAgICAgICAgIC5tYXAoKGtleSkgPT4gb3MubmV0d29ya0ludGVyZmFjZXMoKVtrZXldKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaW5mby5mb3JFYWNoKChpZmFjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY29wZWlkOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlmYWNlLmZhbWlseSA9PT0gJ0lQdjYnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlaWQgPSBpZmFjZS5zY29wZWlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaWZhY2UuZmFtaWx5ID09PSAnSVB2NCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGVpZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdEFkZHJlc3MoaWZhY2UuYWRkcmVzcywgc2NvcGVpZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1NjcmVlbiBzZXJ2ZXIgc3RhcnRlZCAnICk7XHJcbiAgICAgICAvKiBjb25zdCBuYW1lTGlzdCA9IFtcclxuICAgICAgICAgICAgZW5jb2RlVVJJKGAke3Byb3RvfTovLyR7b3MuaG9zdG5hbWUoKX06JHtwb3J0fSR7cGF0aG5hbWV9YCksXHJcbiAgICAgICAgICAgIGVuY29kZVVSSShgJHtwcm90b306Ly9sb2NhbGhvc3Q6JHtwb3J0fSR7cGF0aG5hbWV9YCksXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zb2xlLmxvZygnTGlzdGVuaW5nIG9uOlxcblxcdCcgKyBuYW1lTGlzdC5qb2luKCcgJykpO1xyXG4gICAgICAgIGlmIChpcHY0TGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1xcdCcgKyBpcHY0TGlzdC5qb2luKCcgJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXB2Nkxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdcXHQnICsgaXB2Nkxpc3Quam9pbignICcpKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwb3J0ZmluZGVyIGZyb20gJ3BvcnRmaW5kZXInO1xyXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBBQ1RJT04gfSBmcm9tICcuLi8uLi9jb21tb24vQWN0aW9uJztcclxuaW1wb3J0IHsgQWRiRXh0ZW5kZWQgfSBmcm9tICcuL2FkYic7XHJcbmltcG9ydCB7IERldnRvb2xzSW5mbywgUmVtb3RlQnJvd3NlckluZm8sIFJlbW90ZVRhcmdldCwgVmVyc2lvbk1ldGFkYXRhIH0gZnJvbSAnLi4vLi4vdHlwZXMvUmVtb3RlRGV2dG9vbHMnO1xyXG5pbXBvcnQgeyBVUkwgfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgeyBGb3J3YXJkIH0gZnJvbSAnQGRlYWQ1MGY3L2FkYmtpdC9saWIvRm9yd2FyZCc7XHJcbmltcG9ydCBFbnRyeSBmcm9tICdAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGIvc3luYy9lbnRyeSc7XHJcbmltcG9ydCBTdGF0cyBmcm9tICdAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGIvc3luYy9zdGF0cyc7XHJcbmltcG9ydCBQdWxsVHJhbnNmZXIgZnJvbSAnQGRlYWQ1MGY3L2FkYmtpdC9saWIvYWRiL3N5bmMvcHVsbHRyYW5zZmVyJztcclxuaW1wb3J0IHsgRmlsZVN0YXRzIH0gZnJvbSAnLi4vLi4vdHlwZXMvRmlsZVN0YXRzJztcclxuaW1wb3J0IFByb3RvY29sIGZyb20gJ0BkZWFkNTBmNy9hZGJraXQvbGliL2FkYi9wcm90b2NvbCc7XHJcbmltcG9ydCB7IE11bHRpcGxleGVyIH0gZnJvbSAnLi4vLi4vcGFja2FnZXMvbXVsdGlwbGV4ZXIvTXVsdGlwbGV4ZXInO1xyXG5pbXBvcnQgeyBSZWFkU3RyZWFtIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgUHVzaFRyYW5zZmVyIGZyb20gJ0BkZWFkNTBmNy9hZGJraXQvbGliL2FkYi9zeW5jL3B1c2h0cmFuc2Zlcic7XHJcblxyXG50eXBlIEluY29taW5nTWVzc2FnZSA9IHtcclxuICAgIHN0YXR1c0NvZGU/OiBudW1iZXI7XHJcbiAgICBjb250ZW50VHlwZT86IHN0cmluZztcclxuICAgIGJvZHk6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IHByb3RvID0gJ2h0dHA6Ly8nO1xyXG5jb25zdCBmYWtlSG9zdCA9ICcxMjcuMC4wLjE6NjY2Nic7XHJcbmNvbnN0IGZha2VIb3N0UmUgPSAvMTI3XFwuMFxcLjBcXC4xOjY2NjYvO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFkYlV0aWxzIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIGZvcm1hdFN0YXRzTWluKGVudHJ5OiBFbnRyeSk6IFByb21pc2U8RmlsZVN0YXRzPiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcclxuICAgICAgICAgICAgaXNEaXI6IGVudHJ5LmlzRGlyZWN0b3J5KCkgPyAxIDogMCxcclxuICAgICAgICAgICAgc2l6ZTogZW50cnkuc2l6ZSxcclxuICAgICAgICAgICAgZGF0ZU1vZGlmaWVkOiBlbnRyeS5tdGltZU1zID8gZW50cnkubXRpbWVNcyA6IGVudHJ5Lm10aW1lLmdldFRpbWUoKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcHVzaChzZXJpYWw6IHN0cmluZywgc3RyZWFtOiBSZWFkU3RyZWFtLCBwYXRoU3RyaW5nOiBzdHJpbmcpOiBQcm9taXNlPFB1c2hUcmFuc2Zlcj4ge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IEFkYkV4dGVuZGVkLmNyZWF0ZUNsaWVudCgpO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZmVyID0gYXdhaXQgY2xpZW50LnB1c2goc2VyaWFsLCBzdHJlYW0sIHBhdGhTdHJpbmcpO1xyXG4gICAgICAgIGNsaWVudC5vbignZXJyb3InLCAoZXJyb3I6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIHRyYW5zZmVyLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cmFuc2ZlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHN0YXRzKHNlcmlhbDogc3RyaW5nLCBwYXRoU3RyaW5nOiBzdHJpbmcsIHN0YXRzPzogU3RhdHMsIGRlZXAgPSAwKTogUHJvbWlzZTxTdGF0cz4ge1xyXG4gICAgICAgIGlmICghc3RhdHMgfHwgKHN0YXRzLmlzU3ltYm9saWNMaW5rKCkgJiYgcGF0aFN0cmluZy5lbmRzV2l0aCgnLycpKSkge1xyXG4gICAgICAgICAgICBjb25zdCBjbGllbnQgPSBBZGJFeHRlbmRlZC5jcmVhdGVDbGllbnQoKTtcclxuICAgICAgICAgICAgc3RhdHMgPSBhd2FpdCBjbGllbnQuc3RhdChzZXJpYWwsIHBhdGhTdHJpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdHMuaXNTeW1ib2xpY0xpbmsoKSkge1xyXG4gICAgICAgICAgICBpZiAoZGVlcCA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RvbyBkZWVwJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFwYXRoU3RyaW5nLmVuZHNXaXRoKCcvJykpIHtcclxuICAgICAgICAgICAgICAgIHBhdGhTdHJpbmcgKz0gJy8nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0cyA9IGF3YWl0IHRoaXMuc3RhdHMoc2VyaWFsLCBwYXRoU3RyaW5nLCBzdGF0cywgZGVlcCsrKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UgPT09ICdUb28gZGVlcCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVlcCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBTeW1saW5rIGlzIHRvbyBkZWVwOiAke3BhdGhTdHJpbmd9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0cztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSAhPT0gJ0VOT0VOVCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0cztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YXRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmVhZGRpcihzZXJpYWw6IHN0cmluZywgcGF0aFN0cmluZzogc3RyaW5nKTogUHJvbWlzZTxGaWxlU3RhdHNbXT4ge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IEFkYkV4dGVuZGVkLmNyZWF0ZUNsaWVudCgpO1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBhd2FpdCBjbGllbnQucmVhZGRpcihzZXJpYWwsIHBhdGhTdHJpbmcpO1xyXG4gICAgICAgIGNvbnN0IGFsbCA9IGxpc3QubWFwKGFzeW5jIChlbnRyeSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZW50cnkuaXNTeW1ib2xpY0xpbmsoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IHRoaXMuc3RhdHMoc2VyaWFsLCBwYXRoLmpvaW4ocGF0aFN0cmluZywgZW50cnkubmFtZSkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXRpbWUgPSBzdGF0Lm10aW1lTXMgPyBzdGF0Lm10aW1lTXMgOiBzdGF0Lm10aW1lLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIGVudHJ5ID0gbmV3IEVudHJ5KGVudHJ5Lm5hbWUsIHN0YXQubW9kZSwgc3RhdC5zaXplLCAobXRpbWUgLyAxMDAwKSB8IDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBBZGJVdGlscy5mb3JtYXRTdGF0c01pbihlbnRyeSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGFsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBwaXBlUHVsbEZpbGUoc2VyaWFsOiBzdHJpbmcsIHBhdGhTdHJpbmc6IHN0cmluZyk6IFByb21pc2U8UHVsbFRyYW5zZmVyPiB7XHJcbiAgICAgICAgY29uc3QgY2xpZW50ID0gQWRiRXh0ZW5kZWQuY3JlYXRlQ2xpZW50KCk7XHJcbiAgICAgICAgY29uc3QgdHJhbnNmZXIgPSBhd2FpdCBjbGllbnQucHVsbChzZXJpYWwsIHBhdGhTdHJpbmcpO1xyXG5cclxuICAgICAgICB0cmFuc2Zlci5vbigncHJvZ3Jlc3MnLCBmdW5jdGlvbiAoc3RhdHMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1slc10gWyVzXSBQdWxsZWQgJWQgYnl0ZXMgc28gZmFyJywgc2VyaWFsLCBwYXRoU3RyaW5nLCBzdGF0cy5ieXRlc1RyYW5zZmVycmVkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0cmFuc2Zlci5vbignZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWyVzXSBbJXNdIFB1bGwgY29tcGxldGUnLCBzZXJpYWwsIHBhdGhTdHJpbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRyYW5zZmVyLm9uKCdyZWFkYWJsZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJhbnNmZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdHJhbnNmZXIub24oJ2Vycm9yJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBwaXBlU3RhdFRvU3RyZWFtKHNlcmlhbDogc3RyaW5nLCBwYXRoU3RyaW5nOiBzdHJpbmcsIHN0cmVhbTogTXVsdGlwbGV4ZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBjbGllbnQgPSBBZGJFeHRlbmRlZC5jcmVhdGVDbGllbnQoKTtcclxuICAgICAgICByZXR1cm4gY2xpZW50LnBpcGVTdGF0KHNlcmlhbCwgcGF0aFN0cmluZywgc3RyZWFtKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHBpcGVSZWFkRGlyVG9TdHJlYW0oc2VyaWFsOiBzdHJpbmcsIHBhdGhTdHJpbmc6IHN0cmluZywgc3RyZWFtOiBNdWx0aXBsZXhlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IEFkYkV4dGVuZGVkLmNyZWF0ZUNsaWVudCgpO1xyXG4gICAgICAgIHJldHVybiBjbGllbnQucGlwZVJlYWREaXIoc2VyaWFsLCBwYXRoU3RyaW5nLCBzdHJlYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgcGlwZVB1bGxGaWxlVG9TdHJlYW0oc2VyaWFsOiBzdHJpbmcsIHBhdGhTdHJpbmc6IHN0cmluZywgc3RyZWFtOiBNdWx0aXBsZXhlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IEFkYkV4dGVuZGVkLmNyZWF0ZUNsaWVudCgpO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zZmVyID0gYXdhaXQgY2xpZW50LnB1bGwoc2VyaWFsLCBwYXRoU3RyaW5nKTtcclxuICAgICAgICB0cmFuc2Zlci5vbignZGF0YScsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHN0cmVhbS5zZW5kKEJ1ZmZlci5jb25jYXQoW0J1ZmZlci5mcm9tKFByb3RvY29sLkRBVEEsICdhc2NpaScpLCBkYXRhXSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRyYW5zZmVyLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW0uc2VuZChCdWZmZXIuZnJvbShQcm90b2NvbC5ET05FLCAnYXNjaWknKSk7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW0uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRyYW5zZmVyLm9uKCdlcnJvcicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgZm9yd2FyZChzZXJpYWw6IHN0cmluZywgcmVtb3RlOiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IEFkYkV4dGVuZGVkLmNyZWF0ZUNsaWVudCgpO1xyXG4gICAgICAgIGNvbnN0IGZvcndhcmRzID0gYXdhaXQgY2xpZW50Lmxpc3RGb3J3YXJkcyhzZXJpYWwpO1xyXG4gICAgICAgIGNvbnN0IGZvcndhcmQgPSBmb3J3YXJkcy5maW5kKChpdGVtOiBGb3J3YXJkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnJlbW90ZSA9PT0gcmVtb3RlICYmIGl0ZW0ubG9jYWwuc3RhcnRzV2l0aCgndGNwOicpICYmIGl0ZW0uc2VyaWFsID09PSBzZXJpYWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGZvcndhcmQpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBsb2NhbCB9ID0gZm9yd2FyZDtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGxvY2FsLnNwbGl0KCd0Y3A6JylbMV0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcG9ydCA9IGF3YWl0IHBvcnRmaW5kZXIuZ2V0UG9ydFByb21pc2UoKTtcclxuICAgICAgICBjb25zdCBsb2NhbCA9IGB0Y3A6JHtwb3J0fWA7XHJcbiAgICAgICAgYXdhaXQgY2xpZW50LmZvcndhcmQoc2VyaWFsLCBsb2NhbCwgcmVtb3RlKTtcclxuICAgICAgICByZXR1cm4gcG9ydDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldERldnRvb2xzUmVtb3RlTGlzdChzZXJpYWw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcclxuICAgICAgICBjb25zdCBjbGllbnQgPSBBZGJFeHRlbmRlZC5jcmVhdGVDbGllbnQoKTtcclxuICAgICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBjbGllbnQuc2hlbGwoc2VyaWFsLCAnY2F0IC9wcm9jL25ldC91bml4Jyk7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgQWRiRXh0ZW5kZWQudXRpbC5yZWFkQWxsKHN0cmVhbSk7XHJcbiAgICAgICAgY29uc3QgbGluZXMgPSBidWZmZXJcclxuICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgLnNwbGl0KCdcXG4nKVxyXG4gICAgICAgICAgICAuZmlsdGVyKChzOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzLmluY2x1ZGVzKCdkZXZ0b29sc19yZW1vdGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgbmFtZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBsaW5lLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgIGlmICh0ZW1wLmxlbmd0aCAhPT0gOCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0ZW1wWzVdID09PSAnMDEnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gdGVtcFs3XS5zdWJzdHIoMSk7XHJcbiAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5hbWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIGNyZWF0ZUh0dHBSZXF1ZXN0KFxyXG4gICAgICAgIHNlcmlhbDogc3RyaW5nLFxyXG4gICAgICAgIHVuaXhTb2NrZXROYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgdXJsOiBzdHJpbmcsXHJcbiAgICApOiBQcm9taXNlPEluY29taW5nTWVzc2FnZT4ge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IEFkYkV4dGVuZGVkLmNyZWF0ZUNsaWVudCgpO1xyXG4gICAgICAgIGNvbnN0IHNvY2tldCA9IGF3YWl0IGNsaWVudC5vcGVuTG9jYWwoc2VyaWFsLCBgbG9jYWxhYnN0cmFjdDoke3VuaXhTb2NrZXROYW1lfWApO1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgKGh0dHAuQ2xpZW50UmVxdWVzdCBhcyBhbnkpKHVybCwge1xyXG4gICAgICAgICAgICBjcmVhdGVDb25uZWN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc29ja2V0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2U6IGh0dHAuSW5jb21pbmdNZXNzYWdlID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uKCdyZXNwb25zZScsIChyOiBodHRwLkluY29taW5nTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub24oJ3NvY2tldCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QuZW5kKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIChlcnJvcjogRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBkYXRhID0gJyc7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbWVzc2FnZS5vbignZGF0YScsIChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhICs9IGQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtZXNzYWdlLm9uKCdlbmQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBtZXNzYWdlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1lc3NhZ2Uub24oJ2Vycm9yJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGFyc2VSZXNwb25zZTxUPihtZXNzYWdlOiBJbmNvbWluZ01lc3NhZ2UpOiBUIHtcclxuICAgICAgICBpZiAoIW1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ2VtcHR5IHJlc3BvbnNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHsgY29udGVudFR5cGUsIHN0YXR1c0NvZGUgfSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0dXNDb2RlICE9PSAnbnVtYmVyJyB8fCBzdGF0dXNDb2RlICE9PSAyMDApIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYHdyb25nIHN0YXR1cyBjb2RlOiAke3N0YXR1c0NvZGV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29udGVudFR5cGU/LnN0YXJ0c1dpdGgoJ2FwcGxpY2F0aW9uL2pzb24nKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgd3JvbmcgY29udGVudCB0eXBlOiAke2NvbnRlbnRUeXBlfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShtZXNzYWdlLmJvZHkpO1xyXG4gICAgICAgIHJldHVybiBqc29uIGFzIFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGF0Y2hXZWJTb2NrZXREZWJ1Z2dlclVybChob3N0OiBzdHJpbmcsIHNlcmlhbDogc3RyaW5nLCBzb2NrZXQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVtb3RlID0gYGxvY2FsYWJzdHJhY3Q6JHtzb2NrZXR9YDtcclxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHVybC5yZXBsYWNlKC93czpcXC9cXC8vLCAnJykucmVwbGFjZShmYWtlSG9zdFJlLCAnJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtob3N0fS8ke0FDVElPTi5QUk9YWV9BREJ9LyR7c2VyaWFsfS8ke3JlbW90ZX0vJHtwYXRofWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBnZXRSZW1vdGVEZXZ0b29sc1ZlcnNpb24oXHJcbiAgICAgICAgaG9zdDogc3RyaW5nLFxyXG4gICAgICAgIHNlcmlhbDogc3RyaW5nLFxyXG4gICAgICAgIHNvY2tldDogc3RyaW5nLFxyXG4gICAgKTogUHJvbWlzZTxWZXJzaW9uTWV0YWRhdGE+IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5jcmVhdGVIdHRwUmVxdWVzdChzZXJpYWwsIHNvY2tldCwgYCR7cHJvdG99JHtmYWtlSG9zdH0vanNvbi92ZXJzaW9uYCk7XHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdFbXB0eSByZXNwb25zZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMucGFyc2VSZXNwb25zZTxWZXJzaW9uTWV0YWRhdGE+KGRhdGEpO1xyXG4gICAgICAgIGlmIChtZXRhZGF0YS53ZWJTb2NrZXREZWJ1Z2dlclVybCkge1xyXG4gICAgICAgICAgICBtZXRhZGF0YS53ZWJTb2NrZXREZWJ1Z2dlclVybCA9IHRoaXMucGF0Y2hXZWJTb2NrZXREZWJ1Z2dlclVybChcclxuICAgICAgICAgICAgICAgIGhvc3QsXHJcbiAgICAgICAgICAgICAgICBzZXJpYWwsXHJcbiAgICAgICAgICAgICAgICBzb2NrZXQsXHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YS53ZWJTb2NrZXREZWJ1Z2dlclVybCxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1ldGFkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgZ2V0UmVtb3RlRGV2dG9vbHNUYXJnZXRzKFxyXG4gICAgICAgIGhvc3Q6IHN0cmluZyxcclxuICAgICAgICBzZXJpYWw6IHN0cmluZyxcclxuICAgICAgICBzb2NrZXQ6IHN0cmluZyxcclxuICAgICk6IFByb21pc2U8UmVtb3RlVGFyZ2V0W10+IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5jcmVhdGVIdHRwUmVxdWVzdChzZXJpYWwsIHNvY2tldCwgYCR7cHJvdG99JHtmYWtlSG9zdH0vanNvbmApO1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcnNlUmVzcG9uc2U8UmVtb3RlVGFyZ2V0W10+KGRhdGEpO1xyXG4gICAgICAgIGlmICghbGlzdCB8fCAhbGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlzdC5tYXAoKHRhcmdldCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRldnRvb2xzRnJvbnRlbmRVcmwsIHdlYlNvY2tldERlYnVnZ2VyVXJsIH0gPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIGlmIChkZXZ0b29sc0Zyb250ZW5kVXJsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRldnRvb2xzRnJvbnRlbmRVcmw7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVuZGxlZE9uRGV2aWNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3cyA9IHRoaXMucGF0Y2hXZWJTb2NrZXREZWJ1Z2dlclVybChob3N0LCBzZXJpYWwsIHNvY2tldCwgd2ViU29ja2V0RGVidWdnZXJVcmwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGVtcC5zdGFydHNXaXRoKCdodHRwJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBidW5kbGVkT25EZXZpY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSBgJHtwcm90b30ke2Zha2VIb3N0fSR7dGVtcH1gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh0ZW1wKTtcclxuICAgICAgICAgICAgICAgIC8vIGRvbid0IHVzZSBgdXJsLnNlYXJjaFBhcmFtcy5zZXRgIGhlcmUsIGFyZ3VtZW50IHdpbGwgYmUgdXJsLWVuY29kZWRcclxuICAgICAgICAgICAgICAgIC8vIGNocm9tZS1kZXZ0b29scy5mcm9udGVkIHdpbGwgbm93IHdvcmsgd2l0aCB1cmwtZW5jb2RlZCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoJ3dzJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsU3RyaW5nID0gdXJsLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodXJsU3RyaW5nLmluY2x1ZGVzKCc/JykpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxTdHJpbmcgKz0gJyYnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxTdHJpbmcgKz0gJz8nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdXJsU3RyaW5nICs9IGB3cz0ke3dzfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1bmRsZWRPbkRldmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybFN0cmluZyA9IHVybFN0cmluZy5zdWJzdHIoYCR7cHJvdG99JHtmYWtlSG9zdH1gLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuZGV2dG9vbHNGcm9udGVuZFVybCA9IHVybFN0cmluZztcclxuICAgICAgICAgICAgICAgIHRhcmdldC53ZWJTb2NrZXREZWJ1Z2dlclVybCA9IHdzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBnZXRSZW1vdGVEZXZ0b29sc0luZm8oaG9zdDogc3RyaW5nLCBzZXJpYWw6IHN0cmluZyk6IFByb21pc2U8RGV2dG9vbHNJbmZvPiB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IHRoaXMuZ2V0RGV2dG9vbHNSZW1vdGVMaXN0KHNlcmlhbCk7XHJcbiAgICAgICAgaWYgKCFsaXN0IHx8ICFsaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBkZXZpY2VOYW1lID0gYXdhaXQgdGhpcy5nZXREZXZpY2VOYW1lKHNlcmlhbCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkZXZpY2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgZGV2aWNlU2VyaWFsOiBzZXJpYWwsXHJcbiAgICAgICAgICAgICAgICBicm93c2VyczogW10sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhbGw6IFByb21pc2U8c3RyaW5nIHwgUmVtb3RlQnJvd3NlckluZm8+W10gPSBbXTtcclxuICAgICAgICBsaXN0LmZvckVhY2goKHNvY2tldCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2ID0gdGhpcy5nZXRSZW1vdGVEZXZ0b29sc1ZlcnNpb24oaG9zdCwgc2VyaWFsLCBzb2NrZXQpLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldFJlbW90ZURldnRvb2xzVmVyc2lvbiBmYWlsZWQ6JywgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICdBbmRyb2lkLVBhY2thZ2UnOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgICAgICBCcm93c2VyOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgICAgICAnUHJvdG9jb2wtVmVyc2lvbic6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICdVc2VyLUFnZW50JzogJ3N0cmluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ1Y4LVZlcnNpb24nOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgICAgICAnV2ViS2l0LVZlcnNpb24nOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgICAgICB3ZWJTb2NrZXREZWJ1Z2dlclVybDogJ3N0cmluZycsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgdCA9IHRoaXMuZ2V0UmVtb3RlRGV2dG9vbHNUYXJnZXRzKGhvc3QsIHNlcmlhbCwgc29ja2V0KS5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdnZXRSZW1vdGVEZXZ0b29sc1RhcmdldHMgZmFpbGVkOicsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgcCA9IFByb21pc2UuYWxsKFt2LCB0XSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbdmVyc2lvbiwgdGFyZ2V0c10gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvY2tldCxcclxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWxsLnB1c2gocCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWxsLnVuc2hpZnQodGhpcy5nZXREZXZpY2VOYW1lKHNlcmlhbCkpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IFByb21pc2UuYWxsKGFsbCk7XHJcbiAgICAgICAgY29uc3QgZGV2aWNlTmFtZTogc3RyaW5nID0gcmVzdWx0LnNoaWZ0KCkgYXMgc3RyaW5nO1xyXG4gICAgICAgIGNvbnN0IGJyb3dzZXJzOiBSZW1vdGVCcm93c2VySW5mb1tdID0gcmVzdWx0IGFzIFJlbW90ZUJyb3dzZXJJbmZvW107XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGV2aWNlTmFtZSxcclxuICAgICAgICAgICAgZGV2aWNlU2VyaWFsOiBzZXJpYWwsXHJcbiAgICAgICAgICAgIGJyb3dzZXJzLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBnZXREZXZpY2VOYW1lKHNlcmlhbDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCBjbGllbnQgPSBBZGJFeHRlbmRlZC5jcmVhdGVDbGllbnQoKTtcclxuICAgICAgICBjb25zdCBwcm9wcyA9IGF3YWl0IGNsaWVudC5nZXRQcm9wZXJ0aWVzKHNlcmlhbCk7XHJcbiAgICAgICAgcmV0dXJuIHByb3BzWydyby5wcm9kdWN0Lm1vZGVsJ10gfHwgJ1Vua25vd24gZGV2aWNlJztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBZGJFeHRlbmRlZCB9IGZyb20gJy4vYWRiJztcclxuaW1wb3J0IEFkYktpdENsaWVudCBmcm9tICdAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGIvY2xpZW50JztcclxuaW1wb3J0IFB1c2hUcmFuc2ZlciBmcm9tICdAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGIvc3luYy9wdXNodHJhbnNmZXInO1xyXG5pbXBvcnQgeyBzcGF3biB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xyXG5pbXBvcnQgeyBOZXRJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi90eXBlcy9OZXRJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUeXBlZEVtaXR0ZXIgfSBmcm9tICcuLi8uLi9jb21tb24vVHlwZWRFbWl0dGVyJztcclxuaW1wb3J0IEdvb2dEZXZpY2VEZXNjcmlwdG9yIGZyb20gJy4uLy4uL3R5cGVzL0dvb2dEZXZpY2VEZXNjcmlwdG9yJztcclxuaW1wb3J0IHsgU2NyY3B5U2VydmVyIH0gZnJvbSAnLi9TY3JjcHlTZXJ2ZXInO1xyXG5pbXBvcnQgeyBQcm9wZXJ0aWVzIH0gZnJvbSAnLi9Qcm9wZXJ0aWVzJztcclxuaW1wb3J0IFRpbWVvdXQgPSBOb2RlSlMuVGltZW91dDtcclxuXHJcbmVudW0gUElEX0RFVEVDVElPTiB7XHJcbiAgICBVTktOT1dOLFxyXG4gICAgUElET0YsXHJcbiAgICBHUkVQX1BTLFxyXG4gICAgR1JFUF9QU19BLFxyXG4gICAgTFNfUFJPQyxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEZXZpY2VFdmVudHMge1xyXG4gICAgdXBkYXRlOiBEZXZpY2U7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZXZpY2UgZXh0ZW5kcyBUeXBlZEVtaXR0ZXI8RGV2aWNlRXZlbnRzPiB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTklUSUFMX1VQREFURV9USU1FT1VUID0gMTUwMDtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE1BWF9VUERBVEVTX0NPVU5UID0gNztcclxuICAgIHByaXZhdGUgY29ubmVjdGVkID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgcGlkRGV0ZWN0aW9uVmFyaWFudDogUElEX0RFVEVDVElPTiA9IFBJRF9ERVRFQ1RJT04uVU5LTk9XTjtcclxuICAgIHByaXZhdGUgY2xpZW50OiBBZGJLaXRDbGllbnQ7XHJcbiAgICBwcml2YXRlIHByb3BlcnRpZXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG4gICAgcHJpdmF0ZSBzcGF3blNlcnZlciA9IHRydWU7XHJcbiAgICBwcml2YXRlIHVwZGF0ZVRpbWVvdXRJZD86IFRpbWVvdXQ7XHJcbiAgICBwcml2YXRlIHVwZGF0ZVRpbWVvdXQgPSBEZXZpY2UuSU5JVElBTF9VUERBVEVfVElNRU9VVDtcclxuICAgIHByaXZhdGUgdXBkYXRlQ291bnQgPSAwO1xyXG4gICAgcHJpdmF0ZSB0aHJvdHRsZVRpbWVvdXRJZD86IFRpbWVvdXQ7XHJcbiAgICBwcml2YXRlIGxhc3RFbWl0ID0gMDtcclxuICAgIHB1YmxpYyByZWFkb25seSBUQUc6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBkZXNjcmlwdG9yOiBHb29nRGV2aWNlRGVzY3JpcHRvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdWRpZDogc3RyaW5nLCBzdGF0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlRBRyA9IGBbJHt1ZGlkfV1gO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRvciA9IHtcclxuICAgICAgICAgICAgdWRpZCxcclxuICAgICAgICAgICAgc3RhdGUsXHJcbiAgICAgICAgICAgIGludGVyZmFjZXM6IFtdLFxyXG4gICAgICAgICAgICBwaWQ6IC0xLFxyXG4gICAgICAgICAgICAnd2lmaS5pbnRlcmZhY2UnOiAnJyxcclxuICAgICAgICAgICAgJ3JvLmJ1aWxkLnZlcnNpb24ucmVsZWFzZSc6ICcnLFxyXG4gICAgICAgICAgICAncm8uYnVpbGQudmVyc2lvbi5zZGsnOiAnJyxcclxuICAgICAgICAgICAgJ3JvLnByb2R1Y3QubWFudWZhY3R1cmVyJzogJycsXHJcbiAgICAgICAgICAgICdyby5wcm9kdWN0Lm1vZGVsJzogJycsXHJcbiAgICAgICAgICAgICdyby5wcm9kdWN0LmNwdS5hYmknOiAnJyxcclxuICAgICAgICAgICAgJ2xhc3QudXBkYXRlLnRpbWVzdGFtcCc6IDAsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNsaWVudCA9IEFkYkV4dGVuZGVkLmNyZWF0ZUNsaWVudCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTdGF0ZShzdGF0ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHN0YXRlID09PSAnZGV2aWNlJykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRlc2NyaXB0b3Iuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLmVtaXRVcGRhdGUoKTtcclxuICAgICAgICB0aGlzLmZldGNoRGV2aWNlSW5mbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0Nvbm5lY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldFBpZE9mKHByb2Nlc3NOYW1lOiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdIHwgdW5kZWZpbmVkPiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBpZERldGVjdGlvblZhcmlhbnQgPT09IFBJRF9ERVRFQ1RJT04uVU5LTk9XTikge1xyXG4gICAgICAgICAgICB0aGlzLnBpZERldGVjdGlvblZhcmlhbnQgPSBhd2FpdCB0aGlzLmZpbmREZXRlY3Rpb25WYXJpYW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5waWREZXRlY3Rpb25WYXJpYW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgUElEX0RFVEVDVElPTi5QSURPRjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpZE9mKHByb2Nlc3NOYW1lKTtcclxuICAgICAgICAgICAgY2FzZSBQSURfREVURUNUSU9OLkdSRVBfUFM6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ncmVwUHMocHJvY2Vzc05hbWUpO1xyXG4gICAgICAgICAgICBjYXNlIFBJRF9ERVRFQ1RJT04uR1JFUF9QU19BOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ3JlcFBzX0EocHJvY2Vzc05hbWUpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdFByb2MocHJvY2Vzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMga2lsbFByb2Nlc3MocGlkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBga2lsbCAke3BpZH1gO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJ1blNoZWxsQ29tbWFuZEFkYktpdChjb21tYW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgcnVuU2hlbGxDb21tYW5kQWRiKGNvbW1hbmQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjbWQgPSAnYWRiJztcclxuICAgICAgICAgICAgY29uc3QgYXJncyA9IFsnLXMnLCBgJHt0aGlzLnVkaWR9YCwgJ3NoZWxsJywgY29tbWFuZF07XHJcbiAgICAgICAgICAgIGNvbnN0IGFkYiA9IHNwYXduKGNtZCwgYXJncywgeyBzdGRpbzogWydpZ25vcmUnLCAncGlwZScsICdwaXBlJ10gfSk7XHJcbiAgICAgICAgICAgIGxldCBvdXRwdXQgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGFkYi5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGEudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuVEFHLCBgc3Rkb3V0OiAke2RhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cXG4kLywgJycpfWApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFkYi5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLlRBRywgYHN0ZGVycjogJHtkYXRhfWApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFkYi5vbignZXJyb3InLCAoZXJyb3I6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuVEFHLCBgZmFpbGVkIHRvIHNwYXduIGFkYiBwcm9jZXNzLlxcbiR7ZXJyb3Iuc3RhY2t9YCk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFkYi5vbignY2xvc2UnLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5UQUcsIGBhZGIgcHJvY2VzcyAoJHthcmdzLmpvaW4oJyAnKX0pIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfWApO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShvdXRwdXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgcnVuU2hlbGxDb21tYW5kQWRiS2l0KGNvbW1hbmQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50XHJcbiAgICAgICAgICAgIC5zaGVsbCh0aGlzLnVkaWQsIGNvbW1hbmQpXHJcbiAgICAgICAgICAgIC50aGVuKEFkYkV4dGVuZGVkLnV0aWwucmVhZEFsbClcclxuICAgICAgICAgICAgLnRoZW4oKG91dHB1dDogQnVmZmVyKSA9PiBvdXRwdXQudG9TdHJpbmcoKS50cmltKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBwdXNoKGNvbnRlbnRzOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8UHVzaFRyYW5zZmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LnB1c2godGhpcy51ZGlkLCBjb250ZW50cywgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldFByb3BlcnRpZXMoKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgdW5kZWZpbmVkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gYXdhaXQgdGhpcy5jbGllbnQuZ2V0UHJvcGVydGllcyh0aGlzLnVkaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbnRlcmZhY2VzU29ydCA9IChhOiBOZXRJbnRlcmZhY2UsIGI6IE5ldEludGVyZmFjZSk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgaWYgKGEubmFtZSA+IGIubmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0TmV0SW50ZXJmYWNlcygpOiBQcm9taXNlPE5ldEludGVyZmFjZVtdPiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxpc3Q6IE5ldEludGVyZmFjZVtdID0gW107XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgdGhpcy5ydW5TaGVsbENvbW1hbmRBZGJLaXQoYGlwIC00IC1mIGluZXQgLW8gYSB8IGdyZXAgJ3Njb3BlIGdsb2JhbCdgKTtcclxuICAgICAgICBjb25zdCBsaW5lcyA9IG91dHB1dC5zcGxpdCgnXFxuJykuZmlsdGVyKChpOiBzdHJpbmcpID0+ICEhaSk7XHJcbiAgICAgICAgbGluZXMuZm9yRWFjaCgodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gdmFsdWUuc3BsaXQoJyAnKS5maWx0ZXIoKGk6IHN0cmluZykgPT4gISFpKTtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRlbXBbMV07XHJcbiAgICAgICAgICAgIGNvbnN0IGlwQW5kTWFzayA9IHRlbXBbM107XHJcbiAgICAgICAgICAgIGNvbnN0IGlwdjQgPSBpcEFuZE1hc2suc3BsaXQoJy8nKVswXTtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHsgbmFtZSwgaXB2NCB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbGlzdC5zb3J0KHRoaXMuaW50ZXJmYWNlc1NvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcGlkT2YocHJvY2Vzc05hbWU6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ydW5TaGVsbENvbW1hbmRBZGJLaXQoYHBpZG9mICR7cHJvY2Vzc05hbWV9YClcclxuICAgICAgICAgICAgLnRoZW4oKG91dHB1dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dFxyXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnICcpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgocGlkKSA9PiBwYXJzZUludChwaWQsIDEwKSlcclxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChudW0pID0+ICFpc05hTihudW0pKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaWx0ZXJQc091dHB1dChwcm9jZXNzTmFtZTogc3RyaW5nLCBvdXRwdXQ6IHN0cmluZyk6IG51bWJlcltdIHtcclxuICAgICAgICBjb25zdCBsaXN0OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHByb2Nlc3NlcyA9IG91dHB1dC5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgcHJvY2Vzc2VzLm1hcCgobGluZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjb2xzID0gbGluZVxyXG4gICAgICAgICAgICAgICAgLnRyaW0oKVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcgJylcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYgKGNvbHNbY29scy5sZW5ndGggLSAxXSA9PT0gcHJvY2Vzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBpZCA9IHBhcnNlSW50KGNvbHNbMV0sIDEwKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4ocGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChwaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBncmVwUHNfQShwcm9jZXNzTmFtZTogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJ1blNoZWxsQ29tbWFuZEFkYktpdChgcHMgLUEgfCBncmVwICR7cHJvY2Vzc05hbWV9YClcclxuICAgICAgICAgICAgLnRoZW4oKG91dHB1dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyUHNPdXRwdXQocHJvY2Vzc05hbWUsIG91dHB1dCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ3JlcFBzKHByb2Nlc3NOYW1lOiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcltdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuU2hlbGxDb21tYW5kQWRiS2l0KGBwcyB8IGdyZXAgJHtwcm9jZXNzTmFtZX1gKVxyXG4gICAgICAgICAgICAudGhlbigob3V0cHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJQc091dHB1dChwcm9jZXNzTmFtZSwgb3V0cHV0KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBsaXN0UHJvYyhwcm9jZXNzTmFtZTogc3RyaW5nKTogUHJvbWlzZTxudW1iZXJbXT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbmQgPSBgZmluZCAvcHJvYyAtbWF4ZGVwdGggMiAtbmFtZSBjbWRsaW5lICAyPi9kZXYvbnVsbGA7XHJcbiAgICAgICAgY29uc3QgbGluZXMgPSBhd2FpdCB0aGlzLnJ1blNoZWxsQ29tbWFuZEFkYktpdChcclxuICAgICAgICAgICAgYGZvciBMIGluIFxcYCR7ZmluZH1cXGA7IGRvIGdyZXAgLXNhZSAnXiR7cHJvY2Vzc05hbWV9JyAkTCAyPiYxID4vZGV2L251bGwgJiYgZWNobyAkTDsgZG9uZWAsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCByZSA9IC9cXC9wcm9jXFwvKFswLTldKylcXC9jbWRsaW5lLztcclxuICAgICAgICBjb25zdCBsaXN0OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGxpbmVzLnNwbGl0KCdcXG4nKS5tYXAoKGxpbmUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJpbSA9IGxpbmUudHJpbSgpO1xyXG4gICAgICAgICAgICBjb25zdCBtID0gdHJpbS5tYXRjaChyZSk7XHJcbiAgICAgICAgICAgIGlmIChtKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2gocGFyc2VJbnQobVsxXSwgMTApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZXhlY3V0ZWRXaXRob3V0RXJyb3IoY29tbWFuZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuU2hlbGxDb21tYW5kQWRiS2l0KGNvbW1hbmQpXHJcbiAgICAgICAgICAgIC50aGVuKChvdXRwdXQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IHBhcnNlSW50KG91dHB1dCwgMTApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVyciA9PT0gMDtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBoYXNQcygpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlZFdpdGhvdXRFcnJvcigncHMgfCBncmVwIGluaXQgMj4mMSA+L2Rldi9udWxsOyBlY2hvICQ/Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBoYXNQc19BKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGVkV2l0aG91dEVycm9yKCdwcyAtQSB8IGdyZXAgaW5pdCAyPiYxID4vZGV2L251bGw7IGVjaG8gJD8nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGhhc1BpZE9mKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IG9rID0gYXdhaXQgdGhpcy5leGVjdXRlZFdpdGhvdXRFcnJvcignd2hpY2ggcGlkb2YgMj4mMSA+L2Rldi9udWxsICYmIGVjaG8gJD8nKTtcclxuICAgICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuU2hlbGxDb21tYW5kQWRiS2l0KCdlY2hvICRQUElEOyBwaWRvZiBpbml0JylcclxuICAgICAgICAgICAgLnRoZW4oKG91dHB1dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGlkcyA9IG91dHB1dC5zcGxpdCgnXFxuJykuZmlsdGVyKChhKSA9PiBhLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGlkcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50UGlkID0gcGlkc1swXS5yZXBsYWNlKCdcXHInLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gcGlkc1sxXS5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QuaW5jbHVkZXMocGFyZW50UGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LmluY2x1ZGVzKCcxJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZmluZERldGVjdGlvblZhcmlhbnQoKTogUHJvbWlzZTxQSURfREVURUNUSU9OPiB7XHJcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuaGFzUGlkT2YoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUElEX0RFVEVDVElPTi5QSURPRjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuaGFzUHNfQSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQSURfREVURUNUSU9OLkdSRVBfUFNfQTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMuaGFzUHMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUElEX0RFVEVDVElPTi5HUkVQX1BTO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUElEX0RFVEVDVElPTi5MU19QUk9DO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2NoZWR1bGVJbmZvVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZVRpbWVvdXRJZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgrK3RoaXMudXBkYXRlQ291bnQgPiBEZXZpY2UuTUFYX1VQREFURVNfQ09VTlQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLlRBRywgJ1RoZSBtYXhpbXVtIG51bWJlciBvZiBhdHRlbXB0cyB0byBmZXRjaCBkZXZpY2UgaW5mbyBoYXMgYmVlbiByZWFjaGVkLicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZW91dElkID0gc2V0VGltZW91dCh0aGlzLmZldGNoRGV2aWNlSW5mbywgdGhpcy51cGRhdGVUaW1lb3V0KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVvdXQgKj0gMjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZldGNoRGV2aWNlSW5mbyA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvcHNQcm9taXNlID0gdGhpcy5nZXRQcm9wZXJ0aWVzKCkudGhlbigocHJvcHMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgUHJvcGVydGllcy5mb3JFYWNoKChwcm9wTmFtZToga2V5b2YgR29vZ0RldmljZURlc2NyaXB0b3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdICE9PSB0aGlzLmRlc2NyaXB0b3JbcHJvcE5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5kZXNjcmlwdG9yW3Byb3BOYW1lXSBhcyBhbnkpID0gcHJvcHNbcHJvcE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgbmV0SW50UHJvbWlzZSA9IHRoaXMudXBkYXRlSW50ZXJmYWNlcygpLnRoZW4oKGludGVyZmFjZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhIWludGVyZmFjZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IHBpZFByb21pc2U6IFByb21pc2U8bnVtYmVyIHwgdW5kZWZpbmVkPjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3Bhd25TZXJ2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHBpZFByb21pc2UgPSB0aGlzLnN0YXJ0U2VydmVyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwaWRQcm9taXNlID0gdGhpcy5nZXRTZXJ2ZXJQaWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXJQcm9taXNlID0gcGlkUHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhKHRoaXMuZGVzY3JpcHRvci5waWQgPT09IC0xICYmIHRoaXMuc3Bhd25TZXJ2ZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW3Byb3BzUHJvbWlzZSwgbmV0SW50UHJvbWlzZSwgc2VydmVyUHJvbWlzZV0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZW91dElkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhaWxlZENvdW50ID0gcmVzdWx0cy5maWx0ZXIoKHJlc3VsdCkgPT4gIXJlc3VsdCkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmFpbGVkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZW91dCA9IERldmljZS5JTklUSUFMX1VQREFURV9USU1FT1VUO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVJbmZvVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZUluZm9VcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWVvdXQgPSBEZXZpY2UuSU5JVElBTF9VUERBVEVfVElNRU9VVDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdFVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZW1pdFVwZGF0ZShzZXRVcGRhdGVUaW1lID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IFRIUk9UVExFID0gMzAwO1xyXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IG5vdyAtIHRoaXMubGFzdEVtaXQ7XHJcbiAgICAgICAgaWYgKHNldFVwZGF0ZVRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXNjcmlwdG9yWydsYXN0LnVwZGF0ZS50aW1lc3RhbXAnXSA9IG5vdztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRpbWUgPiBUSFJPVFRMRSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RFbWl0ID0gbm93O1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3VwZGF0ZScsIHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy50aHJvdHRsZVRpbWVvdXRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRocm90dGxlVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy50aHJvdHRsZVRpbWVvdXRJZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFVwZGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sIFRIUk9UVExFIC0gdGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0U2VydmVyUGlkKCk6IFByb21pc2U8dW5kZWZpbmVkIHwgbnVtYmVyPiB7XHJcbiAgICAgICAgY29uc3QgcGlkcyA9IGF3YWl0IFNjcmNweVNlcnZlci5nZXRTZXJ2ZXJQaWQodGhpcyk7XHJcbiAgICAgICAgbGV0IHBpZDtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocGlkcykgfHwgIXBpZHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHBpZCA9IC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBpZCA9IHBpZHNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRlc2NyaXB0b3IucGlkICE9PSBwaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXNjcmlwdG9yLnBpZCA9IHBpZDtcclxuICAgICAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwaWQgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwaWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlSW50ZXJmYWNlcygpOiBQcm9taXNlPE5ldEludGVyZmFjZVtdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TmV0SW50ZXJmYWNlcygpLnRoZW4oKGludGVyZmFjZXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5kZXNjcmlwdG9yLmludGVyZmFjZXM7XHJcbiAgICAgICAgICAgIGlmIChvbGQubGVuZ3RoICE9PSBpbnRlcmZhY2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvbGQuZm9yRWFjaCgodmFsdWUsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5uYW1lICE9PSBpbnRlcmZhY2VzW2lkeF0ubmFtZSB8fCB2YWx1ZS5pcHY0ICE9PSBpbnRlcmZhY2VzW2lkeF0uaXB2NCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXNjcmlwdG9yLmludGVyZmFjZXMgPSBpbnRlcmZhY2VzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRvci5pbnRlcmZhY2VzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBraWxsU2VydmVyKHBpZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5zcGF3blNlcnZlciA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHJlYWxQaWQgPSBhd2FpdCB0aGlzLmdldFNlcnZlclBpZCgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmVhbFBpZCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVhbFBpZCAhPT0gcGlkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5UQUcsIGBSZXF1ZXN0ZWQgdG8ga2lsbCBzZXJ2ZXIgd2l0aCBQSUQgJHtwaWR9LiBSZWFsIHNlcnZlciBQSUQgaXMgJHtyZWFsUGlkfS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0gYXdhaXQgdGhpcy5raWxsUHJvY2VzcyhyZWFsUGlkKTtcclxuICAgICAgICAgICAgaWYgKG91dHB1dCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5UQUcsIGBraWxsIHNlcnZlcjogXCIke291dHB1dH1cImApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRvci5waWQgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5lbWl0VXBkYXRlKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuVEFHLCBgRXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzdGFydFNlcnZlcigpOiBQcm9taXNlPG51bWJlciB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIHRoaXMuc3Bhd25TZXJ2ZXIgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IHBpZCA9IGF3YWl0IHRoaXMuZ2V0U2VydmVyUGlkKCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwaWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IFNjcmNweVNlcnZlci5ydW4odGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChvdXRwdXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuVEFHLCBgc3RhcnQgc2VydmVyOiBcIiR7b3V0cHV0fVwiYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VydmVyUGlkKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuVEFHLCBgRXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHb29nRGV2aWNlRGVzY3JpcHRvciBmcm9tICcuLi8uLi90eXBlcy9Hb29nRGV2aWNlRGVzY3JpcHRvcic7XHJcblxyXG5leHBvcnQgY29uc3QgUHJvcGVydGllczogUmVhZG9ubHlBcnJheTxrZXlvZiBHb29nRGV2aWNlRGVzY3JpcHRvcj4gPSBbXHJcbiAgICAncm8ucHJvZHVjdC5jcHUuYWJpJyxcclxuICAgICdyby5wcm9kdWN0Lm1hbnVmYWN0dXJlcicsXHJcbiAgICAncm8ucHJvZHVjdC5tb2RlbCcsXHJcbiAgICAncm8uYnVpbGQudmVyc2lvbi5yZWxlYXNlJyxcclxuICAgICdyby5idWlsZC52ZXJzaW9uLnNkaycsXHJcbiAgICAnd2lmaS5pbnRlcmZhY2UnLFxyXG5dO1xyXG4iLCJpbXBvcnQgJy4uLy4uLy4uL3ZlbmRvci9HZW55bW9iaWxlL3NjcmNweS9zY3JjcHktc2VydmVyLmphcic7XHJcbmltcG9ydCAnLi4vLi4vLi4vdmVuZG9yL0dlbnltb2JpbGUvc2NyY3B5L0xJQ0VOU0UnO1xyXG5cclxuaW1wb3J0IHsgRGV2aWNlIH0gZnJvbSAnLi9EZXZpY2UnO1xyXG5pbXBvcnQgeyBBUkdTX1NUUklORywgU0VSVkVSX1BBQ0tBR0UsIFNFUlZFUl9QUk9DRVNTX05BTUUsIFNFUlZFUl9WRVJTSU9OIH0gZnJvbSAnLi4vLi4vY29tbW9uL0NvbnN0YW50cyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgUHVzaFRyYW5zZmVyIGZyb20gJ0BkZWFkNTBmNy9hZGJraXQvbGliL2FkYi9zeW5jL3B1c2h0cmFuc2Zlcic7XHJcbmltcG9ydCB7IFNlcnZlclZlcnNpb24gfSBmcm9tICcuL1NlcnZlclZlcnNpb24nO1xyXG5cclxuY29uc3QgVEVNUF9QQVRIID0gJy9kYXRhL2xvY2FsL3RtcC8nO1xyXG5jb25zdCBGSUxFX0RJUiA9IHBhdGguam9pbihfX2Rpcm5hbWUsICd2ZW5kb3IvR2VueW1vYmlsZS9zY3JjcHknKTtcclxuY29uc3QgRklMRV9OQU1FID0gJ3NjcmNweS1zZXJ2ZXIuamFyJztcclxuY29uc3QgUlVOX0NPTU1BTkQgPSBgQ0xBU1NQQVRIPSR7VEVNUF9QQVRIfSR7RklMRV9OQU1FfSBub2h1cCBhcHBfcHJvY2VzcyAke0FSR1NfU1RSSU5HfWA7XHJcblxyXG50eXBlIFdhaXRGb3JQaWRQYXJhbXMgPSB7IHRyeUNvdW50ZXI6IG51bWJlcjsgcHJvY2Vzc0V4aXRlZDogYm9vbGVhbjsgbG9va1BpZEZpbGU6IGJvb2xlYW4gfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTY3JjcHlTZXJ2ZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgUElEX0ZJTEVfUEFUSCA9ICcvZGF0YS9sb2NhbC90bXAvd3Nfc2NyY3B5LnBpZCc7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBjb3B5U2VydmVyKGRldmljZTogRGV2aWNlKTogUHJvbWlzZTxQdXNoVHJhbnNmZXI+IHtcclxuICAgICAgICBjb25zdCBzcmMgPSBwYXRoLmpvaW4oRklMRV9ESVIsIEZJTEVfTkFNRSk7XHJcbiAgICAgICAgY29uc3QgZHN0ID0gVEVNUF9QQVRIICsgRklMRV9OQU1FOyAvLyBkb24ndCB1c2UgcGF0aC5qb2luKCk6IHdpbGwgbm90IHdvcmsgb24gd2luIGhvc3RcclxuICAgICAgICByZXR1cm4gZGV2aWNlLnB1c2goc3JjLCBkc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEltcG9ydGFudCB0byBub3RpY2UgdGhhdCB3ZSBmaXJzdCB0cnkgdG8gcmVhZCBQSUQgZnJvbSBmaWxlLlxyXG4gICAgLy8gQ2hlY2tpbmcgd2l0aCBgLmdldFNlcnZlclBpZCgpYCB3aWxsIHJldHVybiBwcm9jZXNzIGlkLCBidXQgcHJvY2VzcyBtYXkgc3RvcC5cclxuICAgIC8vIFBJRCBmaWxlIG9ubHkgY3JlYXRlZCBhZnRlciBXZWJTb2NrZXQgc2VydmVyIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBzdGFydGVkLlxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgd2FpdEZvclNlcnZlclBpZChkZXZpY2U6IERldmljZSwgcGFyYW1zOiBXYWl0Rm9yUGlkUGFyYW1zKTogUHJvbWlzZTxudW1iZXJbXSB8IHVuZGVmaW5lZD4ge1xyXG4gICAgICAgIGNvbnN0IHsgdHJ5Q291bnRlciwgcHJvY2Vzc0V4aXRlZCwgbG9va1BpZEZpbGUgfSA9IHBhcmFtcztcclxuICAgICAgICBpZiAocHJvY2Vzc0V4aXRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRpbWVvdXQgPSA1MDAgKyAxMDAgKiB0cnlDb3VudGVyO1xyXG4gICAgICAgIGlmIChsb29rUGlkRmlsZSkge1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IFNjcmNweVNlcnZlci5QSURfRklMRV9QQVRIO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgZGV2aWNlLnJ1blNoZWxsQ29tbWFuZEFkYktpdChgdGVzdCAtZiAke2ZpbGVOYW1lfSAmJiBjYXQgJHtmaWxlTmFtZX1gKTtcclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwaWQgPSBwYXJzZUludChjb250ZW50LCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGlkICYmICFpc05hTihwaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhbFBpZCA9IGF3YWl0IHRoaXMuZ2V0U2VydmVyUGlkKGRldmljZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWxQaWQ/LmluY2x1ZGVzKHBpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWxQaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmxvb2tQaWRGaWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IHRoaXMuZ2V0U2VydmVyUGlkKGRldmljZSk7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGxpc3QpICYmIGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKytwYXJhbXMudHJ5Q291bnRlciA+IDUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gc3RhcnQgc2VydmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxudW1iZXJbXSB8IHVuZGVmaW5lZD4oKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMud2FpdEZvclNlcnZlclBpZChkZXZpY2UsIHBhcmFtcykpO1xyXG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldFNlcnZlclBpZChkZXZpY2U6IERldmljZSk6IFByb21pc2U8bnVtYmVyW10gfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICBpZiAoIWRldmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IGRldmljZS5nZXRQaWRPZihTRVJWRVJfUFJPQ0VTU19OQU1FKTtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdCkgfHwgIWxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2VydmVyUGlkOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gbGlzdC5tYXAoKHBpZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlLnJ1blNoZWxsQ29tbWFuZEFkYktpdChgY2F0IC9wcm9jLyR7cGlkfS9jbWRsaW5lYCkudGhlbigob3V0cHV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhcmdzID0gb3V0cHV0LnNwbGl0KCdcXDAnKTtcclxuICAgICAgICAgICAgICAgIGlmICghYXJncy5sZW5ndGggfHwgYXJnc1swXSAhPT0gU0VSVkVSX1BST0NFU1NfTkFNRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IGFyZ3NbMF07XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoYXJncy5sZW5ndGggJiYgZmlyc3QgIT09IFNFUlZFUl9QQUNLQUdFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gYXJnc1swXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJzaW9uU3RyaW5nID0gYXJnc1sxXTtcclxuICAgICAgICAgICAgICAgIGlmICh2ZXJzaW9uU3RyaW5nID09PSBTRVJWRVJfVkVSU0lPTikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBpZC5wdXNoKHBpZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWZXJzaW9uID0gbmV3IFNlcnZlclZlcnNpb24odmVyc2lvblN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRWZXJzaW9uLmlzQ29tcGF0aWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc2lyZWQgPSBuZXcgU2VydmVyVmVyc2lvbihTRVJWRVJfVkVSU0lPTik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXNpcmVkLmd0KGN1cnJlbnRWZXJzaW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlLlRBRyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgRm91bmQgb2xkIHNlcnZlciB2ZXJzaW9uIHJ1bm5pbmcgKFBJRDogJHtwaWR9LCBWZXJzaW9uOiAke3ZlcnNpb25TdHJpbmd9KWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGV2aWNlLlRBRywgJ1BlcmZvcm0ga2lsbCBub3cnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZS5raWxsUHJvY2VzcyhwaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcbiAgICAgICAgcmV0dXJuIHNlcnZlclBpZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHJ1bihkZXZpY2U6IERldmljZSk6IFByb21pc2U8bnVtYmVyW10gfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICBpZiAoIWRldmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpc3Q6IG51bWJlcltdIHwgc3RyaW5nIHwgdW5kZWZpbmVkID0gYXdhaXQgdGhpcy5nZXRTZXJ2ZXJQaWQoZGV2aWNlKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsaXN0KSAmJiBsaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb3B5U2VydmVyKGRldmljZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcmFtczogV2FpdEZvclBpZFBhcmFtcyA9IHsgdHJ5Q291bnRlcjogMCwgcHJvY2Vzc0V4aXRlZDogZmFsc2UsIGxvb2tQaWRGaWxlOiB0cnVlIH07XHJcbiAgICAgICAgY29uc3QgcnVuUHJvbWlzZSA9IGRldmljZS5ydW5TaGVsbENvbW1hbmRBZGIoUlVOX0NPTU1BTkQpO1xyXG4gICAgICAgIHJ1blByb21pc2VcclxuICAgICAgICAgICAgLnRoZW4oKG91dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRldmljZS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGV2aWNlLlRBRywgJ1NlcnZlciBleGl0ZWQ6Jywgb3V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZXZpY2UuVEFHLCAnRXJyb3I6JywgZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLnByb2Nlc3NFeGl0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsaXN0ID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtydW5Qcm9taXNlLCB0aGlzLndhaXRGb3JTZXJ2ZXJQaWQoZGV2aWNlLCBwYXJhbXMpXSk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobGlzdCkgJiYgbGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgU2VydmVyVmVyc2lvbiB7XHJcbiAgICBwcm90ZWN0ZWQgcGFydHM6IHN0cmluZ1tdID0gW107XHJcbiAgICBwcm90ZWN0ZWQgc3VmZml4OiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29tcGF0aWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdmVyc2lvblN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgdGVtcCA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy0nKTtcclxuICAgICAgICBjb25zdCBtYWluID0gdGVtcC5zaGlmdCgpO1xyXG4gICAgICAgIHRoaXMuc3VmZml4ID0gdGVtcC5qb2luKCctJyk7XHJcbiAgICAgICAgaWYgKG1haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJ0cyA9IG1haW4uc3BsaXQoJy4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb21wYXRpYmxlID0gdGhpcy5zdWZmaXguc3RhcnRzV2l0aCgnd3MnKSAmJiB0aGlzLnBhcnRzLmxlbmd0aCA+PSAyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGVxdWFscyhhOiBTZXJ2ZXJWZXJzaW9uIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgdmVyc2lvblN0cmluZyA9IHR5cGVvZiBhID09PSAnc3RyaW5nJyA/IGEgOiBhLnZlcnNpb25TdHJpbmc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmVyc2lvblN0cmluZyA9PT0gdmVyc2lvblN0cmluZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBndChhOiBTZXJ2ZXJWZXJzaW9uIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXF1YWxzKGEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBhID0gbmV3IFNlcnZlclZlcnNpb24oYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1pbkxlbmd0aCA9IE1hdGgubWluKHRoaXMucGFydHMubGVuZ3RoLCBhLnBhcnRzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW5MZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJ0c1tpXSA+IGEucGFydHNbaV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBhcnRzLmxlbmd0aCA+IGEucGFydHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYXJ0cy5sZW5ndGggPCBhLnBhcnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN1ZmZpeCA+IGEuc3VmZml4O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzQ29tcGF0aWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wYXRpYmxlO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBDbGllbnQgZnJvbSAnQGRlYWQ1MGY3L2FkYmtpdC9saWIvYWRiL2NsaWVudCc7XHJcbmltcG9ydCB7IEV4dGVuZGVkU3luYyB9IGZyb20gJy4vRXh0ZW5kZWRTeW5jJztcclxuaW1wb3J0IHsgU3luY0NvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQvaG9zdC10cmFuc3BvcnQvc3luYyc7XHJcbmltcG9ydCB7IE11bHRpcGxleGVyIH0gZnJvbSAnLi4vLi4vLi4vcGFja2FnZXMvbXVsdGlwbGV4ZXIvTXVsdGlwbGV4ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVuZGVkQ2xpZW50IGV4dGVuZHMgQ2xpZW50IHtcclxuICAgIHB1YmxpYyBhc3luYyBwaXBlU3luY1NlcnZpY2Uoc2VyaWFsOiBzdHJpbmcpOiBQcm9taXNlPEV4dGVuZGVkU3luYz4ge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zcG9ydCA9IGF3YWl0IHRoaXMudHJhbnNwb3J0KHNlcmlhbCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTeW5jQ29tbWFuZCh0cmFuc3BvcnQpLmV4ZWN1dGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgcGlwZVJlYWREaXIoc2VyaWFsOiBzdHJpbmcsIHBhdGhTdHJpbmc6IHN0cmluZywgc3RyZWFtOiBNdWx0aXBsZXhlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHN5bmMgPSBhd2FpdCB0aGlzLnBpcGVTeW5jU2VydmljZShzZXJpYWwpO1xyXG4gICAgICAgIHJldHVybiBzeW5jLnBpcGVSZWFkRGlyKHBhdGhTdHJpbmcsIHN0cmVhbSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHN5bmMuZW5kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHBpcGVQdWxsKHNlcmlhbDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHN0cmVhbTogTXVsdGlwbGV4ZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBzeW5jID0gYXdhaXQgdGhpcy5waXBlU3luY1NlcnZpY2Uoc2VyaWFsKTtcclxuICAgICAgICByZXR1cm4gc3luYy5waXBlUHVsbChwYXRoLCBzdHJlYW0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBzeW5jLmVuZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBwaXBlU3RhdChzZXJpYWw6IHN0cmluZywgcGF0aDogc3RyaW5nLCBzdHJlYW06IE11bHRpcGxleGVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3Qgc3luYyA9IGF3YWl0IHRoaXMucGlwZVN5bmNTZXJ2aWNlKHNlcmlhbCk7XHJcbiAgICAgICAgcmV0dXJuIHN5bmMucGlwZVN0YXQocGF0aCwgc3RyZWFtKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgc3luYy5lbmQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQ29ubmVjdGlvbiBmcm9tICdAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGIvY29ubmVjdGlvbic7XHJcbmltcG9ydCBQYXJzZXIgZnJvbSAnQGRlYWQ1MGY3L2FkYmtpdC9saWIvYWRiL3BhcnNlcic7XHJcbmltcG9ydCBQcm90b2NvbCBmcm9tICdAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGIvcHJvdG9jb2wnO1xyXG5pbXBvcnQgeyBNdWx0aXBsZXhlciB9IGZyb20gJy4uLy4uLy4uL3BhY2thZ2VzL211bHRpcGxleGVyL011bHRpcGxleGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbmRlZFN5bmMge1xyXG4gICAgcHJpdmF0ZSBwYXJzZXI6IFBhcnNlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xyXG4gICAgICAgIHRoaXMucGFyc2VyID0gdGhpcy5jb25uZWN0aW9uLnBhcnNlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgcGlwZVJlYWREaXIocGF0aDogc3RyaW5nLCBzdHJlYW06IE11bHRpcGxleGVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgcmVhZE5leHQgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcGx5ID0gYXdhaXQgdGhpcy5wYXJzZXIucmVhZEFzY2lpKDQpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHJlcGx5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFByb3RvY29sLkRFTlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGF3YWl0IHRoaXMucGFyc2VyLnJlYWRCeXRlcygxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZWxlbiA9IHN0YXQucmVhZFVJbnQzMkxFKDEyKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYXdhaXQgdGhpcy5wYXJzZXIucmVhZEJ5dGVzKG5hbWVsZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5zZW5kKEJ1ZmZlci5jb25jYXQoW0J1ZmZlci5mcm9tKHJlcGx5KSwgc3RhdCwgbmFtZV0pKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhZE5leHQoKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgUHJvdG9jb2wuRE9ORTpcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBhcnNlci5yZWFkQnl0ZXMoMTYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5jbG9zZSgwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjYXNlIFByb3RvY29sLkZBSUw6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRFcnJvcihzdHJlYW0pO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZXIudW5leHBlY3RlZChyZXBseSwgJ0RFTlQsIERPTkUgb3IgRkFJTCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9zZW5kQ29tbWFuZFdpdGhBcmcoUHJvdG9jb2wuTElTVCwgcGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIHJlYWROZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBpcGVQdWxsKHBhdGg6IHN0cmluZywgc3RyZWFtOiBNdWx0aXBsZXhlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuX3NlbmRDb21tYW5kV2l0aEFyZyhQcm90b2NvbC5SRUNWLCBgJHtwYXRofWApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkRGF0YShzdHJlYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBwaXBlU3RhdChwYXRoOiBzdHJpbmcsIHN0cmVhbTogTXVsdGlwbGV4ZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLl9zZW5kQ29tbWFuZFdpdGhBcmcoUHJvdG9jb2wuU1RBVCwgYCR7cGF0aH1gKTtcclxuICAgICAgICBjb25zdCByZXBseSA9IGF3YWl0IHRoaXMucGFyc2VyLnJlYWRBc2NpaSg0KTtcclxuICAgICAgICBzd2l0Y2ggKHJlcGx5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvdG9jb2wuU1RBVDpcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXQgPSBhd2FpdCB0aGlzLnBhcnNlci5yZWFkQnl0ZXMoMTIpO1xyXG4gICAgICAgICAgICAgICAgc3RyZWFtLnNlbmQoQnVmZmVyLmNvbmNhdChbQnVmZmVyLmZyb20ocmVwbHkpLCBzdGF0XSkpO1xyXG4gICAgICAgICAgICAgICAgc3RyZWFtLmNsb3NlKDEwMDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvdG9jb2wuRkFJTDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFkRXJyb3Ioc3RyZWFtKTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlci51bmV4cGVjdGVkKHJlcGx5LCAnU1RBVCBvciBGQUlMJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3JlYWREYXRhKHN0cmVhbTogTXVsdGlwbGV4ZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCByZWFkTmV4dCA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVwbHkgPSBhd2FpdCB0aGlzLnBhcnNlci5yZWFkQXNjaWkoNCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocmVwbHkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgUHJvdG9jb2wuREFUQTpcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGhEYXRhID0gYXdhaXQgdGhpcy5wYXJzZXIucmVhZEJ5dGVzKDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IGxlbmd0aERhdGEucmVhZFVJbnQzMkxFKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnBhcnNlci5yZWFkQnl0ZXMobGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdHJlYW0uc2VuZChCdWZmZXIuY29uY2F0KFtCdWZmZXIuZnJvbShyZXBseSksIGRhdGFdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWROZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFByb3RvY29sLkRPTkU6XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXJzZXIucmVhZEJ5dGVzKDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5jbG9zZSgxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjYXNlIFByb3RvY29sLkZBSUw6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRFcnJvcihzdHJlYW0pO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZXIudW5leHBlY3RlZChyZXBseSwgJ0RBVEEsIERPTkUgb3IgRkFJTCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcmVhZE5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZW5kQ29tbWFuZFdpdGhBcmcoY21kOiBzdHJpbmcsIGFyZzogc3RyaW5nKTogQ29ubmVjdGlvbiB7XHJcbiAgICAgICAgY29uc3QgYXJnbGVuID0gQnVmZmVyLmJ5dGVMZW5ndGgoYXJnLCAndXRmLTgnKTtcclxuICAgICAgICBjb25zdCBwYXlsb2FkID0gQnVmZmVyLmFsbG9jKGNtZC5sZW5ndGggKyA0ICsgYXJnbGVuKTtcclxuICAgICAgICBsZXQgcG9zID0gMDtcclxuICAgICAgICBwYXlsb2FkLndyaXRlKGNtZCwgcG9zLCBjbWQubGVuZ3RoKTtcclxuICAgICAgICBwb3MgKz0gY21kLmxlbmd0aDtcclxuICAgICAgICBwYXlsb2FkLndyaXRlVUludDMyTEUoYXJnbGVuLCBwb3MpO1xyXG4gICAgICAgIHBvcyArPSA0O1xyXG4gICAgICAgIHBheWxvYWQud3JpdGUoYXJnLCBwb3MpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24ud3JpdGUocGF5bG9hZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBfcmVhZEVycm9yKHN0cmVhbTogTXVsdGlwbGV4ZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSBhd2FpdCB0aGlzLnBhcnNlci5yZWFkQnl0ZXMoNCk7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHRoaXMucGFyc2VyLnJlYWRBc2NpaShsZW5ndGgucmVhZFVJbnQzMkxFKDApKTtcclxuICAgICAgICBzdHJlYW0uY2xvc2UoNDAwMCwgbWVzc2FnZSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5wYXJzZXIuZW5kKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmQoKTogRXh0ZW5kZWRTeW5jIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uZW5kKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFByb3RvY29sIGZyb20gJ0BkZWFkNTBmNy9hZGJraXQvbGliL2FkYi9wcm90b2NvbCc7XHJcbmltcG9ydCBDb21tYW5kIGZyb20gJ0BkZWFkNTBmNy9hZGJraXQvbGliL2FkYi9jb21tYW5kJztcclxuaW1wb3J0IHsgRXh0ZW5kZWRTeW5jIH0gZnJvbSAnLi4vLi4vRXh0ZW5kZWRTeW5jJztcclxuaW1wb3J0IEJsdWViaXJkIGZyb20gJ2JsdWViaXJkJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTeW5jQ29tbWFuZCBleHRlbmRzIENvbW1hbmQ8RXh0ZW5kZWRTeW5jPiB7XHJcbiAgICBleGVjdXRlKCk6IEJsdWViaXJkPEV4dGVuZGVkU3luYz4ge1xyXG4gICAgICAgIHRoaXMuX3NlbmQoJ3N5bmM6Jyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VyLnJlYWRBc2NpaSg0KS50aGVuKChyZXBseSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHJlcGx5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFByb3RvY29sLk9LQVk6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFeHRlbmRlZFN5bmModGhpcy5jb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgUHJvdG9jb2wuRkFJTDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZXIucmVhZEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlci51bmV4cGVjdGVkKHJlcGx5LCAnT0tBWSBvciBGQUlMJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQWRiIGZyb20gJ0BkZWFkNTBmNy9hZGJraXQvbGliL2FkYic7XHJcbmltcG9ydCB7IEV4dGVuZGVkQ2xpZW50IH0gZnJvbSAnLi9FeHRlbmRlZENsaWVudCc7XHJcbmltcG9ydCB7IENsaWVudE9wdGlvbnMgfSBmcm9tICdAZGVhZDUwZjcvYWRia2l0L2xpYi9DbGllbnRPcHRpb25zJztcclxuXHJcbmludGVyZmFjZSBPcHRpb25zIHtcclxuICAgIGhvc3Q/OiBzdHJpbmc7XHJcbiAgICBwb3J0PzogbnVtYmVyO1xyXG4gICAgYmluPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWRiRXh0ZW5kZWQgZXh0ZW5kcyBBZGIge1xyXG4gICAgc3RhdGljIGNyZWF0ZUNsaWVudChvcHRpb25zOiBPcHRpb25zID0ge30pOiBFeHRlbmRlZENsaWVudCB7XHJcbiAgICAgICAgY29uc3Qgb3B0czogQ2xpZW50T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgYmluOiBvcHRpb25zLmJpbixcclxuICAgICAgICAgICAgaG9zdDogb3B0aW9ucy5ob3N0IHx8IHByb2Nlc3MuZW52LkFEQl9IT1NUIHx8ICcxMjcuMC4wLjEnLFxyXG4gICAgICAgICAgICBwb3J0OiBvcHRpb25zLnBvcnQgfHwgMCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghb3B0cy5wb3J0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcnQgPSBwYXJzZUludChwcm9jZXNzLmVudi5BREJfUE9SVCB8fCAnJywgMTApO1xyXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHBvcnQpKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRzLnBvcnQgPSBwb3J0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0cy5wb3J0ID0gNTAzNztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEV4dGVuZGVkQ2xpZW50KG9wdHMpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBXUyBmcm9tICd3cyc7XHJcbmltcG9ydCB7IE13LCBSZXF1ZXN0UGFyYW1ldGVycyB9IGZyb20gJy4uLy4uL213L013JztcclxuaW1wb3J0IHsgQ29udHJvbENlbnRlckNvbW1hbmQgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vQ29udHJvbENlbnRlckNvbW1hbmQnO1xyXG5pbXBvcnQgeyBDb250cm9sQ2VudGVyIH0gZnJvbSAnLi4vc2VydmljZXMvQ29udHJvbENlbnRlcic7XHJcbmltcG9ydCB7IEFDVElPTiB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9BY3Rpb24nO1xyXG5pbXBvcnQgR29vZ0RldmljZURlc2NyaXB0b3IgZnJvbSAnLi4vLi4vLi4vdHlwZXMvR29vZ0RldmljZURlc2NyaXB0b3InO1xyXG5pbXBvcnQgeyBEZXZpY2VUcmFja2VyRXZlbnQgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9EZXZpY2VUcmFja2VyRXZlbnQnO1xyXG5pbXBvcnQgeyBEZXZpY2VUcmFja2VyRXZlbnRMaXN0IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvRGV2aWNlVHJhY2tlckV2ZW50TGlzdCc7XHJcbmltcG9ydCB7IE11bHRpcGxleGVyIH0gZnJvbSAnLi4vLi4vLi4vcGFja2FnZXMvbXVsdGlwbGV4ZXIvTXVsdGlwbGV4ZXInO1xyXG5pbXBvcnQgeyBDaGFubmVsQ29kZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9DaGFubmVsQ29kZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGV2aWNlVHJhY2tlciBleHRlbmRzIE13IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVEFHID0gJ0RldmljZVRyYWNrZXInO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ2FuZHJvaWQnO1xyXG4gICAgcHJpdmF0ZSBhZHQ6IENvbnRyb2xDZW50ZXIgPSBDb250cm9sQ2VudGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwcm9jZXNzQ2hhbm5lbCh3czogTXVsdGlwbGV4ZXIsIGNvZGU6IHN0cmluZyk6IE13IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoY29kZSAhPT0gQ2hhbm5lbENvZGUuR1RSQykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRGV2aWNlVHJhY2tlcih3cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwcm9jZXNzUmVxdWVzdCh3czogV1MsIHBhcmFtczogUmVxdWVzdFBhcmFtZXRlcnMpOiBEZXZpY2VUcmFja2VyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAocGFyYW1zLmFjdGlvbiAhPT0gQUNUSU9OLkdPT0dfREVWSUNFX0xJU1QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IERldmljZVRyYWNrZXIod3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHdzOiBXUyB8IE11bHRpcGxleGVyKSB7XHJcbiAgICAgICAgc3VwZXIod3MpO1xyXG5cclxuICAgICAgICB0aGlzLmlkID0gdGhpcy5hZHQuZ2V0SWQoKTtcclxuICAgICAgICB0aGlzLmFkdFxyXG4gICAgICAgICAgICAuaW5pdCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWR0Lm9uKCdkZXZpY2UnLCB0aGlzLnNlbmREZXZpY2VNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRBbmRTZW5kTWVzc2FnZSh0aGlzLmFkdC5nZXREZXZpY2VzKCkpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgWyR7RGV2aWNlVHJhY2tlci5UQUd9XSBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmREZXZpY2VNZXNzYWdlID0gKGRldmljZTogR29vZ0RldmljZURlc2NyaXB0b3IpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhOiBEZXZpY2VUcmFja2VyRXZlbnQ8R29vZ0RldmljZURlc2NyaXB0b3I+ID0ge1xyXG4gICAgICAgICAgICBkZXZpY2UsXHJcbiAgICAgICAgICAgIGlkOiB0aGlzLmlkLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLmFkdC5nZXROYW1lKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICAgICAgaWQ6IC0xLFxyXG4gICAgICAgICAgICB0eXBlOiAnZGV2aWNlJyxcclxuICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZEFuZFNlbmRNZXNzYWdlID0gKGxpc3Q6IEdvb2dEZXZpY2VEZXNjcmlwdG9yW10pOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhOiBEZXZpY2VUcmFja2VyRXZlbnRMaXN0PEdvb2dEZXZpY2VEZXNjcmlwdG9yPiA9IHtcclxuICAgICAgICAgICAgbGlzdCxcclxuICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuYWR0LmdldE5hbWUoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBpZDogLTEsXHJcbiAgICAgICAgICAgIHR5cGU6ICdkZXZpY2VsaXN0JyxcclxuICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU29ja2V0TWVzc2FnZShldmVudDogV1MuTWVzc2FnZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNvbW1hbmQ6IENvbnRyb2xDZW50ZXJDb21tYW5kO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbW1hbmQgPSBDb250cm9sQ2VudGVyQ29tbWFuZC5mcm9tSlNPTihldmVudC5kYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgWyR7RGV2aWNlVHJhY2tlci5UQUd9XSwgUmVjZWl2ZWQgbWVzc2FnZTogJHtldmVudC5kYXRhfS4gRXJyb3I6ICR7ZXJyb3I/Lm1lc3NhZ2V9YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZHQucnVuQ29tbWFuZChjb21tYW5kKS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbJHtEZXZpY2VUcmFja2VyLlRBR31dLCBSZWNlaXZlZCBtZXNzYWdlOiAke2V2ZW50LmRhdGF9LiBFcnJvcjogJHtlLm1lc3NhZ2V9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVsZWFzZSgpO1xyXG4gICAgICAgIHRoaXMuYWR0Lm9mZignZGV2aWNlJywgdGhpcy5zZW5kRGV2aWNlTWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgV2Vic29ja2V0UHJveHkgfSBmcm9tICcuLi8uLi9tdy9XZWJzb2NrZXRQcm94eSc7XHJcbmltcG9ydCB7IEFkYlV0aWxzIH0gZnJvbSAnLi4vQWRiVXRpbHMnO1xyXG5pbXBvcnQgV1MgZnJvbSAnd3MnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0UGFyYW1ldGVycyB9IGZyb20gJy4uLy4uL213L013JztcclxuaW1wb3J0IHsgQUNUSU9OIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL0FjdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgV2Vic29ja2V0UHJveHlPdmVyQWRiIGV4dGVuZHMgV2Vic29ja2V0UHJveHkge1xyXG4gICAgcHVibGljIHN0YXRpYyBwcm9jZXNzUmVxdWVzdCh3czogV1MsIHBhcmFtczogUmVxdWVzdFBhcmFtZXRlcnMpOiBXZWJzb2NrZXRQcm94eSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgY29uc3QgeyBhY3Rpb24sIHVybCB9ID0gcGFyYW1zO1xyXG4gICAgICAgIGxldCB1ZGlkOiBzdHJpbmcgfCBudWxsID0gJyc7XHJcbiAgICAgICAgbGV0IHJlbW90ZTogc3RyaW5nIHwgbnVsbCA9ICcnO1xyXG4gICAgICAgIGxldCBwYXRoOiBzdHJpbmcgfCBudWxsID0gJyc7XHJcbiAgICAgICAgbGV0IGlzU3VpdGFibGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAoYWN0aW9uID09PSBBQ1RJT04uUFJPWFlfQURCKSB7XHJcbiAgICAgICAgICAgIGlzU3VpdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZW1vdGUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgncmVtb3RlJyk7XHJcbiAgICAgICAgICAgIHVkaWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgndWRpZCcpO1xyXG4gICAgICAgICAgICBwYXRoID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3BhdGgnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVybCAmJiB1cmwucGF0aG5hbWUpIHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcCA9IHVybC5wYXRobmFtZS5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgYWN0aW9uPXByb3h5LCB3aXRob3V0IHF1ZXJ5IHN0cmluZ1xyXG4gICAgICAgICAgICBpZiAodGVtcC5sZW5ndGggPj0gNCAmJiB0ZW1wWzBdID09PSAnJyAmJiB0ZW1wWzFdID09PSBBQ1RJT04uUFJPWFlfQURCKSB7XHJcbiAgICAgICAgICAgICAgICBpc1N1aXRhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRlbXAuc3BsaWNlKDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgdWRpZCA9IGRlY29kZVVSSUNvbXBvbmVudCh0ZW1wLnNoaWZ0KCkgfHwgJycpO1xyXG4gICAgICAgICAgICAgICAgcmVtb3RlID0gZGVjb2RlVVJJQ29tcG9uZW50KHRlbXAuc2hpZnQoKSB8fCAnJyk7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gdGVtcC5qb2luKCcvJykgfHwgJy8nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNTdWl0YWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcmVtb3RlICE9PSAnc3RyaW5nJyB8fCAhcmVtb3RlKSB7XHJcbiAgICAgICAgICAgIHdzLmNsb3NlKDQwMDMsIGBbJHt0aGlzLlRBR31dIEludmFsaWQgdmFsdWUgXCIke3JlbW90ZX1cIiBmb3IgXCJyZW1vdGVcIiBwYXJhbWV0ZXJgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHVkaWQgIT09ICdzdHJpbmcnIHx8ICF1ZGlkKSB7XHJcbiAgICAgICAgICAgIHdzLmNsb3NlKDQwMDMsIGBbJHt0aGlzLlRBR31dIEludmFsaWQgdmFsdWUgXCIke3VkaWR9XCIgZm9yIFwidWRpZFwiIHBhcmFtZXRlcmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXRoICYmIHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB3cy5jbG9zZSg0MDAzLCBgWyR7dGhpcy5UQUd9XSBJbnZhbGlkIHZhbHVlIFwiJHtwYXRofVwiIGZvciBcInBhdGhcIiBwYXJhbWV0ZXJgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVQcm94eU92ZXJBZGIod3MsIHVkaWQsIHJlbW90ZSwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVQcm94eU92ZXJBZGIod3M6IFdTLCB1ZGlkOiBzdHJpbmcsIHJlbW90ZTogc3RyaW5nLCBwYXRoPzogc3RyaW5nIHwgbnVsbCk6IFdlYnNvY2tldFByb3h5IHtcclxuICAgICAgICBjb25zdCBzZXJ2aWNlID0gbmV3IFdlYnNvY2tldFByb3h5KHdzKTtcclxuICAgICAgICBBZGJVdGlscy5mb3J3YXJkKHVkaWQsIHJlbW90ZSlcclxuICAgICAgICAgICAgLnRoZW4oKHBvcnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLmluaXQoYHdzOi8vMTI3LjAuMC4xOiR7cG9ydH0ke3BhdGggPyBwYXRoIDogJyd9YCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXNnID0gYFske3RoaXMuVEFHfV0gRmFpbGVkIHRvIHN0YXJ0IHNlcnZpY2U6ICR7ZS5tZXNzYWdlfWA7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XHJcbiAgICAgICAgICAgICAgICB3cy5jbG9zZSg0MDA1LCBtc2cpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBUcmFja2VyQ2hhbmdlU2V0IH0gZnJvbSAnQGRlYWQ1MGY3L2FkYmtpdC9saWIvVHJhY2tlckNoYW5nZVNldCc7XHJcbmltcG9ydCB7IERldmljZSB9IGZyb20gJy4uL0RldmljZSc7XHJcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9TZXJ2aWNlJztcclxuaW1wb3J0IEFkYktpdENsaWVudCBmcm9tICdAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGIvY2xpZW50JztcclxuaW1wb3J0IHsgQWRiRXh0ZW5kZWQgfSBmcm9tICcuLi9hZGInO1xyXG5pbXBvcnQgR29vZ0RldmljZURlc2NyaXB0b3IgZnJvbSAnLi4vLi4vLi4vdHlwZXMvR29vZ0RldmljZURlc2NyaXB0b3InO1xyXG5pbXBvcnQgVHJhY2tlciBmcm9tICdAZGVhZDUwZjcvYWRia2l0L2xpYi9hZGIvdHJhY2tlcic7XHJcbmltcG9ydCBUaW1lb3V0ID0gTm9kZUpTLlRpbWVvdXQ7XHJcbmltcG9ydCB7IEJhc2VDb250cm9sQ2VudGVyIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvQmFzZUNvbnRyb2xDZW50ZXInO1xyXG5pbXBvcnQgeyBDb250cm9sQ2VudGVyQ29tbWFuZCB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9Db250cm9sQ2VudGVyQ29tbWFuZCc7XHJcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcclxuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gJ2NyeXB0byc7XHJcbmltcG9ydCB7IERldmljZVN0YXRlIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL0RldmljZVN0YXRlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sQ2VudGVyIGV4dGVuZHMgQmFzZUNvbnRyb2xDZW50ZXI8R29vZ0RldmljZURlc2NyaXB0b3I+IGltcGxlbWVudHMgU2VydmljZSB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBkZWZhdWx0V2FpdEFmdGVyRXJyb3IgPSAxMDAwO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U/OiBDb250cm9sQ2VudGVyO1xyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgY2xpZW50OiBBZGJLaXRDbGllbnQgPSBBZGJFeHRlbmRlZC5jcmVhdGVDbGllbnQoKTtcclxuICAgIHByaXZhdGUgdHJhY2tlcj86IFRyYWNrZXI7XHJcbiAgICBwcml2YXRlIHdhaXRBZnRlckVycm9yID0gMTAwMDtcclxuICAgIHByaXZhdGUgcmVzdGFydFRpbWVvdXRJZD86IFRpbWVvdXQ7XHJcbiAgICBwcml2YXRlIGRldmljZU1hcDogTWFwPHN0cmluZywgRGV2aWNlPiA9IG5ldyBNYXAoKTtcclxuICAgIHByaXZhdGUgZGVzY3JpcHRvcnM6IE1hcDxzdHJpbmcsIEdvb2dEZXZpY2VEZXNjcmlwdG9yPiA9IG5ldyBNYXAoKTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgaWQ6IHN0cmluZztcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBjb25zdCBpZFN0cmluZyA9IGBnb29nfCR7b3MuaG9zdG5hbWUoKX18JHtvcy51cHRpbWUoKX1gO1xyXG4gICAgICAgIHRoaXMuaWQgPSBjcnlwdG8uY3JlYXRlSGFzaCgnbWQ1JykudXBkYXRlKGlkU3RyaW5nKS5kaWdlc3QoJ2hleCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQ29udHJvbENlbnRlciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgQ29udHJvbENlbnRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGhhc0luc3RhbmNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIUNvbnRyb2xDZW50ZXIuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXN0YXJ0VHJhY2tlciA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAodGhpcy5yZXN0YXJ0VGltZW91dElkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coYERldmljZSB0cmFja2VyIGlzIGRvd24uIFdpbGwgdHJ5IHRvIHJlc3RhcnQgaW4gJHt0aGlzLndhaXRBZnRlckVycm9yfW1zYCk7XHJcbiAgICAgICAgdGhpcy5yZXN0YXJ0VGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFRyYWNrZXIoKTtcclxuICAgICAgICAgICAgdGhpcy53YWl0QWZ0ZXJFcnJvciAqPSAxLjI7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH0sIHRoaXMud2FpdEFmdGVyRXJyb3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlU2V0ID0gKGNoYW5nZXM6IFRyYWNrZXJDaGFuZ2VTZXQpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLndhaXRBZnRlckVycm9yID0gQ29udHJvbENlbnRlci5kZWZhdWx0V2FpdEFmdGVyRXJyb3I7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuYWRkZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2VzLmFkZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkLCB0eXBlIH0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25uZWN0ZWQoaWQsIHR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzLnJlbW92ZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2VzLnJlbW92ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNvbm5lY3RlZChpZCwgRGV2aWNlU3RhdGUuRElTQ09OTkVDVEVEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hhbmdlcy5jaGFuZ2VkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlcy5jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkLCB0eXBlIH0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb25uZWN0ZWQoaWQsIHR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIG9uRGV2aWNlVXBkYXRlID0gKGRldmljZTogRGV2aWNlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgeyB1ZGlkLCBkZXNjcmlwdG9yIH0gPSBkZXZpY2U7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdG9ycy5zZXQodWRpZCwgZGVzY3JpcHRvcik7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdkZXZpY2UnLCBkZXNjcmlwdG9yKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVDb25uZWN0ZWQodWRpZDogc3RyaW5nLCBzdGF0ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZGV2aWNlTWFwLmdldCh1ZGlkKTtcclxuICAgICAgICBpZiAoZGV2aWNlKSB7XHJcbiAgICAgICAgICAgIGRldmljZS5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGV2aWNlID0gbmV3IERldmljZSh1ZGlkLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgIGRldmljZS5vbigndXBkYXRlJywgdGhpcy5vbkRldmljZVVwZGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlTWFwLnNldCh1ZGlkLCBkZXZpY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgaW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJhY2tlciA9IGF3YWl0IHRoaXMuc3RhcnRUcmFja2VyKCk7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IHRoaXMuY2xpZW50Lmxpc3REZXZpY2VzKCk7XHJcbiAgICAgICAgbGlzdC5mb3JFYWNoKChkZXZpY2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeyBpZCwgdHlwZSB9ID0gZGV2aWNlO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbm5lY3RlZChpZCwgdHlwZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBzdGFydFRyYWNrZXIoKTogUHJvbWlzZTxUcmFja2VyPiB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhY2tlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFja2VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0cmFja2VyID0gYXdhaXQgdGhpcy5jbGllbnQudHJhY2tEZXZpY2VzKCk7XHJcbiAgICAgICAgdHJhY2tlci5vbignY2hhbmdlU2V0JywgdGhpcy5vbkNoYW5nZVNldCk7XHJcbiAgICAgICAgdHJhY2tlci5vbignZW5kJywgdGhpcy5yZXN0YXJ0VHJhY2tlcik7XHJcbiAgICAgICAgdHJhY2tlci5vbignZXJyb3InLCB0aGlzLnJlc3RhcnRUcmFja2VyKTtcclxuICAgICAgICByZXR1cm4gdHJhY2tlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0b3BUcmFja2VyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRyYWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy50cmFja2VyLm9mZignY2hhbmdlU2V0JywgdGhpcy5vbkNoYW5nZVNldCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tlci5vZmYoJ2VuZCcsIHRoaXMucmVzdGFydFRyYWNrZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNrZXIub2ZmKCdlcnJvcicsIHRoaXMucmVzdGFydFRyYWNrZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNrZXIuZW5kKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmFja2VyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGV2aWNlcygpOiBHb29nRGV2aWNlRGVzY3JpcHRvcltdIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmRlc2NyaXB0b3JzLnZhbHVlcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RGV2aWNlKHVkaWQ6IHN0cmluZyk6IERldmljZSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV2aWNlTWFwLmdldCh1ZGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBgYURldmljZSBUcmFja2VyIFske29zLmhvc3RuYW1lKCl9XWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluaXQoKS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvcjogRmFpbGVkIHRvIGluaXQgXCIke3RoaXMuZ2V0TmFtZSgpfVwiLiAke2UubWVzc2FnZX1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0b3BUcmFja2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJ1bkNvbW1hbmQoY29tbWFuZDogQ29udHJvbENlbnRlckNvbW1hbmQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB1ZGlkID0gY29tbWFuZC5nZXRVZGlkKCk7XHJcbiAgICAgICAgY29uc3QgZGV2aWNlID0gdGhpcy5nZXREZXZpY2UodWRpZCk7XHJcbiAgICAgICAgaWYgKCFkZXZpY2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRGV2aWNlIHdpdGggdWRpZDpcIiR7dWRpZH1cIiBub3QgZm91bmRgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0eXBlID0gY29tbWFuZC5nZXRUeXBlKCk7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ29udHJvbENlbnRlckNvbW1hbmQuS0lMTF9TRVJWRVI6XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkZXZpY2Uua2lsbFNlcnZlcihjb21tYW5kLmdldFBpZCgpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSBDb250cm9sQ2VudGVyQ29tbWFuZC5TVEFSVF9TRVJWRVI6XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkZXZpY2Uuc3RhcnRTZXJ2ZXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSBDb250cm9sQ2VudGVyQ29tbWFuZC5VUERBVEVfSU5URVJGQUNFUzpcclxuICAgICAgICAgICAgICAgIGF3YWl0IGRldmljZS51cGRhdGVJbnRlcmZhY2VzKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGNvbW1hbmQ6IFwiJHt0eXBlfVwiYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBXUyBmcm9tICd3cyc7XHJcbmltcG9ydCB7IE13IH0gZnJvbSAnLi9Ndyc7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL0NvbmZpZyc7XHJcbmltcG9ydCB7IE1lc3NhZ2VFcnJvciwgTWVzc2FnZUhvc3RzLCBNZXNzYWdlVHlwZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9Ib3N0VHJhY2tlck1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBIb3N0SXRlbSB9IGZyb20gJy4uLy4uL3R5cGVzL0NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQgeyBNdWx0aXBsZXhlciB9IGZyb20gJy4uLy4uL3BhY2thZ2VzL211bHRpcGxleGVyL011bHRpcGxleGVyJztcclxuaW1wb3J0IHsgQ2hhbm5lbENvZGUgfSBmcm9tICcuLi8uLi9jb21tb24vQ2hhbm5lbENvZGUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUcmFja2VyQ2xhc3Mge1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSG9zdFRyYWNrZXIgZXh0ZW5kcyBNdyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRBRyA9ICdIb3N0VHJhY2tlcic7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2NhbFRyYWNrZXJzOiBTZXQ8VHJhY2tlckNsYXNzPiA9IG5ldyBTZXQ8VHJhY2tlckNsYXNzPigpO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVtb3RlSG9zdEl0ZW1zPzogSG9zdEl0ZW1bXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHByb2Nlc3NDaGFubmVsKHdzOiBNdWx0aXBsZXhlciwgY29kZTogc3RyaW5nKTogTXcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmIChjb2RlICE9PSBDaGFubmVsQ29kZS5IU1RTKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBIb3N0VHJhY2tlcih3cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWdpc3RlckxvY2FsVHJhY2tlcih0cmFja2VyOiBUcmFja2VyQ2xhc3MpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvY2FsVHJhY2tlcnMuYWRkKHRyYWNrZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHdzOiBNdWx0aXBsZXhlcikge1xyXG4gICAgICAgIHN1cGVyKHdzKTtcclxuXHJcbiAgICAgICAgY29uc3QgbG9jYWw6IHsgdHlwZTogc3RyaW5nIH1bXSA9IEFycmF5LmZyb20oSG9zdFRyYWNrZXIubG9jYWxUcmFja2Vycy5rZXlzKCkpLm1hcCgodHJhY2tlcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiB0cmFja2VyLnR5cGUgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIUhvc3RUcmFja2VyLnJlbW90ZUhvc3RJdGVtcykge1xyXG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSBDb25maWcuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgSG9zdFRyYWNrZXIucmVtb3RlSG9zdEl0ZW1zID0gQXJyYXkuZnJvbShjb25maWcuZ2V0SG9zdExpc3QoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2U6IE1lc3NhZ2VIb3N0cyA9IHtcclxuICAgICAgICAgICAgaWQ6IC0xLFxyXG4gICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5IT1NUUyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgbG9jYWwsXHJcbiAgICAgICAgICAgICAgICByZW1vdGU6IEhvc3RUcmFja2VyLnJlbW90ZUhvc3RJdGVtcyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU29ja2V0TWVzc2FnZShldmVudDogV1MuTWVzc2FnZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZTogTWVzc2FnZUVycm9yID0ge1xyXG4gICAgICAgICAgICBpZDogLTEsXHJcbiAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkVSUk9SLFxyXG4gICAgICAgICAgICBkYXRhOiBgVW5zdXBwb3J0ZWQgbWVzc2FnZTogXCIke2V2ZW50LmRhdGEudG9TdHJpbmcoKX1cImAsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlbGVhc2UoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTWVzc2FnZSc7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XHJcbmltcG9ydCB7IE11bHRpcGxleGVyIH0gZnJvbSAnLi4vLi4vcGFja2FnZXMvbXVsdGlwbGV4ZXIvTXVsdGlwbGV4ZXInO1xyXG5pbXBvcnQgV1MgZnJvbSAnd3MnO1xyXG5cclxuZXhwb3J0IHR5cGUgUmVxdWVzdFBhcmFtZXRlcnMgPSB7XHJcbiAgICByZXF1ZXN0OiBodHRwLkluY29taW5nTWVzc2FnZTtcclxuICAgIHVybDogVVJMO1xyXG4gICAgYWN0aW9uOiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE13RmFjdG9yeSB7XHJcbiAgICBwcm9jZXNzUmVxdWVzdCh3czogV1MsIHBhcmFtczogUmVxdWVzdFBhcmFtZXRlcnMpOiBNdyB8IHVuZGVmaW5lZDtcclxuICAgIHByb2Nlc3NDaGFubmVsKHdzOiBNdWx0aXBsZXhlciwgY29kZTogc3RyaW5nLCBkYXRhPzogQXJyYXlCdWZmZXIpOiBNdyB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE13IHtcclxuICAgIHByb3RlY3RlZCBuYW1lID0gJ013JztcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHByb2Nlc3NDaGFubmVsKF93czogTXVsdGlwbGV4ZXIsIF9jb2RlOiBzdHJpbmcsIF9kYXRhPzogQXJyYXlCdWZmZXIpOiBNdyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcHJvY2Vzc1JlcXVlc3QoX3dzOiBXUywgX3BhcmFtczogUmVxdWVzdFBhcmFtZXRlcnMpOiBNdyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgd3M6IFdTIHwgTXVsdGlwbGV4ZXIpIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMub25Tb2NrZXRNZXNzYWdlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMud3MuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCB0aGlzLm9uU29ja2V0Q2xvc2UuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9uU29ja2V0TWVzc2FnZShldmVudDogV1MuTWVzc2FnZUV2ZW50KTogdm9pZDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc2VuZE1lc3NhZ2UgPSAoZGF0YTogTWVzc2FnZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLndzLnJlYWR5U3RhdGUgIT09IHRoaXMud3MuT1BFTikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud3Muc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RlY3RlZCBvblNvY2tldENsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVsZWFzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSwgQ0xPU0VELCBDTE9TSU5HIH0gPSB0aGlzLndzO1xyXG4gICAgICAgIGlmIChyZWFkeVN0YXRlICE9PSBDTE9TRUQgJiYgcmVhZHlTdGF0ZSAhPT0gQ0xPU0lORykge1xyXG4gICAgICAgICAgICB0aGlzLndzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE13LCBNd0ZhY3RvcnksIFJlcXVlc3RQYXJhbWV0ZXJzIH0gZnJvbSAnLi9Ndyc7XHJcbmltcG9ydCB7IEFDVElPTiB9IGZyb20gJy4uLy4uL2NvbW1vbi9BY3Rpb24nO1xyXG5pbXBvcnQgeyBNdWx0aXBsZXhlciB9IGZyb20gJy4uLy4uL3BhY2thZ2VzL211bHRpcGxleGVyL011bHRpcGxleGVyJztcclxuaW1wb3J0IFdTIGZyb20gJ3dzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vLi4vYXBwL1V0aWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdlYnNvY2tldE11bHRpcGxleGVyIGV4dGVuZHMgTXcge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBUQUcgPSAnV2Vic29ja2V0TXVsdGlwbGV4ZXInO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbXdGYWN0b3JpZXM6IFNldDxNd0ZhY3Rvcnk+ID0gbmV3IFNldCgpO1xyXG4gICAgcHJpdmF0ZSBtdWx0aXBsZXhlcjogTXVsdGlwbGV4ZXI7XHJcbiAgICAvLyBwcml2YXRlIG13OiBTZXQ8TXc+ID0gbmV3IFNldCgpO1xyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIHB1YmxpYyBzdGF0aWMgcHJvY2Vzc1JlcXVlc3Qod3M6IFdTLCBwYXJhbXM6IFJlcXVlc3RQYXJhbWV0ZXJzKTogV2Vic29ja2V0TXVsdGlwbGV4ZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGNvbnN0IHsgYWN0aW9uIH0gPSBwYXJhbXM7XHJcbiAgICAgICAgaWYgKGFjdGlvbiAhPT0gQUNUSU9OLk1VTFRJUExFWCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU11bHRpcGxleGVyKHdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZU11bHRpcGxleGVyKHdzOiBXUyk6IFdlYnNvY2tldE11bHRpcGxleGVyIHtcclxuICAgICAgICBjb25zdCBzZXJ2aWNlID0gbmV3IFdlYnNvY2tldE11bHRpcGxleGVyKHdzKTtcclxuICAgICAgICBzZXJ2aWNlLmluaXQoKS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtc2cgPSBgWyR7dGhpcy5UQUd9XSBGYWlsZWQgdG8gc3RhcnQgc2VydmljZTogJHtlLm1lc3NhZ2V9YDtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgICAgICAgICB3cy5jbG9zZSg0MDA1LCBtc2cpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHdzOiBXUykge1xyXG4gICAgICAgIHN1cGVyKHdzKTtcclxuICAgICAgICB0aGlzLm11bHRpcGxleGVyID0gTXVsdGlwbGV4ZXIud3JhcCh3cyBhcyB1bmtub3duIGFzIFdlYlNvY2tldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5tdWx0aXBsZXhlci5hZGRFdmVudExpc3RlbmVyKCdjaGFubmVsJywgdGhpcy5vbkNoYW5uZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVnaXN0ZXJNdyhtd0ZhY3Rvcnk6IE13RmFjdG9yeSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubXdGYWN0b3JpZXMuYWRkKG13RmFjdG9yeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU29ja2V0TWVzc2FnZShfZXZlbnQ6IFdTLk1lc3NhZ2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIC8vIG5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2hhbm5lbCh7IGNoYW5uZWwsIGRhdGEgfTogeyBjaGFubmVsOiBNdWx0aXBsZXhlcjsgZGF0YTogQXJyYXlCdWZmZXIgfSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwcm9jZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGNvbnN0IG13RmFjdG9yeSBvZiBXZWJzb2NrZXRNdWx0aXBsZXhlci5td0ZhY3Rvcmllcy52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IFV0aWwudXRmOEJ5dGVBcnJheVRvU3RyaW5nKEJ1ZmZlci5mcm9tKGRhdGEpLnNsaWNlKDAsIDQpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IGRhdGEuYnl0ZUxlbmd0aCA+IDQgPyBkYXRhLnNsaWNlKDQpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXcgPSBtd0ZhY3RvcnkucHJvY2Vzc0NoYW5uZWwoY2hhbm5lbCwgY29kZSwgYnVmZmVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChtdykge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5tdy5hZGQobXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5tdy5kZWxldGUobXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIHJlbW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIHJlbW92ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwcm9jZXNzZWQpIHtcclxuICAgICAgICAgICAgY2hhbm5lbC5jbG9zZSg0MDAyLCBgWyR7V2Vic29ja2V0TXVsdGlwbGV4ZXIuVEFHfV0gVW5zdXBwb3J0ZWQgcmVxdWVzdGApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZWxlYXNlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTXcsIFJlcXVlc3RQYXJhbWV0ZXJzIH0gZnJvbSAnLi9Ndyc7XHJcbmltcG9ydCBXUyBmcm9tICd3cyc7XHJcbmltcG9ydCB7IEFDVElPTiB9IGZyb20gJy4uLy4uL2NvbW1vbi9BY3Rpb24nO1xyXG5pbXBvcnQgeyBNdWx0aXBsZXhlciB9IGZyb20gJy4uLy4uL3BhY2thZ2VzL211bHRpcGxleGVyL011bHRpcGxleGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJzb2NrZXRQcm94eSBleHRlbmRzIE13IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVEFHID0gJ1dlYnNvY2tldFByb3h5JztcclxuICAgIHByaXZhdGUgcmVtb3RlU29ja2V0PzogV1M7XHJcbiAgICBwcml2YXRlIHJlbGVhc2VkID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHN0b3JhZ2U6IFdTLk1lc3NhZ2VFdmVudFtdID0gW107XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgcHVibGljIHN0YXRpYyBwcm9jZXNzUmVxdWVzdCh3czogV1MsIHBhcmFtczogUmVxdWVzdFBhcmFtZXRlcnMpOiBXZWJzb2NrZXRQcm94eSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgY29uc3QgeyBhY3Rpb24sIHVybCB9ID0gcGFyYW1zO1xyXG4gICAgICAgIGlmIChhY3Rpb24gIT09IEFDVElPTi5QUk9YWV9XUykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHdzU3RyaW5nID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3dzJyk7XHJcbiAgICAgICAgaWYgKCF3c1N0cmluZykge1xyXG4gICAgICAgICAgICB3cy5jbG9zZSg0MDAzLCBgWyR7dGhpcy5UQUd9XSBJbnZhbGlkIHZhbHVlIFwiJHt3c31cIiBmb3IgXCJ3c1wiIHBhcmFtZXRlcmApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVByb3h5KHdzLCB3c1N0cmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVQcm94eSh3czogV1MgfCBNdWx0aXBsZXhlciwgcmVtb3RlVXJsOiBzdHJpbmcpOiBXZWJzb2NrZXRQcm94eSB7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IG5ldyBXZWJzb2NrZXRQcm94eSh3cyk7XHJcbiAgICAgICAgc2VydmljZS5pbml0KHJlbW90ZVVybCkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbXNnID0gYFske3RoaXMuVEFHfV0gRmFpbGVkIHRvIHN0YXJ0IHNlcnZpY2U6ICR7ZS5tZXNzYWdlfWA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcclxuICAgICAgICAgICAgd3MuY2xvc2UoNDAwNSwgbXNnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VydmljZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih3czogV1MgfCBNdWx0aXBsZXhlcikge1xyXG4gICAgICAgIHN1cGVyKHdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgaW5pdChyZW1vdGVVcmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IGBbJHtXZWJzb2NrZXRQcm94eS5UQUd9eyQke3JlbW90ZVVybH19XWA7XHJcbiAgICAgICAgY29uc3QgcmVtb3RlU29ja2V0ID0gbmV3IFdTKHJlbW90ZVVybCk7XHJcbiAgICAgICAgcmVtb3RlU29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdGVTb2NrZXQgPSByZW1vdGVTb2NrZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuZmx1c2goKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlbW90ZVNvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud3MgJiYgdGhpcy53cy5yZWFkeVN0YXRlID09PSB0aGlzLndzLk9QRU4pIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGV2ZW50LmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5mb3JFYWNoKChkYXRhKSA9PiB0aGlzLndzLnNlbmQoZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndzLnNlbmQoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlbW90ZVNvY2tldC5vbmNsb3NlID0gKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud3MucmVhZHlTdGF0ZSA9PT0gdGhpcy53cy5PUEVOKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndzLmNsb3NlKGUud2FzQ2xlYW4gPyAxMDAwIDogNDAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlbW90ZVNvY2tldC5vbmVycm9yID0gKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud3MucmVhZHlTdGF0ZSA9PT0gdGhpcy53cy5PUEVOKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndzLmNsb3NlKDQwMTEsIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmx1c2goKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlU29ja2V0KSB7XHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLnN0b3JhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IHRoaXMuc3RvcmFnZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZVNvY2tldC5zZW5kKGV2ZW50LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlbGVhc2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZVNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZS5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblNvY2tldE1lc3NhZ2UoZXZlbnQ6IFdTLk1lc3NhZ2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVNvY2tldCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW90ZVNvY2tldC5zZW5kKGV2ZW50LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5wdXNoKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbGVhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVsZWFzZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5yZWxlYXNlKCk7XHJcbiAgICAgICAgdGhpcy5yZWxlYXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbnRyb2xDZW50ZXJDb21tYW5kIH0gZnJvbSAnLi4vLi4vY29tbW9uL0NvbnRyb2xDZW50ZXJDb21tYW5kJztcclxuaW1wb3J0IHsgVHlwZWRFbWl0dGVyIH0gZnJvbSAnLi4vLi4vY29tbW9uL1R5cGVkRW1pdHRlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xDZW50ZXJFdmVudHM8VD4ge1xyXG4gICAgZGV2aWNlOiBUO1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUNvbnRyb2xDZW50ZXI8VD4gZXh0ZW5kcyBUeXBlZEVtaXR0ZXI8Q29udHJvbENlbnRlckV2ZW50czxUPj4ge1xyXG4gICAgYWJzdHJhY3QgZ2V0SWQoKTogc3RyaW5nO1xyXG4gICAgYWJzdHJhY3QgZ2V0TmFtZSgpOiBzdHJpbmc7XHJcbiAgICBhYnN0cmFjdCBnZXREZXZpY2VzKCk6IFRbXTtcclxuICAgIGFic3RyYWN0IHJ1bkNvbW1hbmQoY29tbWFuZDogQ29udHJvbENlbnRlckNvbW1hbmQpOiBQcm9taXNlPHN0cmluZyB8IHZvaWQ+O1xyXG59XHJcbiIsImltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgKiBhcyBodHRwcyBmcm9tICdodHRwcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi9VdGlscyc7XG5pbXBvcnQgZXhwcmVzcywgeyBFeHByZXNzIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9Db25maWcnO1xuaW1wb3J0IHsgVHlwZWRFbWl0dGVyIH0gZnJvbSAnLi4vLi4vY29tbW9uL1R5cGVkRW1pdHRlcic7XG5pbXBvcnQgKiBhcyBwcm9jZXNzIGZyb20gJ3Byb2Nlc3MnO1xuaW1wb3J0IHsgRW52TmFtZSB9IGZyb20gJy4uL0Vudk5hbWUnO1xuXG5jb25zdCBERUZBVUxUX1NUQVRJQ19ESVIgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9wdWJsaWMnKTtcblxuY29uc3QgUEFUSE5BTUUgPSBwcm9jZXNzLmVudltFbnZOYW1lLldTX1NDUkNQWV9QQVRITkFNRV0gfHwgX19QQVRITkFNRV9fO1xuXG5leHBvcnQgdHlwZSBTZXJ2ZXJBbmRQb3J0ID0ge1xuICAgIHNlcnZlcjogaHR0cHMuU2VydmVyIHwgaHR0cC5TZXJ2ZXI7XG4gICAgcG9ydDogbnVtYmVyO1xufTtcblxuaW50ZXJmYWNlIEh0dHBTZXJ2ZXJFdmVudHMge1xuICAgIHN0YXJ0ZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBIdHRwU2VydmVyIGV4dGVuZHMgVHlwZWRFbWl0dGVyPEh0dHBTZXJ2ZXJFdmVudHM+IGltcGxlbWVudHMgU2VydmljZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEh0dHBTZXJ2ZXI7XG4gICAgcHJpdmF0ZSBzdGF0aWMgUFVCTElDX0RJUiA9IERFRkFVTFRfU1RBVElDX0RJUjtcbiAgICBwcml2YXRlIHN0YXRpYyBTRVJWRV9TVEFUSUMgPSB0cnVlO1xuICAgIHByaXZhdGUgc2VydmVyczogU2VydmVyQW5kUG9ydFtdID0gW107XG4gICAgcHJpdmF0ZSBtYWluQXBwPzogRXhwcmVzcztcbiAgICBwcml2YXRlIHN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEh0dHBTZXJ2ZXIge1xuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgSHR0cFNlcnZlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzSW5zdGFuY2UoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzZXRQdWJsaWNEaXIoZGlyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKEh0dHBTZXJ2ZXIuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdVbmFibGUgdG8gY2hhbmdlIHZhbHVlIGFmdGVyIGluc3RhbnRpYXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBIdHRwU2VydmVyLlBVQkxJQ19ESVIgPSBkaXI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzZXRTZXJ2ZVN0YXRpYyhlbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChIdHRwU2VydmVyLmluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignVW5hYmxlIHRvIGNoYW5nZSB2YWx1ZSBhZnRlciBpbnN0YW50aWF0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgSHR0cFNlcnZlci5TRVJWRV9TVEFUSUMgPSBlbmFibGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBnZXRTZXJ2ZXJzKCk6IFByb21pc2U8U2VydmVyQW5kUG9ydFtdPiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBbLi4udGhpcy5zZXJ2ZXJzXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8U2VydmVyQW5kUG9ydFtdPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbmNlKCdzdGFydGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoWy4uLnRoaXMuc2VydmVyc10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgSFRUUChzKSBTZXJ2ZXIgU2VydmljZWA7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLm1haW5BcHAgPSBleHByZXNzKCk7XG4gICAgICAgIGlmIChIdHRwU2VydmVyLlNFUlZFX1NUQVRJQyAmJiBIdHRwU2VydmVyLlBVQkxJQ19ESVIpIHtcbiAgICAgICAgICAgIHRoaXMubWFpbkFwcC51c2UoUEFUSE5BTUUsIGV4cHJlc3Muc3RhdGljKEh0dHBTZXJ2ZXIuUFVCTElDX0RJUikpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29uZmlnID0gQ29uZmlnLmdldEluc3RhbmNlKCk7XG4gICAgICAgIGNvbmZpZy5zZXJ2ZXJzLmZvckVhY2goKHNlcnZlckl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgc2VjdXJlLCBwb3J0LCByZWRpcmVjdFRvU2VjdXJlIH0gPSBzZXJ2ZXJJdGVtO1xuICAgICAgICAgICAgbGV0IHByb3RvOiBzdHJpbmc7XG4gICAgICAgICAgICBsZXQgc2VydmVyOiBodHRwLlNlcnZlciB8IGh0dHBzLlNlcnZlcjtcbiAgICAgICAgICAgIGlmIChzZWN1cmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlcnZlckl0ZW0ub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignTXVzdCBwcm92aWRlIG9wdGlvbiBmb3Igc2VjdXJlIHNlcnZlciBjb25maWd1cmF0aW9uJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlcnZlciA9IGh0dHBzLmNyZWF0ZVNlcnZlcihzZXJ2ZXJJdGVtLm9wdGlvbnMsIHRoaXMubWFpbkFwcCk7XG4gICAgICAgICAgICAgICAgcHJvdG8gPSAnaHR0cHMnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0gc2VydmVySXRlbS5vcHRpb25zID8geyAuLi5zZXJ2ZXJJdGVtLm9wdGlvbnMgfSA6IHt9O1xuICAgICAgICAgICAgICAgIHByb3RvID0gJ2h0dHAnO1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50QXBwID0gdGhpcy5tYWluQXBwO1xuICAgICAgICAgICAgICAgIGxldCBob3N0ID0gJyc7XG4gICAgICAgICAgICAgICAgbGV0IHBvcnQgPSA0NDM7XG4gICAgICAgICAgICAgICAgbGV0IGRvUmVkaXJlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3RUb1NlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBkb1JlZGlyZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWRpcmVjdFRvU2VjdXJlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBkb1JlZGlyZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWRpcmVjdFRvU2VjdXJlLnBvcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3J0ID0gcmVkaXJlY3RUb1NlY3VyZS5wb3J0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVkaXJlY3RUb1NlY3VyZS5ob3N0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaG9zdCA9IHJlZGlyZWN0VG9TZWN1cmUuaG9zdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZG9SZWRpcmVjdCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXBwID0gZXhwcmVzcygpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYGh0dHBzOi8vJHtob3N0ID8gaG9zdCA6IHJlcS5oZWFkZXJzLmhvc3R9JHtyZXEudXJsfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvcnQgJiYgcG9ydCAhPT0gNDQzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsLnBvcnQgPSBwb3J0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnJlZGlyZWN0KDMwMSwgdXJsLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIob3B0aW9ucywgY3VycmVudEFwcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlcnZlcnMucHVzaCh7IHNlcnZlciwgcG9ydCB9KTtcbiAgICAgICAgICAgIHNlcnZlci5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIFV0aWxzLnByaW50TGlzdGVuaW5nTXNnKHByb3RvLCBwb3J0LCBQQVRITkFNRSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdCgnc3RhcnRlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlcnZlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5zZXJ2ZXIuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU2VydmVyIGFzIFdTU2VydmVyIH0gZnJvbSAnd3MnO1xyXG5pbXBvcnQgV1MgZnJvbSAnd3MnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlJztcclxuaW1wb3J0IHsgSHR0cFNlcnZlciwgU2VydmVyQW5kUG9ydCB9IGZyb20gJy4vSHR0cFNlcnZlcic7XHJcbmltcG9ydCB7IE13RmFjdG9yeSB9IGZyb20gJy4uL213L013JztcclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXRTZXJ2ZXIgaW1wbGVtZW50cyBTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlPzogV2ViU29ja2V0U2VydmVyO1xyXG4gICAgcHJpdmF0ZSBzZXJ2ZXJzOiBXU1NlcnZlcltdID0gW107XHJcbiAgICBwcml2YXRlIG13RmFjdG9yaWVzOiBTZXQ8TXdGYWN0b3J5PiA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gbm90aGluZyBoZXJlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBXZWJTb2NrZXRTZXJ2ZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFdlYlNvY2tldFNlcnZlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGhhc0luc3RhbmNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyTXcobXdGYWN0b3J5OiBNd0ZhY3RvcnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm13RmFjdG9yaWVzLmFkZChtd0ZhY3RvcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhdHRhY2hUb1NlcnZlcihpdGVtOiBTZXJ2ZXJBbmRQb3J0KTogV1NTZXJ2ZXIge1xyXG4gICAgICAgIGNvbnN0IHsgc2VydmVyLCBwb3J0IH0gPSBpdGVtO1xyXG4gICAgICAgIGNvbnN0IFRBRyA9IGBXZWJTb2NrZXQgU2VydmVyIHt0Y3A6JHtwb3J0fX1gO1xyXG4gICAgICAgIGNvbnN0IHdzcyA9IG5ldyBXU1NlcnZlcih7IHNlcnZlciB9KTtcclxuICAgICAgICB3c3Mub24oJ2Nvbm5lY3Rpb24nLCBhc3luYyAod3M6IFdTLCByZXF1ZXN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVxdWVzdC51cmwpIHtcclxuICAgICAgICAgICAgICAgIHdzLmNsb3NlKDQwMDEsIGBbJHtUQUd9XSBJbnZhbGlkIHVybGApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxdWVzdC51cmwsICdodHRwczovL2V4YW1wbGUub3JnLycpO1xyXG4gICAgICAgICAgICBjb25zdCBhY3Rpb24gPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnYWN0aW9uJykgfHwgJyc7XHJcbiAgICAgICAgICAgIGxldCBwcm9jZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBtd0ZhY3Rvcnkgb2YgdGhpcy5td0ZhY3Rvcmllcy52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VydmljZSA9IG13RmFjdG9yeS5wcm9jZXNzUmVxdWVzdCh3cywgeyBhY3Rpb24sIHJlcXVlc3QsIHVybCB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXByb2Nlc3NlZCkge1xyXG4gICAgICAgICAgICAgICAgd3MuY2xvc2UoNDAwMiwgYFske1RBR31dIFVuc3VwcG9ydGVkIHJlcXVlc3RgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd3NzLm9uKCdjbG9zZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7VEFHfSBzdG9wcGVkYCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJzLnB1c2god3NzKTtcclxuICAgICAgICByZXR1cm4gd3NzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZXJ2ZXJzKCk6IFdTU2VydmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYFdlYlNvY2tldCBTZXJ2ZXIgU2VydmljZWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHNlcnZpY2UgPSBIdHRwU2VydmVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgY29uc3Qgc2VydmVycyA9IGF3YWl0IHNlcnZpY2UuZ2V0U2VydmVycygpO1xyXG4gICAgICAgIHNlcnZlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmF0dGFjaFRvU2VydmVyKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VydmVycy5mb3JFYWNoKChzZXJ2ZXIpID0+IHtcclxuICAgICAgICAgICAgc2VydmVyLmNsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGRlYWQ1MGY3L2FkYmtpdC9saWIvYWRiXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBkZWFkNTBmNy9hZGJraXQvbGliL2FkYi9jbGllbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGRlYWQ1MGY3L2FkYmtpdC9saWIvYWRiL2NvbW1hbmRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGRlYWQ1MGY3L2FkYmtpdC9saWIvYWRiL3Byb3RvY29sXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBkZWFkNTBmNy9hZGJraXQvbGliL2FkYi9zeW5jL2VudHJ5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBvcnRmaW5kZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0c2xpYlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ5YW1sXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFkbGluZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiOyIsIlxuaW1wb3J0ICogYXMgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9Db25maWcnO1xuaW1wb3J0IHsgSHR0cFNlcnZlciB9IGZyb20gJy4vc2VydmljZXMvSHR0cFNlcnZlcic7XG5pbXBvcnQgeyBXZWJTb2NrZXRTZXJ2ZXIgfSBmcm9tICcuL3NlcnZpY2VzL1dlYlNvY2tldFNlcnZlcic7XG5pbXBvcnQgeyBTZXJ2aWNlLCBTZXJ2aWNlQ2xhc3MgfSBmcm9tICcuL3NlcnZpY2VzL1NlcnZpY2UnO1xuaW1wb3J0IHsgTXdGYWN0b3J5IH0gZnJvbSAnLi9tdy9Ndyc7XG5pbXBvcnQgeyBXZWJzb2NrZXRQcm94eSB9IGZyb20gJy4vbXcvV2Vic29ja2V0UHJveHknO1xuaW1wb3J0IHsgSG9zdFRyYWNrZXIgfSBmcm9tICcuL213L0hvc3RUcmFja2VyJztcbmltcG9ydCB7IFdlYnNvY2tldE11bHRpcGxleGVyIH0gZnJvbSAnLi9tdy9XZWJzb2NrZXRNdWx0aXBsZXhlcic7XG5cbmNvbnN0IHNlcnZpY2VzVG9TdGFydDogU2VydmljZUNsYXNzW10gPSBbSHR0cFNlcnZlciwgV2ViU29ja2V0U2VydmVyXTtcblxuLy8gTVdzIHRoYXQgYWNjZXB0IFdlYlNvY2tldFxuY29uc3QgbXdMaXN0OiBNd0ZhY3RvcnlbXSA9IFtXZWJzb2NrZXRQcm94eSwgV2Vic29ja2V0TXVsdGlwbGV4ZXJdO1xuXG4vLyBNV3MgdGhhdCBhY2NlcHQgTXVsdGlwbGV4ZXJcbmNvbnN0IG13Mkxpc3Q6IE13RmFjdG9yeVtdID0gW0hvc3RUcmFja2VyXTtcblxuY29uc3QgcnVubmluZ1NlcnZpY2VzOiBTZXJ2aWNlW10gPSBbXTtcbmNvbnN0IGxvYWRQbGF0Zm9ybU1vZHVsZXNQcm9taXNlczogUHJvbWlzZTx2b2lkPltdID0gW107XG5cbmNvbnN0IGNvbmZpZyA9IENvbmZpZy5nZXRJbnN0YW5jZSgpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vL1xuYXN5bmMgZnVuY3Rpb24gbG9hZEdvb2dNb2R1bGVzKCkge1xuICAgIGNvbnN0IHsgQ29udHJvbENlbnRlciB9ID0gYXdhaXQgaW1wb3J0KCcuL2dvb2ctZGV2aWNlL3NlcnZpY2VzL0NvbnRyb2xDZW50ZXInKTtcbiAgICBjb25zdCB7IERldmljZVRyYWNrZXIgfSA9IGF3YWl0IGltcG9ydCgnLi9nb29nLWRldmljZS9tdy9EZXZpY2VUcmFja2VyJyk7XG4gICAgY29uc3QgeyBXZWJzb2NrZXRQcm94eU92ZXJBZGIgfSA9IGF3YWl0IGltcG9ydCgnLi9nb29nLWRldmljZS9tdy9XZWJzb2NrZXRQcm94eU92ZXJBZGInKTtcblxuICAgIGlmIChjb25maWcucnVuTG9jYWxHb29nVHJhY2tlcikge1xuICAgICAgICBtdzJMaXN0LnB1c2goRGV2aWNlVHJhY2tlcik7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5hbm5vdW5jZUxvY2FsR29vZ1RyYWNrZXIpIHtcbiAgICAgICAgSG9zdFRyYWNrZXIucmVnaXN0ZXJMb2NhbFRyYWNrZXIoRGV2aWNlVHJhY2tlcik7XG4gICAgfVxuXG4gICAgc2VydmljZXNUb1N0YXJ0LnB1c2goQ29udHJvbENlbnRlcik7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAvKiBjb25zdCB7IFJlbW90ZVNoZWxsIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ29vZy1kZXZpY2UvbXcvUmVtb3RlU2hlbGwnKTtcbiAgICBtdzJMaXN0LnB1c2goUmVtb3RlU2hlbGwpOyovXG4vLy8vLy8vLy8vLy8vL1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvKiAgY29uc3QgeyBSZW1vdGVEZXZ0b29scyB9ID0gYXdhaXQgaW1wb3J0KCcuL2dvb2ctZGV2aWNlL213L1JlbW90ZURldnRvb2xzJyk7XG4gICAgbXdMaXN0LnB1c2goUmVtb3RlRGV2dG9vbHMpOyovXG4vLy8vLy8vLy8vLy8vL1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgLyogY29uc3QgeyBGaWxlTGlzdGluZyB9ID0gYXdhaXQgaW1wb3J0KCcuL2dvb2ctZGV2aWNlL213L0ZpbGVMaXN0aW5nJyk7XG4gICAgbXcyTGlzdC5wdXNoKEZpbGVMaXN0aW5nKTsqL1xuLy8vLy8vLy8vLy8vLy9cblxuICAgIG13TGlzdC5wdXNoKFdlYnNvY2tldFByb3h5T3ZlckFkYik7XG59XG5sb2FkUGxhdGZvcm1Nb2R1bGVzUHJvbWlzZXMucHVzaChsb2FkR29vZ01vZHVsZXMoKSk7XG4vLy8vLy8vLy8vXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy9cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy9cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiBcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy9cblxuUHJvbWlzZS5hbGwobG9hZFBsYXRmb3JtTW9kdWxlc1Byb21pc2VzKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2VzVG9TdGFydC5tYXAoKHNlcnZpY2VDbGFzczogU2VydmljZUNsYXNzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gc2VydmljZUNsYXNzLmdldEluc3RhbmNlKCk7XG4gICAgICAgICAgICBydW5uaW5nU2VydmljZXMucHVzaChzZXJ2aWNlKTtcbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlLnN0YXJ0KCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCB3c1NlcnZpY2UgPSBXZWJTb2NrZXRTZXJ2ZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgbXdMaXN0LmZvckVhY2goKG13RmFjdG9yeTogTXdGYWN0b3J5KSA9PiB7XG4gICAgICAgICAgICB3c1NlcnZpY2UucmVnaXN0ZXJNdyhtd0ZhY3RvcnkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBtdzJMaXN0LmZvckVhY2goKG13RmFjdG9yeTogTXdGYWN0b3J5KSA9PiB7XG4gICAgICAgICAgICBXZWJzb2NrZXRNdWx0aXBsZXhlci5yZWdpc3Rlck13KG13RmFjdG9yeSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG4gICAgICAgICAgICByZWFkbGluZVxuICAgICAgICAgICAgICAgIC5jcmVhdGVJbnRlcmZhY2Uoe1xuICAgICAgICAgICAgICAgICAgICBpbnB1dDogcHJvY2Vzcy5zdGRpbixcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0OiBwcm9jZXNzLnN0ZG91dCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignU0lHSU5UJywgZXhpdCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9jZXNzLm9uKCdTSUdJTlQnLCBleGl0KTtcbiAgICAgICAgcHJvY2Vzcy5vbignU0lHVEVSTScsIGV4aXQpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBleGl0KCcxJyk7XG4gICAgfSk7XG5cbmxldCBpbnRlcnJ1cHRlZCA9IGZhbHNlO1xuZnVuY3Rpb24gZXhpdChzaWduYWw6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKGBcXG5SZWNlaXZlZCBzaWduYWwgJHtzaWduYWx9YCk7XG4gICAgaWYgKGludGVycnVwdGVkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGb3JjZSBleGl0Jyk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbnRlcnJ1cHRlZCA9IHRydWU7XG4gICAgcnVubmluZ1NlcnZpY2VzLmZvckVhY2goKHNlcnZpY2U6IFNlcnZpY2UpID0+IHtcbiAgICAgICAgY29uc3Qgc2VydmljZU5hbWUgPSBzZXJ2aWNlLmdldE5hbWUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYFN0b3BwaW5nICR7c2VydmljZU5hbWV9IC4uLmApO1xuICAgICAgICBzZXJ2aWNlLnJlbGVhc2UoKTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==