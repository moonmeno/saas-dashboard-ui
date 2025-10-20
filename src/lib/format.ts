// 조회수, 좋아요 수 등 큰 숫자를 축약해 보여줍니다.
export const formatCount = (value: number | undefined) => {
  if (value === undefined) return "-";
  if (value < 1000) return value.toString();
  if (value < 1000000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  if (value < 1000000000)
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  return `${(value / 1000000000).toFixed(1).replace(/\.0$/, "")}B`;
};

// ISO 날짜 문자열을 받아 상대 시간 문자열로 변환합니다.
export const timeAgo = (isoDate: string) => {
  const date = new Date(isoDate);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
};
