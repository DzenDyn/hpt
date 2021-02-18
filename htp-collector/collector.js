import { Socket } from 'net';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { DEBUG, HOST, PORT } = process.env;

const client = new Socket();
let intervalConnect = false;

function connect() {
    client.connect({
        port: PORT,
        host: HOST
    });
}

function launchIntervalConnect() {
    if (intervalConnect !== false) return;
    intervalConnect = setInterval(connect, 5000);
}

function clearIntervalConnect() {
    if (intervalConnect === false) return;
    clearInterval(intervalConnect);
    intervalConnect = false;
}

client.on('connect', () => {
    clearIntervalConnect();
    console.log('connected to PBX');
    client.write('CLIENT connected');
});

client.on('error', (err) => {
    console.log(err.code, 'TCP ERROR');
    launchIntervalConnect();
});
client.on('close', launchIntervalConnect);
client.on('end', launchIntervalConnect);

connect();

const headers = {
    'Content-Type': 'application/json'
};

client.on('data', (data) => {
    let dataString = data.toString().replace('\r', '');
    dataString = dataString.replace('\n', '');
    if (DEBUG) console.log(`Received data: ${dataString}`);
    const dateTime = dataString.substring(0, 19);
    const durationHMS = dataString.substring(21, 28).split(' ').join('');
    const [dH, dM, dS] = durationHMS.split(':');
    const duration = (parseInt(dH, 10) * 60 * 60 + parseInt(dM, 10) * 60 + parseInt(dS, 10)).toString();
    const subscriber = dataString.substring(30, 39).split(' ').join('');
    const external = dataString.substring(41, 62).split(' ').join('');
    const trunk = dataString.substring(64, 66).split(' ').join('');
    const direction = dataString.substring(67, 69).split(' ').join('');
    const exitCode = dataString.substring(69, 71).split(' ').join('');

    if (DEBUG) console.log('Sending to backend');
    axios
        .post(
            'http://localhost/v1/tariffication',
            JSON.stringify({
                dateTime,
                duration,
                subscriber,
                external,
                trunk,
                direction,
                exitCode
            }),
            { headers }
        )
        .then((response) => {
            if (DEBUG) console.log(`Response: ${JSON.stringify(response.data)}`);
        })
        .catch((err) => {
            console.error(err.message);
        });
});
