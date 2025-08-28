export type Post = {
  title: string;
  content: string;
  category: string;
  prefecture: string;
  date: string;
  username: string;
  showButton: boolean;
  href?: string;
  isOwner?: boolean;
};

export type Comment = {
  content: string;
  username: string;
  date: string;
};
