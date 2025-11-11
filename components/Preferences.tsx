import { createSettingsStyles } from "@/assets/styles/settings.styles.";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Switch, Text, View } from "react-native";

const Preferences = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const { isDarkMode, toggleDarkMode, colors } = useTheme();

  const settingsStyles = createSettingsStyles(colors);

  return (
    <View style={[settingsStyles.section, { backgroundColor: colors.surface }]}>
      <Text style={settingsStyles.sectionTitle}>Preferences</Text>

      {/* DARK MODE */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <View style={[settingsStyles.settingIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="moon" size={18} color="#fff" />
          </View>
          <Text style={settingsStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.primary }}
          ios_backgroundColor={colors.border}
        />
      </View>

      {/* NOTIFICATONS */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <View style={[settingsStyles.settingIcon, { backgroundColor: colors.warning }]}>
            <Ionicons name="notifications" size={18} color="#fff" />
          </View>
          <Text style={settingsStyles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.warning }}
          ios_backgroundColor={colors.border}
        />
      </View>

      {/* AUTO-SYNC */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <View style={[settingsStyles.settingIcon, { backgroundColor: colors.success }]}>
            <Ionicons name="notifications" size={18} color="#fff" />
          </View>
          <Text style={settingsStyles.settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={isAutoSync}
          onValueChange={() => setIsAutoSync(!isAutoSync)}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.success }}
          ios_backgroundColor={colors.border}
        />
      </View>
    </View>
  );
};

export default Preferences;
