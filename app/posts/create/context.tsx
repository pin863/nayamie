"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 入力フォームのContext
interface FormContextType {
  label: string;
  context: string;
}

interface FormContextValue {
  data: FormContextType[];
  setData: (data: FormContextType[]) => void;
}

// 初期値
const defaultValue: FormContextValue = {
  data: [],
  setData: () => {},
};

const FormContext = createContext<FormContextValue>(defaultValue);

export function usePostContext() {
  return useContext(FormContext);
}

interface PostsContextProviderProps {
  children: ReactNode;
}

export function PostsContextProvider({ children }: PostsContextProviderProps) {
  const [data, setData] = useState<FormContextType[]>([]);

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
}