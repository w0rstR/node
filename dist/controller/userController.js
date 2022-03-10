"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userServices_1 = require("../services/userServices");
class UserController {
    async createUser(req, res) {
        const createdUser = await userServices_1.userService.createUser(req.body);
        return res.json(createdUser);
    }
    async getUsers(req, res) {
        const users = await userServices_1.userService.getUsers();
        res.json(users);
    }
    async getUserByEmail(req, res) {
        const { email } = req.body;
        const user = await userServices_1.userService.getUserByEmail(email);
        return res.json(user);
    }
    async getUserById(req, res) {
        const { id } = req.params;
        const user = await userServices_1.userService.getUserById(+id);
        res.json(user);
    }
    async updateUserById(req, res) {
        const { email, password } = req.body;
        const { id } = req.params;
        const updatedUser = await userServices_1.userService.updateUserById(+id, email, password);
        res.json(updatedUser);
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map