import React from 'react';
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Firebase imports and addBadge function








export const badgesSet1 = [
 {
 image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
 title: 'Explorer',
 current: 0,
 unverified: 0,
 total: 10,
 },
 {
 image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
 title: 'Achiever',
 current: 0,
 unverified: 0,
 total: 7,
 },
 {
 image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
 title: 'Trailblazer',
 current: 1,
 unverified: 3,
 total: 15,
 },
 {
 image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=800&q=80',
 title: 'Pathfinder',
 current: 0,
 unverified: 0,
 total: 5,
 },
 {
 image: require('../assets/BadgesAssets/QuebecBadge2.jpg'),
 title: 'Quebec',
 current: 0,
 unverified: 0,
 total: 20,
 },
];

export const badgesSet2 = [
 {
 image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
 title: 'Veteran',
 current: 0,
  unverified: 0,
 total: 8,
 },
 {
 image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
 title: 'Innovator',
 current: 0,
 total: 14,
  unverified: 0,
 },
 {
 image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
 title: 'Pioneer',
 current: 0,
 total: 20,
  unverified: 0,
 },
 {
 image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
 title: 'Navigator',
 current: 0,
 total: 6,
  unverified: 0,
 },
 {
 image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
 title: 'Adventurer',
 current: 0,
 total: 11,
  unverified: 0,
 },
];

export const badgesSet3 = [
 {
 image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=800&q=80',
 title: 'Mentor',
 current: 0,
 total: 9,
  unverified: 0,
 },
 {
 image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
 title: 'Guide',
 current: 0,
 total: 13,
 unverified: 0,
 },
 {
 image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
 title: 'Instructor',
 current: 0,
 total: 17,
 unverified: 0,
 },
 {
 image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
 title: 'Coach',
 current: 0,
 total: 6,
 unverified: 0,
 },
 {
 image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
 title: 'Advisor',
 current: 0,
 total: 19,
 unverified: 0,
 },
];


type BadgeTemplateProps = {
	image: string; // image URL or local require
	title: string;
 current: number; // confirmed progress value
 unverified: number; // unverified progress value
 total: number; // total divisions for the progress bar
	onPress?: (event: GestureResponderEvent) => void;
};

export const BadgeTemplate: React.FC<BadgeTemplateProps> = ({ image, title, current, unverified, onPress, total }) => {
 const divisions = total;
 const safeCurrent = Math.max(0, Math.min(current, divisions));
 const safeUnverified = Math.max(0, Math.min(unverified, divisions - safeCurrent));
 // Segmented bar logic with three states
 const segments = [];
 for (let i = 0; i < divisions; i++) {
	 let color = '#E0E0E0'; // empty
	 if (i < safeCurrent) color = '#007AFF'; // confirmed
	 else if (i < safeCurrent + safeUnverified) color = '#90CDF4'; // unverified
	 segments.push(
		 <View
			 key={`segment-${i}`}
			 style={{
				 flex: 1,
				 height: 10,
				 marginHorizontal: 1,
				 borderRadius: 2,
				 backgroundColor: color,
			 }}
		 />
	 );
 }

	 return (
		 <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
			 <View style={styles.row}>
				 <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.badgeImage} />
				 <View style={styles.infoContainer}>
					 <Text style={styles.title}>{title}</Text>
					 <View style={styles.segmentedBarContainer}>
						 {segments}
					 </View>
					 <Text style={styles.progressCounter}>{`${safeCurrent}/${divisions}`}</Text>
					 {/* Debug info */}
					 <Text style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
						 {`current: ${safeCurrent}, unverified: ${safeUnverified}, total: ${divisions}`}
					 </Text>
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

	 segmentedBarContainer: {
		 flexDirection: 'row',
		 width: '80%',
		 height: 10,
		 marginTop: 8,
		 marginBottom: 4,
	 },
			});
			
