export function getCategoryStyle(category: string) {
  switch (category) {
    case "ごみ問題":
      return { backgroundColor: "#FEF3C7", color: "#78350F" };
    case "騒音":
      return { backgroundColor: "#FECACA", color: "#7F1D1D" };
    case "外国人":
      return { backgroundColor: "#BFDBFE", color: "#1E40AF" };
    case "自然・環境":
      return { backgroundColor: "#BBF7D0", color: "#166534" };
    case "子育て":
      return { backgroundColor: "#FBCFE8", color: "#831843" };
    case "その他":
    default:
      return { backgroundColor: "#E5E7EB", color: "#374151" };
  }
}
