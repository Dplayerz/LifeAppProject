import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

type Props = {
  icon: React.ReactNode;
  value: number;
};

const StatWithAnimation: React.FC<Props> = ({ icon, value }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [showIncrement, setShowIncrement] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // When value changes, trigger animation
  useEffect(() => {
    if (value > prevValue) {
      setShowIncrement(true);

      // Animate +1 floating up
      slideAnim.setValue(0);
      opacityAnim.setValue(1);

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowIncrement(false);
        setPrevValue(value);
      });
    } else {
      setPrevValue(value);
    }
  }, [value]);

  return (
    <View style={{ alignItems: "center", marginHorizontal: 12 }}>
      {icon}
      <Text style={styles.valueText}>{prevValue}</Text>

      {showIncrement && (
        <Animated.Text
          style={[
            styles.incrementText,
            {
              opacity: opacityAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          +{value - prevValue}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  valueText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  incrementText: {
    position: "absolute",
    top: -10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#4caf50", // green for gain
  },
});

export default StatWithAnimation;
