import {iLink, iLinkDoc, iUser} from "../models";

export async function submitLink(user: iUser, link: iLink): Promise<iLinkDoc> {

    return fetch('http://localhost:5000/links/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${user?.token}`
        },
        body: JSON.stringify({userId: user?.id, ...link})
    }).then(data => data.json()).catch((e) => new Error(e))
}

export async function getLinks(user: iUser): Promise<iLinkDoc> {
    return fetch('http://localhost:5000/links', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${user?.token}`
        },
        body: JSON.stringify({userId: user?.id})
    }).then(data => data.json()).catch((e) => new Error(e))
}

export async function deleteLink(user: iUser, name: string): Promise<iLinkDoc> {
    return fetch('http://localhost:5000/links/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${user?.token}`
        },
        body: JSON.stringify({userId: user?.id, name})
    }).then(data => data.json()).catch((e) => new Error(e))
}