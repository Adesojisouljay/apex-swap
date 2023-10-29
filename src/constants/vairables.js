import Cookies from "js-cookie"

export const getAccessToken = () => {
    return  Cookies.get("token")
}
export const removeAccessToken = () => {
    return  Cookies.remove("token")
}