import * as dotenv from 'dotenv';
import Mongoose from 'mongoose';

dotenv.config();
let db;

export const connect = async () => {
    const uri = 'mongodb://localhost:27017/hpt?authSource=dbWithUserCredentials';
    if (db) {
        return;
    }
    await Mongoose.connect(uri, {
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

export const disconnect = () => {
    if (!db) return;
    Mongoose.disconnect().catch((err) => console.log(err));
};
