import * as dotenv from 'dotenv';
import Mongoose = require('mongoose');

dotenv.config();
let db: Mongoose.Connection;

export const connect = (): void => {
    const uri = 'mongodb://localhost:27017/hpt?authSource=dbWithUserCredentials';
    if (db) {
        return;
    }

    Mongoose.connect(uri, {
        authSource: 'hpt',
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).catch((err) => console.log(err));

    db = Mongoose.connection;

    db.once('open', () => {
        console.log('Connected to database');
    });

    db.on('error', () => {
        console.log('Error connecting to database');
    });
};

export const disconnect = (): void => {
    if (!db) return;
    Mongoose.disconnect().catch((err) => console.log(err));
};
