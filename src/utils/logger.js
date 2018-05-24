"use strict";
exports.__esModule = true;
// @flow
var electron_log_1 = require("electron-log");
/**
 * Wrapper for logging mechanism.
 * Future: can be used with any log library under the hood
 */
var Logger = /** @class */ (function () {
    function Logger(category) {
        this.category = category;
    }
    Logger.prototype.info = function (text) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log(electron_log_1["default"].info, text, params);
    };
    Logger.prototype.debug = function (text) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log(electron_log_1["default"].debug, text, params);
    };
    Logger.prototype.error = function (text) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log(electron_log_1["default"].error, text, params);
    };
    Logger.prototype.warn = function (text) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log(electron_log_1["default"].warn, text, params);
    };
    Logger.prototype.trace = function (text) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log(electron_log_1["default"].verbose, text, params);
    };
    Logger.prototype.log = function (func, text, params) {
        if (params.length > 0) {
            func.apply(void 0, [this.category + " - " + text].concat(params));
        }
        else {
            func(this.category + " - " + text);
        }
    };
    return Logger;
}());
var createLogger = function (category) { return new Logger(category); };
exports["default"] = createLogger;
