# Quick Reference: Native iOS Components Migration

This is a quick reference guide for migrating React Native components to native iOS implementations.

## Current Status ✅

### Implemented
- ✅ **Haptic Feedback** - Native iOS haptic feedback on all interactions
  - Location: `app/(tabs)/index.tsx`, `components/TodoInput.tsx`
  - Package: `expo-haptics` (already installed)
  - Works on: Physical iOS devices only

### Already Native (No Changes Needed)
- ✅ **Alert** - `Alert.alert()` uses native UIAlertController
- ✅ **Switch** - Built-in `Switch` component is native on iOS
- ✅ **WebBrowser** - `expo-web-browser` uses native SFSafariViewController

## Recommended Next Steps

### Priority 1: Easy Wins (No Native Rebuild Required)

#### 1. Input Accessory View
**Effort**: Low | **Impact**: Medium
```bash
# No installation needed - built into React Native
```
See: `IOS_IMPLEMENTATION_EXAMPLES.md` section 3

#### 2. Blur Effects
**Effort**: Low | **Impact**: Medium
```bash
# Already available with Expo
npm install @react-native-community/blur  # Alternative option
```
See: `IOS_IMPLEMENTATION_EXAMPLES.md` section 2

#### 3. Action Sheet
**Effort**: Low | **Impact**: Medium
```bash
npm install @expo/react-native-action-sheet
```
See: `IOS_IMPLEMENTATION_EXAMPLES.md` section 7

#### 4. Progress View
**Effort**: Low | **Impact**: Low
```bash
npm install @react-native-community/progress-view
npx pod-install
```
See: `IOS_IMPLEMENTATION_EXAMPLES.md` section 8

### Priority 2: Requires Native Rebuild

#### 5. SF Symbols (High Impact!)
**Effort**: Medium | **Impact**: High
```bash
npm install react-native-sfsymbols
npx pod-install
npx expo run:ios  # Rebuild required
```
See: `IOS_IMPLEMENTATION_EXAMPLES.md` section 4

#### 6. Context Menu (High Impact!)
**Effort**: Medium | **Impact**: High
```bash
npm install react-native-ios-context-menu
npx pod-install
npx expo run:ios  # Rebuild required
```
See: `IOS_IMPLEMENTATION_EXAMPLES.md` section 5

### Priority 3: Advanced (Custom Native Modules)

#### 7. Custom UITableView
**Effort**: High | **Impact**: High
- Requires Objective-C/Swift knowledge
- Best for performance-critical lists
- See: `NATIVE_IOS_COMPONENTS.md` section on Native Module Development

## Component Mapping Reference

| Current Component | Native iOS Alternative | Package | Rebuild Required |
|------------------|------------------------|---------|------------------|
| `FlatList` | UITableView | Custom or RN | Maybe |
| `TextInput` | UITextField | Built-in | No |
| `TouchableOpacity` | UIButton | Built-in | No |
| `Alert` | UIAlertController | Built-in | No |
| `Switch` | UISwitch | Built-in | No |
| Custom Progress | UIProgressView | @react-native-community/progress-view | Yes |
| Ionicons | SF Symbols | react-native-sfsymbols | Yes |
| LinearGradient | UIBlurView | expo-blur | No |
| Long Press Menu | UIContextMenu | react-native-ios-context-menu | Yes |

## Quick Commands

### Development
```bash
# Start Expo dev server
npm start

# Run on iOS simulator
npx expo run:ios

# Run on iOS device
npx expo run:ios --device

# Clear cache
npx expo start --clear
```

### Installation
```bash
# Install a native package
npm install <package-name>

# Update iOS pods (after native package install)
npx pod-install

# Rebuild app (after native changes)
npx expo run:ios
```

### Testing
```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Implementation Checklist

Use this checklist when implementing native components:

- [ ] Research the component in `NATIVE_IOS_COMPONENTS.md`
- [ ] Check code examples in `IOS_IMPLEMENTATION_EXAMPLES.md`
- [ ] Install required packages
- [ ] Run `npx pod-install` if needed
- [ ] Implement the component
- [ ] Test on iOS simulator
- [ ] Test on physical iOS device (for haptics, etc.)
- [ ] Test in light and dark mode
- [ ] Test with VoiceOver (accessibility)
- [ ] Verify performance improvements

## Files to Modify

### For Todo List Enhancements
- `app/(tabs)/index.tsx` - Main todo list screen
- `components/TodoInput.tsx` - Todo input component
- `assets/styles/home.styles.ts` - Styles for home screen

### For Settings Enhancements
- `app/(tabs)/settings.tsx` - Settings screen
- `components/Preferences.tsx` - Preferences component
- `assets/styles/settings.styles..ts` - Settings styles

## Common Gotchas

1. **Haptic Feedback**: Only works on physical devices, not simulator
2. **SF Symbols**: Requires iOS 13+ and app rebuild
3. **Context Menu**: Requires iOS 13+ and long press gesture
4. **Blur View**: Use correct tint for light/dark mode
5. **Input Accessory**: Must match `nativeID` with `inputAccessoryViewID`
6. **Pod Install**: Always run after installing packages with native code

## Resources

- 📖 [Complete Component Guide](./NATIVE_IOS_COMPONENTS.md)
- 💻 [Implementation Examples](./IOS_IMPLEMENTATION_EXAMPLES.md)
- 🍎 [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- ⚛️ [React Native iOS Docs](https://reactnative.dev/docs/native-modules-ios)

## Support

For issues or questions:
1. Check `IOS_IMPLEMENTATION_EXAMPLES.md` "Common Issues and Solutions"
2. Review package documentation
3. Test on physical device if simulator issues
4. Check iOS version compatibility (many features require iOS 13+)

---

**Last Updated**: Based on React Native 0.81.5, Expo SDK 54
