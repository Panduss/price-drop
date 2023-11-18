import React, {useState} from "react"

import "../App.css"
import {useAuth} from "../hooks/useAuth";
import {submitLink} from "../backend/links";
import {iLink, iLinkDoc} from "../models";
import {useFetch} from "../hooks/useFetchWrapper";

interface iProps {
    submitUserLink: (newLink: iLink) => void;
}

function Search(props: iProps) {

    const [name, setName] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [reference, setReference] = useState<string>('')
    const [cookie, setCookie] = useState<string>('')
    const [priceOriginal, setPriceOriginal] = useState<string>('')

    const clearFields = (e?: any) => {
        e?.preventDefault();
        setName("")
        setUrl("")
        setReference("")
        setPriceOriginal("")
    }

    return (
        <>
            <form className="add-new-form">
                <label>
                    Product name
                </label>
                <input value={name}
                       onChange={(e) => setName(e.target.value)}/>
                <br/>
                <label>
                    Url
                </label>
                <input value={url}
                       onChange={(e) => setUrl(e.target.value)}/>
                <br/>
                <label>
                    Class/id ref (including . #)
                </label>
                <input value={reference}
                       onChange={(e) => setReference(e.target.value)}/>
                <br/>
                <label>
                    Cookie ref (including . #)
                </label>
                <input value={cookie}
                       onChange={(e) => setCookie(e.target.value)}/>
                <br/>
                <label>
                    Current price
                </label>
                <input value={priceOriginal}
                       onChange={(e) => setPriceOriginal(e.target.value)}/>
            </form>
            <div className="add-new-form-footer">
                <button className="add-button" onClick={() => props.submitUserLink({name, url, reference, cookie, priceOriginal})}>Add to list</button>
                <button className="delete-button" onClick={clearFields}>Clear fields</button>
            </div>
        </>
    )
}

export default Search;