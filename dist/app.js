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
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
    // const users = await getManager().getRepository(User).find();
    // res.json(users);
    const users = await (0, typeorm_1.getManager)().getRepository(user_1.User)
        .createQueryBuilder('user')
        .where('user.firstName = "Alex"')
        .getMany();
    res.json(users);
});
app.post('/users', async (req, res) => {
    try {
        const createdUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
        console.log(createdUser);
        res.status(201).json(createdUser);
    }
    catch (e) {
        console.log(e);
    }
});
app.put('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    // const {id} = req.params;
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.body.id) }, {
        password,
        email,
    });
    res.json(createdUser);
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