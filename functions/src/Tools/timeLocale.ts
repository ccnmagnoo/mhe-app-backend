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
    HH: t.getHours() - getTimeZoneOffset(date),
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

function getTimeZoneOffset(date?: Date): 3 | 4 {
  const event = date ?? new Date();
  const savingIni = new Date(); //daylight saving start es-cl
  savingIni.setMonth(3); //april
  savingIni.setDate(2); //2nd

  const savingEnd = new Date(); //daylight saving end es-cl
  savingEnd.setMonth(8); //september
  savingEnd.setDate(10); //10th

  if (event > savingIni && event < savingEnd) {
    return 4;
  } else {
    return 3;
  }
}
