"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiValidate = exports.Joi = void 0;
var joi_1 = __importDefault(require("@hapi/joi"));
var joi_date_1 = __importDefault(require("@hapi/joi-date"));
var request_response_handler_1 = require("request-response-handler");
exports.Joi = joi_1.default.extend(joi_date_1.default);
/**
 * Validate request body
 *
 * @param {object} payload
 * @param {object} res
 * @param {object} next
 * @param {object} schema
 */
var joiValidate = function (payload, schema, req, res, next) {
    var _a = schema.validate(payload, {
        allowUnknown: true,
    }), error = _a.error, value = _a.value;
    // TODO check for validation error
    if (error) {
        var errors = error.details.map(function (current) { return current.message.replace(/['"]/g, ''); });
        return next((0, request_response_handler_1.customError)({ status: request_response_handler_1.BAD_REQUEST, message: errors[0] }));
    }
    return value;
};
exports.joiValidate = joiValidate;
