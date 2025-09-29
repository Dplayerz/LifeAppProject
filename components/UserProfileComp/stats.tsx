import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

const statsData = [
  { icon: <Ionicons name="flame" size={32} color="#ff6f00" />, value: 12 },
  { icon: <MaterialCommunityIcons name="leaf" size={32} color="#43a047" />, value: 8 },
  { icon: <FontAwesome5 name="water" size={32} color="#2196f3" />, value: 5 },
  { icon: <Feather name="star" size={32} color="#ffd600" />, value: 20 },
];

const Stats = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 16 }}>
    {statsData.map((stat, idx) => (
      <View key={idx} style={{ alignItems: 'center', marginHorizontal: 12 }}>
        {stat.icon}
        <Text style={{ marginTop: 6, fontSize: 16, fontWeight: 'bold', color: '#222' }}>{stat.value}</Text>
      </View>
    ))}
  </View>
);

export default Stats;