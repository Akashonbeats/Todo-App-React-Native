import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme(); //Importing Colors from mmy custom hook
  const homeStyles = createHomeStyles(colors);
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}/>
      <SafeAreaView style={homeStyles.safeArea}>
        <Header/>
        <TodoInput/>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Switch to Dark Mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
