export function getCategoryStyle(category: string) {
  switch (category) {
    case "ごみ問題":
      return { backgroundColor: "#FFF7D7", color: "#78350F" };
    case "騒音":
      return { backgroundColor: "#FFE5E3", color: "#7F1D1D" };
    case "外国人":
      return { backgroundColor: "#DCF0F9", color: "#1E40AF" };
    case "自然・環境":
      return { backgroundColor: "#E9FFE3", color: "#166534" };
    case "子育て":
      return { backgroundColor: "#FFE5FE", color: "#831843" };
    case "その他":
    default:
      return { backgroundColor: "#E5E7EB", color: "#374151" };
  }
}
