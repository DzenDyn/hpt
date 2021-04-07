import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const TarifficationRecordSchema = new Schema(
    {
        // _id: String,
        pbx: String,
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
