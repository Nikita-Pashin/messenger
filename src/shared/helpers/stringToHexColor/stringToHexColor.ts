export const stringToHexColor = (str: string) => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (-hash + (hash << 5));
  }

  return '#' + ((hash & 0xFFFFFF).toString(16).padStart(6, '0'));
}