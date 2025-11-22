import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
  progressBar: string;
  progressFill: string;
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
    bggradient: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
    ];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  bg: "#FFF5F7", // Soft pink-white
  surface: "#F8E8EB", // Light pink surface
  text: "#5C3D42", // Deep mauve-brown for text
  textMuted: "#6b555aff", // Muted mauve
  border: "#D5B1B7", // Soft pink border from gradient
  primary: "#C89BA3", // Primary pink from gradient
  success: "#A87E8A", // Mauve success
  warning: "#D5A9AF", // Light pink warning
  danger: "#d53848ff", // Deeper rose danger
  shadow: "rgba(169, 130, 141, 0.15)", // Pink-tinted shadow
  switch: "#A9828D", // Mauve switch from gradient
  progressBar: "#9d8186ff", // Darker pink for progress bar background
  progressFill: "#d4aeb5ff", // Even darker mauve for progress fill

  gradients: {
    background: ["#FFF5F7", "#FFE8ED"],
    surface: ["#F8E8EB", "#F0DDE1"],
    primary: ["#CDA2A8", "#B88D93"], // From gradient
    success: ["#A87E8A", "#946D78"], // From gradient
    warning: ["#DAACB2", "#CDA2A8"], // From gradient
    danger: ["#B8717A", "#A05D66"],
    muted: ["#D5B1B7", "#C89BA3"], // From gradient
    empty: ["#F8E8EB", "#F0DDE1"],
    misc: ["#A9828D", "#946D78"], // From gradient
    bggradient: [
      "#cda2a8",
      "#daacb2",
      "#eac5bd",
      "#d5b1b7",
      "#cfb5b9",
      "#eac5bd",
      "#cda2a8",
      "#A9828D",
      "#daacb2",
    ],
  },

  backgrounds: {
    input: "#ffc7d1ff", // Translucent light pink
    editInput: "#F0DDE1",
  },

  statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
  bg: "#1A1315", // Very dark mauve-brown
  surface: "#2D2225", // Dark mauve surface
  text: "#F5E8EB", // Light pink-white text
  textMuted: "#ffdbe4ff", // Muted light mauve
  border: "#6B4D54", // Dark mauve border
  primary: "#B88D93", // Primary from dark gradient
  success: "#A87E8A", // Mauve success from gradient
  warning: "#C89BA3", // Light mauve warning
  danger: "#d53848ff", // Rose danger
  shadow: "rgba(0, 0, 0, 0.6)",
  switch: "#A9828D", // Dark mauve for switch (swapped from light)
  progressBar: "#dfb6bdff", // Lighter mauve for progress bar background
  progressFill: "#c19ea4ff", // Even lighter pink for progress fill

  gradients: {
    background: ["#1A1315", "#0F0B0D"],
    surface: ["#2D2225", "#251D20"],
    primary: ["#B88D93", "#A87E8A"], // From dark gradient
    success: ["#A87E8A", "#946D78"], // From dark gradient
    warning: ["#C89BA3", "#B88D93"],
    danger: ["#D17A83", "#B8717A"],
    muted: ["#8F6D71", "#7A5C60"], // From dark gradient
    empty: ["#2D2225", "#251D20"],
    misc: ["#946D78", "#AB7F85"], // From dark gradient
    bggradient: [
      "#b88d93",
      "#b88d93",
      "#a87e8aff",
      "#8f6d71ff",
      "#946d78",
      "#b88d93",
      "#946d78",
      "#946d78",
      "#ab7f85ff",
    ],
  },

  backgrounds: {
    input: "#2d222580", // Translucent dark mauve
    editInput: "#3A2E31",
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
