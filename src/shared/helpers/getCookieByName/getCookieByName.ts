function func(name: 'theme'): 'dark' | 'light' | null;
function func(name: string): string | null {
  const regex = new RegExp(`(^| )${name}=([^;]+)`);
  const match = document.cookie.match(regex);

  if (match) {
    return match[2];
  }

  return null;
}

export const getCookieByName = func; 