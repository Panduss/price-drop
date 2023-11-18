export interface iLink {
    name: string,
    priceOriginal: string,
    reference: string,
    cookie: string,
    url: string,
    prices?: iPrice[]
}

export interface iPrice {
    currency: string;
    date: string;
    price: string
}

export interface iLinkDoc {
    id: string,
    userId: string,
    links: iLink[]
    proxyIndex: number
}

export interface iUser {
    id: string;
    email: string;
    token?: string;
}

export interface iLogin {
    email: string,
    password: string
}

export interface iError {
    status: number;
}



