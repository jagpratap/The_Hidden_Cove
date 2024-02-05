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
