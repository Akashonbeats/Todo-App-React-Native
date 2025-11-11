import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DropdownMenu from "zeego/dropdown-menu";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();

  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");

  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      // Add native iOS haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await toggleTodo({ id });
    } catch (error) {
      console.log("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    // Add native iOS haptic feedback for alert
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive", 
        onPress: async () => {
          // Success notification haptic on delete
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          deleteTodo({ id });
        }
      },
    ]);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text);
    setEditingId(todo._id);
  };

  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        // Add native iOS haptic feedback on save
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await updateTodo({ id: editingId, text: editText.trim() });
        setEditingId(null);
        setEditText("");
      } catch (error) {
        console.log("Error updating todo", error);
        Alert.alert("Error", "Failed to update todo");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <View style={homeStyles.todoItemWrapper}>
            <BlurView 
              intensity={80} 
              tint={colors.statusBarStyle === "dark-content" ? "light" : "dark"}
              style={homeStyles.todoItem}
            >
              <TouchableOpacity
                style={homeStyles.checkbox}
                activeOpacity={0.7}
                onPress={() => handleToggleTodo(item._id)}
              >
                <View
                  style={[
                    homeStyles.checkboxInner,
                    { 
                      borderColor: item.isCompleted ? colors.success : colors.border,
                      backgroundColor: item.isCompleted ? colors.success : "transparent"
                    },
                  ]}
                >
                  {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
                </View>
              </TouchableOpacity>

              {isEditing ? (
                <View style={homeStyles.editContainer}>
                  <TextInput
                    style={homeStyles.editInput}
                    value={editText}
                    onChangeText={setEditText}
                    autoFocus
                    multiline
                    placeholder="Edit your todo..."
                    placeholderTextColor={colors.textMuted}
                  />
                  <View style={homeStyles.editButtons}>
                    <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                      <View style={[homeStyles.editButton, { backgroundColor: colors.success }]}>
                        <Ionicons name="checkmark" size={16} color="#fff" />
                        <Text style={homeStyles.editButtonText}>Save</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                      <View style={[homeStyles.editButton, { backgroundColor: colors.muted }]}>
                        <Ionicons name="close" size={16} color="#fff" />
                        <Text style={homeStyles.editButtonText}>Cancel</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={homeStyles.todoTextContainer}>
                  <Text
                    style={[
                      homeStyles.todoText,
                      item.isCompleted && {
                        textDecorationLine: "line-through",
                        color: colors.textMuted,
                        opacity: 0.6,
                      },
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              )}
            </BlurView>
          </View>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item key="edit" onSelect={() => handleEditTodo(item)}>
            <DropdownMenu.ItemTitle>Edit</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "pencil" }} />
          </DropdownMenu.Item>
          
          <DropdownMenu.Item key="delete" destructive onSelect={() => handleDeleteTodo(item._id)}>
            <DropdownMenu.ItemTitle>Delete</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon ios={{ name: "trash" }} />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  };

  return (
    <View style={[homeStyles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea} edges={["top"]}>
        <Header />

        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}
