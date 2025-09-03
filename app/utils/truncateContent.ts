// 50文字以上なら省略する関数
export function truncateContent(
  content: string,
  length = 50,
  truncate = false
) {
  if (!truncate) return content;
  return content.length > length ? content.slice(0, length) + "..." : content;
}
