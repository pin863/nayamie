import { ChangeEvent } from "react"; 


export type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  prefecture: string;
  date: string;
  username: string;
  showButton?: boolean;
  href?: string;
  isOwner?: boolean;
};

export type Comment = {
  content: string;
  username: string;
  date: string;
};
export type PostFromDB = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user?: { name: string };
  category?: { name: string };
  prefecture?: { name: string };
};

export type FormInputProps = {
  label: string;
  placeholder?: string;
  labelShow?: boolean;
  as?: "input" | "textarea";
  rows?: number;
  postScreen?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};