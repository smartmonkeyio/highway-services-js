"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi = __importStar(require("joi"));
/**
 * Returns the Joi validation for a GPS coordinate
 */
function coordinate() {
    return joi.object({
        lat: joi.number().min(-90).max(90).required().description('Latitude'),
        lng: joi.number().min(-180).max(180).required().description('Longitude')
    });
}
exports.coordinate = coordinate;
/**
 * Returns the Joi validation to validate a timewindow
 */
function timewindow() {
    return joi.array().items(joi.number().min(0)).min(2).max(2).single();
}
exports.timewindow = timewindow;
/**
 * Returns the Joi validation for capacity/volume of vehicles and services
 */
function capacity() {
    return joi.array().items(joi.number().min(0)).single();
}
exports.capacity = capacity;
/**
 * Array of string
 */
function stringArray() {
    return joi.array().items(joi.string().min(1)).single();
}
exports.stringArray = stringArray;
/**
 * Validates all the restrictions and can be validated using Join in an Optimization Input
 * @param input Input data to be validated
 */
function pickups() {
    return joi.array().items(joi.object({
        id: joi.string().min(1),
        location: coordinate().required(),
        duration: joi.number().min(0).max(24 * 3600),
        timewindows: joi.array().items(timewindow()).single(),
        size: capacity()
    })).single();
}
exports.pickups = pickups;
//# sourceMappingURL=validators.js.map