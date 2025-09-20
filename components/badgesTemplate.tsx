import React from 'react';
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export const badgesSet1 = [
	{
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
		title: 'Explorer',
		progress: 0.6,
		total: 10,
	},
	{
		image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
		title: 'Achiever',
		progress: 0.3,
		total: 7,
	},
	{
		image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
		title: 'Trailblazer',
		progress: 0.7,
		total: 15,
	},
	{
		image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=800&q=80',
		title: 'Pathfinder',
		progress: 0.2,
		total: 5,
	},
	{
		image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
		title: 'Scout',
		progress: 0.5,
		total: 12,
	},
];

export const badgesSet2 = [
	{
		image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
		title: 'Veteran',
		progress: 0.8,
		total: 8,
	},
	{
		image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
		title: 'Innovator',
		progress: 0.45,
		total: 14,
	},
	{
		image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
		title: 'Pioneer',
		progress: 0.9,
		total: 20,
	},
	{
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
		title: 'Navigator',
		progress: 0.4,
		total: 6,
	},
	{
		image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
		title: 'Adventurer',
		progress: 0.6,
		total: 11,
	},
];

export const badgesSet3 = [
	{
		image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=800&q=80',
		title: 'Mentor',
		progress: 0.1,
		total: 9,
	},
	{
		image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
		title: 'Guide',
		progress: 0.3,
		total: 13,
	},
	{
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
		title: 'Instructor',
		progress: 0.5,
		total: 17,
	},
	{
		image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
		title: 'Coach',
		progress: 0.7,
		total: 6,
	},
	{
		image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
		title: 'Advisor',
		progress: 0.2,
		total: 19,
	},
];


type BadgeTemplateProps = {
	image: string; // image URL or local require
	title: string;
	progress: number; // 0 to 1
	total: number; // total divisions for the progress bar
	onPress?: (event: GestureResponderEvent) => void;
};

export const BadgeTemplate: React.FC<BadgeTemplateProps> = ({ image, title, progress, onPress, total }) => {
	const divisions = total;
	const current = Math.round(Math.max(0, Math.min(1, progress)) * divisions);
	// Render tick marks for divisions
	const ticks = [];
	if (typeof divisions === 'number' && divisions > 1) {
		for (let i = 1; i < divisions; i++) {
			ticks.push(
				<View
					key={`tick-${i}`}
					style={{
						position: 'absolute',
						left: `${(i / divisions) * 100}%`,
						top: 0,
						bottom: 0,
						width: 2,
						backgroundColor: '#ccc',
						borderRadius: 1,
					}}
				/>
			);
		}
	}

	return (
		<TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
			<View style={styles.row}>
				<Image source={typeof image === 'string' ? { uri: image } : image} style={styles.badgeImage} />
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.progressBarContainer}>
						<View style={[styles.progressBar, { width: `${Math.max(0, Math.min(1, progress)) * 100}%` }]} />
						{/* Tick marks overlay */}
						{ticks}
					</View>
					<Text style={styles.progressCounter}>{`${current}/${divisions}`}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
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
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	badgeImage: {
		width: 64,
		height: 64,
		borderRadius: 32,
		marginRight: 16,
	},
	infoContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 12,
	},
progressCounter: {
		fontSize: 13,
		color: '#4f8cff',
		fontWeight: 'bold',
		minWidth: 32,
		textAlign: 'right',
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
			
