export default function timeLocale(t?: Date): string {
  if (t !== undefined) {
    const month = [
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
    ];
    const day = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];

    return `${day[t.getDay()]}, ${t.getDate()} de ${
      month[t.getMonth()]
    } del ${t.getFullYear()}, a las ${t.getHours()}:${
      t.getMinutes() === 0 ? '00' : t.getMinutes()
    } hrs`;
  } else {
    return 'undefined';
  }
}
