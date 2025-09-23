import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');

interface SlidingTabContentProps {
  tabIndex: number;
  children: React.ReactNode[];
}

export function SlidingTabContent({ tabIndex, children }: SlidingTabContentProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const prevIndex = useRef(tabIndex);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: -width * tabIndex,
      duration: 300,
      useNativeDriver: true,
    }).start();
    prevIndex.current = tabIndex;
  }, [tabIndex]);

  return (
    <Animated.View style={{ flexDirection: 'row', width: width * children.length, transform: [{ translateX }] }}>
      {React.Children.map(children, (child, i) => (
        <View style={{ width }}>{child}</View>
      ))}
    </Animated.View>
  );
}