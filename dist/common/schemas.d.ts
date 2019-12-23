import Joi from 'joi';
export declare const VehicleSchema: Joi.ObjectSchema;
export declare const ServiceSchema: Joi.ObjectSchema;
export declare const RewardRegionSchema: Joi.ObjectSchema;
export declare const VehicleListSchema: Joi.ArraySchema;
export declare const ServiceListSchema: Joi.ArraySchema;
export declare function validateVehicles(vehicles: any): void;
export declare function validateServices(services: any): void;
export declare function validateRewardRegions(rewardRegions: any): void;
