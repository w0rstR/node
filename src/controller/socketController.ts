export const socketController = {
    messageCreate: (io:any, socket:any, data:any) => {
        console.log('--------------');
        console.log(data);
        console.log('---------------');

        // one to one
        // socket.emit('message:get-all', { messages: [{ text: data.message }] });

        // send to all online users
        //
        // io.emit('message:get-all', { messages: [{ text: data.message }] });
    },
};
