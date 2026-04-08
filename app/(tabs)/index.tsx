import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authService } from '../../services/authService';
import { eventService } from '../../services/eventService';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width * 0.75 + 15;

export default function HomeScreen() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [events, setEvents] = useState([]);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const banners = [
    'https://picsum.photos/400/200?random=1',
    'https://picsum.photos/400/200?random=2',
    'https://picsum.photos/400/200?random=3'
  ];

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const userData = await authService.getCurrentProfile();
      setProfile(userData);
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / BANNER_WIDTH);
    setActiveBanner(currentIndex);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          <LinearGradient colors={['#1E88E5', '#FFFFFF']} style={styles.gradientHeader}>
            <View style={styles.header}>
              <View>
                <Text style={styles.greetingTitle}>Tikara</Text>
                <Text style={styles.greetingName}>Hallo, {profile?.full_name || 'User'}</Text>
              </View>
            </View>

            <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="magnify" size={24} color="#A0A0A0" style={styles.searchIcon} />
              <TextInput style={styles.searchInput} placeholder="Cari konser..." placeholderTextColor="#A0A0A0" />
            </View>
          </LinearGradient>

          {/* Saldo Dinamis & Klik ke TopUp */}
          <TouchableOpacity style={styles.walletCard} onPress={() => router.push('/topup')}>
            <View style={styles.walletTop}>
              <View style={styles.walletInfo}>
                <MaterialCommunityIcons name="wallet-outline" size={24} color="#1E88E5" />
                <Text style={styles.walletTitle}>Saldo Tikara</Text>
              </View>
              {/* Saldo asli dari database */}
              <Text style={styles.walletBalance}>Rp {profile?.balance?.toLocaleString('id-ID') || '0'}</Text>
            </View>
          </TouchableOpacity>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.bannerContainer}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            snapToInterval={BANNER_WIDTH}
            decelerationRate="fast"
          >
            {banners.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.bannerImage} />
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Konser Pilihan</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendationContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#1E88E5" style={{ marginLeft: 20 }} />
            ) : (
              events.map((eventData: any) => (
                <RecommendationCard key={eventData.id} event={eventData} />
              ))
            )}
          </ScrollView>
        </ScrollView>

        {/* FAB KHUSUS ORGANIZER (Scanner & Add Event) */}
        {profile?.role === 'organizer' && (
          <View style={{ position: 'absolute', bottom: 30, right: 20, gap: 10 }}>
            <TouchableOpacity
              style={[styles.fab, { backgroundColor: '#333' }]}
              onPress={() => router.push('/scanner')}
            >
              <MaterialCommunityIcons name="qrcode-scan" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fab}
              onPress={() => router.push('/create-event')}
            >
              <MaterialCommunityIcons name="plus" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// Sub Komponen Card
const RecommendationCard = ({ event }: any) => (
  <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/details', params: { id: event.id } })}>
    <Image source={{ uri: event.image_url }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle} numberOfLines={1}>{event.title}</Text>
      <Text style={styles.cardPrice}>Rp {event.price?.toLocaleString('id-ID')}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 100 },
  gradientHeader: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greetingTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFF' },
  greetingName: { fontSize: 14, color: '#E3F2FD' },
  searchContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 15, paddingHorizontal: 15, height: 50, alignItems: 'center', elevation: 5 },
  searchInput: { flex: 1, fontSize: 14 },
  walletCard: { backgroundColor: '#FFFFFF', marginHorizontal: 20, borderRadius: 15, marginTop: -30, elevation: 8, padding: 15 },
  walletTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  walletInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  walletTitle: { fontSize: 13, color: '#666' },
  walletBalance: { fontSize: 18, fontWeight: 'bold' },
  bannerContainer: { marginTop: 20 },
  bannerImage: { width: width * 0.75, height: 140, borderRadius: 20, marginRight: 15 },
  sectionHeader: { paddingHorizontal: 20, marginTop: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  recommendationContainer: { paddingHorizontal: 20, gap: 15, marginTop: 15 },
  card: { width: width * 0.5, backgroundColor: '#FFF', borderRadius: 15, overflow: 'hidden', elevation: 3, marginRight: 15 },
  cardImage: { width: '100%', height: 100 },
  cardContent: { padding: 10 },
  cardTitle: { fontWeight: 'bold', fontSize: 14 },
  cardPrice: { color: '#E53935', marginTop: 5, fontWeight: 'bold' },
  fab: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#1E88E5', justifyContent: 'center', alignItems: 'center', elevation: 10 },
});