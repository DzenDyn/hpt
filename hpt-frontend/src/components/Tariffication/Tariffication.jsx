import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    getFilter,
    getIsFetching,
    getPagionation,
    getSorter,
    getTariffication
} from '../../redux/tarifficationSelectors';
import { requestTariffication } from '../../redux/tarifficationReducer';
import { Filter } from './Filter';

export const Tariffication = () => {
    const dispatch = useDispatch();

    const isFetching = useSelector(getIsFetching);
    const tariffication = useSelector(getTariffication);
    const pagination = useSelector(getPagionation);
    const sorter = useSelector(getSorter);
    const filter = useSelector(getFilter);

    const pagiOptions = {
        ...pagination,
        showSizeChanger: false,
        pageSizeOptions: [5, 10, 20, 30, 50, 100]
    };

    useEffect(() => {
        dispatch(requestTariffication(pagination, sorter, filter));
    }, []);

    const columns = [
        {
            title: 'Date and Time',
            dataIndex: 'dateTime',
            key: 'dateTime',
            defaultSortOrder: 'ascend',
            render: (dateTime) =>
                new Date(dateTime).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
            sorter: true
        },
        {
            title: 'Subscriber',
            dataIndex: 'subscriber',
            // key: 'subscriber',
            sorter: true
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            // key: 'duration',
            sorter: true
        },
        {
            title: 'External',
            dataIndex: 'external',
            // key: 'external',
            sorter: true
        },
        {
            title: 'Direction',
            dataIndex: 'direction',
            // key: 'direction',
            sorter: true
        }
    ];

    const handleTableChange = (pagi, tblFilter, sort) => {
        if (Object.keys(tblFilter).length === 0) {
            dispatch(requestTariffication(pagi, filter, sort));
        } else {
            dispatch(requestTariffication(pagi, tblFilter, sort));
        }
    };

    return (
        <>
            <Filter handleTableChange={handleTableChange} pagination={pagination} sorter={sorter} />
            <Table
                dataSource={tariffication}
                rowKey="id"
                columns={columns}
                pagination={pagiOptions}
                onChange={handleTableChange}
                loading={isFetching}
            />
        </>
    );
};
