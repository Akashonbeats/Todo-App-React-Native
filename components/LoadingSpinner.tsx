import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { ActivityIndicator, Text, View } from "react-native";
import { BackgroundGradient } from "./Background";

const LoadingSpinner = () => {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
      <View style={homeStyles.loadingContainer}>
        <BackgroundGradient />
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={homeStyles.loadingText}>Loading your todos...</Text>
      </View>
  );
};

export default LoadingSpinner;