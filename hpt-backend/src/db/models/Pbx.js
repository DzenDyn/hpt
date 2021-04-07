import mongoose from 'mongoose';

const { Schema } = mongoose;

export const pbxSchema = new Schema(
    {
        owner: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    },
    { versionKey: false }
);
