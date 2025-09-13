
import { useNavigation } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from 'react-native';
import { useNavVisibility } from '../navBarContex';


// Mock user data (14 profiles)
const users = [
  { id: '1', name: 'Alice', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', name: 'Bob', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
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

// (styles moved above, duplicate removed)

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
    <View style={styles.container}>
      <Animated.FlatList
        data={users}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={<Text style={styles.title}>Explore</Text>}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 16 }}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <Image source={{ uri: item.image }} style={styles.squarePhoto} />
            <View style={styles.nameOverlay}>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 64,
    marginBottom: 32,
    color: '#222',
  },
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 6,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  squarePhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameOverlay: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 8,
    maxWidth: '80%',
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});


