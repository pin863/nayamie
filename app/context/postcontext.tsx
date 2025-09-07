import { useContext, createContext } from "react";
export interface PostContextType {
  label: string;
  context: string;
}

export interface PostContextValue {
  data: PostContextType[];
  setData: (data: PostContextType[]) => void;
}

// 初期値
const defaultValue: PostContextValue = {
  data: [],
  setData: () => {},
};

export const PostContext = createContext<PostContextValue>(defaultValue);

export function usePostContext() {
  return useContext(PostContext);
}
