import ExperienceBar from '@/components/UserProfileComp/experienceBar';
import Stats from '@/components/UserProfileComp/stats';
import { View } from 'moti';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

const ParametersScreen: React.FC = () => {
    const slideAnim = React.useRef(new Animated.Value(0)).current;

    return (
        <Animated.View style={[styles.overlay, { transform: [{ translateX: slideAnim }] }]}>
            {/* Round profile picture under "Profile" */}
            <Animated.View style={{ alignItems: 'center', marginBottom: 24, paddingTop: 32 }}>
                <Animated.Image
                    source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                    style={{ width: 146, height: 146, borderRadius: 68, backgroundColor: '#ccc' }}
                />
            </Animated.View>
            {/* Stats component */}
            <ExperienceBar level={95} currentExp={120} expToNextLevel={200} />
            <View>
            <Stats />
            </View>
            {/* Settings options */}
            <Animated.View style={{ marginHorizontal: 24 }}>
                {/* Rectangle buttons stacked vertically */}
                <Animated.View style={{ marginBottom: 16 }}>
                    {/* Other buttons */}
                    <TouchableOpacity
                        style={{ backgroundColor: '#eee', borderRadius: 12, padding: 12, marginBottom: 12, alignItems: 'center' }}
                        activeOpacity={0.7}
                        onPress={() => {console.log("Account Pressed")}}
                        
                    >
                        <Animated.Text style={{ color: '#333', fontSize: 18 }}>Notifications</Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: '#eee', borderRadius: 12, padding: 12, marginBottom: 12, alignItems: 'center' }}
                        activeOpacity={0.7}
                        onPress={() => {console.log("Privacy Pressed")}}
                    >
                        <Animated.Text style={{ color: '#333', fontSize: 18 }}>Privacy</Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: '#eee', borderRadius: 12, padding: 12, marginBottom: 12, alignItems: 'center' }}
                        activeOpacity={0.7}
                        onPress={() => {/* handle Dark Mode press */}}
                    >
                        <Animated.Text style={{ color: '#333', fontSize: 18 }}>Dark Mode</Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: '#eee', borderRadius: 12, padding: 12, marginBottom: 12, alignItems: 'center' }}
                        activeOpacity={0.7}
                        onPress={() => {/* handle About press */}}
                    >
                        <Animated.Text style={{ color: '#333', fontSize: 18 }}>About</Animated.Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    overlay: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        paddingTop: 42,
    },
});

export default ParametersScreen;