"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validators = __importStar(require("./validators"));
exports.VehicleSchema = joi_1.default.object().keys({
    id: joi_1.default.string().min(1).required(),
    start: validators.coordinate(),
    end: validators.coordinate(),
    timewindow: validators.timewindow(),
    capacity: validators.capacity(),
    provides: validators.stringArray()
});
exports.ServiceSchema = joi_1.default.object().keys({
    id: joi_1.default.string().min(1).required(),
    location: validators.coordinate().required(),
    duration: joi_1.default.number().min(0).max(24 * 3600),
    timewindows: joi_1.default.array().items(validators.timewindow()).single(),
    reward: joi_1.default.number().min(1).description('Reward obtained when performing de task, below 1 won\'t be assigned'),
    optional: joi_1.default.boolean().default(),
    cluster: joi_1.default.string(),
    assign_to: validators.stringArray(),
    size: validators.capacity(),
    requires: validators.stringArray(),
    pickups: validators.pickups().description('Pickup place for the delivery')
});
exports.RewardRegionSchema = joi_1.default.object().keys({
    lat: joi_1.default.number().required(),
    lng: joi_1.default.number().required(),
    radius: joi_1.default.number().required(),
    reward: joi_1.default.number().required(),
});
exports.VehicleListSchema = joi_1.default.array().items(exports.VehicleSchema).min(1);
exports.ServiceListSchema = joi_1.default.array().items(exports.ServiceSchema).min(1);
function assertList(elem, name, canBeEmpty) {
    if (typeof (elem) !== typeof ([1, 2, 3])) {
        throw new Error(name + " must be a list!");
    }
    if (!canBeEmpty && elem.length === 0) {
        throw new Error(name + " can't be empty!");
    }
}
function validateVehicles(vehicles) {
    assertList(vehicles, 'vehicles');
    vehicles.forEach(function (value, idx) {
        var result = joi_1.default.validate(value, exports.VehicleSchema);
        if (result.error) {
            throw new Error("Error in vehicle [" + idx + "]: " + result.error.message);
        }
    });
}
exports.validateVehicles = validateVehicles;
function validateServices(services) {
    assertList(services, 'services');
    services.forEach(function (value, idx) {
        var result = joi_1.default.validate(value, exports.ServiceSchema);
        if (result.error) {
            throw new Error("Error in service [" + idx + "]: " + result.error.message);
        }
    });
}
exports.validateServices = validateServices;
function validateRewardRegions(rewardRegions) {
    assertList(rewardRegions, 'rewardRegions', true);
    rewardRegions.forEach(function (value, idx) {
        var result = joi_1.default.validate(value, rewardRegions);
        if (result.error) {
            throw new Error("Error in rewardRegion [" + idx + "]: " + result.error.message);
        }
    });
}
exports.validateRewardRegions = validateRewardRegions;
//# sourceMappingURL=schemas.js.map