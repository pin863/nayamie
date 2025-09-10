"use client";

import { usePostContext } from "../context.tsx";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { createPost } from "@/app/utils/supabaseFunctions";
import { supabase } from "@/app/utils/supabaseClient";

export default function Page() {
  const { data } = usePostContext();
  const router = useRouter();

  const handleSubmit = async () => {
    const categoryContext = data.find((d) => d.label === "カテゴリ")?.context;
    const prefectureContext = data.find((d) => d.label === "都道府県")?.context;

    if (!categoryContext) {
      alert("カテゴリが未選択です");
      return;
    }
    if (!prefectureContext) {
      alert("都道府県が未選択です");
      return;
    }

    // DBからカテゴリIDを取得
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("name", categoryContext)
      .single();

    if (categoryError || !categoryData?.id) {
      alert("カテゴリ取得に失敗しました");
      console.error(categoryError);
      return;
    }

    const category_id = categoryData.id;

    // 都道府県ID
    const prefectureMap: Record<string, number> = {
      北海道: 1,
      青森県: 2,
      岩手県: 3,
      宮城県: 4,
      秋田県: 5,
      山形県: 6,
      福島県: 7,
      茨城県: 8,
      栃木県: 9,
      群馬県: 10,
      埼玉県: 11,
      千葉県: 12,
      東京都: 13,
      神奈川県: 14,
      新潟県: 15,
      富山県: 16,
      石川県: 17,
      福井県: 18,
      山梨県: 19,
      長野県: 20,
      岐阜県: 21,
      静岡県: 22,
      愛知県: 23,
      三重県: 24,
      滋賀県: 25,
      京都府: 26,
      大阪府: 27,
      兵庫県: 28,
      奈良県: 29,
      和歌山県: 30,
      鳥取県: 31,
      島根県: 32,
      岡山県: 33,
      広島県: 34,
      山口県: 35,
      徳島県: 36,
      香川県: 37,
      愛媛県: 38,
      高知県: 39,
      福岡県: 40,
      佐賀県: 41,
      長崎県: 42,
      熊本県: 43,
      大分県: 44,
      宮崎県: 45,
      鹿児島県: 46,
      沖縄県: 47,
    };
    const prefecture_id = prefectureMap[prefectureContext];

    // 投稿データ作成
    const postData = {
      title: data.find((d) => d.label === "タイトル")?.context || "",
      content: data.find((d) => d.label === "詳細内容")?.context || "",
      category_id,
      prefecture_id,
      user_id: "0d8abe50-8f93-44da-ab62-7ddc489d04af", // 固定値
    };

    try {
      await createPost(postData); // supabaseに送信
      alert("投稿成功！");
      router.push("/");
    } catch (err) {
      alert("投稿失敗");
      console.error(err);
    }
  };

  return (
    <main className="flex justify-center">
      <div className="px-16 py-10 space-y-6 w-1/2 my-5 bg-white shadow-md rounded-xl">
        <h3 className="text-2xl font-bold tracking-wider text-center text-gray-600">
          投稿確認画面
        </h3>

        <div className="text-left tracking-wider break-words space-y-4 whitespace-pre-wrap">
          {data.map((item, index) => (
            <div key={index}>
              <h4 className="pb-1 border-b pl-3 mt-6 font-bold border-gray-300">
                {item.label}
              </h4>
              <p className="pl-3 pt-3">{item.context}</p>
            </div>
          ))}
        </div>

        <div className="text-center space-x-6 mt-10">
          <Button variant="gray" size="sm" onClick={() => router.back()}>
            修正する
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            投稿する
          </Button>
        </div>
      </div>
    </main>
  );
}
