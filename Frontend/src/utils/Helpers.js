export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    day: "numeric",
  }).format(new Date(dateStr));
}

export function formatTime(date = Date.now()) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // enables AM/PM
  }).format(new Date(date));
}
