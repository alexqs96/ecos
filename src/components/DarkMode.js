"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const DarkMode = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setTheme("light")}
        aria-label="Boton de tema claro"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          shapeRendering="geometricPrecision"
          viewBox="0 0 24 24"
          height="20"
          width="20"
          color="currentColor"
        >
          <title>Modo Claro</title>
          <circle cx="12" cy="12" r="5"></circle>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
        </svg>
      </button>
      <button
        onClick={() => setTheme("dark")}
        aria-label="Boton de tema oscuro"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          shapeRendering="geometricPrecision"
          viewBox="0 0 24 24"
          height="20"
          width="20"
          color="currentColor"
        >
          <title>Modo Oscuro</title>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
        </svg>
      </button>
      <button
        onClick={() => setTheme("system")}
        aria-label="Boton de tema del sistema"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          shapeRendering="geometricPrecision"
          viewBox="0 0 24 24"
          height="20"
          width="20"
          color="currentColor"
        >
          <title>Tema Automatico</title>
          <rect width="20" height="14" x="2" y="3" rx="2" ry="2"></rect>
          <path d="M8 21h8M12 17v4"></path>
        </svg>
      </button>
    </div>
  );
};

const DarkModeProvider = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
};

export default DarkModeProvider;
