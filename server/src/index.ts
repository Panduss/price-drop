import {login} from "./providers/auth";
import {AuthUser} from "./models/auth";
import {deleteUserLink, getProxyIndex, getUserDoc, submitLink, updateLinks} from "./providers/urls";
import {scrape} from "./providers/scrape";
import {Link} from "./models/urls";

/**
 * AUTH
 */
interface AuthApiInterface {
    login: (email: string, password: string) => Promise<AuthUser>;
}

export const AuthApi: AuthApiInterface = {
    login: login
};

/**
 * URLS
 */
interface UrlsApiInterface {
    getUserDoc: (userId: string) => Promise<any>;
    deleteUserLink: (userId: string, itemName: string) => Promise<any>;
    submitLink: (userId: string, url: string, name: string, reference: string, cookie: string, priceOriginal: string) => Promise<any>;
    updateLinks: (userId: string, links: Link[]) => Promise<any>;
    getProxyIndex: (userId: string) => Promise<number>;
}

export const UrlsApi: UrlsApiInterface = {
    getUserDoc: getUserDoc,
    deleteUserLink: deleteUserLink,
    submitLink: submitLink,
    updateLinks: updateLinks,
    getProxyIndex: getProxyIndex
};

/**
 * SCRAPING
 */
interface ScrapeApiInterface {
    scrape: (userId: string) => Promise<any>;
}

export const ScrapeApi: ScrapeApiInterface = {
    scrape: scrape,
};