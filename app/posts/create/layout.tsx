"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FormContextType {
  label: string;
  context: string;
}

interface FormContextValue {
  data: FormContextType[];
  setData: (data: FormContextType[]) => void;
}

// 初期値（空 or 仮データ）
const defaultValue: FormContextValue = {
  data: [],
  setData: () => {},
};

const FormContext = createContext<FormContextValue>(defaultValue);

export function useFormContext() {
  return useContext(FormContext);
}

interface PostsLayoutProps {
  children: ReactNode;
}
export default function PostsLayout({ children }: PostsLayoutProps) {
  const [data, setData] = useState<FormContextType[]>([]);

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
}
