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
import { supabase } from '../../lib/supabase';
import { EventModel, eventService } from '../../services/eventService';
// ... import lainnya sudah benar ...
import { authService } from '../../services/authService'; // <--- Pastikan import ini ada

export default function HomeScreen() {
  // 1. STATE UNTUK CAROUSEL BANNER (Tetap sama)
  const [activeBanner, setActiveBanner] = useState(0);
  const banners = [
    'https://picsum.photos/400/200?random=1',
    'https://picsum.photos/400/200?random=2',
    'https://picsum.photos/400/200?random=3',
    'https://picsum.photos/400/200?random=4'
  ];

  // 2. STATE UNTUK DATA (DITAMBAH userName)
  const [events, setEvents] = useState<EventModel[]>([]);
  const [userName, setUserName] = useState<string>('Antigraviters'); // <--- BARU: Default name
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. LOGIKA FETCH DATA (DITAMBAH Ambil Profil)
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // A. AMBIL PROFIL USER (BARU)
        const profile = await authService.getCurrentProfile();
        if (profile?.full_name) {
          setUserName(profile.full_name);
        }

        // B. AMBIL DATA EVENTS
        const data = await eventService.getAllEvents();
        setEvents(data);

      } catch (err: any) {
        setError(err.message || 'Gagal memuat data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  // ... fungsi handleScroll dan filterOptions tetap sama ...

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <LinearGradient colors={['#52A3DB', '#FFFFFF']} style={styles.gradientHeader}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greetingTitle}>Tixnow</Text>
              {/* SEKARANG PAKAI VARIABLE userName (BARU) */}
              <Text style={styles.greetingName}>Hallo {userName}</Text>
            </View>
            {/* ... sisa header icons tetap sama ... */}
          </View>
          {/* ... sisa search bar tetap sama ... */}
        </LinearGradient>

        {/* ... sisa konten Wallet, Banner, Kategori, dll tetap sama ... */}

      </ScrollView>
    </SafeAreaView>
  );
}

// ... Sisanya ke bawah (CategoryItem, RecommendationCard, Styles) tetap sama ...

// Di dalam fungsi Home() kamu, tambahkan ini:
useEffect(() => {
  console.log("Status Koneksi Supabase:", supabase ? "BERHASIL KONEK! ✅" : "GAGAL ❌");
}, []);

const { width } = Dimensions.get('window');

// Lebar satu banner + margin kanannya
const BANNER_WIDTH = width * 0.75 + 15;

