import * as mongoose from 'mongoose';

const Schema = mongoose;

export const TarifficationRecordSchema = new Schema({
    id: {
        type: String,
        required: 'true'
    }
});
