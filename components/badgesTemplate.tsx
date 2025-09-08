export const badgesSet1 = [
	{
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
		title: 'Explorer',
		progress: 0.6,
	},
	{
		image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
		title: 'Achiever',
		progress: 0.3,
	},
	{
		image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
		title: 'Trailblazer',
		progress: 0.7,
	},
	{
		image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=800&q=80',
		title: 'Pathfinder',
		progress: 0.2,
	},
	{
		image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
		title: 'Scout',
		progress: 0.5,
	},
];

export const badgesSet2 = [
	{
		image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
		title: 'Veteran',
		progress: 0.8,
	},
	{
		image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
		title: 'Innovator',
		progress: 0.45,
	},
	{
		image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
		title: 'Pioneer',
		progress: 0.9,
	},
	{
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
		title: 'Navigator',
		progress: 0.4,
	},
	{
		image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
		title: 'Adventurer',
		progress: 0.6,
	},
];

export const badgesSet3 = [
	{
		image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=800&q=80',
		title: 'Mentor',
		progress: 0.1,
	},
	{
		image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
		title: 'Guide',
		progress: 0.3,
	},
	{
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
		title: 'Instructor',
		progress: 0.5,
	},
	{
		image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
		title: 'Coach',
		progress: 0.7,
	},
	{
		image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
		title: 'Advisor',
		progress: 0.2,
	},
];
import React from 'react';
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type BadgeTemplateProps = {
	image: string; // image URL or local require
	title: string;
	progress: number; // 0 to 1
	onPress?: (event: GestureResponderEvent) => void;
};

export const BadgeTemplate: React.FC<BadgeTemplateProps> = ({ image, title, progress, onPress }) => {
	return (
		<TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
			<Image source={typeof image === 'string' ? { uri: image } : image} style={styles.badgeImage} />
			<Text style={styles.title}>{title}</Text>
			<View style={styles.progressBarContainer}>
				<View style={[styles.progressBar, { width: `${Math.max(0, Math.min(1, progress)) * 100}%` }]} />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginVertical: 16,
		padding: 16,
		backgroundColor: '#fff',
		borderRadius: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 3,
	},
	badgeImage: {
		width: 64,
		height: 64,
		borderRadius: 32,
		marginBottom: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 12,
	},
	progressBarContainer: {
		width: '80%',
		height: 12,
		backgroundColor: '#eee',
		borderRadius: 6,
		overflow: 'hidden',
	},
		progressBar: {
			height: '100%',
			backgroundColor: '#4f8cff',
					borderRadius: 6,
				},
			});
