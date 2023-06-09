"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const sequelize_1 = __importDefault(require("./config/sequelize"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const item_route_1 = __importDefault(require("./routes/item.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
sequelize_1.default.sync();
const dialect = sequelize_1.default.getDialect();
console.log(`Sequelize connected to ${dialect} database!`);
app.use('/items', item_route_1.default);
app.use(error_middleware_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}!`);
});
//# sourceMappingURL=server.js.map