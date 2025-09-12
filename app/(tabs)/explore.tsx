
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';


// Mock user data (14 profiles)
const users = [
  { id: '1', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: '4', image: 'https://randomuser.me/api/portraits/men/76.jpg' },
  { id: '5', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { id: '6', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '7', image: 'https://randomuser.me/api/portraits/men/23.jpg' },
  { id: '8', image: 'https://randomuser.me/api/portraits/women/35.jpg' },
  { id: '9', image: 'https://randomuser.me/api/portraits/men/56.jpg' },
  { id: '10', image: 'https://randomuser.me/api/portraits/women/77.jpg' },
  { id: '11', image: 'https://randomuser.me/api/portraits/men/88.jpg' },
  { id: '12', image: 'https://randomuser.me/api/portraits/women/99.jpg' },
  { id: '13', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: '14', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pictures of the day</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 16 }}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <Image source={{ uri: item.image }} style={styles.squarePhoto} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
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
    marginTop: 32,
    marginBottom: 12,
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
});
