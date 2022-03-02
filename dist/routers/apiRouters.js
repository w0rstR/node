"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const usersRouter_1 = require("./usersRouter");
const postsRouter_1 = require("./postsRouter");
const commentsRouter_1 = require("./commentsRouter");
exports.routes = (0, express_1.Router)();
exports.routes.use('/users', usersRouter_1.usersRouter);
exports.routes.use('/posts', postsRouter_1.postsRouter);
exports.routes.use('/comments', commentsRouter_1.commentsRouter);
//# sourceMappingURL=apiRouters.js.map