import '../App.css';
import {
    AiFillBug,
    AiFillCaretDown,
    AiFillCaretUp,
    AiFillDelete,
} from "react-icons/ai";
import {iLink} from "../models";
import React, {useEffect, useState} from "react";
import PriceGraph from "./PriceGraph";
import Loading from "./Loading";

interface iProps {
    links: iLink[];
    isLoading: boolean;
    getCurrentPrice: () => void;
    deleteUserLink: (name: string) => void;
}

function Links(props: iProps) {
    const [visible, setVisible] = useState<boolean[]>([]);


    const toggleGraph = (index: number) => {
        setVisible(visible?.map((visible: boolean, i: number) => {
            return i === index ? !visible : visible;
        }));
    };

    useEffect(() => {
        if (props.links?.length) setVisible(props.links.map(() => false))
    }, [props.links])

    /**
     * Prices for the table
     * @param link
     */
    const getPriceClassName = (link: iLink): string => {
        if (latestPrice(link) === link.priceOriginal) {
            return ''
        } else if (latestPrice(link) < link.priceOriginal) {
            return 'green-price'
        } else {
            return 'red-price'
        }
    }

    const latestPrice = (link: iLink) => {
        const prices = link?.prices
        if (prices?.length) {
            return prices[prices.length - 1].price
        }
        return link.priceOriginal
    }

    const getLowestPrice = (link: iLink) => {
        const prices = link?.prices
        if (prices?.length) {
            const values = prices.map(p => parseFloat(p.price))
            return Math.min(...values)
        }
        return link.priceOriginal
    }

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <h3>Links</h3>
                <div style={{
                    display: 'flex',
                    alignItems: "center"
                }}>
                    <AiFillBug onClick={props.getCurrentPrice}/>
                </div>
            </div>
            {props.isLoading ? <Loading/> :
                <>{props.links && props.links.map(function (link, index) {
                    return (
                        <div key={link?.url!} style={{marginBottom: 15}}>
                            <div className="list">
                                <div className="title-container">
                                    <><a target='_blank' rel="noreferrer" href={link?.url}>{link?.name}</a></>
                                    {visible[index] ? <AiFillCaretUp onClick={() => toggleGraph(index)}/> :
                                        <AiFillCaretDown onClick={() => toggleGraph(index)}/>}
                                </div>
                                <AiFillDelete onClick={() => props.deleteUserLink(link.name)}/>
                            </div>
                            <table style={{
                                textAlign: 'left',
                                paddingTop: 10,
                                width: '100%'
                            }}>
                                <tbody>
                                <tr className="table-column">
                                    <td>Original</td>
                                    <td>Current</td>
                                    <td>Lowest</td>
                                </tr>
                                <tr className="table-column">
                                    <td>{link?.priceOriginal} €</td>
                                    <td className={getPriceClassName(link)}>{latestPrice(link)} €</td>
                                    <td>{getLowestPrice(link)} €</td>
                                </tr>
                                </tbody>
                            </table>
                            {visible[index] && <PriceGraph data={link?.prices || []}/>}
                        </div>
                    )
                })}</>
            }
        </>
    )
}

export default Links