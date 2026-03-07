export default function formatDate(start: Date, end: Date) {
  const startDay = start.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const startTime = start.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endDay = end.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const endTime = end.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (startDay === endDay) {
    return {
      day: startDay,
      time: `${startTime} - ${endTime}`,
    };
  }

  return {
    day: `${startDay} - ${endDay}`,
    time: `${startTime} - ${endTime}`,
  };
}
