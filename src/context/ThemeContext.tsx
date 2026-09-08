/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BackgroundStyle, PortraitStyle, ThemeMode } from '../types';
import portraitStudio from '../assets/images/fahad_studio_portrait_1787382529769.jpg';
import portraitOffice from '../assets/images/fahad_portrait_office_1787382552263.jpg';
import portraitOriginal from '../assets/images/fahad_portrait_1782637500099.jpg';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  backgroundStyle: BackgroundStyle;
  setBackgroundStyle: (style: BackgroundStyle) => void;
  portraitStyle: PortraitStyle;
  setPortraitStyle: (portrait: PortraitStyle) => void;
  currentPortraitUrl: string;
  isBackgroundModalOpen: boolean;
  setIsBackgroundModalOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('app_theme');
    return (saved as ThemeMode) || 'dark';
  });

  const [backgroundStyle, setBackgroundStyleState] = useState<BackgroundStyle>(() => {
    const saved = localStorage.getItem('app_bg_style');
    return (saved as BackgroundStyle) || 'deep_space';
  });

  const [portraitStyle, setPortraitStyleState] = useState<PortraitStyle>(() => {
    const saved = localStorage.getItem('app_portrait_style');
    return (saved as PortraitStyle) || 'studio_tech';
  });

  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState<boolean>(false);

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem('app_theme', t);
    if (t === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    }
  };

  const setBackgroundStyle = (style: BackgroundStyle) => {
    setBackgroundStyleState(style);
    localStorage.setItem('app_bg_style', style);
  };

  const setPortraitStyle = (style: PortraitStyle) => {
    setPortraitStyleState(style);
    localStorage.setItem('app_portrait_style', style);
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  const currentPortraitUrl = 
    portraitStyle === 'studio_tech' ? portraitStudio :
    portraitStyle === 'office_bokeh' ? portraitOffice :
    portraitOriginal;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        backgroundStyle,
        setBackgroundStyle,
        portraitStyle,
        setPortraitStyle,
        currentPortraitUrl,
        isBackgroundModalOpen,
        setIsBackgroundModalOpen
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
