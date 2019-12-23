"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var constants_1 = require("../common/constants");
var Client_1 = __importDefault(require("./Client"));
var Plan_1 = __importDefault(require("./Plan"));
var Vehicle_1 = __importDefault(require("./Vehicle"));
var Route_1 = __importDefault(require("./Route"));
var Service_1 = __importDefault(require("./Service"));
var Highway = /** @class */ (function () {
    function Highway(APIKey, bearer) {
        var _this = this;
        this.post = function (url, data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.token) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.post(constants_1.HIGHWAY_ENDPOINT + "/" + constants_1.API_VERSION + "/" + url, data, {
                                headers: {
                                    Authorization: "Bearer " + this.token
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, axios_1.default.post(constants_1.HIGHWAY_ENDPOINT + "/" + constants_1.API_VERSION + "/" + url, data, { params: { private_key: this.apiKey } })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.get = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var response, response;
            return __generator(this, function (_a) {
                if (this.token) {
                    response = axios_1.default.get(constants_1.HIGHWAY_ENDPOINT + "/" + constants_1.API_VERSION + "/" + url, {
                        headers: { Authorization: "Bearer " + this.token }
                    });
                    return [2 /*return*/, response];
                }
                else {
                    response = axios_1.default.get(constants_1.HIGHWAY_ENDPOINT + "/" + constants_1.API_VERSION + "/" + url, {
                        params: { private_key: this.apiKey }
                    });
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        }); };
        this.delete = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var response, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.token) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.delete(constants_1.HIGHWAY_ENDPOINT + "/" + constants_1.API_VERSION + "/" + url, { headers: { Authorization: "Bearer " + this.token } })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2: return [4 /*yield*/, axios_1.default.delete(constants_1.HIGHWAY_ENDPOINT + "/" + constants_1.API_VERSION + "/" + url, { params: { private_key: this.apiKey } })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        this.put = function (url, data) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.token) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.put(constants_1.HIGHWAY_ENDPOINT + "/" + constants_1.API_VERSION + "/" + url, data, { headers: { Authorization: "Bearer " + this.token } })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 2: return [4 /*yield*/, axios_1.default.put(constants_1.HIGHWAY_ENDPOINT + "/" + constants_1.API_VERSION + "/" + url, data, { params: { private_key: this.apiKey } })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.token = bearer;
        this.apiKey = APIKey;
        this.client = new Client_1.default(this);
        this.plan = new Plan_1.default(this);
        this.route = new Route_1.default(this);
        this.service = new Service_1.default(this);
        this.vehicle = new Vehicle_1.default(this);
    }
    return Highway;
}());
exports.default = Highway;
//# sourceMappingURL=Highway.js.map