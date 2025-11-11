# Expo UI Liquid Glass Implementation

## Overview

This document explains the implementation of Liquid Glass material using the official `@expo/ui` library, which brings SwiftUI components to React Native.

## What is @expo/ui?

`@expo/ui` is an official Expo package that provides access to native UI components from SwiftUI (iOS) and Jetpack Compose (Android) in React Native applications. It enables developers to use platform-native UI patterns and materials.

## Liquid Glass Material

### Components Used

#### 1. GlassEffectContainer
A container component that manages glass effects and their interactions.

```typescript
<GlassEffectContainer spacing={8}>
  {/* Glass effect children */}
</GlassEffectContainer>
```

**Properties:**
- `spacing` - Controls how close elements need to be to blend together
- `children` - Views with `.glassEffect()` modifiers

#### 2. Host
A hosting component for SwiftUI views that bridges React Native and SwiftUI.

```typescript
<Host 
  modifiers={[...]}
  style={styles.container}
>
  {/* SwiftUI content */}
</Host>
```

**Properties:**
- `modifiers` - Array of SwiftUI modifiers to apply
- `style` - React Native styles
- `matchContents` - Whether to match SwiftUI content size
- `colorScheme` - Light or dark color scheme

#### 3. HStack & VStack
SwiftUI-style layout components for horizontal and vertical stacking.

```typescript
<HStack spacing={16} alignment="top">
  {/* Horizontally arranged children */}
</HStack>

<VStack spacing={12} alignment="leading">
  {/* Vertically arranged children */}
</VStack>
```

**Properties:**
- `spacing` - Space between children
- `alignment` - Alignment of children
  - HStack: 'top' | 'center' | 'bottom' | 'firstTextBaseline' | 'lastTextBaseline'
  - VStack: 'leading' | 'center' | 'trailing'

### Modifiers

#### glassEffect
Applies liquid glass material to a view.

```typescript
glassEffect({
  glass: {
    variant: "regular" | "clear" | "identity",
    interactive?: boolean,
    tint?: Color
  },
  shape?: "circle" | "capsule" | "rectangle" | "ellipse"
})
```

**Variants:**
- `regular` - Standard liquid glass appearance
- `clear` - More transparent variant
- `identity` - Identity-based glass effect

**Properties:**
- `interactive` - Enables interactive glass effects
- `tint` - Custom tint color for the glass
- `shape` - Shape of the glass effect

#### Other Modifiers Used

```typescript
cornerRadius(20)              // Rounded corners
padding({ all: 20 })          // Padding on all sides
shadow({                       // Drop shadow
  radius: 16,
  x: 0,
  y: 8,
  opacity: 0.15
})
```

## Implementation in Todo App

### Before (BlurView)

```typescript
import { BlurView } from "expo-blur";

<BlurView 
  intensity={100} 
  tint="systemChromeMaterial"
  style={styles.todoItem}
>
  <View style={{ flexDirection: 'row' }}>
    {/* Content */}
  </View>
</BlurView>
```

**Issues:**
- Not true Liquid Glass material
- Basic blur effect, no light refraction
- Uses React Native flexbox layout

### After (Expo UI Liquid Glass)

```typescript
import { GlassEffectContainer, Host, HStack, VStack } from "@expo/ui/swift-ui";
import { glassEffect, cornerRadius, padding, shadow } from "@expo/ui/swift-ui/modifiers";

<GlassEffectContainer spacing={8}>
  <Host
    modifiers={[
      glassEffect({ glass: { variant: "regular", interactive: true } }),
      cornerRadius(20),
      padding({ all: 20 }),
      shadow({ radius: 16, x: 0, y: 8, opacity: 0.15 })
    ]}
  >
    <HStack spacing={16} alignment="top">
      {/* Content with SwiftUI layout */}
    </HStack>
  </Host>
</GlassEffectContainer>
```

**Benefits:**
- Authentic SwiftUI Liquid Glass material
- Real light refraction through glass surface
- Interactive glass effects
- Native SwiftUI layout system (HStack/VStack)
- Better integration with iOS

## Key Differences

### Liquid Glass vs BlurView

| Feature | BlurView | Liquid Glass (Expo UI) |
|---------|----------|------------------------|
| Material | Basic blur | Authentic glass with refraction |
| Platform | expo-blur | Native SwiftUI |
| Layout | React Native flexbox | SwiftUI HStack/VStack |
| Interactivity | No | Yes (interactive: true) |
| Light Refraction | No | Yes |
| Variants | Limited tints | regular/clear/identity |
| Native Integration | Good | Excellent |

