"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = {
    DRAG: 0.97,
    TIME_STEP: 0.018,
};
function def(option) {
    Object.assign(exports.ENV, option);
}
exports.def = def;
