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

const columns = [
    {
        title: 'Date and Time',
        dataIndex: 'dateTime',
        key: 'dateTime',
        defaultSortOrder: 'descend'
    },
    {
        title: 'Subscriber',
        dataIndex: 'subscriber',
        key: 'subscriber'
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration'
    },
    {
        title: 'External',
        dataIndex: 'external',
        key: 'external'
    },
    {
        title: 'Direction',
        dataIndex: 'direction',
        key: 'direction'
    }
];
const PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 50, 100];

export const Tariffication = () => {
    const dispatch = useDispatch();

    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const isFetching = useSelector(getIsFetching);
    const tariffication = useSelector(getTariffication);
    const pagination = useSelector(getPagionation);

    const pagiOptions = {
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS
    };

    useEffect(() => {
        dispatch(requestTariffication(currentPage, pageSize));
    }, []);

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
