// ==========================================================
// 投稿編集ページ
// ==========================================================

import PostComponent from "@/app/components/PostComponent";
import CommentSection from "@/app/components/CommentSection";
import {
  getPostById,
  getCommentsByPostId,
} from "@/app/utils/supabaseFunctions";

export default async function Home({ params }: { params: { id: string } }) {
  const post = await getPostById(Number(params.id));
  const comments = await getCommentsByPostId(Number(params.id));
  const postId = Number(params.id);

  return (
    <main>
      <div className="space-y-8 mt-10">
        <div className="w-1/2 mx-auto">
          {/* 投稿詳細 */}
          <PostComponent {...post} isOwner={true} />
        </div>
        {/* コメント欄 */}
        <CommentSection postId={postId} initialComments={comments} />
      </div>
    </main>
  );
}
