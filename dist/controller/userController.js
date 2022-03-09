"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../entity/user");
const userServices_1 = require("../services/userServices");
class UserController {
    async createUser(req, res) {
        const createdUser = await userServices_1.userService.createUser(req.body);
        return res.json(createdUser);
    }
    async getUsers(req, res) {
        const users = await (0, typeorm_1.getManager)().getRepository(user_1.User).find({ relations: ['posts'] });
        res.json(users);
    }
    async getUserByEmail(req, res) {
        const { email } = req.body;
        console.log(email);
        const user = await userServices_1.userService.getUserByEmail(email);
        return res.json(user);
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map