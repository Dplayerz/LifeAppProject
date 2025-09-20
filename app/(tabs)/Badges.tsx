import { useNavigation } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Image, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from 'react-native';
import { BadgeTemplate, badgesSet1, badgesSet2, badgesSet3 } from '../../components/badgesTemplate';
import { db } from '../../src/firebase/firebaseConfig';
import { useNavVisibility } from '../navBarContex';

const badgeSets = [badgesSet1, badgesSet2, badgesSet3];

const CARD_EXPANDED_HEIGHT = 0.92; // percent of screen height

export default function Badges() {
  const [currentSet, setCurrentSet] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<null | { image: string; title: string; progress: number }>(null);
  const [userProgress, setUserProgress] = useState<{ [title: string]: number }>({});
  const [unverifiedData, setUnverifiedData] = useState<{ [title: string]: number }>({});
  const cardAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const lastOffset = useRef(0);
  const scrollingDown = useRef(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { setVisible } = useNavVisibility();

  // ---------------- Fetch user progress ----------------
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);

    // Set up real-time listener
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        setUserProgress(snap.data().progress || {});
      }
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, []);

  // ---------------- Scroll handler ----------------
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        if (currentOffset <= 0) {
          navigation.setOptions({ tabBarStyle: undefined });
          scrollingDown.current = false;
          setVisible(true);
        } else {
          if (!scrollingDown.current) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
            scrollingDown.current = true;
            setVisible(false);
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

  // ---------------- Fetch unverified data for badges ----------------
  // ---------------- Fetch unverified data for badges from user progress ----------------
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const progress = snap.data().progress || {};
        // Expect unverified fields to be named as badge.title + 'Un', e.g., 'ExplorerUn'
        const set = badgeSets[currentSet];
        const results: { [title: string]: number } = {};
        for (const badge of set) {
          const unField = badge.title + 'Un';
          results[badge.title] = progress[unField] ?? badge.unverified ?? 0;
        }
        setUnverifiedData(results);
      }
    });
    return () => unsubscribe();
  }, [currentSet]);

  // ---------------- Merge badges with user progress and unverified ----------------
  const displayedBadges = badgeSets[currentSet].map(badge => ({
    ...badge,
    current: userProgress[badge.title] ?? badge.current, // overwrite current if progress exists
    unverified: unverifiedData[badge.title] ?? badge.unverified ?? 0,
  }));

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: imageHeight,
          zIndex: 0,
          transform: [{ translateY: scrollY.interpolate({ inputRange: [0, 200], outputRange: [0, -80], extrapolate: 'clamp' }) }]
        }}
      >
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
          style={{ width: windowWidth, height: '140%' }}
          resizeMode="cover"
        />
      </Animated.View>

      <Animated.ScrollView
        style={{ flex: 1, zIndex: 1 }}
        contentContainerStyle={{ paddingTop: 500, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, minHeight: 200, paddingTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 8, marginTop: -40 }}>
          {/* Set selector buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: -20 }}>
            {['Land', 'Air', 'Water'].map((label, idx) => (
              <TouchableOpacity key={idx} style={{ marginVertical: 8, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }} onPress={() => setCurrentSet(idx)}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10, color: currentSet === idx ? '#222' : '#aaa' }}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Badge list */}
          <Animated.View
            style={{
              height: expanded
                ? cardAnim.interpolate({ inputRange: [0, 1], outputRange: [600, Dimensions.get('window').height * CARD_EXPANDED_HEIGHT] })
                : 'auto',
              overflow: 'hidden',
            }}
          >
            {!expanded ? (
              displayedBadges
                .sort((a, b) => b.current - a.current)
                .map((badge, idx) => (
                  <BadgeTemplate
                    key={badge.title + idx}
                    image={badge.image}
                    title={badge.title}
                    current={badge.current}
                    total={badge.total}
          unverified={badge.unverified}
                    onPress={() => {
                      setSelectedBadge({ image: badge.image, title: badge.title, progress: badge.total > 0 ? badge.current / badge.total : 0 });
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
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>{selectedBadge?.title} Details</Text>
                <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>Here you can add more info, actions, or content for the selected badge.</Text>
                <TouchableOpacity
                  style={{ marginTop: 32, padding: 12, borderRadius: 8, backgroundColor: '#eee' }}
                  onPress={() => {
                    Animated.timing(cardAnim, { toValue: 0, duration: 350, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start(() => {
                      setExpanded(false);
                      setSelectedBadge(null);
                    });
                  }}
                >
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

