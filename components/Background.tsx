import useTheme from "@/hooks/useTheme";
import { Blur, Canvas, Fill, SweepGradient } from "@shopify/react-native-skia";
import { StyleSheet, useWindowDimensions } from "react-native";

import type { StyleProp, ViewStyle } from "react-native";

type BackgroundGradientProps = {
  style?: StyleProp<ViewStyle>;
};

// This background gradient was a bit tricky to recreate.
// The trick was to use a SweepGradient with a lot of colors + blur mask.
export const BackgroundGradient = ({}: BackgroundGradientProps) => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();

  return (
    <Canvas style={[StyleSheet.absoluteFill]}>
      <Fill>
        <SweepGradient
          colors={colors.gradients.bggradient}
          c={{
            x: width / 2,
            y: height / 2,
          }}
        />
        {/* Check what happens without the Blur :) */}
        <Blur blur={55} />
      </Fill>
    </Canvas>
  );
};
