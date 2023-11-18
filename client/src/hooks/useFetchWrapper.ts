import {useAuth} from "./useAuth";
import {iError} from "../models";

export const useFetch = () => {

    const {logout} = useAuth()

    const handleError = (e: iError) => {
        console.log({HELLO: e})
        if ([401, 403].includes(e.status)) {
            logout()
        }
    };

    return { handleError };
}