import { useNavigation } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Text } from 'react-native';
import ExplorePageTemplate from '../../components/explorePageTemplate';

import { auth } from "../../src/firebase/firebaseConfig";
import { useNavVisibility } from '../navBarContex';

// Mock user data (14 profiles)
const users = [
  { id: '1', name: 'Alice', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', name: 'American Kingfisher', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', name: 'Carol', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: '4', name: 'David', image: 'https://randomuser.me/api/portraits/men/76.jpg' },
  { id: '5', name: 'Eve', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: '6', name: 'Fay', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '7', name: 'George', image: 'https://randomuser.me/api/portraits/men/23.jpg' },
  { id: '8', name: 'Hannah', image: 'https://randomuser.me/api/portraits/women/35.jpg' },
  { id: '9', name: 'Ivan', image: 'https://randomuser.me/api/portraits/men/56.jpg' },
  { id: '10', name: 'Jill', image: 'https://randomuser.me/api/portraits/women/77.jpg' },
  { id: '11', name: 'Karl', image: 'https://randomuser.me/api/portraits/men/88.jpg' },
  { id: '12', name: 'Lily', image: 'https://randomuser.me/api/portraits/women/99.jpg' },
  { id: '13', name: 'Mike', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: '14', name: 'Nina', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
];

export default function ExploreScreen() {
  const navigation = useNavigation();
  const lastOffset = useRef(0);
  const scrollingDown = useRef(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { setVisible } = useNavVisibility();

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        if (currentOffset <= 0) {
          navigation.setOptions({ tabBarStyle: undefined });
          scrollingDown.current = false;
          setVisible(true);
        } else {
          if (!scrollingDown.current) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
            scrollingDown.current = true;
            setVisible(false);
          }
        }
        lastOffset.current = currentOffset;
      },
    }
  );

  return (
    <ExplorePageTemplate
      users={users}
      currentUserId={auth.currentUser?.uid ?? ''}
      onScroll={handleScroll}
      ListHeaderComponent={<Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 64, marginBottom: 32, color: '#222' }}>Explore</Text>} />
  );
}

