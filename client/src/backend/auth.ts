export async function fbLogin(credentials: {email: string, password: string}) {
    return fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json()).catch((e) => new Error(e))
}