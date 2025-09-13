import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Review: React.FC = () => {
    const [shortDescription, setShortDescription] = useState('');
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { uri } = useLocalSearchParams();
    const router = useRouter();

    // Placeholder for future suggestions
    const [suggestions] = useState<string[]>(["Option 1", "Option 2", "Option 3"]);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

    const handleReviewChange = (text: string) => {
        setReview(text);
        if (suggestions.length > 0 && text) {
            setFilteredSuggestions(suggestions.filter(s => s.toLowerCase().includes(text.toLowerCase())));
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        // You can handle the review submission here
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Tell us about your picture</Text>
            {uri && (
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <Image source={{ uri: typeof uri === 'string' ? uri : uri[0] }} style={styles.photo} />
                </View>
            )}
            <Text style={styles.header}>What did you capture?</Text>
            <TextInput    
                style={styles.inputSmall}
                placeholder="Short description..."
                value={shortDescription}
                onChangeText={setShortDescription}
                multiline={false}
                maxLength={60}
            />
            <Text style={styles.header}>Share more details:</Text>
            <TextInput
                style={styles.input}
                placeholder="Type or select an answer..."
                value={review}
                onChangeText={handleReviewChange}
                multiline
            />
            {filteredSuggestions.length > 0 && (
                <FlatList
                    data={filteredSuggestions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setReview(item)} style={styles.suggestionItem}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.suggestionList}
                />
            )}
            <Button title="Submit" onPress={handleSubmit} disabled={!shortDescription.trim() && !review.trim()} />
            {submitted && (
                <Text style={styles.thankYou}>Thank you for your review!</Text>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#ffff',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        minHeight: 80,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    inputSmall: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        minHeight: 36,
        marginBottom: 12,
        fontSize: 14,
        backgroundColor: '#fafafa',
    },
    suggestionList: {
        maxHeight: 100,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
    },
    suggestionItem: {
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    thankYou: {
        marginTop: 16,
        color: 'green',
        fontSize: 16,
        textAlign: 'center',
    },
    photo: {
        width: 300,
        height: 300,
        borderRadius: 16,
        backgroundColor: '#eee',
        marginBottom: 8,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 24,
        zIndex: 10,
        backgroundColor: '#eee',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 16,
        elevation: 2,
    },
    closeButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default Review;