export const formatTime = (time: number, timezone: number) => {
  const localTime = (time + timezone) * 1000;
  return new Date(localTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
