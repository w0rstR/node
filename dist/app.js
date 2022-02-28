"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const post_1 = require("./entity/post");
const comment_1 = require("./entity/comment");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
    // const users = await getManager().getRepository(User).find();
    // res.json(users);
    const users = await (0, typeorm_1.getManager)().getRepository(user_1.User).find({ relations: ['posts'] });
    res.json(users);
    // const users = await getManager()
    //     .getRepository(User)
    //     .createQueryBuilder('user')
    //     .leftJoin('Posts', 'posts', 'posts.userId = user.id')
    //     .where('posts.text = "test"')
    //     .getMany();
    // res.json(users);
});
app.post('/users', async (req, res) => {
    const createdUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
    res.json(createdUser);
});
app.put('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(createdUser);
});
app.delete('/users/:id', async (req, res) => {
    console.log(req.body);
    const deletedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .delete({ id: Number(req.params.id) });
    res.json(deletedUser);
});
// app.delete('/users/:id', async (req, res) => {
//     console.log(req.body);
//     const deletedUser = await getManager()
//         .getRepository(User)
//         .softDelete({ id: Number(req.params.id) });
//     res.json(deletedUser);
// });
app.get('/posts/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await (0, typeorm_1.getManager)().getRepository(post_1.Post)
        .createQueryBuilder('post')
        .where('post.userId = :id', { id: +userId })
        .getMany();
    res.json(user);
});
app.put('/posts/:userId', async (req, res) => {
    const { userId } = req.params;
    const { title, text } = req.body;
    const updatedPost = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post)
        .update({ id: Number(userId) }, { title, text });
    res.json(updatedPost);
});
app.post('/users', async (req, res) => {
    const createdUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
    res.json(createdUser);
});
app.get('/comments', async (req, res) => {
    const comments = await (0, typeorm_1.getManager)()
        .getRepository(comment_1.Comment)
        .find();
    res.json(comments);
});
app.post('/comments', async (req, res) => {
    const createdComment = await (0, typeorm_1.getManager)()
        .getRepository(comment_1.Comment)
        .save(req.body);
    res.json(createdComment);
});
app.get('/comments/:userId', (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    res.json(userId);
});
app.listen(5500, async () => {
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (e) {
        console.log(e);
    }
    console.log('Server has started!!!');
});
//# sourceMappingURL=app.js.map