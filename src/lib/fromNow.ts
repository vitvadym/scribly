import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function fromNow(date: string) {
  if (!date) return 'unknown';
  return dayjs(date).fromNow();
}

