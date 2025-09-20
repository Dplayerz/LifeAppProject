import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from "../../src/firebase/firebaseConfig";

const CreateAccount: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleCreateAccount = async () => {
        try {
            // 1. Check if username exists
            const q = query(collection(db, 'users'), where('username', '==', username));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                Alert.alert('Error', 'Username already exists. Please choose another.');
                return;
            }

            // 2. Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // 3. Add user profile to Firestore
            await setDoc(doc(db, 'users', uid), {
                username,
                email,
                createdAt: new Date().toISOString(),
            });

            Alert.alert('Account Created', `Welcome, ${username}!`);
            // Optionally navigate to another page
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.headerSection}>
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                    style={styles.profileIcon}
                />
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>
            </View>
            <View style={styles.formSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    autoCapitalize="none"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#888"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#888"
                />
                <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
                    <Text style={styles.createButtonText}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: 32,
        justifyContent: 'flex-start',
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    profileIcon: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginBottom: 16,
        backgroundColor: '#eee',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
        color: '#222',
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 8,
        textAlign: 'center',
    },
    formSection: {
        marginTop: 8,
    },
    input: {
        height: 52,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 18,
        paddingHorizontal: 16,
        fontSize: 17,
        backgroundColor: '#fafafa',
        color: '#222',
        elevation: 1,
    },
    createButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        elevation: 2,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});

export default CreateAccount;
