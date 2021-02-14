import React from 'react';
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Filter = (props) => {
    let searchInput;

    const getColumnSearchProps = (dataIndex) => ({
        displayName: 'Filter',
        filterDropDown: ({ displayName: 'Hello', setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div>
                <Input
                    ref={(node) => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${props.dataIndex}`}
                    value={props.slectedKeys[0]}
                    onChange={(e) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => props.handleSearch(selectedKeys, confirm, props.dataIndex)}
                />
                <Space>
                    <Button type="primary" icon={<SearchOutlined />} size="small">
                        Search
                    </Button>
                    <Button size="small">Reset</Button>
                </Space>
            </div>
        )
    });

    return <></>;
};
