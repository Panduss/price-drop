import {iUser} from "../models";

export async function getPrices(user: iUser) {
    return fetch('http://localhost:5000/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${user?.token}`
        },
        body: JSON.stringify({userId: user?.id})
    }).then(data => data.json()).catch((e) => new Error(e))
}