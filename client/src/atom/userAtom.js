import { atom } from "recoil";


const userAtom = atom({
    key: "userAtom",
    default:JSON.parse(localStorage.getItem('auth-threads'))
})

export default userAtom