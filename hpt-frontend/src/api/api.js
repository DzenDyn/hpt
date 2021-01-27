import axios from 'axios';

const baseURL = 'http://localhost/v1/';
const instance = axios.create({
    baseURL,
    timeout: 1000
});

export const tarifficationAPI = {
    async getTariffication(page = 1, pageSize = 10, subscriber, dateStart, dateEnd, external) {
        let queryString = `tariffication/?page=${page}&pageSize=${pageSize}`;
        if (subscriber) queryString += `&subscriber=${subscriber}`;
        if (dateStart) queryString += `&dateStart=${dateStart}`;
        if (dateEnd) queryString += `&dateEnd=${dateEnd}`;
        if (external) queryString += `&external=${external}`;
        const response = await instance.get(queryString);
        return response;
    }
};
