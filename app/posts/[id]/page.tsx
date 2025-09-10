import PostComponent from "@/app/components/PostComponent";
import CommentSection from "@/app/components/CommentSection";
import {
  getPostById,
  getCommentsByPostId,
} from "@/app/utils/supabaseFunctions";
// import { use } from "react";

export default async function Home({ params }: { params: { id: string } }) {
  const post = await getPostById(Number(params.id));
  // DB から投稿データを取得
  // const post = use(getPostById(postId));

  // const postId = use(params).id;
  // const post = await getPostById(Number(postId));
  const comments = await getCommentsByPostId(Number(params.id));
  const postId = Number(params.id);

  return (
    <main>
      <div className="space-y-8 mt-10">
        <div className="w-1/2 mx-auto">
          <PostComponent {...post} isOwner={true} />
        </div>

        {/* <div className="bg-white shadow-md rounded-md p-4 w-1/3 mx-auto border border-gray-200">
          <h4 className="text-lg px-4 pb-2">コメント</h4>
          <div className="bg-gray-100 p-4 rounded-md">
            <textarea
              className="bg-white border-2 border-gray-300 rounded w-full placeholder:tracking-wider placeholder:text-sm placeholder:p-1 
              focus:outline-none focus:border-blue-400"
              placeholder="この問題について意見を共有しましょう"
            />

            <div className="text-right mt-2">
              <Button size="sm" variant="secondary">
                コメント投稿
              </Button>
            </div>
          </div>

          <div className="space-y-5">
            {comments.length === 0 ? (
              <p className="text-gray-400 text-center">
                まだコメントがありません
              </p>
            ) : (
              comments.map((comment, id) => (
                <div key={id} className="space-y-2">
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
        </div> */}
        {/* コメント欄 */}
        <CommentSection postId={postId} initialComments={comments} />
      </div>
    </main>
  );
}
