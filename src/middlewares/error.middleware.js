"use strict";
exports.__esModule = true;
var MyError_1 = require("../constants/MyError");
exports["default"] = (function (err, req, res, next) {
    console.log("err", err);
    var message = err.message || 'Internal Server Error';
    var code = (err instanceof MyError_1["default"]) ? err.code : 500;
    res.status(code).json({ error: message, statusCode: code });
});
