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
    <main className="px-4 md:px-8">
      <div className="space-y-8 mt-10">
        {/* 投稿詳細 */}
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <PostComponent {...post} isOwner={true} />
        </div>

        {/* コメント欄 */}
        <div className="w-full mx-auto">
          <CommentSection postId={postId} initialComments={comments} />
        </div>
      </div>
    </main>
  );
}
