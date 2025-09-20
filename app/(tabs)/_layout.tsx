import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { useNavVisibility } from '../navBarContex';




export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { visible } = useNavVisibility();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="explore"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: { position: 'absolute' },
            default: {},
          }),
        }}
      >

        <Tabs.Screen
          name="parameters"
          options={{
            title: 'Parameters',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Badges"
          options={{
            title: 'Badges',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="flame.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="cameraMock"
          options={{
            title: 'hidden',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="camera.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'explore',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
          }}
        />
      </Tabs>
      {/* Floating Camera Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 32,
          alignSelf: 'center',
          backgroundColor: '#ffffffff',
          borderRadius: 36,
          width: 72,
          height: 72,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          display: visible ? undefined : 'none',
        }}
        onPress={() => router.push('/CameraScreen')}
        activeOpacity={0.8}
      >
        <IconSymbol size={36} name="camera.fill" color="#000" />
      </TouchableOpacity>
    </View>
  );
}