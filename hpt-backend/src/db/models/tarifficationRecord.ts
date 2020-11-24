import * as mongoose from 'mongoose';

const { Schema } = mongoose;

/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
export const TarifficationRecordSchema = new Schema(
    {
        _id: String,
        dateTime: Date,
        duration: Number,
        subscriber: Number,
        external: Number,
        trunk: Number,
        direction: Number,
        exitCode: Number
    },
    { versionKey: false }
);
