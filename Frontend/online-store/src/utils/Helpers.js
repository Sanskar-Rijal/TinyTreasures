export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    day: "numeric",
  }).format(new Date(dateStr));
}
