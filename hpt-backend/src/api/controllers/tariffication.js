import * as mongoose from 'mongoose';
import * as uuid from 'uuid';
import { TarifficationRecordSchema } from '../../db/models/TarifficationRecord';

const TarifficationRecord = mongoose.model('TarifficationRecord', TarifficationRecordSchema);

export function getTariffication(req, res) {
    const {
        column,
        order,
        current = 1,
        pageSize = 1,
        dateStart,
        dateEnd,
        subscriber,
        external,
        direction,
        searchExactSubscriber,
        searchExactExternal
    } = req.query;
    const pageNumber = +current;
    const limit = +pageSize;

    const filter = {
        ...(subscriber && {
            subscriber: searchExactSubscriber ? subscriber : { $regex: subscriber, $options: 'i' }
        }),
        ...((dateStart || dateEnd) && {
            dateTime: {
                ...(dateStart && { $gte: dateStart }),
                ...(dateEnd && { $lt: dateEnd })
            }
        }),
        ...(external && {
            external: searchExactExternal ? external : { $regex: external, $options: 'i' }
        }),
        ...(direction && { direction })
    };

    console.log(filter);

    TarifficationRecord.find(filter)
        .sort({
            ...(order === 'ascend' && { [String(column)]: 1 }),
            ...(order === 'descend' && { [String(column)]: -1 })
        })
        .collation({ locale: 'en_US', numericOrdering: true })
        .limit(limit)
        .skip((pageNumber - 1) * limit)
        .then(async (records) => {
            const count = await TarifficationRecord.countDocuments(filter);
            res.json({
                resultCode: 0,
                records,
                pagination: {
                    currentPage: pageNumber,
                    total: count,
                    totalPages: Math.ceil(count / limit)
                }
            });
        })
        .catch((err) => {
            res.json({
                resultCode: 1,
                message: err.message
            });
        });
}

export function createTariffication(req, res) {
    const newRecord = new TarifficationRecord(req.body);
    newRecord._id = String(uuid.v4());
    newRecord
        .save()
        .then((record) => {
            res.json({
                resultCode: 0,
                id: String(record._id)
            });
        })
        .catch((err) => {
            res.json({
                resultCode: 1,
                message: err.message
            });
        });
}

export function getSingleTariffication(req, res) {
    TarifficationRecord.find({ _id: req.params.id })
        .then((record) => {
            res.json({
                resultCode: 0,
                tariffication: record
            });
        })
        .catch((err) => {
            res.json({
                resultCode: 1,
                message: err.message
            });
        });
}

export function deleteTariffication(req, res) {
    TarifficationRecord.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.n === 0) {
                res.json({
                    resultCode: 1,
                    message: 'Document not found'
                });
            }
            res.json({
                resultCode: 0
            });
        })
        .catch((err) => {
            res.json({
                resultCode: 1,
                message: err.message
            });
        });
}
