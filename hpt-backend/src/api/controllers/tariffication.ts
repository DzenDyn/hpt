import * as express from 'express';
import * as mongoose from 'mongoose';
import * as uuid from 'uuid';
import { TarifficationRecordSchema } from '../../db/models/tarifficationRecord';

const TarifficationRecord = mongoose.model('TarifficationRecord', TarifficationRecordSchema);

export function getTariffication(req: express.Request, res: express.Response): void {
    /*
    TODO:
    realize filters

    old method:
    {
        ...(subscriber && { subscriber }),
        ...((dateStart || dateEnd) && {
            dateTime: {
                ...(dateStart && { $gte: dateStart }),
                ...(dateEnd && { $lt: dateEnd })
            }
        }),
        ...(external && { external })
    }
    */
    const { column, order, current = 1, pageSize = 1 } = req.query;
    const pageNumber = +current;
    const limit: number = +pageSize;

    TarifficationRecord.find({})
        .sort({
            ...(order === 'ascend' && { [String(column)]: 1 }),
            ...(order === 'descend' && { [String(column)]: -1 })
        })
        .limit(limit * 1)
        .skip((pageNumber - 1) * limit)
        .then(async (records) => {
            const count = await TarifficationRecord.countDocuments();
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
        .catch((err: Error) => {
            res.json({
                resultCode: 1,
                message: err.message
            });
        });
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export function createTariffication(req: express.Request, res: express.Response): void {
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
        .catch((err: Error) => {
            res.json({
                resultCode: 1,
                message: err.message
            });
        });
}

export function getSingleTariffication(req: express.Request, res: express.Response): void {
    TarifficationRecord.find({ _id: req.params.id })
        .then((record) => {
            res.json({
                resultCode: 0,
                tariffication: record
            });
        })
        .catch((err: Error) => {
            res.json({
                resultCode: 1,
                message: err.message
            });
        });
}

export function deleteTariffication(req: express.Request, res: express.Response): void {
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
        .catch((err: Error) => {
            res.json({
                resultCode: 1,
                message: err.message
            });
        });
}
