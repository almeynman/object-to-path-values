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
const toValue = ({ path, value }) => {
    if (R.isEmpty(path)) {
        return value;
    }
    const [firstKey, ...rest] = path;
    if (_.isNumber(firstKey)) {
        return [toValue({ path: rest, value: value })];
    }
    return { [firstKey]: toValue({ path: rest, value }) };
};
exports.toTree = pairs => {
    const subtrees = pairs.map(toValue);
    const tree = subtrees.reduce((acc, subtree) => R.mergeDeepWith(R.concat, acc, subtree), {});
    return tree;
};
