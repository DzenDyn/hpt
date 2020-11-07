import { createServer } from 'net';

const getRandomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateSubscriber = () => {};

const server = createServer((socket) => {
    socket.write('Test server \r\n');
    socket.pipe(socket);
});

// server.listen(1337, 'localhost');

console.log(getRandomRange(1, 9));
