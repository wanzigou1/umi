import dayjs from 'dayjs';

/**
 * @param dateStr 时间
 * @returns 距当前时间多久
 */
export function timeAgo(dateStr: string): string {
  const now = dayjs();
  const past = dayjs(dateStr);
  const diffMinutes = now.diff(past, 'minute');

  if (diffMinutes < 1) return '刚刚更新';
  if (diffMinutes < 60) return `${diffMinutes} 分钟前更新`;

  const diffHours = now.diff(past, 'hour');
  if (diffHours < 24) return `${diffHours} 小时前更新`;

  const diffDays = now.diff(past, 'day');
  return `${diffDays} 天前更新`;
}
