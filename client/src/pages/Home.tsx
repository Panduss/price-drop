import React, {Suspense, useEffect, useState} from "react"
import "../App.css"
import {useAuth} from "../hooks/useAuth";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineLogout} from "react-icons/ai";
import Search from "../Components/Search";
import Links from "../Components/Link";
import {deleteLink, getLinks, submitLink} from "../backend/links";
import {getPrices} from "../backend/scrape";
import {useFetch} from "../hooks/useFetchWrapper";
import {iLink, iLinkDoc, iUser} from "../models";

function Home({user}: { user: iUser }) {
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [links, setLinks] = useState<iLink[]>([]);
    const {logout} = useAuth()

    const toggleSearchVisible = () => {
        setShowSearch(current => !current)
    }

    const {handleError} = useFetch()

    const deleteUserLink = async (name: string) => {
        setIsLoading(true)
        deleteLink(user, name)
            .then(links => setLinks(links.links))
            .catch(e => handleError(e))
            .finally(() => setIsLoading(false))
    }

    const getLinksByUser = async () => {
        setIsLoading(true)
        getLinks(user)
            .then(links => setLinks(links.links))
            .catch(e => handleError(e))
            .finally(() => setIsLoading(false))
    }

    const getCurrentPrice = async () => {
        setIsLoading(true)
        getPrices(user)
            .then(links => setLinks(links.links))
            .catch(e => handleError(e))
            .finally(() => setIsLoading(false))
    }

    const submitUserLink = async (newLink: iLink) => {
        setIsLoading(true)
        submitLink(user, newLink)
            .then(links => setLinks(links.links))
            .catch(e => handleError(e))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getLinksByUser().catch(e => console.log({e}));
    }, [])

    return (
        <div className="content">
            <div className="header">
                <h3 className="header">Gear price drop PCT</h3>
                <AiOutlineLogout onClick={() => logout()}/>
            </div>
            {
                showSearch ?
                    <div className="title-container">
                        <h3>Add new link</h3>
                        <AiFillCaretUp onClick={toggleSearchVisible}/>
                    </div> :

                    <div className="title-container">
                        <h3>Add new link</h3>
                        <AiFillCaretDown onClick={toggleSearchVisible}/>
                    </div>
            }
            {showSearch && <Search submitUserLink={submitUserLink}/>}
            <footer style={{
                marginTop: '10px'
            }}>
                <Links links={links} deleteUserLink={deleteUserLink} isLoading={isLoading} getCurrentPrice={getCurrentPrice}/>
            </footer>

        </div>
    )
}

export default Home;