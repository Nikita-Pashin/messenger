"use client"

import { Theme, useTheme } from "@/shared/hooks/useTheme/useTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme: Theme;
}

export const ThemeProvider = ({ children, defaultTheme }: ThemeProviderProps) => {
  const { theme } = useTheme(defaultTheme);

  return (
    <div id="theme" className={`${theme}`}>
      {children}
    </div>
  )
};