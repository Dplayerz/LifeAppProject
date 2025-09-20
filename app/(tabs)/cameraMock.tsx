import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CameraMock() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Camera Mock Page</Text>
            <Text style={styles.subtext}>
                This is a placeholder for the Camera feature.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtext: {
        fontSize: 16,
        color: '#666',
    },
});