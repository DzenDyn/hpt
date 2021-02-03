import axios from 'axios';

const baseURL = 'http://localhost/v1/';
const instance = axios.create({
    baseURL,
    timeout: 3000
});

export const tarifficationAPI = {
    async getTariffication(current = 1, pageSize = 10, column, order) {
        let queryString = `tariffication/?current=${current}&pageSize=${pageSize}`;
        if (column) queryString += `&column=${column}`;
        if (order) queryString += `&order=${order}`;
        const response = await instance.get(queryString).catch((err) => console.log(err));
        return response;
    }
};
