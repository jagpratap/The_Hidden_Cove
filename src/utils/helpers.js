import { formatDistance, parseISO } from "date-fns";

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
}

export const formatDistanceFromNow = (dateStr) => {
  return formatDistance(
    parseISO(dateStr),
    new Date(),
    {
      addSuffix: true,
    }
  ).replace('about ', '').replace('in', 'In');
}

export const getToday = (options = {}) => {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};
