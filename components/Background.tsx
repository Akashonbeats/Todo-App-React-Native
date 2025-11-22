import useTheme from "@/hooks/useTheme";
import { Blur, Canvas, Fill, SweepGradient } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import type { StyleProp, ViewStyle } from "react-native";

type BackgroundGradientProps = {
  style?: StyleProp<ViewStyle>;
};

export const BackgroundGradient = ({}: BackgroundGradientProps) => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();

  // Animated values for gradient center and rotation
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Animate X offset with faster speed
    offsetX.value = withRepeat(
      withTiming(width / 3, {
        duration: 4000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    // Animate Y offset with different timing for organic movement
    offsetY.value = withRepeat(
      withTiming(height / 3, {
        duration: 5000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    // Add continuous rotation for mixing effect
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 15000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [width, height]);

  // Create derived values that Skia can observe
  const center = useDerivedValue(() => {
    return { x: width / 2 + offsetX.value, y: height / 2 + offsetY.value };
  }, [width, height, offsetX, offsetY]);

  return (
    <Canvas style={[StyleSheet.absoluteFill]}>
      <Fill>
        <SweepGradient colors={colors.gradients.bggradient} c={center} />
        <Blur blur={20} />
      </Fill>
    </Canvas>
  );
};
