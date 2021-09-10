/**
 * @param address is a real direction or url to video conference
 * @returns in cases of real address recieve a google más string
 */

function getLinkAddress(address?: string): string | undefined {
  //check undefined
  if (address === undefined) {
    return undefined;
  }
  //string init
  const gmaps = 'https://www.google.com/maps?q=';
  //url type RegExp
  const urlRE: RegExp =
    /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

  //test is address string is an URL
  if (urlRE.test(address)) {
    return address; //return link address
  } else {
    return `${gmaps}${address.split(' ').join('+')}`; //return a google map link
  }
}

export default getLinkAddress;
