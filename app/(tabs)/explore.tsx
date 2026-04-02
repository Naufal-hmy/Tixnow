import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.innerContainer}>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#A0A0A0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari event, artis dan kota"
            placeholderTextColor="#A0A0A0"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Pencarian Populer (History) */}
          <Text style={styles.sectionTitle}>Pencarian Populer</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            <SearchChip text="Coldplay" />
            <SearchChip text="Jaz Festival" />
          </ScrollView>

          {/* Filter Bar (Kategori, Lokasi, Harga) */}
          <Text style={styles.sectionTitle}>Pencarian Populer</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            <TouchableOpacity style={styles.filterIconBtn}>
              <MaterialCommunityIcons name="tune-vertical" size={20} color="#333" />
            </TouchableOpacity>
            <FilterChip text="Kategori" />
            <FilterChip text="Lokasi" />
            <FilterChip text="Harga" />
            <FilterChip text="Tanggal" />
          </ScrollView>

          {/* List Event (Vertical) */}
          <View style={styles.listContainer}>
            <EventListCard
              image="https://picsum.photos/200/200?random=10"
              title="Cakra Khan: Symphony of giving"
              category="Musik"
              promotor="Abogrup"
              location="Bandung, Jawa Barat"
              date="31 Desember 2025"
              price="IDR 960.000"
            />
            <EventListCard
              image="https://picsum.photos/200/200?random=11"
              title="Cakra Khan: Symphony of giving"
              category="Jazz"
              promotor="Abogrup"
              location="Bandung, Jawa Barat"
              date="31 Desember 2025"
              price="IDR 960.000"
            />
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// --- KOMPONEN KECIL ---

// Komponen Chip Riwayat Pencarian (ada tombol X)
const SearchChip = ({ text }) => (
  <TouchableOpacity style={styles.searchChip}>
    <MaterialCommunityIcons name="magnify" size={16} color="#666" style={{ marginRight: 6 }} />
    <Text style={styles.searchChipText}>{text}</Text>
    <MaterialCommunityIcons name="close-circle" size={16} color="#A0A0A0" style={{ marginLeft: 6 }} />
  </TouchableOpacity>
);

// Komponen Chip Dropdown Filter
const FilterChip = ({ text }) => (
  <TouchableOpacity style={styles.filterChip}>
    <Text style={styles.filterChipText}>{text}</Text>
    <MaterialCommunityIcons name="chevron-down" size={18} color="#666" style={{ marginLeft: 4 }} />
  </TouchableOpacity>
);

// Komponen Kartu Event Horizontal
const EventListCard = ({ image, title, category, promotor, location, date, price }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    // onPress ditambahkan agar memunculkan pesan saat diklik
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.6}
      onPress={() => router.push('/event-detail')}
    >

      {/* Gambar Kiri */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <TouchableOpacity
          style={styles.cardLikeButton}
          onPress={() => setIsLiked(!isLiked)}
        >
          <MaterialCommunityIcons
            name={isLiked ? "heart" : "heart-outline"}
            size={18}
            color={isLiked ? "#E53935" : "#E53935"} 
          />
        </TouchableOpacity>
      </View>

      {/* Konten Kanan */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>

        <View style={styles.categoryBadge}>
          <MaterialCommunityIcons name="music-note" size={12} color="#666" />
          <Text style={styles.categoryBadgeText}>{category}</Text>
        </View>

        <View style={styles.cardDetailRow}>
          <MaterialCommunityIcons name="account" size={14} color="#666" />
          <Text style={styles.cardDetailText}>{promotor}</Text>
        </View>
        <View style={styles.cardDetailRow}>
          <MaterialCommunityIcons name="calendar" size={14} color="#666" />
          <Text style={styles.cardDetailText}>{location}</Text>
        </View>
        <View style={styles.cardDetailRow}>
          <MaterialCommunityIcons name="calendar-month-outline" size={14} color="#666" />
          <Text style={styles.cardDetailText}>{date}</Text>
        </View>

        <Text style={styles.cardPrice}>{price}</Text>
      </View>

    </TouchableOpacity>
  );
};

// --- GAYA TAMPILAN ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  innerContainer: { flex: 1, paddingTop: 10 },

  // Search Bar
  searchContainer: { flexDirection: 'row', backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: 15, height: 50, alignItems: 'center', marginHorizontal: 20, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },

  scrollContent: { paddingBottom: 30 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginHorizontal: 20, marginTop: 10, marginBottom: 12 },
  horizontalScroll: { paddingHorizontal: 20, marginBottom: 20, gap: 10 },

  // Chips
  searchChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E0E0E0' },
  searchChipText: { fontSize: 13, color: '#333' },

  filterIconBtn: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#E0E0E0' },
  filterChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 14, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#E0E0E0' },
  filterChipText: { fontSize: 13, color: '#333' },

  // List Container
  listContainer: { paddingHorizontal: 20, gap: 16 },

  // Horizontal Card Style
  card: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 10, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, borderWidth: 1, borderColor: '#F0F0F0' },
  imageContainer: { position: 'relative' },
  cardImage: { width: 110, height: 110, borderRadius: 10, backgroundColor: '#E0E0E0' },
  cardLikeButton: { position: 'absolute', top: 6, left: 6, backgroundColor: '#FFFFFF', padding: 5, borderRadius: 15, elevation: 2 },

  cardContent: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E88E5', marginBottom: 4 }, // Biru sesuai desain

  categoryBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E1F5FE', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 6, gap: 4 },
  categoryBadgeText: { fontSize: 10, color: '#1E88E5', fontWeight: 'bold' },

  cardDetailRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  cardDetailText: { fontSize: 11, color: '#666' },

  cardPrice: { fontSize: 14, fontWeight: 'bold', color: '#E53935', textAlign: 'right', marginTop: 8 },
});