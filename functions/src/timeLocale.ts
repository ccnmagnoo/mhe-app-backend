/**
 * @function timeLocale() returns spanish date string in 4 main format EXCEL alike
  long: dddd, dd [de] MMMM [de] yyyy, [a las] HH:mm [hrs]
  short: ddd, dd/MM/yy HH:mm[hrs]
  onlyDate: dd/MM/yyyy
  onlyTime: HH:mm[hrs]
 */
export default function timeLocale(
  t?: Date,
  timeFormat?: 'long' | 'short' | 'onlyDate' | 'onlyTime'
): string | undefined {
  if (t !== undefined) {
    const mmSrt = [
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
    const ddStr = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ]; //days array names in spanish

    const d = {
      dddd: ddStr[t.getDay()],
      ddd: ddStr[t.getDay()].slice(0, 2),
      dd: t.getDate(),
      MMMM: mmSrt[t.getMonth()],
      MMM: mmSrt[t.getMonth()].slice(0, 3),
      MM: t.getMonth() + 1 < 10 ? `0${t.getMonth() + 1}` : (t.getMonth() + 1).toString(),
      yyyy: t.getFullYear(),
      yy: t.getFullYear().toString().slice(2, 4),
      HH: t.getHours(),
      mm: t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes().toString(),
    }; //time string set
    const options = {
      long: `${d.dddd}, ${d.dd} de ${d.MMMM} de ${d.yyyy}, a las ${d.HH}:${d.mm} hrs`,
      short: `${d.ddd} ${d.dd}/${d.MM}/${d.yy} ${d.HH}:${d.mm} hrs`,
      onlyDate: `${d.dd}/${d.MM}/${d.yy}`,
      onlyTime: `${d.HH}:${d.mm} hrs`,
    };
    return options[timeFormat ?? 'long'];
  } else {
    return undefined;
  }
}
