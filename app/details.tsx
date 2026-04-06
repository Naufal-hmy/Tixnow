import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function DetailsScreen() {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Banner Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://picsum.photos/600/400?random=10' }}
                        style={styles.bannerImage}
                    />
                    {/* Custom Header on top of Image */}
                    <SafeAreaView style={styles.headerOverlay}>
                        <TouchableOpacity style={styles.iconCircle} onPress={() => router.back()}>
                            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconCircle}
                            onPress={() => setIsFavorite(!isFavorite)}
                        >
                            <MaterialCommunityIcons
                                name={isFavorite ? "heart" : "heart-outline"}
                                size={24}
                                color={isFavorite ? "#E53935" : "#000"}
                            />
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>

                {/* Content Section */}
                <View style={styles.content}>
                    <Text style={styles.category}>Musik • Pop</Text>
                    <Text style={styles.title}>Cakra Khan: Symphony of Giving</Text>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="calendar-clock" size={20} color="#1E88E5" />
                        <View>
                            <Text style={styles.infoLabel}>Waktu & Tanggal</Text>
                            <Text style={styles.infoValue}>31 Desember 2025 • 19:00 WIB</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="map-marker-radius" size={20} color="#1E88E5" />
                        <View>
                            <Text style={styles.infoLabel}>Lokasi</Text>
                            <Text style={styles.infoValue}>Bandung Convention Center, Bandung</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Deskripsi */}
                    <Text style={styles.sectionTitle}>Tentang Event</Text>
                    <Text style={styles.description}>
                        Nikmati malam tahun baru yang tak terlupakan bersama Cakra Khan dalam konser amal bertajuk "Symphony of Giving". Seluruh hasil penjualan tiket akan didonasikan untuk pengembangan pendidikan di daerah terpencil. Jangan lewatkan penampilan spesial dan kolaborasi unik lainnya!
                    </Text>

                    <View style={styles.divider} />

                    {/* Talent / Artist */}
                    <Text style={styles.sectionTitle}>Artis</Text>
                    <View style={styles.artistCard}>
                        <Image
                            source={{ uri: 'https://picsum.photos/100/100?random=50' }}
                            style={styles.artistPhoto}
                        />
                        <View>
                            <Text style={styles.artistName}>Cakra Khan</Text>
                            <Text style={styles.artistRole}>Penyanyi Utama</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Sticky Bar (Harga & Tombol Beli) */}
            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.priceLabel}>Mulai dari</Text>
                    <Text style={styles.priceValue}>IDR 960.000</Text>
                </View>
                <TouchableOpacity
                    style={styles.buyBtn}
                    onPress={() => router.push('/buy-ticket')} // Arahkan ke halaman pilih tiket
                >
                    <Text style={styles.buyBtnText}>Beli Tiket</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    imageContainer: { position: 'relative' },
    bannerImage: { width: width, height: 300 },
    headerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    iconCircle: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: 8,
        borderRadius: 20,
        marginTop: 10
    },
    content: { padding: 20 },
    category: { color: '#1E88E5', fontWeight: 'bold', fontSize: 12, marginBottom: 5 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },

    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 15 },
    infoLabel: { fontSize: 12, color: '#999' },
    infoValue: { fontSize: 14, color: '#333', fontWeight: '500' },

    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 20 },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    description: { fontSize: 14, color: '#666', lineHeight: 22 },

    artistCard: { flexDirection: 'row', alignItems: 'center', gap: 15, backgroundColor: '#F8F9FA', padding: 10, borderRadius: 12 },
    artistPhoto: { width: 50, height: 50, borderRadius: 25 },
    artistName: { fontSize: 15, fontWeight: 'bold' },
    artistRole: { fontSize: 12, color: '#666' },

    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 35, // Tambahan padding buat HP tanpa home button fisik
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        backgroundColor: '#FFF'
    },
    priceLabel: { fontSize: 12, color: '#666' },
    priceValue: { fontSize: 18, fontWeight: 'bold', color: '#1E88E5' },
    buyBtn: { backgroundColor: '#1E88E5', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10 },
    buyBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});