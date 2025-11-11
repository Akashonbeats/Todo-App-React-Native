# iOS Native Components Implementation Examples

This file contains practical code examples showing how to implement native iOS components in your Todo app.

## Quick Start Implementations

### 1. Haptic Feedback (Already Available - expo-haptics)

The app already has `expo-haptics` installed. Here's how to add it:

#### In TodoInput.tsx
```typescript
import * as Haptics from 'expo-haptics';

const handleAddTodo = async () => {
  if (newTodo.trim()) {
    try {
      // Add light haptic feedback when adding todo
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await addTodo({ text: newTodo.trim() });
      setNewTodo("");
    } catch (error) {
      console.log("Error adding a todo", error);
      Alert.alert("Error", "Failed to add todo");
    }
  }
};
```

#### In index.tsx (for toggle and delete)
```typescript
import * as Haptics from 'expo-haptics';

const handleToggleTodo = async (id: Id<"todos">) => {
  try {
    // Light haptic for toggle
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await toggleTodo({ id });
  } catch (error) {
    console.log("Error toggling todo", error);
    Alert.alert("Error", "Failed to toggle todo");
  }
};

const handleDeleteTodo = async (id: Id<"todos">) => {
  // Medium haptic for showing alert
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

const handleSaveEdit = async () => {
  if (editingId) {
    try {
      // Light haptic on save
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
```

---

### 2. Native Blur Effects (Already Available - expo-blur)

Since the app uses `expo-linear-gradient`, `expo-blur` is also available. Here's how to add blur:

#### Optional: Replace gradients with blur for a more iOS feel

```typescript
// In index.tsx
import { BlurView } from '@react-native-community/blur';

// Replace LinearGradient background with BlurView
// Note: This requires installing @react-native-community/blur
// npm install @react-native-community/blur

// Or use expo-blur (automatically included with expo)
import { BlurView } from 'expo-blur';

// Replace the background LinearGradient:
<BlurView intensity={100} tint="systemMaterial" style={homeStyles.container}>
  <StatusBar barStyle={colors.statusBarStyle} />
  <SafeAreaView style={homeStyles.safeArea} edges={["top"]}>
    {/* Rest of content */}
  </SafeAreaView>
</BlurView>
```

---

### 3. Input Accessory View (Built-in React Native)

Add a native iOS keyboard accessory:

```typescript
// In TodoInput.tsx
import { InputAccessoryView } from 'react-native';

const INPUT_ACCESSORY_VIEW_ID = 'todo-input-accessory';

export default function TodoInput() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todos.addTodo);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await addTodo({ text: newTodo.trim() });
        setNewTodo("");
      } catch (error) {
        console.log("Error adding a todo", error);
        Alert.alert("Error", "Failed to add todo");
      }
    }
  };

  return (
    <>
      <View style={homeStyles.inputSection}>
        <View style={homeStyles.inputWrapper}>
          <TextInput
            style={homeStyles.input}
            placeholder="What needs to be done?"
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={handleAddTodo}
            placeholderTextColor={colors.textMuted}
            inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID} // Add this
          />
          <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} disabled={!newTodo.trim()}>
            <LinearGradient
              colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
              style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
            >
              <Ionicons name="add" size={24} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Native iOS Keyboard Accessory */}
      <InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
        <View style={homeStyles.keyboardAccessory}>
          <TouchableOpacity 
            onPress={handleAddTodo} 
            disabled={!newTodo.trim()}
            style={homeStyles.keyboardButton}
          >
            <Text style={homeStyles.keyboardButtonText}>Add Todo</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </>
  );
}

// Add these styles to home.styles.ts
// keyboardAccessory: {
//   backgroundColor: colors.surface,
//   borderTopWidth: 1,
//   borderTopColor: colors.border,
//   padding: 8,
//   flexDirection: 'row',
//   justifyContent: 'flex-end',
// },
// keyboardButton: {
//   paddingHorizontal: 16,
//   paddingVertical: 8,
//   backgroundColor: colors.primary,
//   borderRadius: 8,
// },
// keyboardButtonText: {
//   color: '#fff',
//   fontWeight: '600',
// },
```

---

### 4. SF Symbols (Requires react-native-sfsymbols)

To use SF Symbols, install the package:

```bash
npm install react-native-sfsymbols
npx pod-install  # For iOS
```

Then replace Ionicons:

```typescript
// Before
import { Ionicons } from '@expo/vector-icons';
<Ionicons name="checkmark" size={18} color="#fff" />

// After
import { SFSymbol } from 'react-native-sfsymbols';
<SFSymbol
  name="checkmark.circle.fill"
  size={18}
  color="#fff"
  weight="semibold"
  scale="medium"
/>

// Common SF Symbol mappings:
// Ionicons "checkmark" → "checkmark.circle.fill"
// Ionicons "trash" → "trash.fill"
// Ionicons "pencil" → "pencil"
// Ionicons "add" → "plus.circle.fill"
// Ionicons "flash-outline" → "bolt.fill"
// Ionicons "clipboard-outline" → "doc.plaintext"
// Ionicons "close" → "xmark.circle.fill"
```

---

### 5. Context Menu (Requires react-native-ios-context-menu)

Install for iOS 13+ context menus:

```bash
npm install react-native-ios-context-menu
npx pod-install  # For iOS
```

Wrap todo items with context menu:

