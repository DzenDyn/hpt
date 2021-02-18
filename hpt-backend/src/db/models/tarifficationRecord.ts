import * as mongoose from 'mongoose';

const { Schema } = mongoose;

/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
export const TarifficationRecordSchema = new Schema(
    {
        _id: String,
        dateTime: Date,
        duration: String,
        subscriber: String,
        external: String,
        trunk: String,
        direction: String,
        exitCode: String
    },
    { versionKey: false }
);
