"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
var http_1 = __importDefault(require("http"));
// eslint-disable-next-line import/extensions
var server_1 = __importDefault(require("./server/api/server"));
var winston_config_1 = __importDefault(require("./server/config/winston.config"));
var port = process.env.PORT || 4000;
var httpServer = http_1.default.createServer(server_1.default);
httpServer.listen(port, function () { return winston_config_1.default.info("Application started on http://localhost:".concat(port)); });
