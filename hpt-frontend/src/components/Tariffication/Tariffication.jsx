import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getPagionation,
    getTariffication
} from '../../redux/tarifficationSelectors';
import { requestTariffication, setPagination } from '../../redux/tarifficationReducer';

export const Tariffication = () => {
    const dispatch = useDispatch();

    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const isFetching = useSelector(getIsFetching);
    const tariffication = useSelector(getTariffication);
    const pagination = useSelector(getPagionation);

    const pagiOptions = {
        ...pagination,
        showSizeChanger: false,
        pageSizeOptions: [5, 10, 20, 30, 50, 100]
    };

    useEffect(() => {
        dispatch(requestTariffication(currentPage, pageSize));
    }, []);

    const columns = [
        {
            title: 'Date and Time',
            dataIndex: 'dateTime',
            key: 'dateTime',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime),
            render: (dateTime) =>
                new Date(dateTime).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
        },
        {
            title: 'Subscriber',
            dataIndex: 'subscriber',
            key: 'subscriber',
            sorter: (a, b) => a.subscriber - b.subscriber,
            onFilter: (val, record) => record.address.indexOf(val) === 0
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            sorter: (a, b) => a.duration - b.duration
        },
        {
            title: 'External',
            dataIndex: 'external',
            key: 'external',
            sorter: (a, b) => a.external - b.external
        },
        {
            title: 'Direction',
            dataIndex: 'direction',
            key: 'direction',
            sorter: (a, b) => a.direction - b.direction
        }
    ];

    const handleTableChange = (pagi) => {
        console.log('dispatch setPagi');
        console.log(pagi);
        dispatch(setPagination(pagi));
        dispatch(requestTariffication(pagi.current, pagi.pageSize));
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
