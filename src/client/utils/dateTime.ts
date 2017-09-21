export function formatDateTime(dateObj: Date, monthFormat?: 'short' | 'long') {
  const options = {
    year: 'numeric',
    month: monthFormat || 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const dateString = dateObj.toLocaleDateString('en-GB', options); // "12 August 2017, 13:02:10"
  const [date, time] = dateString.split(',');
  const [day, month, year] = date.split(' ');
  return `${month} ${day}, ${year} ${time.trim()}`; // "August 12, 2017 13:02:10"
}

const minutesToMs = (m: number) => 1000 * 60 * m;

export const TEN_MINUTES = minutesToMs(10);
export const MINUTE = minutesToMs(1);