```typescript
import { ContextMenuView } from 'react-native-ios-context-menu';

const renderTodoItem = ({ item }: { item: Todo }) => {
  const isEditing = editingId === item._id;
  
  return (
    <ContextMenuView
      menuConfig={{
        menuTitle: '',
        menuItems: [{
          actionKey: 'toggle',
          actionTitle: item.isCompleted ? 'Mark Incomplete' : 'Mark Complete',
          icon: {
            iconType: 'SYSTEM',
            iconValue: item.isCompleted ? 'circle' : 'checkmark.circle.fill'
          }
        }, {
          actionKey: 'edit',
          actionTitle: 'Edit',
          icon: {
            iconType: 'SYSTEM',
            iconValue: 'pencil'
          }
        }, {
          actionKey: 'delete',
          actionTitle: 'Delete',
          icon: {
            iconType: 'SYSTEM',
            iconValue: 'trash'
          },
          menuAttributes: ['destructive']
        }]
      }}
      onPressMenuItem={async ({ nativeEvent }) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        
        switch(nativeEvent.actionKey) {
          case 'toggle':
            handleToggleTodo(item._id);
            break;
          case 'edit':
            handleEditTodo(item);
            break;
          case 'delete':
            handleDeleteTodo(item._id);
            break;
        }
      }}
    >
      <View style={homeStyles.todoItemWrapper}>
        {/* Your existing todo item UI */}
      </View>
    </ContextMenuView>
  );
};
```

---

### 6. Native Switch (Already Built-in)

The built-in `Switch` component is already native on iOS:

```typescript
import { Switch } from 'react-native';

// In settings or preferences
<Switch
  trackColor={{ false: colors.border, true: colors.primary }}
  thumbColor="#fff"
  ios_backgroundColor={colors.border}
  onValueChange={toggleSwitch}
  value={isEnabled}
/>
```

---

### 7. Action Sheet (Requires @expo/react-native-action-sheet)

For iOS-style action sheets:

```bash
npm install @expo/react-native-action-sheet
```

```typescript
import { useActionSheet } from '@expo/react-native-action-sheet';

export default function Index() {
  const { showActionSheetWithOptions } = useActionSheet();

  const handleTodoActions = (item: Todo) => {
    const options = ['Mark Complete', 'Edit', 'Delete', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: 'Todo Actions',
      },
      async (selectedIndex) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        
        switch (selectedIndex) {
          case 0:
            handleToggleTodo(item._id);
            break;
          case 1:
            handleEditTodo(item);
            break;
          case 2:
            handleDeleteTodo(item._id);
            break;
        }
      }
    );
  };

  // Add long press to todo items
  <TouchableOpacity 
    onLongPress={() => handleTodoActions(item)}
    // ... other props
  >
```

---

### 8. Native Progress View

Install for native iOS progress indicator:

```bash
npm install @react-native-community/progress-view
npx pod-install
```

```typescript
// In Header.tsx
import { ProgressView } from '@react-native-community/progress-view';

// Replace custom progress bar with:
<ProgressView
  progressTintColor={colors.success}
  trackTintColor={colors.border}
  progress={progressPercentage / 100}
  style={homeStyles.progressBar}
/>
```

---

## Implementation Order (Easiest to Hardest)

### Level 1: No Installation Required ✅
1. ✅ Haptic Feedback (expo-haptics - already installed)
2. ✅ Native Switch (built-in)
3. ✅ Input Accessory View (built-in)
4. ✅ Alert (already native)

### Level 2: Simple Package Installation
5. Blur View (expo-blur or @react-native-community/blur)
6. Progress View (@react-native-community/progress-view)
7. Action Sheet (@expo/react-native-action-sheet)

### Level 3: Requires Native Rebuild
8. SF Symbols (react-native-sfsymbols)
9. Context Menu (react-native-ios-context-menu)

### Level 4: Custom Native Modules (Advanced)
10. Custom UITableView implementation
11. Custom gesture recognizers
12. Advanced animations

---

## Testing Checklist

After implementing native components:

- [ ] Test on iOS Simulator (different iOS versions)
- [ ] Test on physical iPhone device
- [ ] Test in both light and dark mode
- [ ] Test with VoiceOver enabled (accessibility)
- [ ] Test with Reduced Motion enabled
- [ ] Test with Dynamic Type (different text sizes)
- [ ] Test haptic feedback on device (not in simulator)
- [ ] Test keyboard behavior and input accessories
- [ ] Test context menus (long press)
- [ ] Verify all gestures work correctly

---

## Build Commands

```bash
# For development
npx expo run:ios

# For testing on device
npx expo run:ios --device

# Build for TestFlight/App Store
eas build --platform ios

# Clear cache if issues occur
npx expo start --clear
```

---

## Common Issues and Solutions

### Issue: Haptic feedback not working
**Solution:** Haptics only work on physical devices, not simulators

### Issue: SF Symbols not rendering
**Solution:** Ensure iOS version is 13+, rebuild the app after installation

### Issue: Context menu not showing
**Solution:** Verify iOS 13+, ensure long press duration is correct

### Issue: Input accessory not appearing
**Solution:** Check that `nativeID` matches `inputAccessoryViewID`

### Issue: Blur not working properly
**Solution:** Ensure proper tint mode ('light', 'dark', 'systemMaterial')

---

## Next Steps

1. Start with **haptic feedback** (easiest, big impact)
2. Add **input accessory view** for better keyboard UX
3. Install and use **SF Symbols** for authentic iOS icons
4. Implement **context menus** for better interaction
5. Add **blur effects** for modern iOS aesthetic
6. Consider **custom native modules** for advanced features

Each of these will make your app feel more native to iOS users! 🎯
