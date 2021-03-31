import * as mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { Interface } from 'readline';

const { Schema } = mongoose;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

UsersSchema.methods.setPassword = function setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function validatePassword(password: string) {
    return (
        crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex') === this.hash
    );
};

// UsersSchema.methods.generateJWT = function generateJWT(): string {
//     const today = new Date();
//     const expirationDate = new Date();
//     expirationDate.setDate(today.getDate() + 60);

//     return jwt.sign(
//         {
//             email: String(this.email),
//             id: String(this._id),
//             exp: parseInt(String(expirationDate.getTime() / 1000), 10)
//         },
//         'secret'
//     );
// };

// UsersSchema.methods.toAuthJSON = function toAuthJSON() {
//     return {
//         _id: String(this._id),
//         email: String(this.email),
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//         token: String(this.generateJWT())
//     };
// };

export interface User extends mongoose.Document {
    name: {
        type: string;
        required: [true, 'Please tell us your name.'];
    };
    email: {
        type: string;
        required: [true, 'Please provide your valid email address'];
        lowercase: true;
        unique: true;
        validate: [validator.IsEmailOptions, 'Please provide your valid email address'];
    };
    hash: {
        type: string;
        required: true;
    };
    salt: {
        type: string;
        required: true;
    };
    setPassword(password: string): void;
    validatePassword(password: string): boolean;
}

export const User = mongoose.model<User>('Users', UsersSchema);
