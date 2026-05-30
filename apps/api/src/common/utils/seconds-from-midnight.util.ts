export function getSecondsFromMidnight(
  date: Date | string | null | undefined,
): number {
  if (!date) {
    return 0;
  }

  let d: Date;

  if (typeof date === 'string') {
    const parts = date.split(':');
    if (parts.length < 2) {
      return 0;
    }

    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const s = parts[2] ? parseInt(parts[2], 10) : 0;

    d = new Date();
    d.setHours(h, m, s, 0);
  } else {
    d = date;
  }

  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
