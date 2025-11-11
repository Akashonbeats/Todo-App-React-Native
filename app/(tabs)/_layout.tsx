import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { DynamicColorIOS } from "react-native";
export default function TabsLayout() {
  return (
    <NativeTabs
      labelStyle={{
        // For the text color
        color: DynamicColorIOS({
          dark: "white",
          light: "black",
        }),
      }}
      // For the selected icon color
      tintColor={DynamicColorIOS({
        dark: "#3b82f6",
        light: "#3b82f6",
      })}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf={"house.fill"} drawable="ic_menu_mylocation" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Settings</Label>
        <Icon sf={"gear"} drawable="ic_menu_settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
