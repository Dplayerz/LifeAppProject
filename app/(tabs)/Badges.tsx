

import { useNavigation } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BadgeTemplate, badgesSet1, badgesSet2, badgesSet3 } from '../../components/badgesTemplate';
const badgeSets = [badgesSet1, badgesSet2, badgesSet3];

const CARD_EXPANDED_HEIGHT = 0.92; // percent of screen height
const CARD_COLLAPSED_HEIGHT = undefined; // auto

const styles = StyleSheet.create({
       container: {
	       flex: 1,
	       backgroundColor: '#fff',
       },
	buttonContainer: {
		marginVertical: 8,
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
		elevation: 0,
		shadowColor: 'transparent',
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		padding: 10,
	},
	   imageHeaderContainer: {
		   position: 'absolute',
		   top: 0,
		   left: 0,
		   width: '100%',
		   height: "auto",
		   zIndex: 0,
	   },
       scrollOverlapCard: {
	       backgroundColor: '#fff',
	       borderTopLeftRadius: 32,
	       borderTopRightRadius: 32,
	       minHeight: 200,
	       paddingTop: 10,
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
		marginBottom: 10,
		marginTop: -20,
	},
	imageHeader: {
		height: '100%',
		width: '100%',
	},
	text: {
		fontSize: 24,
		color: '#888',
        textAlign: 'center',
	},
});



export default function BadgesScreen() {
	const [currentSet, setCurrentSet] = useState(0);
	const [expanded, setExpanded] = useState(false);
	const [selectedBadge, setSelectedBadge] = useState<null | { image: string; title: string; progress: number }>(null);
	const cardAnim = useRef(new Animated.Value(0)).current; // 0: collapsed, 1: expanded
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
		inputRange: [-200, 0, 400],
		outputRange: [580, 380, 200],
		extrapolate: 'clamp',
	});

	return (
		   <View style={styles.container}>
			   {/* Parallax Image Header (fixed) */}
			   <Animated.View style={[styles.imageHeaderContainer, { height: imageHeight, transform: [{ translateY: scrollY.interpolate({ inputRange: [0, 200], outputRange: [0, -80], extrapolate: 'clamp' }) }] }]}> 
				   <Image
					   source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
					   style={[styles.imageHeader, { width: windowWidth, height: '100%' }]}
					   resizeMode="cover"
				   />
			   </Animated.View>
			   <Animated.ScrollView
				   style={{ flex: 1, zIndex: 1 }}
				   contentContainerStyle={{ paddingTop: 400, paddingBottom: 40 }}
				   showsVerticalScrollIndicator={false}
				   onScroll={handleScroll}
				   scrollEventThrottle={16}
			   >
				   <View style={styles.scrollOverlapCard}>
					   <View style={styles.buttonRow}>
						   <TouchableOpacity
							   style={styles.buttonContainer}
							   onPress={() => setCurrentSet(0)}
						   >
							   <Text style={[styles.buttonText, { color: currentSet === 0 ? '#222' : '#aaa' }]}>Land</Text>
						   </TouchableOpacity>
						   <TouchableOpacity
							   style={styles.buttonContainer}
							   onPress={() => setCurrentSet(1)}
						   >
							   <Text style={[styles.buttonText, { color: currentSet === 1 ? '#222' : '#aaa' }]}>Air</Text>
						   </TouchableOpacity>
						   <TouchableOpacity
							   style={styles.buttonContainer}
							   onPress={() => setCurrentSet(2)}
						   >
							   <Text style={[styles.buttonText, { color: currentSet === 2 ? '#222' : '#aaa' }]}>Water</Text>
						   </TouchableOpacity>
					   </View>
																			 <Animated.View
																					 style={{
																						 height: expanded
																							 ? cardAnim.interpolate({
																									 inputRange: [0, 1],
																									 outputRange: [600, Dimensions.get('window').height * CARD_EXPANDED_HEIGHT],
																								 })
																							 : 'auto',
																						 overflow: 'hidden',
																					 }}
																			 >
											 {!expanded ? (
												 badgeSets[currentSet]
													 .sort((a, b) => b.progress - a.progress)
													 .map((badge, idx) => (
														 <BadgeTemplate
															 key={badge.title + idx}
															 image={badge.image}
															 title={badge.title}
															 progress={badge.progress}
															 onPress={() => {
																 setSelectedBadge(badge);
																 setExpanded(true);
																 Animated.timing(cardAnim, {
																	 toValue: 1,
																	 duration: 400,
																	 easing: Easing.out(Easing.cubic),
																	 useNativeDriver: false,
																 }).start();
															 }}
														 />
													 ))
											 ) : (
												 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
													 <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>
														 {selectedBadge?.title} Details
													 </Text>
													 <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
														 Here you can add more info, actions, or content for the selected badge.
													 </Text>
													 <TouchableOpacity
														 style={{ marginTop: 32, padding: 12, borderRadius: 8, backgroundColor: '#eee' }}
														 onPress={() => {
															 Animated.timing(cardAnim, {
																 toValue: 0,
																 duration: 350,
																 easing: Easing.out(Easing.cubic),
																 useNativeDriver: false,
															 }).start(() => {
																 setExpanded(false);
																 setSelectedBadge(null);
															 });
														 }}
													 >
														 <Text style={{ fontWeight: 'bold', color: '#333' }}>Close</Text>
													 </TouchableOpacity>
												 </View>
											 )  }
										 </Animated.View>
				   </View>
		       </Animated.ScrollView>
	       </View>
	);
}

