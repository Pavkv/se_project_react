const baseUrl = 'http://localhost:3001';

async function fetchResponse(endpoint, method, body) {
    return await fetch(`${baseUrl}/${endpoint}`, {
        method: method || 'GET',
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': "application/json"
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    });
}

export const getItems = () => {
    return fetchResponse('items');
};

export const addItem = (item, onComplete) => {
    return fetchResponse('items', 'POST', item)
        .then(() => getItems())
        .then((data) => {
            onComplete(data);
        });
};

export const deleteItem = (id, onComplete) => {
    return fetchResponse(`items/${id}`, 'DELETE')
        .then(() => getItems())
        .then((data) => {
            onComplete(data);
        });
};