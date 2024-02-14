import { create } from "zustand";

const postStore = (set: any) => ({
  posts: [],
  setPosts: (data: any) => set(() => ({ posts: data })),
  addPost: (data: any) =>
    set((store: any) => ({ posts: [data, ...store.posts] })),
});

export const usePostStore = create(postStore);
