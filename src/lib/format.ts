// 조회수, 좋아요 수 등 큰 숫자를 축약해 보여줍니다.
export const formatCount = (value: number | undefined) => {
  if (value === undefined) return "-";
  if (value < 1000) return value.toLocaleString("ko-KR");

  const units = [
    { threshold: 100000000, label: "억" },
    { threshold: 10000, label: "만" },
    { threshold: 1000, label: "천" },
  ];

  for (const unit of units) {
    if (value >= unit.threshold) {
      const formatted = (value / unit.threshold).toFixed(1).replace(/\.0$/, "");
      return `${formatted}${unit.label}`;
    }
  }

  return value.toLocaleString("ko-KR");
};

// ISO 날짜 문자열을 받아 상대 시간 문자열로 변환합니다.
export const timeAgo = (isoDate: string) => {
  const date = new Date(isoDate);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  if (seconds < 10) return "방금 전";
  if (seconds < 60) return `${seconds}초 전`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}주 전`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월 전`;
  const years = Math.floor(days / 365);
  return `${years}년 전`;
};
