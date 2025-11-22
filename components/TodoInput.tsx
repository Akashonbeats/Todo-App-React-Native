import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { GlassView } from "expo-glass-effect";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

export default function TodoInput() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todos.addTodo);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo({ text: newTodo.trim() });
        setNewTodo("");
      } catch (error) {
        console.log("Error adding a todo", error);
        Alert.alert("Error", "Failed to add todo");
      }
    }
  };

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <GlassView
          glassEffectStyle="regular"
          tintColor={colors.backgrounds.input}
          style={{
            flex: 1,
            borderRadius: 25,
            overflow: "hidden",
          }}
        >
          <TextInput
            style={homeStyles.input}
            placeholder="What needs to be done?"
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={handleAddTodo}
            placeholderTextColor={colors.textMuted}
          />
        </GlassView>
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <GlassView
            glassEffectStyle="clear"
            style={{
              borderRadius: 28,
              overflow: "hidden",
            }}
          >
            <View
              style={[
                homeStyles.addButton,
                !newTodo.trim() && homeStyles.addButtonDisabled,
              ]}
            >
              <Ionicons name="add" size={24} color="#ffffff" />
            </View>
          </GlassView>
        </TouchableOpacity>
      </View>
    </View>
  );
}
