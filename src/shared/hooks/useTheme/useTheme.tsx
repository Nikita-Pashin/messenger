'use client'

import { getCookieByName } from "@/shared/helpers/getCookieByName/getCookieByName";
import { setCookie } from "@/shared/helpers/setCookie/setCookie";
import { useState } from "react";

export type Theme = 'dark' | 'light';

export const useTheme = (defaultTheme?: Theme) => {
  const isSSR = typeof window === 'undefined';

  let currentDefaultTheme = defaultTheme || 'light';

  if (!isSSR) {
    currentDefaultTheme = getCookieByName('theme') || currentDefaultTheme;
  }

  const [theme, setTheme] = useState<Theme>(currentDefaultTheme);

  const changeTheme = (newTheme: Theme) => {
    setCookie('theme', newTheme, 180);
    document.getElementById('theme')!.className = newTheme;
    setTheme(newTheme);
  }

  return {
    theme,
    changeTheme,
  }
}