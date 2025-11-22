import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { GlassView } from "expo-glass-effect";
import { Text, View } from "react-native";

const ProgressStats = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const activeTodos = totalTodos - completedTodos;

  return (
    <GlassView glassEffectStyle="clear" style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>

      <View style={settingsStyles.statsContainer}>
        {/* TOTAL TODOS */}
        <View style={[settingsStyles.statCard]}>
          <View style={settingsStyles.statIconContainer}>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{totalTodos}</Text>
            <Text style={settingsStyles.statLabel}>Total Todos</Text>
          </View>
        </View>

        {/* COMPLETED TODOS */}
        <View style={[settingsStyles.statCard]}>
          <View style={settingsStyles.statIconContainer}>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{completedTodos}</Text>
            <Text style={settingsStyles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* ACTIVE TODOS */}

        <View style={[settingsStyles.statCard]}>
          <View style={settingsStyles.statIconContainer}>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{activeTodos}</Text>
            <Text style={settingsStyles.statLabel}>Active</Text>
          </View>
        </View>
      </View>
    </GlassView>
  );
};

export default ProgressStats;
