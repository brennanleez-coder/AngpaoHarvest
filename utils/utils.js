import { angpaolist } from "@/utils/data";

export const initialiseApp = () => {
    localStorage.setItem('CNY', JSON.stringify(
        {
            angpao: [],
            settings: {
                categories: ["Family", "Friends", "Colleagues", "Others"],
                uses: ["Save", "Gamble", "Others"]
            }
            
        }
    ));
}

export const resumeAppState = () => {
    const angpaos = JSON.parse(localStorage.getItem('CNY'));
    return angpaos;
}

