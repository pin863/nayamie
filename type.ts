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
