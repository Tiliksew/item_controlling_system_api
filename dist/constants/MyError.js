"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.default = MyError;
//# sourceMappingURL=MyError.js.map