import { createSettingsStyles } from "@/assets/styles/settings.styles.";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Text, View } from "react-native";

const ProgressStats = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0;
  const activeTodos = totalTodos - completedTodos;

  return (
    <View style={[settingsStyles.section, { backgroundColor: colors.surface }]}>
      <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>

      <View style={settingsStyles.statsContainer}>
        {/* TOTAL TODOS */}
        <View
          style={[settingsStyles.statCard, { borderLeftColor: colors.primary, backgroundColor: colors.bg }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <View style={[settingsStyles.statIcon, { backgroundColor: colors.primary }]}>
              <Ionicons name="list" size={20} color="#fff" />
            </View>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{totalTodos}</Text>
            <Text style={settingsStyles.statLabel}>Total Todos</Text>
          </View>
        </View>

        {/* COMPLETED TODOS */}
        <View
          style={[settingsStyles.statCard, { borderLeftColor: colors.success, backgroundColor: colors.bg }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <View style={[settingsStyles.statIcon, { backgroundColor: colors.success }]}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
            </View>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{completedTodos}</Text>
            <Text style={settingsStyles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* ACTIVE TODOS */}

        <View
          style={[settingsStyles.statCard, { borderLeftColor: colors.warning, backgroundColor: colors.bg }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <View style={[settingsStyles.statIcon, { backgroundColor: colors.warning }]}>
              <Ionicons name="time" size={20} color="#fff" />
            </View>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{activeTodos}</Text>
            <Text style={settingsStyles.statLabel}>Active</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProgressStats;
