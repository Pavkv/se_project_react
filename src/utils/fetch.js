export default async function fetchResponse(baseUrl, endpoint, method, body, token) {
    return await fetch(baseUrl + (endpoint ? `/${endpoint}` : ''), {
        method: method || 'GET',
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': "application/json",
            authorization: `Bearer ${token}`,
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    });
}

