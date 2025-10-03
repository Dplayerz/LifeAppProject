import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import StatWithAnimation from './statAnimation';

const statsData = [
  { icon: <Ionicons name="flame" size={32} color="#ff6f00" />, value: 13 },
  { icon: <MaterialCommunityIcons name="leaf" size={32} color="#43a047" />, value: 12 },
  { icon: <FontAwesome5 name="water" size={32} color="#2196f3" />, value: 5 },
  { icon: <Feather name="star" size={32} color="#ffd600" />, value: 20 },
];

const Stats = () => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 16,
    }}
  >
    {statsData.map((stat, idx) => (
      <StatWithAnimation key={idx} icon={stat.icon} value={stat.value} />
    ))}
  </View>
);
export default Stats;