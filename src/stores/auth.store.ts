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
    joinPath: string;
    setJoinPath: (joinPath: string) => void;

    birthday: string | null;
    setUserBirthDay: (birthday: string | null) => void;
    solarLunar: boolean | null;
    setSolarLunarCalendar: (solarLunar: boolean | null) => void;
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

    joinPath: 'HOME',
    setJoinPath: (joinPath: string) => set(state => ({...state, joinPath})),

    birthday: null,
    setUserBirthDay: (birthday) => set({ birthday }),

    solarLunar: null,
    setSolarLunarCalendar: (solarLunar) => set({ solarLunar }),

}))

export default useAuthStore;