import { tarifficationAPI } from '../api/api';
import { SET_TARIFFICATION, SET_CURRENT_PAGE, SET_PAGE_SIZE, TOGGLE_IS_FETCHING } from './types';

const initialState = {
    tariffication: [],
    currentPage: 1,
    pageSize: 30,
    isFetching: false
};

const handlers = {
    [SET_TARIFFICATION]: (state, { payload }) => ({
        ...state,
        tariffication: payload
    }),
    [SET_CURRENT_PAGE]: (state, { payload }) => ({
        ...state,
        currentPage: payload
    }),
    [SET_PAGE_SIZE]: (state, { payload }) => ({
        ...state,
        pageSize: payload
    }),
    [TOGGLE_IS_FETCHING]: (state, { payload }) => ({
        ...state,
        isFetching: payload
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

export const toggleIsFetching = (payload) => ({
    type: TOGGLE_IS_FETCHING,
    payload
});

export const requestTariffication = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const response = await tarifficationAPI.getTariffication(currentPage, pageSize);

    if (response.data.data) {
        dispatch(setCurrentPage(response.data.data.currentPage));
        dispatch(setPageSize(response.data.data.pageSize));
        dispatch(setTariffication(response.data.data.records));
    }
};

export const tarifficationReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};