export default function HomeScreen() {
  // 1. STATE UNTUK CAROUSEL BANNER
  const [activeBanner, setActiveBanner] = useState(0);
  const banners = [
    'https://picsum.photos/400/200?random=1',
    'https://picsum.photos/400/200?random=2',
    'https://picsum.photos/400/200?random=3',
    'https://picsum.photos/400/200?random=4'
  ];

  // 2. STATE UNTUK DATA EVENTS DARI SUPABASE
  const [events, setEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mengambil data saat layar Home dirender pertama kali
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Memanggil service untuk mengambil data event (Data Service Pattern)
        const data = await eventService.getAllEvents();
        setEvents(data);
      } catch (err: any) {
        setError(err.message || 'Gagal memuat data dari event server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Fungsi mendeteksi geseran carousel
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / BANNER_WIDTH);
    setActiveBanner(currentIndex);
  };

  // 2. STATE UNTUK FILTER (Sorotan, Populer, Terbaru)
  const [activeFilter, setActiveFilter] = useState('Sorotan');
  const filterOptions = [
    { id: 'Sorotan', icon: 'lightbulb-on-outline', color: '#FBC02D' },
    { id: 'Populer', icon: 'fire', color: '#E53935' },
    { id: 'Terbaru', icon: 'clock-outline', color: '#E53935' }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <LinearGradient colors={['#52A3DB', '#FFFFFF']} style={styles.gradientHeader}>
          {/* Header Profil & Notifikasi */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greetingTitle}>Tixnow</Text>
              <Text style={styles.greetingName}>Hallo Dina Nur Auliana</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="bell" size={20} color="#1E88E5" />
                <View style={styles.badge} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="bookmark" size={20} color="#1E88E5" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={24} color="#A0A0A0" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari event, artis dan kota"
              placeholderTextColor="#A0A0A0"
            />
          </View>
        </LinearGradient>

        {/* Card Saldo */}
        <View style={styles.walletCard}>
          <View style={styles.walletTop}>
            <View style={styles.walletInfo}>
              <MaterialCommunityIcons name="cash" size={24} color="#333" />
              <Text style={styles.walletTitle}>Saldo Tixnow</Text>
            </View>
            <TouchableOpacity style={styles.topupButton}>
              <Text style={styles.topupText}>Topup</Text>
              <MaterialCommunityIcons name="wallet-plus" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.walletBalance}>Rp. 280.000</Text>
          <View style={styles.walletBottom}>
            <Text style={styles.walletHistoryText}>Transaksi terakhir : Tiket Jaz Konser</Text>
            <TouchableOpacity style={styles.historyButton}>
              <Text style={styles.historyText}>Riwayat</Text>
              <MaterialCommunityIcons name="receipt" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banners (Carousel) YANG SUDAH AKTIF */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.bannerContainer}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={BANNER_WIDTH} // Bikin geserannya pas berhenti per gambar
          decelerationRate="fast"
        >
          {banners.map((img, index) => (
            <TouchableOpacity key={index} activeOpacity={0.9}>
              <Image source={{ uri: img }} style={styles.bannerImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Indikator Carousel yang ikut bergerak */}
        <View style={styles.carouselIndicators}>
          {banners.map((_, index) => (
            <View key={index} style={[styles.dot, activeBanner === index && styles.dotActive]} />
          ))}
        </View>

        {/* Kategori YANG BISA DIKLIK */}
        <View style={styles.categoryContainer}>
          <CategoryItem icon="music-note" title="Musik" />
          <CategoryItem icon="microphone-variant" title="Konser" />
          <CategoryItem icon="tent" title="Festival" />
          <CategoryItem icon="drama-masks" title="Teater" />
          <CategoryItem icon="saxophone" title="Jazz" />
        </View>

        {/* Rekomendasi Untuk Kamu */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rekomendasi Untuk Kamu</Text>
        </View>

        {/* Filter Chips YANG BISA DIPILIH */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setActiveFilter(filter.id)}
              >
                <MaterialCommunityIcons
                  name={filter.icon}
                  size={16}
                  color={isActive ? filter.color : "#A0A0A0"}
                />
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{filter.id}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Rekomendasi Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendationContainer}>
          {isLoading ? (
            // Indikator loading saat memuat data events
            <View style={{ width: width * 0.55, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#1E88E5" />
            </View>
          ) : error ? (
            // Menampilkan pesan error jika terjadi kegagalan fetching (Error Handling)
            <View style={{ width: width * 0.55, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#E53935', textAlign: 'center' }}>{error}</Text>
            </View>
          ) : events.length === 0 ? (
            // Tampilan jika tabel event masih kosong di database
            <View style={{ width: width * 0.55, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#666', textAlign: 'center' }}>Belum ada event tersedia saat ini.</Text>
            </View>
          ) : (
            // Merender array data aktual dari API Supabase
            events.map((eventData) => (
              <RecommendationCard key={eventData.id} event={eventData} />
            ))
          )}
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- KOMPONEN KECIL ---

// Komponen Kategori (Sudah pakai TouchableOpacity agar ada efek klik)
const CategoryItem = ({ icon, title }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={styles.categoryIconBg}><MaterialCommunityIcons name={icon} size={28} color="#1E88E5" /></View>
    <Text style={styles.categoryText}>{title}</Text>
  </TouchableOpacity>
);

// Komponen Card Konser (Sudah ditambahkan State untuk tombol Heart/Love)
const RecommendationCard = ({ event }: { event?: EventModel }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Nilai fallbacks yang proper (Default parameters) jika dari API null
  const displayTitle = event?.title || 'Cakra Khan: Symphony of giving';
  const displayOrganizer = event?.organizer || 'Abogrup';
  const displayDate = event?.date || '31 Desember 2025';
  const displayOriginalPrice = event?.originalPrice ? `IDR ${event.originalPrice.toLocaleString('id-ID')}` : 'IDR 1.500.000';
  const displayDiscountPrice = event?.discountPrice ? `IDR ${event.discountPrice.toLocaleString('id-ID')}` : 'IDR 1.000.000';
  const displayCategory = event?.category || 'Musik';
  const displayImage = event?.imageUrl || 'https://picsum.photos/300/200?random=5';

  return (
    // TAMBAHKAN DI SINI (Paling luar)
    // Pastikan navigasi route expo dipassing dengan sesuai
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      // Router path yang lebih dinamis untuk handling specific detail
      onPress={() => router.push(event ? `/event-detail?id=${event.id}` : '/event-detail')}
    >
      <Image source={{ uri: displayImage }} style={styles.cardImage} />

      {/* Tombol Love - JANGAN DIUBAH, biarkan dia mengurus Like saja */}
      <TouchableOpacity
        style={styles.cardLikeButton}
        onPress={() => setIsLiked(!isLiked)}
      >
        <MaterialCommunityIcons
          name={isLiked ? "heart" : "heart-outline"}
          size={20}
          color={isLiked ? "#E53935" : "#A0A0A0"}
        />
      </TouchableOpacity>

      <View style={styles.cardCategoryBadge}>
        <MaterialCommunityIcons name="music-note" size={12} color="#666" />
        <Text style={styles.cardCategoryText}>{displayCategory}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{displayTitle}</Text>
        <View style={styles.cardDetailRow}><MaterialCommunityIcons name="account" size={14} color="#666" /><Text style={styles.cardDetailText}>{displayOrganizer}</Text></View>
        <View style={styles.cardDetailRow}><MaterialCommunityIcons name="calendar" size={14} color="#666" /><Text style={styles.cardDetailText}>{displayDate}</Text></View>
        <Text style={styles.cardPriceStrike}>{displayOriginalPrice}</Text>
        <Text style={styles.cardPrice}>{displayDiscountPrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

// --- GAYA TAMPILAN ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 30 },
  gradientHeader: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 60, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greetingTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  greetingName: { fontSize: 14, color: '#E0F2FE', marginTop: 4 },
  headerIcons: { flexDirection: 'row', gap: 10 },
  iconButton: { backgroundColor: '#FFFFFF', padding: 8, borderRadius: 20, position: 'relative' },
  badge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, backgroundColor: '#E53935', borderRadius: 4 },
  searchContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 15, height: 50, alignItems: 'center' },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  walletCard: { backgroundColor: '#FFFFFF', marginHorizontal: 20, borderRadius: 12, marginTop: -40, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  walletTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingBottom: 5 },
  walletInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  walletTitle: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  topupButton: { flexDirection: 'row', backgroundColor: '#1E88E5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, alignItems: 'center', gap: 4 },
  topupText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  walletBalance: { fontSize: 20, fontWeight: 'bold', color: '#333', paddingHorizontal: 15, paddingBottom: 15 },
  walletBottom: { backgroundColor: '#1E88E5', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  walletHistoryText: { color: '#FFFFFF', fontSize: 12, flex: 1 },
  historyButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  historyText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },

  // Banner 
  bannerContainer: { marginTop: 20 },
  bannerImage: { width: width * 0.75, height: 120, borderRadius: 12, marginRight: 15, backgroundColor: '#E0E0E0' },
  carouselIndicators: { flexDirection: 'row', justifyContent: 'center', marginTop: 15, gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D9D9D9' },
  dotActive: { backgroundColor: '#1E88E5', width: 20 }, // Sedikit dilebarkan saat aktif biar lebih estetik

  categoryContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 25 },
  categoryItem: { alignItems: 'center', gap: 8 },
  categoryIconBg: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center' },
  categoryText: { fontSize: 12, color: '#333', fontWeight: '500' },
  sectionHeader: { paddingHorizontal: 20, marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  filterContainer: { paddingHorizontal: 20, marginBottom: 15, gap: 10 },
  filterChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E0E0E0', gap: 6 },
  filterChipActive: { backgroundColor: '#E1F5FE', borderColor: '#1E88E5' }, // Background biru muda kalau aktif
  filterText: { fontSize: 13, color: '#666' },
  filterTextActive: { color: '#1E88E5', fontWeight: 'bold' },
  recommendationContainer: { paddingHorizontal: 20, gap: 15 },
  card: { width: width * 0.55, backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, marginRight: 15 },
  cardImage: { width: '100%', height: 120, backgroundColor: '#E0E0E0' },
  cardLikeButton: { position: 'absolute', top: 10, left: 10, backgroundColor: '#FFFFFF', padding: 6, borderRadius: 15, elevation: 2 },
  cardCategoryBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  cardCategoryText: { fontSize: 10, color: '#666', fontWeight: 'bold' },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 8, height: 38 },
  cardDetailRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  cardDetailText: { fontSize: 11, color: '#666' },
  cardPriceStrike: { fontSize: 10, color: '#A0A0A0', textDecorationLine: 'line-through', marginTop: 6 },
  cardPrice: { fontSize: 14, fontWeight: 'bold', color: '#E53935', marginTop: 2 },
});