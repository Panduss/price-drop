import {getRepository} from "fireorm";
import {Link, UserLink} from "../models/urls";

export const getUserDoc = async (userId: string) => {
    if (!userId) {
        throw new Error("UserID type must be provided!");
    }

    const urlRepository = getRepository(UserLink);
    return urlRepository.whereEqualTo('userId', userId).findOne()
}

export const deleteUserLink = async (userId: string, name: string) => {
    if (!userId) {
        throw new Error("UserID type must be provided!");
    }
    if (!name) {
        throw new Error("I can't guess which item you want to delete!");
    }

    try {
        const urlRepository = getRepository(UserLink);
        const doc = await urlRepository.whereEqualTo('userId', userId).findOne()

        if (!doc) {
            throw new Error("UseUser has no saved links!");
        }

        const updatedLinks = {
            ...doc,
            links: doc.links.filter((i) => i.name !== name)
        }

        return urlRepository.update(JSON.parse(JSON.stringify(updatedLinks)))

    } catch (e) {
        console.error("Error removing link from document: ", e);
    }
}

export const submitLink = async (userId: string, url: string, name: string, reference: string, cookie: string, priceOriginal: string): Promise<UserLink> => {
    if (!userId) {
        throw new Error("UserID type must be provided!");
    }
    if (!url || !name || !reference || !priceOriginal) {
        throw new Error("Can't create link without all the necessary data!");
    }

    try {
        const urlRepository = getRepository(UserLink);
        const doc = await urlRepository.whereEqualTo('userId', userId).findOne()

        const link = new Link()
        link.url = url;
        link.name = name;
        link.cookie = cookie;
        link.priceOriginal = priceOriginal;
        link.reference = reference;
        link.prices = [];

        if (doc) {
            if (!doc.links) doc.links = [];
            doc.links.push(link);
            return await urlRepository.update(JSON.parse(JSON.stringify(doc)));
        } else {
            const userLink = new UserLink()
            userLink.links = [link];
            userLink.userId = userId;
            userLink.proxyIndex = 0;
            return await urlRepository.create(JSON.parse(JSON.stringify(userLink)))
        }

    } catch (e) {
        throw new Error(`Error adding link to document: ${e}`);
    }
}

export const updateLinks = async (userId: string, links: Link[]) => {
    if (!userId) {
        throw new Error("UserID type must be provided!");
    }
    if (!links) {
        throw new Error("Can't update doc without links!");
    }

    try {
        const urlRepository = getRepository(UserLink);
        const doc = await urlRepository.whereEqualTo('userId', userId).findOne()

        if (!doc) {
            throw new Error("No doc to update!");
        }

        const updatedLinks = {
            ...doc,
            links: links
        }

        return urlRepository.update(JSON.parse(JSON.stringify(updatedLinks)));
    } catch (e) {
        console.error("Error adding link to document: ", e);
    }
}

export const getProxyIndex = async (userId: string) => {
    if (!userId) {
        throw new Error("UserID type must be provided!");
    }

    const urlRepository = getRepository(UserLink);
    const doc = await urlRepository.whereEqualTo('userId', userId).findOne()

    if (!doc) {
        throw new Error("Can't find doc for user!");
    }

    const updatedLinks = {
        ...doc,
        proxyIndex: iterateIndex(doc.proxyIndex)
    }

    await urlRepository.update(updatedLinks)

    return doc.proxyIndex
}

const iterateIndex = (currentIndex: number): number => {
    return currentIndex === 10 ? 1 : currentIndex + 1;
}