### Layout System

**React Native (Before):**
```typescript
<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
  <View style={{ flex: 1 }}>...</View>
</View>
```

**SwiftUI (After):**
```typescript
<HStack spacing={16} alignment="top">
  <VStack alignment="leading" style={{ flex: 1 }}>...</VStack>
</HStack>
```

## Visual Effects

### Glass Material Properties

The Liquid Glass material provides:

1. **Light Refraction** - Light bends through the glass surface
2. **Vibrancy** - Content behind the glass is visible and enhanced
3. **Depth** - Shadows and layering create 3D perception
4. **Interactive Effects** - Glass responds to user interactions
5. **Blur & Transparency** - Proper glass-like transparency

### Shadow Enhancement

The shadow modifier creates proper depth:

```typescript
shadow({ 
  radius: 16,    // Blur radius
  x: 0,          // Horizontal offset
  y: 8,          // Vertical offset (elevated)
  opacity: 0.15  // Shadow opacity
})
```

## Best Practices

### 1. Use GlassEffectContainer
Always wrap glass effect views in `GlassEffectContainer` for proper management:

```typescript
<GlassEffectContainer spacing={8}>
  {/* Multiple glass elements can blend together */}
</GlassEffectContainer>
```

### 2. Choose the Right Variant
- `regular` - Default, balanced appearance
- `clear` - When you want more transparency
- `identity` - For identity-based effects

### 3. Enable Interactive for Touch Elements
```typescript
glassEffect({ 
  glass: { 
    variant: "regular", 
    interactive: true  // Enable for touchable items
  } 
})
```

### 4. Use SwiftUI Layout Components
Prefer `HStack`/`VStack` over React Native `View` for better integration:

```typescript
// Good ✓
<HStack spacing={12}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</HStack>

// Less ideal
<View style={{ flexDirection: 'row', gap: 12 }}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>
```

## Performance Considerations

### Advantages
- Native SwiftUI rendering
- Hardware-accelerated glass effects
- Efficient layout calculations
- Better memory usage for complex UIs

### Tips
- Use `spacing` prop instead of margin/padding when possible
- Minimize nesting of glass effects
- Let SwiftUI handle layout when possible
- Use `matchContents` for dynamic sizing

## Platform Support

### iOS
- **Minimum**: iOS 15.0+ (for basic features)
- **Recommended**: iOS 17.0+ (for full Liquid Glass support)
- **Best**: iOS 18.0+ (latest features and optimizations)

### Android
Falls back to Jetpack Compose equivalents (Material Design 3)

## Troubleshooting

### Glass Effect Not Visible
1. Ensure iOS version supports the feature
2. Check that `GlassEffectContainer` wraps the Host
3. Verify modifiers array includes `glassEffect()`

### Layout Issues
1. Use `HStack`/`VStack` instead of `View` with flexbox
2. Check `alignment` and `spacing` props
3. Ensure `Host` has proper size constraints

### Performance Issues
1. Reduce number of nested glass effects
2. Use `spacing` prop for layout instead of wrappers
3. Enable `matchContents` only when needed

## Migration Guide

### Step 1: Install @expo/ui
```bash
npm install @expo/ui
```

### Step 2: Replace Imports
```typescript
// Before
import { BlurView } from "expo-blur";

// After
import { GlassEffectContainer, Host, HStack, VStack } from "@expo/ui/swift-ui";
import { glassEffect, cornerRadius, padding, shadow } from "@expo/ui/swift-ui/modifiers";
```

### Step 3: Update Components
```typescript
// Before
<BlurView intensity={100} tint="light" style={styles.card}>
  <View style={styles.content}>...</View>
</BlurView>

// After
<GlassEffectContainer>
  <Host modifiers={[glassEffect({ glass: { variant: "regular" } })]}>
    <VStack>...</VStack>
  </Host>
</GlassEffectContainer>
```

### Step 4: Update Styles
Remove layout styles (flexDirection, alignItems, etc.) that are now handled by HStack/VStack.

## Resources

- [Expo UI Documentation](https://www.npmjs.com/package/@expo/ui)
- [SwiftUI Layout System](https://developer.apple.com/documentation/swiftui/view-layout)
- [Liquid Glass Material](https://developer.apple.com/design/human-interface-guidelines/materials)

## Conclusion

The Expo UI implementation provides authentic Liquid Glass material that:
- Uses native SwiftUI components
- Provides real light refraction
- Supports interactive effects
- Integrates seamlessly with iOS

This is the proper way to implement Liquid Glass in React Native applications, leveraging platform-native UI frameworks for the best user experience.
