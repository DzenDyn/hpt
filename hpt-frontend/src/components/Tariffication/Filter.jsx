import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker, Collapse, Space, Input, Button, Checkbox } from 'antd';
import { setFilter } from '../../redux/tarifficationReducer';
// import { getFilter } from '../../redux/tarifficationSelectors';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

export const Filter = (props) => {
    const dispatch = useDispatch();

    const [incoming, setIncoming] = useState(false);
    const [outgoing, setoutGoing] = useState(false);
    const [subscriber, setSubscriber] = useState();
    const [external, setExternal] = useState();
    const [dateRange, setDateRange] = useState();

    const btnClick = () => {
        let direction;
        if (incoming) direction = '0';
        if (outgoing) direction = '1';
        if (incoming && outgoing) direction = undefined;

        let dateStart;
        let dateEnd;
        if (dateRange) {
            [dateStart] = dateRange;
            [dateEnd] = dateRange;
        }

        const filter = {
            ...(dateStart && { dateStart }),
            ...(dateEnd && { dateEnd }),
            ...(subscriber && { subscriber }),
            ...(external && { external }),
            ...(direction && { direction })
        };
        dispatch(setFilter(filter));
        props.handleTableChange(props.pagination, filter, props.sorter);
    };
    return (
        <Collapse>
            <Panel key="1" header="Filter">
                <Space>
                    <RangePicker onChange={(dates, dateStrings) => setDateRange(dateStrings)} />
                    <Input
                        placeholder="Subscriber"
                        value={subscriber}
                        onChange={(e) => setSubscriber(Number.parseInt(e.target.value, 10))}
                    />
                    <Input
                        placeholder="External"
                        value={external}
                        onChange={(e) => setExternal(Number.parseInt(e.target.value, 10))}
                    />

                    <Checkbox onChange={(e) => setIncoming(e.target.checked)} checked={incoming}>
                        Icoming
                    </Checkbox>
                    <Checkbox onChange={(e) => setoutGoing(e.target.checked)} checked={outgoing}>
                        Outgoing
                    </Checkbox>

                    <Button onClick={btnClick} type="primary" size="small">
                        Filter
                    </Button>
                </Space>
            </Panel>
        </Collapse>
    );
};
