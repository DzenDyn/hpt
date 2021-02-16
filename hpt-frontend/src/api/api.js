import axios from 'axios';

const baseURL = 'http://localhost/v1/';
const instance = axios.create({
    baseURL,
    timeout: 3000
});

export const tarifficationAPI = {
    async getTariffication(
        current = 1,
        pageSize = 10,
        column,
        order,
        dateStart,
        dateEnd,
        subscriber,
        external,
        direction
    ) {
        let queryString = `tariffication/?current=${current}&pageSize=${pageSize}`;
        if (column) queryString += `&column=${column}`;
        if (order) queryString += `&order=${order}`;
        if (dateStart) queryString += `&dateStart=${dateStart}`;
        if (dateEnd) queryString += `&dateEnd=${dateEnd}`;
        if (subscriber) queryString += `&subscriber=${subscriber}`;
        if (external) queryString += `&external=${external}`;
        if (direction) queryString += `&direction=${direction}`;
        const response = await instance
            .get(queryString)
            .catch((err) => console.log(`api.js error \n${err}`));
        return response;
    }
};
