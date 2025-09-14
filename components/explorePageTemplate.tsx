import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface ExploreUser {
	id: string;
	name: string;
	image: string;
}

interface ExplorePageTemplateProps {
	users: ExploreUser[];
	onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
	ListHeaderComponent?: React.ReactElement;
}

const ExplorePageTemplate: React.FC<ExplorePageTemplateProps> = ({
	users,
	onScroll,
	ListHeaderComponent,
}) => {
	// Local state for likes and liked posts
	const [postLikes, setPostLikes] = useState(() =>
		users.reduce((acc, user) => {
			acc[user.id] = 0;
			return acc;
		}, {} as Record<string, number>)
	);
	const [likedIds, setLikedIds] = useState<string[]>([]);

	const toggleLike = (id: string) => {
		if (likedIds.includes(id)) return; // Prevent multiple likes per user
		setPostLikes((prev) => ({
			...prev,
			[id]: (prev[id] || 0) + 1,
		}));
		setLikedIds((prev) => [...prev, id]);
	};

	return (
		<View style={styles.container}>
			<Animated.FlatList
				data={users}
				keyExtractor={item => item.id}
				ListHeaderComponent={ListHeaderComponent}
				contentContainerStyle={{ paddingBottom: 32, paddingTop: 16 }}
				renderItem={({ item }) => {
					const liked = likedIds.includes(item.id);
					return (
						<View style={styles.postCard}>
							<Image source={{ uri: item.image }} style={styles.postImage} />
							<View style={styles.postInfo}>
								<Text style={styles.userName}>{item.name}</Text>
								<View style={{ flex: 1 }} />
								<TouchableOpacity
									style={styles.likeButtonInline}
									onPress={() => toggleLike(item.id)}
									activeOpacity={0.7}
									disabled={liked}
								>
									<Ionicons
										name={liked ? 'heart' : 'heart-outline'}
										size={32}
										color={liked ? '#e74c3c' : '#888'}
									/>
								</TouchableOpacity>
								<Text style={styles.likesCount}>{postLikes[item.id] || 0}</Text>
							</View>
						</View>
					);
				}}
				showsVerticalScrollIndicator={false}
				onScroll={onScroll}
				scrollEventThrottle={16}
			/>
		</View>
	);
};

export default ExplorePageTemplate;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 0,
	},
	postCard: {
		backgroundColor: '#fff',
		borderRadius: 16,
		marginBottom: 24,
		marginHorizontal: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 2,
		overflow: 'hidden',
	},
	postImage: {
		width: '100%',
		aspectRatio: 1,
		backgroundColor: '#eee',
	},
	postInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
	},
	userName: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#222',
	},
		   likeButtonInline: {
			   marginLeft: 12,
			   backgroundColor: 'rgba(255,255,255,0.7)',
			   borderRadius: 16,
			   padding: 3,
		   },
		   likesCount: {
			   marginLeft: 8,
			   fontWeight: 'bold',
			   color: '#e74c3c',
			   fontSize: 16,
			   alignSelf: 'center',
		   },
		   // ...existing code...
});
