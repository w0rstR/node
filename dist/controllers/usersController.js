"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("../entity/user");
class UsersController {
    renderUsers(req, res) {
        const users = (0, typeorm_1.getManager)().getRepository(user_1.User).find({ relations: ['posts'] });
        res.json(users);
    }
}
//# sourceMappingURL=usersController.js.map