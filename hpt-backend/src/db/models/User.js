import mongoose from 'mongoose';

const { Schema } = mongoose;

export const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        }
    },
    { versionKey: false }
);