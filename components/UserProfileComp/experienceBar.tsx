import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ExperienceBarProps = {
    level: number;
    currentExp: number;
    expToNextLevel: number;
};

const ExperienceBar: React.FC<ExperienceBarProps> = ({
    level,
    currentExp,
    expToNextLevel,
}) => {
    const progress = Math.min(currentExp / expToNextLevel, 1);

    return (
        <View style={styles.container}>
            <Text style={styles.levelText}>Level {level}</Text>
            <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.expText}>
                {currentExp} / {expToNextLevel} XP
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 16,
    },
    levelText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    barBackground: {
        width: 240,
        height: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 6,
    },
    barFill: {
        height: '100%',
        backgroundColor: '#4caf50',
        borderRadius: 10,
    },
    expText: {
        fontSize: 14,
        color: '#555',
    },
});

export default ExperienceBar;