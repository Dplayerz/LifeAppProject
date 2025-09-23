import { INDEX } from '@/constants/animalIndex';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useUser } from '../hooks/userContex';
import { db } from '../src/firebase/firebaseConfig';

const Review: React.FC = () => {
  const [shortDescription, setShortDescription] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const { uri, latitude, longitude } = useLocalSearchParams();
  const { uid } = useUser();
  const router = useRouter();
  const [invalidChoice, setInvalidChoice] = useState(false);
  // Only check validity, do not set state in render
  const isValidChoice = React.useMemo(() => INDEX.some(c => c.id === shortDescription), [shortDescription]);

  // Only the IDs for suggestions
  const suggestionIds = INDEX.map(c => c.id);

  // Handle typing in the "What did you capture?" field
  const handleShortDescriptionChange = (text: string) => {
    setShortDescription(text);

    if (text) {
      setFilteredSuggestions(
        suggestionIds.filter(id =>
          id.toLowerCase().startsWith(text.toLowerCase())
        ).slice(0, 20) // limit suggestions for performance
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSubmit = async () => {
    if (!isValidChoice) {
      setInvalidChoice(true);
      return;
    }
    setInvalidChoice(false);
    setSubmitted(true);

    // Look up full Choice by ID
    const selectedChoice = INDEX.find(c => c.id === shortDescription);
    console.log('Selected Choice:', selectedChoice);

    // Upload photo metadata to Firestore
    if (uri && uid && latitude && longitude) {
      try {
        const photoDoc = doc(collection(db, 'photos'));
        await setDoc(photoDoc, {
          userId: uid,
          imageUrl: typeof uri === 'string' ? uri : uri[0],
          latitude: Number(latitude),
          longitude: Number(longitude),
          createdAt: new Date().toISOString(),
          description: review,
          shortDescription,
        });
        console.log('Photo saved to Firestore!');
        router.back();
      } catch (err) {
        console.error('Error saving photo:', err);
      }
    } else {
      console.warn('Missing uri, uid, latitude, or longitude');
    }
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
          <Image
            source={{ uri: typeof uri === 'string' ? uri : uri[0] }}
            style={styles.photo}
          />
        </View>
      )}

      <Text style={styles.header}>What did you capture?</Text>
      <View style={{ position: 'relative' }}>
        <TextInput
          style={styles.inputSmall}
          placeholder="Type or select an answer..."
          value={shortDescription}
          onChangeText={handleShortDescriptionChange}
        />

        {filteredSuggestions.length > 0 && (
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setShortDescription(item);
                  setFilteredSuggestions([]);
                }}
                style={styles.suggestionItem}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionList}
          />
        )}
      </View>

      <Text style={styles.header}>Share more details:</Text>
      <TextInput
        style={styles.input}
        placeholder="Write more about it..."
        value={review}
        onChangeText={setReview}
        multiline
      />

      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={!isValidChoice || (!shortDescription.trim() && !review.trim())}
      />
      {invalidChoice && (
        <Text style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>
          Please select a valid choice from the list.
        </Text>
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
    position: 'absolute',
    top: 40, // adjust depending on input height
    left: 0,
    right: 0,
    maxHeight: 150,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1000,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
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
