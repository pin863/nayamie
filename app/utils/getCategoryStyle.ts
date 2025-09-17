// ==========================================================
// カテゴリーの色分け
// ==========================================================

export function getCategoryStyle(category: string) {
  switch (category) {
    case "ごみ問題":
      return { backgroundColor: "#FEF9C3", color: "#78350F" };
    case "騒音":
      return { backgroundColor: "#FEE2E2", color: "#7F1D1D" };
    case "外国人":
      return { backgroundColor: "#DBEAFE", color: "#1E3A8A" };
    case "交通":
      return { backgroundColor: "#DCFCE7", color: "#166534" };
    case "子育て":
      return { backgroundColor: "#FCE7F3", color: "#831843" };
    case "その他":
    default:
      return { backgroundColor: "#F3F4F6", color: "#374151" };
  }
}