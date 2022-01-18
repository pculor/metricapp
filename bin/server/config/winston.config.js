"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_root_path_1 = __importDefault(require("app-root-path"));
var winston = __importStar(require("winston"));
var options = {
    file: {
        level: 'info',
        filename: "".concat(app_root_path_1.default, "/logs/app.log"),
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        // silent: process.env.NODE_ENV === 'test',
    },
    levels: {
        http: 6,
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        trace: 'white',
        debug: 'magenta',
    },
};
var logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple(), winston.format.colorize({ all: true }), winston.format.printf(function (info) { return "".concat(info.timestamp, " - ").concat(info.level, ": ").concat(info.message); })),
    levels: options.levels,
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false,
});
exports.default = logger;
