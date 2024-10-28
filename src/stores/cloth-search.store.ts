import { create } from "zustand";

interface ClothSearchStore {
    searchWord: string;
    
    setSearchWord: (searchWord: string) => void,
};

const useClothSearchStore = create<ClothSearchStore>(set => ({
    searchWord: '',

    setSearchWord: (searchWord: string) => set(state => ({ ...state, searchWord }))
}));

export default useClothSearchStore;