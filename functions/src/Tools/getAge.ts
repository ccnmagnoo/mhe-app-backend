/**
 * @function getAge gets estimated age comme from id number pased like a string
 * @param rut id string formated in 123456789-0
 * @returns estimated age number, if is an error return null
 */

function getAge(rut: string): { age: number | null; group: number | null } {
  const cipher = +rut.split('-')[0]; //12345678
  const currentYear = new Date().getFullYear(); //2022
  const estimatedYearBorn = Math.floor(cipher / (100_000 * 3.46) + 1_932.3); //1982
  const estimatedAge: number = currentYear - estimatedYearBorn;
  const ageCompose = {
    age: estimatedAge > 16 ? estimatedAge : null,
    group: estimatedAge > 16 ? Math.floor(estimatedAge / 10) * 10 : null,
  };

  return ageCompose;
}
export default getAge;
