import { createSelector } from 'reselect';

const selectTariffication = (state) => state.tariffication.tariffication;

export const getTariffication = createSelector(
    selectTariffication,
    (tariffication) => tariffication
);

export const getCurrentPage = (state) => {
    return state.tariffication.pagination.current;
};

export const getPageSize = (state) => {
    return state.tariffication.pagination.pageSize;
};

export const getIsFetching = (state) => {
    return state.tariffication.isFetching;
};

export const getTotalPages = (state) => {
    return state.tariffication.pagination.total;
};

export const getPagionation = (state) => {
    return state.tariffication.pagination;
};

export const getFilter = (state) => {
    return state.filter;
};

export const getSorter = (state) => {
    return state.sorter;
};
