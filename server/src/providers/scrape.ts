import puppeteer, { Browser, Page } from "puppeteer";
import { UrlsApi } from "../index";
import { Link } from "../models/urls";

/**
 * Initiates the scraping process for a given user.
 * @param userId - The ID of the user for whom scraping is being done.
 * @returns A promise that resolves once scraping is complete.
 */
export async function scrape(userId: string): Promise<void> {
    if (!userId) {
        throw new Error("UserID must be provided!");
    }

    const doc = await UrlsApi.getUserDoc(userId)
    if (!doc) {
        throw new Error("User document doesn't exist!");
    }

    const links: Link[] = [];

    for (const site of doc.links) {
        const browserInstance = await startBrowser();
        if (!browserInstance) {
            throw new Error("Could not start browser!");
        }

        try {
            const link = await openSite(browserInstance, site);
            links.push(link);
        } catch (err) {
            console.error("Error processing site: ", err);
        } finally {
            await browserInstance.close();
        }

        // Wait for 5 seconds before proceeding to the next site.
        await new Promise(resolve => setTimeout(resolve, 5 * 1000));
    }

    // Update the links with scraped data.
    return await UrlsApi.updateLinks(userId, links);
}

/**
 * Starts the Puppeteer browser instance.
 * @returns A Promise resolving to a Browser instance or undefined.
 */
async function startBrowser(): Promise<Browser | undefined> {
    try {
        console.log("Opening the browser...");
        return await puppeteer.launch({
            headless: true,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.error("Could not create a browser instance: ", err);
    }
}

/**
 * Opens a specific site in the browser and performs actions as needed.
 * @param browser - The browser instance.
 * @param site - The site link and metadata.
 * @returns A Promise resolving to an updated Link object.
 */
async function openSite(browser: Browser, site: Link): Promise<Link> {
    const page: Page = await browser.newPage();
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(site.url, ['geolocation']);
    await page.setGeolocation({latitude: 52.377956, longitude: 4.897070});
    await page.setViewport({width: 0, height: 0});
    console.log(`Navigating to ${site.url}...`);
    await page.goto(site.url);
    await page.waitForSelector(site.cookie);
    await page.click(site.cookie);
    await page.waitForSelector(site.reference);
    const element = await page.$(site.reference);
    const priceStr = await page.evaluate(element => element?.textContent, element);

    if (!priceStr) {
        throw new Error("No price could be found!");
    }
    const { price, currency } = extractCurrencyAmount(priceStr);

    const today = new Date().toLocaleDateString();

    const updatedPrice = {
        price,
        currency,
        date: today
    }

    return {
        ...site,
        prices: site?.prices?.concat(updatedPrice)
    }
}

/**
 * Extracts the currency and amount from a string.
 * @param str - The string containing the currency and amount.
 * @returns An object containing the price and currency.
 */
function extractCurrencyAmount(str: string): { price: string, currency: string } {
    const regex = /(\d+(\.\d+)?)\s*([€$£])?|([€$£])?\s*(\d+(\.\d+)?)/;
    const match = str.match(regex);

    if (match) {
        const price = match[1] ? match[1] : match[5];
        const currency = match[3] ? match[3] : match[4];
        return { price: String(parseFloat(price).toFixed(2)), currency };
    } else {
        return { price: 'N/A', currency: 'N/A' };
    }
}