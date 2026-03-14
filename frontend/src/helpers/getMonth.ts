const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function getMonth() {
  const now = new Date();

  const month = now.getMonth();
  const year = now.getFullYear();

  const monthDays = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // Convertir domingo=0 a domingo=6

  return {
    name: monthNames[month],
    year,
    month,
    monthDays,
    firstDayOfMonth,
  };
}
