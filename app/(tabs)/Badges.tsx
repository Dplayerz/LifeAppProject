

import { useNavigation } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
       container: {
	       flex: 1,
	       backgroundColor: '#fff',
       },
	buttonText: {
		fontSize: 18,
		color: 'black',
		fontWeight: 'bold',
		padding: 10,
	},
	buttonContainer: {
		marginVertical: 8,
		paddingHorizontal: 24,
		paddingVertical: 12,
		backgroundColor: '#fff',
		borderRadius: 8,
	},
       imageHeaderContainer: {
	       width: '100%',
	       height: 380,
	       overflow: 'hidden',
	       borderBottomLeftRadius: 32,
	       borderBottomRightRadius: 32,
       },
       scrollOverlapCard: {
	       backgroundColor: '#fff',
	       borderTopLeftRadius: 32,
	       borderTopRightRadius: 32,
	       minHeight: 200,
	       paddingTop: 32,
	       // Add shadow for iOS
	       shadowColor: '#000',
	       shadowOffset: { width: 0, height: 4 },
	       shadowOpacity: 0.12,
	       shadowRadius: 12,
	       // Add elevation for Android
	       elevation: 8,
	       marginTop: -40, // overlap effect
	       marginHorizontal: 0,
       },
	scrollContent: {
		alignItems: 'center',
		paddingBottom: 40,
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 24,
	},
	imageHeader: {
		height: '100%',
		width: '100%',
	},
	progressBarContainer: {
		width: '90%',
		height: 16,
		backgroundColor: '#eee',
		borderRadius: 8,
		marginTop: 24,
		marginBottom: 32,
		overflow: 'hidden',
	},
	progressBar: {
		height: '100%',
		backgroundColor: '#4f8cff',
		borderRadius: 8,
	},
	text: {
		fontSize: 24,
		color: '#888',
        textAlign: 'center',
	},
});



export default function BadgesScreen() {
	const navigation = useNavigation();
	const windowWidth = Dimensions.get('window').width;
	const lastOffset = useRef(0);
	const scrollingDown = useRef(false);
	const scrollY = useRef(new Animated.Value(0)).current;

	const handleScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { y: scrollY } } }],
		{
			useNativeDriver: false,
			listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
				const currentOffset = event.nativeEvent.contentOffset.y;
				if (currentOffset <= 0) {
					navigation.setOptions({ tabBarStyle: undefined });
					scrollingDown.current = false;
				} else {
					if (!scrollingDown.current) {
						navigation.setOptions({ tabBarStyle: { display: 'none' } });
						scrollingDown.current = true;
					}
				}
				lastOffset.current = currentOffset;
			},
		}
	);

	const imageHeight = scrollY.interpolate({
		inputRange: [0, 200],
		outputRange: [380, 120],
		extrapolate: 'clamp',
	});

	return (
	       <View style={styles.container}>
		       {/* Image Header */}
		       <Animated.View style={[styles.imageHeaderContainer, { height: imageHeight }]}> 
			       <Image
				       source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
				       style={[styles.imageHeader, { width: windowWidth, height: '100%' }]}
				       resizeMode="cover"
			       />
		       </Animated.View>
		       <Animated.ScrollView
			       style={{ flex: 1 }}
			       contentContainerStyle={{ paddingBottom: 40 }}
			       showsVerticalScrollIndicator={false}
			       onScroll={handleScroll}
			       scrollEventThrottle={16}
		       >
			       <View style={styles.scrollOverlapCard}>
				       <View style={styles.buttonRow}>
					       <TouchableOpacity style={styles.buttonContainer}>
						       <Text style={styles.buttonText}>Button 1</Text>
					       </TouchableOpacity>
					       <TouchableOpacity style={styles.buttonContainer}>
						       <Text style={styles.buttonText}>Button 2</Text>
					       </TouchableOpacity>
				       </View>
				       {/* Example content to enable scrolling */}
				       <Text style={styles.text}>Badges Placeholder</Text>
				       <Text style={{ fontSize: 16, color: '#666', margin: 24, textAlign: 'center' }}>
					       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin nec urna euismod, dictum erat at, dictum enim. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin nec urna euismod, dictum erat at, dictum enim. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin nec urna euismod, dictum erat at, dictum enim. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin nec urna euismod, dictum erat at, dictum enim.
					       {'\n\n'}
					       Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est. Sed nec felis pellentesque, lacinia dui sed, ultricies sapien. Pellentesque orci lectus, consectetur vel posuere posuere, rutrum eu ipsum. Aliquam eget odio sed ligula iaculis consequat at eget orci. Mauris molestie sit amet metus mattis varius. Donec sit amet ligula eget nisi sodales egestas. Aliquam interdum dolor aliquet dolor sollicitudin fermentum.
					       {'\n\n'}
					       Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque suscipit, sem sit amet dictum dictum, massa dolor egestas velit, nec vehicula sem dolor ac elit. Pellentesque convallis, mauris nec varius dictum, enim sem dictum enim, eget aliquam massa nisl quis neque. Proin nec urna euismod, dictum erat at, dictum enim.
					       {'\n\n'}
					       Curabitur euismod, nisi vel consectetur cursus, nisl nunc aliquam nunc, eget aliquam massa nisl quis neque. Proin nec urna euismod, dictum erat at, dictum enim. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin nec urna euismod, dictum erat at, dictum enim. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin nec urna euismod, dictum erat at, dictum enim.
					       {'\n\n'}
					       Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
					       {'\n\n'}
					       Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
				       </Text>
			       </View>
		       </Animated.ScrollView>
	       </View>
	);
}

