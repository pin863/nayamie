// ==========================================================
// カテゴリーの色分け
// ==========================================================

export function getCategoryStyle(category: string) {
  switch (category) {
    case "ごみ問題":
      return { backgroundColor: "#FACC15", color: "#1E293B" }; // 黄色系
    case "騒音":
      return { backgroundColor: "#EF4444", color: "#FFFFFF" }; // 赤系
    case "外国人":
      return { backgroundColor: "#3B82F6", color: "#FFFFFF" }; // 青系
    case "交通":
      return { backgroundColor: "#22C55E", color: "#FFFFFF" }; // 緑系
    case "子育て":
      return { backgroundColor: "#E879F9", color: "#FFFFFF" }; // ピンク系
    case "その他":
    default:
      return { backgroundColor: "#6B7280", color: "#FFFFFF" }; // グレー系
  }
}
