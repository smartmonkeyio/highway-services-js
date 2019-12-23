import * as joi from 'joi';
/**
 * Returns the Joi validation for a GPS coordinate
 */
export declare function coordinate(): joi.ObjectSchema;
/**
 * Returns the Joi validation to validate a timewindow
 */
export declare function timewindow(): joi.ArraySchema;
/**
 * Returns the Joi validation for capacity/volume of vehicles and services
 */
export declare function capacity(): joi.ArraySchema;
/**
 * Array of string
 */
export declare function stringArray(): joi.ArraySchema;
/**
 * Validates all the restrictions and can be validated using Join in an Optimization Input
 * @param input Input data to be validated
 */
export declare function pickups(): joi.ArraySchema;
