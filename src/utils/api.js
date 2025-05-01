import fetchResponse from "./fetch.js";
const baseUrl = 'http://localhost:3001';

export const getItems = () => {
    return fetchResponse(baseUrl, 'items').then(res => {
        return res.data.reverse()});
};


export const addItem = (item, token) => {
    return fetchResponse(baseUrl, 'items', 'POST', item, token)
        .then(() => getItems());
};

export const deleteItem = (id, token) => {
    return fetchResponse(baseUrl, `items/${id}`, 'DELETE', undefined, token);
};

export const likeItem = (id, token) => {
    return fetchResponse(baseUrl, `items/${id}/likes`, 'PUT', undefined, token);
};

export const dislikeItem = (id, token) => {
    return fetchResponse(baseUrl, `items/${id}/likes`, 'DELETE', undefined, token);
};