"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const userServices_1 = require("./userServices");
// import { IUser } from '../entity/user';
class AuthServices {
    async registaration(req, res) {
        // const user = req.body;
        const { email } = req.body;
        const userFromDb = await userServices_1.userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email ${email} already exists`);
        }
        // const createdUser = userService.createUser(user);
    }
}
exports.authService = new AuthServices();
//# sourceMappingURL=authServices.js.map