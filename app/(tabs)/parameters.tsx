import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

const ParametersScreen: React.FC = () => {
    const slideAnim = React.useRef(new Animated.Value(0)).current;

    return (
        <Animated.View style={[styles.overlay, { transform: [{ translateX: slideAnim }] }]}> 
            <Animated.Text style={{ color: '#222', fontSize: 34, fontWeight: 'bold', margin: 24 }}>
                Settings
            </Animated.Text>
            <Animated.View style={{ marginHorizontal: 24 }}>
                {/* Rectangle buttons stacked vertically */}
                <Animated.View style={{ marginBottom: 16 }}>
                    {/* Account Settings - bigger, with round photo */}
                                <TouchableOpacity
                                    style={{ backgroundColor: '#eee', borderRadius: 16, padding: 12, marginBottom: 4 }}
                                    activeOpacity={0.7}
                                    onPress={() => {/* handle Account Settings press */}}
                                >
                        <Animated.View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Animated.Image
                                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                                style={{ width: 64, height: 64, borderRadius: 32, marginRight: 18, backgroundColor: '#ccc' }}
                            />
                            <Animated.Text style={{ color: '#333', fontSize: 22, fontWeight: 'bold' }}>Account Settings</Animated.Text>
                        </Animated.View>
                        <Animated.Text style={{ color: '#666', fontSize: 14, marginTop: 0, marginLeft: 82 }}>
                            View account
                        </Animated.Text>
                                </TouchableOpacity>
                    {/* Other buttons */}
                    <TouchableOpacity
                        style={{ backgroundColor: '#eee', borderRadius: 12, padding: 12, marginBottom: 12, alignItems: 'center' }}
                        activeOpacity={0.7}
                        onPress={() => {/* handle Notifications press */}}
                    >
                        <Animated.Text style={{ color: '#333', fontSize: 18 }}>Notifications</Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: '#eee', borderRadius: 12, padding: 12, marginBottom: 12, alignItems: 'center' }}
                        activeOpacity={0.7}
                        onPress={() => {/* handle Privacy press */}}
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