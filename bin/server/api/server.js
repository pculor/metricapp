"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var path_1 = __importDefault(require("path"));
var request_response_handler_1 = require("request-response-handler");
var morgan_config_1 = __importDefault(require("../config/morgan.config"));
var winston_config_1 = __importDefault(require("../config/winston.config"));
var routes_1 = __importDefault(require("../routes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(morgan_config_1.default);
app.use((0, helmet_1.default)());
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    winston_config_1.default.error("".concat(err.message || 500, " - ").concat(err.message, " -\n        ").concat(req.originalUrl, " -\n        ").concat(req.method, " - ").concat(req.ip));
    res.status(err.status || 500);
    res.render('error');
    next();
});
app.use('/api/v1', routes_1.default);
app.get('/', function (req, res) {
    (0, request_response_handler_1.success)(res, request_response_handler_1.OK, 'Welcome to API root', {
        metric_url: {
            root: '/api/v1/',
        },
    });
});
// All other GET requests not handled before will serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // TODO serve client
    app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../../client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, '../../../client/build', 'index.html'));
    });
}
app.get('*', function (req, res) {
    res.status(404).json({
        status: 404,
        message: 'Invalid route!',
    });
});
app.use((0, request_response_handler_1.errorHandler)());
exports.default = app;
