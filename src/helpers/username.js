import { getUserProfile } from "../api/apex";

export const getUsername = async (id) => {
    try {
        const userProfile = await getUserProfile(id);
        const username = userProfile?.username;
        return username
        
    } catch (error) {
        console.log(error)
    }
}