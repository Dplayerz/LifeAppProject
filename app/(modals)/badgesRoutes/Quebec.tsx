import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const items = [
    { label: 'Beaver', image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
    { label: 'Beaver', image: require('../../../assets/AnimalsBadges/GPTNoBGBeaver.png') },
    { label: 'Beaver', image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
    { label: 'Beaver', image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
    { label: 'Beaver', image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
    { label: 'Beaver', image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
    { label: 'Beaver', image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
    { label: 'Beaver', image: require('../../../assets/AnimalsBadges/BeaverQC.jpg') },
]

const Quebec: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 16 }}>
            <Image
                source={require('../../../assets/BadgesAssets/QuebecBadge2.jpg')}
                style={{ width: 128, height: 128, borderRadius: 64, marginRight: 48 }}
                resizeMode="cover"
            />
            <Text style={{ fontSize: 32, fontWeight: '400', color: '#333' }}>
                QUEBEC
            </Text>
        </View>
         <View style={{
        height: 2,
        backgroundColor: '#bbb',
        marginTop: 32,
        borderRadius: 1,
        width: 320,
        alignSelf: 'center',
      }} />
       <View style={{ alignItems: 'center', marginTop: 16, marginBottom: 24 }}>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#555',padding: 12, textAlign: 'center' }}>
          Collect all animals from Quebec to earn this badge!
          When you collect an animal, it will be marked as "unverified" until we 
          confirm your sighting. Once verified, it will count towards your badge progress.
          When you have a full set of verified animals, we will send you a real badge in the mail!
        </Text>
      </View>
</View>
            <View style={styles.gridContainer}>
                {items.map((item, idx) => (
                    <View key={idx} style={styles.gridItem}>
                        <Image
                            source={item.image}
                            style={{ width: 82, height: 82, borderRadius: 64 }}
                            resizeMode="cover"

                        />
                         <View style={{
                                height: 80,
                                backgroundColor: '#bbb',
                                borderRadius: 1,
                                width: 1,
                                margin: 12,
                                     }} />
                        <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '600', color: '#333', marginLeft: 18 }}>{item.label}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: "#f5f5f5",
        flexGrow: 1,
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: '#ffffff',
        width: '95%',
        borderRadius: 24,

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
        height: 120,
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
        fontSize: 8,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#444',
        marginBottom: 24,
    },
     gridContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '95%',
    alignItems: "flex-start",
  },
  gridItem: {
    width: '100%', // two per row, with some gap
    marginBottom: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 100, 
    flexDirection: "row", 
    backgroundColor: '#fff', 
    paddingHorizontal: 16,
  },
   
});

export default Quebec;