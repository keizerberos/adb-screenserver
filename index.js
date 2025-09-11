/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("readline");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Config = void 0;
var tslib_1 = __webpack_require__(1);
var process = tslib_1.__importStar(__webpack_require__(4));
var fs = tslib_1.__importStar(__webpack_require__(5));
var path = tslib_1.__importStar(__webpack_require__(6));
var EnvName_1 = __webpack_require__(7);
var yaml_1 = tslib_1.__importDefault(__webpack_require__(8));
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
/* 4 */
/***/ ((module) => {

module.exports = require("process");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnvName = void 0;
var EnvName;
(function (EnvName) {
    EnvName["CONFIG_PATH"] = "WS_SCRCPY_CONFIG";
    EnvName["WS_SCRCPY_PATHNAME"] = "WS_SCRCPY_PATHNAME";
})(EnvName = exports.EnvName || (exports.EnvName = {}));


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("yaml");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpServer = void 0;
var tslib_1 = __webpack_require__(1);
var http = tslib_1.__importStar(__webpack_require__(10));
var https = tslib_1.__importStar(__webpack_require__(11));
var path_1 = tslib_1.__importDefault(__webpack_require__(6));
var Utils_1 = __webpack_require__(12);
var express_1 = tslib_1.__importDefault(__webpack_require__(14));
var Config_1 = __webpack_require__(3);
var TypedEmitter_1 = __webpack_require__(15);
var process = tslib_1.__importStar(__webpack_require__(4));
var EnvName_1 = __webpack_require__(7);
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
/* 10 */
/***/ ((module) => {

module.exports = require("http");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("https");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Utils = void 0;
var tslib_1 = __webpack_require__(1);
var os = tslib_1.__importStar(__webpack_require__(13));
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
/* 13 */
/***/ ((module) => {

module.exports = require("os");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypedEmitter = void 0;
var events_1 = __webpack_require__(16);
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
/* 16 */
/***/ ((module) => {

module.exports = require("events");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebSocketServer = void 0;
var tslib_1 = __webpack_require__(1);
var ws_1 = __webpack_require__(18);
var HttpServer_1 = __webpack_require__(9);
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
/* 18 */
/***/ ((module) => {

module.exports = require("ws");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketProxy = void 0;
var tslib_1 = __webpack_require__(1);
var Mw_1 = __webpack_require__(20);
var ws_1 = tslib_1.__importDefault(__webpack_require__(18));
var Action_1 = __webpack_require__(21);
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HostTracker = void 0;
var tslib_1 = __webpack_require__(1);
var Mw_1 = __webpack_require__(20);
var Config_1 = __webpack_require__(3);
var HostTrackerMessage_1 = __webpack_require__(23);
var ChannelCode_1 = __webpack_require__(24);
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
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["HOSTS"] = "hosts";
    MessageType["ERROR"] = "error";
})(MessageType = exports.MessageType || (exports.MessageType = {}));


/***/ }),
/* 24 */
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
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketMultiplexer = void 0;
var tslib_1 = __webpack_require__(1);
var Mw_1 = __webpack_require__(20);
var Action_1 = __webpack_require__(21);
var Multiplexer_1 = __webpack_require__(26);
var Util_1 = tslib_1.__importDefault(__webpack_require__(29));
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
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Multiplexer = void 0;
var tslib_1 = __webpack_require__(1);
var TypedEmitter_1 = __webpack_require__(15);
var Message_1 = __webpack_require__(27);
var MessageType_1 = __webpack_require__(28);
var Event_1 = __webpack_require__(31);
var CloseEventClass_1 = __webpack_require__(30);
var ErrorEventClass_1 = __webpack_require__(32);
var MessageEventClass_1 = __webpack_require__(33);
var Util_1 = tslib_1.__importDefault(__webpack_require__(29));
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
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Message = void 0;
var tslib_1 = __webpack_require__(1);
var MessageType_1 = __webpack_require__(28);
var Util_1 = tslib_1.__importDefault(__webpack_require__(29));
var CloseEventClass_1 = __webpack_require__(30);
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
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloseEventClass = exports.CloseEvent2 = void 0;
var tslib_1 = __webpack_require__(1);
var Event_1 = __webpack_require__(31);
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
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventClass = exports.Event2 = void 0;
var tslib_1 = __webpack_require__(1);
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
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorEventClass = exports.ErrorEvent2 = void 0;
var tslib_1 = __webpack_require__(1);
var Event_1 = __webpack_require__(31);
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
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageEventClass = exports.MessageEvent2 = void 0;
var tslib_1 = __webpack_require__(1);
var Event_1 = __webpack_require__(31);
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
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControlCenter = void 0;
var tslib_1 = __webpack_require__(1);
var Device_1 = __webpack_require__(35);
var adb_1 = __webpack_require__(36);
var BaseControlCenter_1 = __webpack_require__(51);
var ControlCenterCommand_1 = __webpack_require__(52);
var os = tslib_1.__importStar(__webpack_require__(13));
var crypto = tslib_1.__importStar(__webpack_require__(53));
var DeviceState_1 = __webpack_require__(54);
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
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Device = void 0;
var tslib_1 = __webpack_require__(1);
var adb_1 = __webpack_require__(36);
var child_process_1 = __webpack_require__(44);
var TypedEmitter_1 = __webpack_require__(15);
var ScrcpyServer_1 = __webpack_require__(45);
var Properties_1 = __webpack_require__(50);
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
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdbExtended = void 0;
var tslib_1 = __webpack_require__(1);
var adb_1 = tslib_1.__importDefault(__webpack_require__(37));
var ExtendedClient_1 = __webpack_require__(38);
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
/* 37 */
/***/ ((module) => {

module.exports = require("@dead50f7/adbkit/lib/adb");

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtendedClient = void 0;
var tslib_1 = __webpack_require__(1);
var client_1 = tslib_1.__importDefault(__webpack_require__(39));
var sync_1 = __webpack_require__(40);
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
/* 39 */
/***/ ((module) => {

module.exports = require("@dead50f7/adbkit/lib/adb/client");

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SyncCommand = void 0;
var tslib_1 = __webpack_require__(1);
var protocol_1 = tslib_1.__importDefault(__webpack_require__(41));
var command_1 = tslib_1.__importDefault(__webpack_require__(42));
var ExtendedSync_1 = __webpack_require__(43);
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
/* 41 */
/***/ ((module) => {

module.exports = require("@dead50f7/adbkit/lib/adb/protocol");

/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("@dead50f7/adbkit/lib/adb/command");

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtendedSync = void 0;
var tslib_1 = __webpack_require__(1);
var protocol_1 = tslib_1.__importDefault(__webpack_require__(41));
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
/* 44 */
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScrcpyServer = void 0;
var tslib_1 = __webpack_require__(1);
__webpack_require__(46);
__webpack_require__(47);
var Constants_1 = __webpack_require__(48);
var path_1 = tslib_1.__importDefault(__webpack_require__(6));
var ServerVersion_1 = __webpack_require__(49);
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
/* 46 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "vendor/Genymobile/scrcpy/scrcpy-server.jar");

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "vendor/Genymobile/scrcpy/LICENSE");

/***/ }),
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseControlCenter = void 0;
var tslib_1 = __webpack_require__(1);
var TypedEmitter_1 = __webpack_require__(15);
var BaseControlCenter = (function (_super) {
    tslib_1.__extends(BaseControlCenter, _super);
    function BaseControlCenter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseControlCenter;
}(TypedEmitter_1.TypedEmitter));
exports.BaseControlCenter = BaseControlCenter;


/***/ }),
/* 52 */
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
/* 53 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 54 */
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
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeviceTracker = void 0;
var tslib_1 = __webpack_require__(1);
var Mw_1 = __webpack_require__(20);
var ControlCenterCommand_1 = __webpack_require__(52);
var ControlCenter_1 = __webpack_require__(34);
var Action_1 = __webpack_require__(21);
var ChannelCode_1 = __webpack_require__(24);
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
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketProxyOverAdb = void 0;
var tslib_1 = __webpack_require__(1);
var WebsocketProxy_1 = __webpack_require__(19);
var AdbUtils_1 = __webpack_require__(57);
var Action_1 = __webpack_require__(21);
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
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdbUtils = void 0;
var tslib_1 = __webpack_require__(1);
var portfinder = tslib_1.__importStar(__webpack_require__(58));
var http = tslib_1.__importStar(__webpack_require__(10));
var path = tslib_1.__importStar(__webpack_require__(6));
var Action_1 = __webpack_require__(21);
var adb_1 = __webpack_require__(36);
var url_1 = __webpack_require__(59);
var entry_1 = tslib_1.__importDefault(__webpack_require__(60));
var protocol_1 = tslib_1.__importDefault(__webpack_require__(41));
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
/* 58 */
/***/ ((module) => {

module.exports = require("portfinder");

/***/ }),
/* 59 */
/***/ ((module) => {

module.exports = require("url");

/***/ }),
/* 60 */
/***/ ((module) => {

module.exports = require("@dead50f7/adbkit/lib/adb/sync/entry");

/***/ })
/******/ 	]);
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

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __webpack_require__(1);
var readline = tslib_1.__importStar(__webpack_require__(2));
var Config_1 = __webpack_require__(3);
var HttpServer_1 = __webpack_require__(9);
var WebSocketServer_1 = __webpack_require__(17);
var WebsocketProxy_1 = __webpack_require__(19);
var HostTracker_1 = __webpack_require__(22);
var WebsocketMultiplexer_1 = __webpack_require__(25);
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
                case 0: return [4, Promise.resolve().then(function () { return tslib_1.__importStar(__webpack_require__(34)); })];
                case 1:
                    ControlCenter = (_a.sent()).ControlCenter;
                    return [4, Promise.resolve().then(function () { return tslib_1.__importStar(__webpack_require__(55)); })];
                case 2:
                    DeviceTracker = (_a.sent()).DeviceTracker;
                    return [4, Promise.resolve().then(function () { return tslib_1.__importStar(__webpack_require__(56)); })];
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