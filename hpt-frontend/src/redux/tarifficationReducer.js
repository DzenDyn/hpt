import { tarifficationAPI } from '../api/api';
import {
    SET_TARIFFICATION,
    SET_CURRENT_PAGE,
    SET_PAGE_SIZE,
    TOGGLE_IS_FETCHING,
    SET_TOTAL_PAGES,
    SET_PAGINATION,
    SET_TOTAL,
    SET_FILTER
} from './types';

const initialState = {
    tariffication: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
    },
    filter: {},
    isFetching: false
};

const handlers = {
    [SET_TARIFFICATION]: (state, { payload }) => ({
        ...state,
        tariffication: payload
    }),
    [SET_PAGINATION]: (state, { payload }) => ({
        ...state,
        pagination: payload
    }),
    [SET_CURRENT_PAGE]: (state, { payload }) => ({
        ...state,
        pagination: {
            ...state.pagination,
            current: payload
        }
    }),
    [SET_PAGE_SIZE]: (state, { payload }) => ({
        ...state,
        pagination: {
            ...state.pagination,
            pageSize: payload
        }
    }),
    [SET_TOTAL_PAGES]: (state, { payload }) => ({
        ...state,
        pagination: {
            ...state.pagination,
            totalPages: payload
        }
    }),
    [SET_TOTAL]: (state, { payload }) => ({
        ...state,
        pagination: {
            ...state.pagination,
            total: payload
        }
    }),
    [TOGGLE_IS_FETCHING]: (state, { payload }) => ({
        ...state,
        isFetching: payload
    }),
    [SET_FILTER]: (state, { payload }) => ({
        ...state,
        filter: payload
    }),
    DEFAULT: (state) => state
};

export const setTariffication = (payload) => ({
    type: SET_TARIFFICATION,
    payload
});

export const setCurrentPage = (payload) => ({
    type: SET_CURRENT_PAGE,
    payload
});

export const setPageSize = (payload) => ({
    type: SET_PAGE_SIZE,
    payload
});

export const setTotalPages = (payload) => ({
    type: SET_TOTAL_PAGES,
    payload
});
export const setTotal = (payload) => ({
    type: SET_TOTAL,
    payload
});

export const setPagination = (payload) => ({
    type: SET_PAGINATION,
    payload
});

export const toggleIsFetching = (payload) => ({
    type: TOGGLE_IS_FETCHING,
    payload
});

export const setFilter = (payload) => ({
    type: SET_FILTER,
    payload
});

export const requestTariffication = (pagination, filter, sorter) => async (dispatch) => {
    const { current, pageSize } = pagination;
    const { field, order } = sorter || {};

    dispatch(toggleIsFetching(true));
    const response = await tarifficationAPI.getTariffication(current, pageSize, field, order);

    if (response) {
        dispatch(setTariffication(response.data.records));
        dispatch(setPagination(response.data.pagination));
        dispatch(toggleIsFetching(false));
    }
};

export const tarifficationReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};
