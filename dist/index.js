"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Highway_1 = __importDefault(require("./src/Highway"));
function createHighway(APIKey, bearer) {
    return new Highway_1.default(APIKey, bearer);
}
exports.createHighway = createHighway;
//# sourceMappingURL=index.js.map