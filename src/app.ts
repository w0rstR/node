import 'reflect-metadata';
import express from 'express';
import fileupload from 'express-fileupload';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import SocketIO from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import { routes } from './routers/apiRouters';
import { socketController } from './controller/socketController';
// import { cronRun } from './cron';

const app = express();
app.use(fileupload());

const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket:any) => {
    console.log('---------------------');
    console.log(socket.handshake.query);
    console.log('-------------------------');

    socket.on('message:create', (data:any) => {
        socketController.messageCreate(io, socket, data);
        // console.log('--------------');
        // console.log(data);
        // console.log('---------------');
        //
        // // one to one
        // // socket.emit('message:get-all', { messages: [{ text: data.message }] });
        //
        // // send to all online users
        //
        // io.emit('message:get-all', { messages: [{ text: data.message }] });
    });

    socket.on('join_room', (data:any) => {
        socket.join(data.id);

        // ONE TO MANY AVOID SENDER
        socket.broadcast.to(data.id).emit('user_join_room', { message: `User ${data.id} joined room` });

        // EMIT TO ALL USERS IN ROOM (INCLUDE SENDER)
        io.to(data.id).emit('user_join_room', { message: `User ${data.id} joined room` });
    });

    // 1-1
    // socket.emit();

    // all include sender
    // io.emit();

    // All avoid sender
    // socket.broadcast.emit(room_id).emit()

    // To room  without sender
    // socket.broadcast.to(room_id).emit()

    // emit to all users in room include sender
    // io.to(room_id).emit()
});

// @ts-ignore
global.rootDir = __dirname;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/db');

app.use(routes);

const { PORT } = process.env;

server.listen(PORT, async () => {
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
            // cronRun();
        }
    } catch (e) {
        console.log(e);
    }
    console.log('Server has started!!!');
});
