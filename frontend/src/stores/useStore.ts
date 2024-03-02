import { create } from "zustand";

const useStore = (set: any) => ({
  user: {},
  setUser: (data: any) => set(() => ({ user: data })),
});

export const useUseStore = create(useStore);