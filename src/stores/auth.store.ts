import { create } from "zustand";

interface AuthStore { 
    id: string;
    setId: (userId: string) => void;
    password: string;
    setPassword: (password: string) => void;
    userName: string;
    setUserName: (userName: string) => void;
    nickname: string;
    setNickname: (nickname: string) => void;
    email: string;
    setEmail: (email: string) => void;
    authNumber: string;
    setAuthNumber: (authNumber: string) => void;
    userAddress: string;
    setUserAddress: (userAddress: string) => void;
    joinPath: string;
    setJoinPath: (joinPath: string) => void;
    snsId: string | undefined;
    setSnsId: (snsId: string | undefined) => void;
}

const useAuthStore = create<AuthStore>(set => ({
    id: '',
    setId: (id: string) => set(state => ({ ...state, id})),

    password: '',
    setPassword: (password: string) => set(state => ({ ...state, password})),

    userName: '',
    setUserName: (userName: string) => set(state => ({...state, userName})),
    
    nickname: '',
    setNickname: (nickname: string) => set(state => ({ ...state, nickname})),
    
    email: '',
    setEmail: (email: string) => set(state => ({ ...state, email})),
    
    authNumber: '',
    setAuthNumber: (authNumber: string) => set(state => ({ ...state, authNumber})),
    
    userAddress: '',
    setUserAddress: (userAddress: string) => set(state => ({ ...state, userAddress})),

    joinPath: 'HOME',
    setJoinPath: (joinPath: string) => set(state => ({...state, joinPath})),
    
    snsId: undefined,
    setSnsId: (snsId: string | undefined) => set(state => ({...state, snsId})),

}))

export default useAuthStore;