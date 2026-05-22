export const formatNumber = (value = 0) =>
  Intl.NumberFormat('en', {
    notation: value >= 10000 ? 'compact' : 'standard',
    maximumFractionDigits: 1
  }).format(value);

export const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat('en', {
        month: 'short',
        year: 'numeric'
      }).format(new Date(date))
    : 'N/A';

export const scoreGrade = (score = 0) => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B+';
  if (score >= 60) return 'B';
  if (score >= 45) return 'C+';
  return 'C';
};
