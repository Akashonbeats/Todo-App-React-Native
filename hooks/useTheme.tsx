import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// AsyncStorage is React Native’s simple, promise-based API for persisting small bits of data on a user’s device. Think of it as the mobile-app equivalent of the browser’s localStorage, but asynchronous and cross-platform.

export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  switch: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
    misc: [string, string];
    bggradient: [string, string, string, string, string, string, string, string, string]
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  bg: "#FFF9D6",
  surface: "#DFF6E3",
  text: "#2A4E50",
  textMuted: "#568C91",
  border: "#63AEC2",          // darker blue for input border
  primary: "#3F90A8",         // slightly deeper blue for active/progress elements
  success: "#7BD389",
  warning: "#EFB96A",
  danger: "#eb534e",
  shadow: "rgba(0, 0, 0, 0.15)",
  switch: "#2A4E50",

gradients: {
  background: ["#FFF9D6", "#FFF4BE"],
  surface: ["#dff6e3ff", "#dff6e3ff"],
  primary: ["#62b5ccff", "#347F96"],
  success: ["#29454dff", "#29454dff"],
  warning: ["#62b5ccff", "#4CA3BB"],
  danger: ["#eb534e", "#D66E6E"],
  muted: ["#AACBCD", "#8DB5B8"],
  empty: ["#F5F8EB", "#EBF6E2"],
  misc: ["#2A4E50","#4a8a8dff"],
  bggradient: [
    '#cda2a8',
    '#daacb2',
    '#F0EEF1',
    '#d5b1b7',
    '#cfb5b9',
    '#eac5bd',
    '#cda2a8',
    '#A9828D',
    '#daacb2',
  ]
},

  backgrounds: {
    input: "#e1f7e547",
    editInput: "#D1F0D7",
  },

  statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
  bg: "#141310ff",
  surface: "#3B4448",
  text: "#E6F1F1",
  textMuted: "#A5C8C8",
  border: "#164856ff",          // slightly darker teal border
  primary: "#4CA3BB",         // rich mid-teal for highlights
  success: "#4CA3BB",
  warning: "#4CA3BB",
  danger: "#eb534e",
  shadow: "rgba(0, 0, 0, 0.6)",
  switch: "#2A4E50",

  gradients: {
    background: ["#2d2c25ff", "#000000"],
    surface: ["#1b2225ff", "#1b2225ff"],
    primary: ["#62b5ccff", "#347F96"],
    success: ["#62b5ccff", "#4CA3BB"],
    warning: ["#468091ff", "#568492ff"],
    danger: ["#ba4e4bff", "#a95454ff"],
    muted: ["#66797B", "#52686A"],
    empty: ["#3C4748", "#404A4B"],
    misc: ["#2A4E50","#4a8a8dff"],
    bggradient: [
    '#cda2a8',
    '#cda2a8',
    '#A9828D',
    '#846b6fff',
    '#877477ff',
    '#856f6aff',
    '#7f7f7fff',
    '#A9828D',
    '#877477ff',
  ]
  },

  backgrounds: {
    input: "#3e474a90",
    editInput: "#333A3E",
  },

  statusBarStyle: "light-content" as const,
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // get the user's choice
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;
