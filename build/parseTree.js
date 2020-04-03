"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const R = __importStar(require("ramda"));
const _ = __importStar(require("lodash"));
const common_1 = require("./common");
const parseValue = (path, value) => {
    if (common_1.isPrimitive(value)) {
        return [{ path, value: value }];
    }
    if (R.isEmpty(value)) {
        return [{ path, value: value }];
    }
    if (_.isArray(value) && !R.isEmpty(value)) {
        const array = value;
        const pairs = array.map((v, index) => parseValue([...path, index], v));
        return R.unnest(pairs);
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return exports.parseTree(value, path);
};
exports.parseTree = (tree, path = []) => {
    const keys = R.keys(tree);
    return keys.reduce((acc, key) => {
        const pathValuePairs = parseValue([...path, key], tree[key]);
        return [...acc, ...pathValuePairs];
    }, []);
};
