/**
 * @function timeLocale() returns spanish date string in 4 main format EXCEL alike
  long: dddd, dd [de] MMMM [de] yyyy, [a las] HH:mm [hrs] {default}
  short: ddd, dd/MM/yy HH:mm[hrs]
  onlyDate: dd/MM/yyyy
  onlyTime: HH:mm[hrs]
 */
export default function timeLocale(
  date?: Date,
  format?: 'long' | 'short' | 'onlyDate' | 'onlyTime'
): string {
  const t = date ?? new Date(); //on undefined create new Date
  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]; //month array names in spanish
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']; //days array names in spanish

  const d = {
    dddd: days[t.getDay()],
    ddd: days[t.getDay()].slice(0, 2),
    dd: t.getDate(),
    MMMM: months[t.getMonth()],
    MMM: months[t.getMonth()].slice(0, 3),
    MM: t.getMonth() + 1 < 10 ? `0${t.getMonth() + 1}` : (t.getMonth() + 1).toString(),
    yyyy: t.getFullYear(),
    yy: t.getFullYear().toString().slice(2, 4),
    HH: t.getHours() - 3, //FIXME:wrong utc like +0
    mm: t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes().toString(),
  }; //time string set
  const options = {
    long: `${d.dddd}, ${d.dd} de ${d.MMMM} de ${d.yyyy}, a las ${d.HH}:${d.mm} hrs`,
    short: `${d.ddd} ${d.dd}/${d.MM}/${d.yy} ${d.HH}:${d.mm} hrs`,
    onlyDate: `${d.dd}/${d.MM}/${d.yy}`,
    onlyTime: `${d.HH}:${d.mm} hrs`,
  };
  return options[format ?? 'long'];
}
