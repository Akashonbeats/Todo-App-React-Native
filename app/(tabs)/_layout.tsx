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
        selected: {
          // Color for selected tab (your original colors)
          color: DynamicColorIOS({
            dark: "#fff6c2ff",
            light: "#5C3D42",
          }),
        },
      }}
      // For the selected icon color
      tintColor={DynamicColorIOS({
        dark: "#fff6c2ff",
        light: "#5C3D42",
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
