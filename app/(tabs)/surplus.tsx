import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SurplusScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Surplus</Text>
            <Text style={styles.text}>This is a mock page for the Surplus tab.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        color: '#555',
    },
});