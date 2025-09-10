"use client";

import { useState } from "react";
import Button from "@/app/components/Button";
import { createComment } from "@/app/utils/supabaseFunctions";

type Comment = {
  id: number;
  content: string;
  username: string;
  date: string;
};

type Props = {
  postId: number;
  initialComments: Comment[];
};

export default function CommentSection({ postId, initialComments }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    if (newComment === "") return;

    try {
      const inserted = await createComment(postId, newComment);
      setComments((prev) => [...prev, inserted]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("コメントの投稿に失敗しました。");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 w-1/3 mx-auto border border-gray-200">
      <h4 className="text-lg px-4 pb-2">コメント</h4>

      <div className="bg-gray-100 p-4 rounded-md">
        <textarea
          className="bg-white border-2 border-gray-300 rounded w-full placeholder:tracking-wider placeholder:text-sm placeholder:p-1 focus:outline-none focus:border-blue-400"
          placeholder="この問題について意見を共有しましょう"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="text-right mt-2">
          <Button size="sm" variant="secondary" onClick={handleCommentSubmit}>
            コメント投稿
          </Button>
        </div>
      </div>

      <div className="space-y-5 mt-5">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center">まだコメントがありません</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <hr className="border-gray-300 my-5" />
              <div className="flex space-x-3 text-sm text-gray-400">
                <p>{comment.username}</p>
                <p>{comment.date}</p>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
