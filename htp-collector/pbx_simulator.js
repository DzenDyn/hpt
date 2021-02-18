import { createServer } from 'net';
import dt from 'date-and-time';

const TIMEZONE = 3;

// configure there
const PORT = 1337;
const HOST = 'localhost';

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateNumericString = (minLength, maxLength) => {
    let phone = '';
    for (let i = 0; i < getRandom(minLength, maxLength); i++) {
        phone += getRandom(0, 9);
    }

    if (phone.length < maxLength) {
        const needSpaces = maxLength - phone.length;
        for (let j = 0; j < needSpaces; j++) {
            phone = ` ${phone}`;
        }
    }
    return phone;
};

// PBX Subscriber
const subscriber = () => {
    return generateNumericString(4, 10);
};

// External abonent
const external = () => {
    return generateNumericString(7, 22);
};

// PBX trunk
const trunk = () => {
    return generateNumericString(1, 3);
};

// Call direction
const direction = () => {
    return getRandom(0, 1);
};

const exitCode = () => {
    return getRandom(0, 9);
};

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
const server = createServer((socket) => {
    while (true) {
        const now = new Date();
        const date = dt.format(now, 'YYYY-MM-DD HH:mm:ss');
        const newDate = new Date(
            now.getTime() + getRandom(1, 1800) * 1000 - TIMEZONE * 3600 * 1000
        );
        const duration = dt.format(new Date(newDate - now), 'HH:mm:ss');
        socket.write(
            `${date} ${duration} ${subscriber()} ${external()} ${trunk()} ${direction()} ${exitCode()}\r\n`
        );
        socket.pipe(socket);
        sleep(getRandom(1, 5) * getRandom(100, 1000));
    }
});

server.listen(PORT, HOST);
