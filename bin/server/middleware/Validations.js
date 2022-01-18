"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
var joiValidate_1 = require("../helpers/joiValidate");
/**
 * Validations
 *
 * @class Validations
 */
var Validations = /** @class */ (function () {
    function Validations() {
    }
    /**
     * Metric validation
     *
     * @static
     * @param {*} req
     * @return {*}
     * @memberof Validations
     */
    Validations.validateMetric = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, schema, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        payload = __assign(__assign(__assign(__assign({}, req.body), req.query), req.params), req.headers);
                        schema = joiValidate_1.Joi.object().keys({
                            name: joiValidate_1.Joi.string().required()
                                .messages({
                                'string.pattern.base': 'name must be a string',
                                'any.required': 'name is not allowed to be empty',
                            }),
                            value: joiValidate_1.Joi.number().required().messages({
                                'string.pattern.base': 'value must be a number',
                                'any.required': 'value is not allowed to be empty',
                            }),
                        });
                        _a = req;
                        return [4 /*yield*/, (0, joiValidate_1.joiValidate)(payload, schema, req, res, next)];
                    case 1:
                        _a.payload = _b.sent();
                        return [2 /*return*/, next()];
                }
            });
        });
    };
    /**
     * Get Metric validation
     *
     * @static
     * @param {*} req
     * @return {*}
     * @memberof Validations
     */
    Validations.GetMetric = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, schema, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        payload = __assign(__assign(__assign(__assign({}, req.body), req.query), req.params), req.headers);
                        schema = joiValidate_1.Joi.object().keys({
                            name: joiValidate_1.Joi.string().optional().allow('', null)
                                .messages({
                                'string.pattern.base': 'name must be a string',
                                'any.required': 'name is not allowed to be empty',
                            }),
                            page: joiValidate_1.Joi.number().optional().allow('', null),
                            all: joiValidate_1.Joi.boolean().valid(true, false).optional().allow('', null),
                            interval: joiValidate_1.Joi.string().valid('h', 'm', 'd').optional().allow('', null),
                            avg: joiValidate_1.Joi.number().optional().allow('', null),
                            start: joiValidate_1.Joi.number().optional().allow('', null),
                        });
                        _a = req;
                        return [4 /*yield*/, (0, joiValidate_1.joiValidate)(payload, schema, req, res, next)];
                    case 1:
                        _a.payload = _b.sent();
                        return [2 /*return*/, next()];
                }
            });
        });
    };
    return Validations;
}());
exports.default = Validations;
