import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const items = [
    { image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
    { image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
    { image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
    { image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
]

const Quebec: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
        
            <View style={styles.topRectangleContainer}>
                <View style={styles.topRectangle}>
                    <Text style={styles.rectangleText}>Quebec</Text>
                </View>
            </View>
            <View style={styles.topRectangleContainer}>
                <View style={styles.topRectangle}>
                    <Text style={styles.descriptionText}>Description</Text>
                </View>
            </View>
            <View style={styles.gridContainer}>
                {items.map((item, idx) => (
                    <View key={idx} style={styles.gridItem}>
                        <Image
                            source={item.image}
                            style={{ width: 64, height: 64, borderRadius: 12 }}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#2d2d2d',
    },
   topRectangleContainer: {
        top: 0,
        left: 0,
        alignItems: 'center',
        zIndex: 10,
        elevation: 10,
    },
    descriptionContainer: {
        top: 0,
        left: 0,
        alignItems: 'center',
        zIndex: 10,
        elevation: 10,
    },
    topRectangle: {
        height: 100,
        width: '90%',
        backgroundColor: '#e0e0e0',
        borderRadius: 16,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
    },
    rectangleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#333',
    },
    descriptionText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#444',
        marginBottom: 24,
    },
     gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // or 'flex-start'
  },
  gridItem: {
    width: '48%', // two per row, with some gap
    marginBottom: 16,
    //backgroundColor: '#e0e0e0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200, // or whatever height you want
  },
   
});

export default Quebec;