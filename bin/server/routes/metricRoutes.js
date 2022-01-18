"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
var express_1 = require("express");
var Validations_1 = __importDefault(require("../middleware/Validations"));
var MetricsController_1 = __importDefault(require("../controllers/MetricsController"));
var router = (0, express_1.Router)();
router
    .route('/')
    .post(Validations_1.default.validateMetric, MetricsController_1.default.CreateMetric)
    .get(MetricsController_1.default.GetMetrics);
exports.default = router;
