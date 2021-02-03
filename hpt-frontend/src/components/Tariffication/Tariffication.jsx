import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    getIsFetching,
    getPagionation,
    getTariffication
} from '../../redux/tarifficationSelectors';
import { requestTariffication, setPagination } from '../../redux/tarifficationReducer';

export const Tariffication = () => {
    const dispatch = useDispatch();

    const isFetching = useSelector(getIsFetching);
    const tariffication = useSelector(getTariffication);
    const pagination = useSelector(getPagionation);

    const pagiOptions = {
        ...pagination,
        showSizeChanger: false,
        pageSizeOptions: [5, 10, 20, 30, 50, 100]
    };

    useEffect(() => {
        dispatch(requestTariffication(pagination, undefined, undefined));
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
            key: 'subscriber',
            sorter: true
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            sorter: true
        },
        {
            title: 'External',
            dataIndex: 'external',
            key: 'external',
            sorter: true
        },
        {
            title: 'Direction',
            dataIndex: 'direction',
            key: 'direction',
            sorter: true
        }
    ];

    const handleTableChange = (pagi, filter, sorter) => {
        dispatch(setPagination(pagi));
        dispatch(requestTariffication(pagi, filter, sorter));
    };

    return (
        <>
            <Table
                dataSource={tariffication}
                rowKey={(record) => record._id}
                columns={columns}
                key="test"
                pagination={pagiOptions}
                onChange={handleTableChange}
                loading={isFetching}
            />
        </>
    );
};
