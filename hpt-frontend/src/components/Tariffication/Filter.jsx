import React, { useState } from 'react';
import { DatePicker, Collapse, Space, Input, Button, Checkbox, Switch } from 'antd';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/tarifficationReducer';

const { Panel } = Collapse;

export const Filter = (props) => {
    const dispatch = useDispatch();
    const [incoming, setIncoming] = useState(false);
    const [outgoing, setoutGoing] = useState(false);
    const [searchExactSubscriber, setSearchExactSubscriber] = useState(false);
    const [searchExactExternal, setSearchExactExternal] = useState(false);
    const [subscriber, setSubscriber] = useState();
    const [external, setExternal] = useState();
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setdateEnd] = useState();

    const btnClick = () => {
        let direction;
        if (incoming) direction = '0';
        if (outgoing) direction = '1';
        if (incoming && outgoing) direction = ' ';
        if (!incoming && !outgoing) direction = ' ';

        const filter = {
            ...(dateStart && { dateStart }),
            ...(dateEnd && { dateEnd }),
            ...(subscriber && { subscriber }),
            ...(external && { external }),
            ...(direction && { direction }),
            ...(searchExactSubscriber && { searchExactSubscriber }),
            ...(searchExactExternal && { searchExactExternal })
        };
        dispatch(setFilter(filter));
        props.handleTableChange(props.pagination, filter, props.sorter);
    };
    const subscriberExactSwitch = (
        <Switch
            checkedChildren="Exact"
            unCheckedChildren="Exact"
            checked={searchExactSubscriber}
            onChange={(e) => setSearchExactSubscriber(e)}
        />
    );
    const externalExactSwitch = (
        <Switch
            checkedChildren="Exact"
            unCheckedChildren="Exact"
            checked={searchExactExternal}
            onChange={(e) => setSearchExactExternal(e)}
        />
    );
    return (
        <Collapse>
            <Panel key="1" header="Filter">
                <Space>
                    <DatePicker
                        placeholder="Select from date"
                        onChange={(dates, dateString) => setDateStart(dateString)}
                        allowClear
                    />
                    <DatePicker
                        placeholder="Select till date"
                        onChange={(dates, dateString) => setdateEnd(dateString)}
                        allowClear
                    />

                    <Input
                        placeholder="Subscriber"
                        suffix={subscriberExactSwitch}
                        value={subscriber}
                        onChange={(e) => setSubscriber(e.target.value, 10)}
                        allowClear
                    />

                    <Input
                        placeholder="External"
                        suffix={externalExactSwitch}
                        value={external}
                        onChange={(e) => setExternal(e.target.value, 10)}
                        allowClear
                    />

                    <Space direction="vertical">
                        <Checkbox
                            onChange={(e) => setIncoming(e.target.checked)}
                            checked={incoming}
                        >
                            Icoming
                        </Checkbox>
                        <Checkbox
                            onChange={(e) => setoutGoing(e.target.checked)}
                            checked={outgoing}
                        >
                            Outgoing
                        </Checkbox>
                    </Space>
                </Space>
                <Button onClick={btnClick} type="primary" size="large">
                    Filter
                </Button>
            </Panel>
        </Collapse>
    );
};
