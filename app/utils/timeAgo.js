import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const timeAgo = (date) => {
  try {
    return dayjs(date).fromNow();
  } catch {
    return '';
  }
};