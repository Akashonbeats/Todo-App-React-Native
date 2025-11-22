import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import React from "react";
import { Text, View } from "react-native";

export default function Header() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);

  const completedCount = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const totalCount = todos ? todos.length : 0;
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Today&apos;s Tasks</Text>
          <Text style={homeStyles.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>

      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <View
              style={[
                homeStyles.progressFill,
                {
                  width: `${progressPercentage}%`,
                  backgroundColor: colors.progressFill,
                },
              ]}
            />
          </View>
          <Text style={homeStyles.progressText}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>
      </View>
    </View>
  );
}
