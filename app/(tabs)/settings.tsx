import { createSettingsStyles } from "@/assets/styles/settings.styles.";
import DangerZone from "@/components/DangerZone";
import Preferences from "@/components/Preferences";
import ProgressStats from "@/components/ProgressStats";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const { colors } = useTheme();

  const settingsStyles = createSettingsStyles(colors);

  return (
    <View style={[settingsStyles.container, { backgroundColor: colors.bg }]}>
      <SafeAreaView style={settingsStyles.safeArea} edges={["top"]}>
        {/* HEADER */}
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <View style={[settingsStyles.iconContainer, { backgroundColor: colors.primary }]}>
              <Ionicons name="settings" size={28} color="#ffffff" />
            </View>
            <Text style={settingsStyles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          <Preferences />
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default SettingsScreen;
