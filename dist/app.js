"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const app = (0, express_1.default)();
app.get('/users', async (req, res) => {
    const users = await (0, typeorm_1.getManager)().getRepository(user_1.User).find();
    res.json(users);
});
app.listen(5500, async () => {
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (e) {
        if (e) {
            console.log(e);
        }
    }
    console.log('Server has started!!!');
});
//# sourceMappingURL=app.js.map