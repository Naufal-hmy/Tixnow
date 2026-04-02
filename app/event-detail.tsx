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

export default function EventDetailScreen() {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Image Header Section */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://picsum.photos/600/400?random=50' }}
                        style={styles.headerImage}
                    />

                    {/* Floating Buttons */}
                    <SafeAreaView style={styles.headerButtons} edges={['top']}>
                        <TouchableOpacity style={styles.circleBtn} onPress={() => router.back()}>
                            <MaterialCommunityIcons name="chevron-left" size={28} color="#1E88E5" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.circleBtn} onPress={() => setIsLiked(!isLiked)}>
                            <MaterialCommunityIcons
                                name={isLiked ? "heart" : "heart-outline"}
                                size={24}
                                color="#E53935"
                            />
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>

                {/* Content Section */}
                <View style={styles.contentWrapper}>
                    <Text style={styles.eventTitle}>Cakra Khan: Symphony of giving</Text>
                    <Text style={styles.createdBy}>Dibuat oleh, <Text style={{ color: '#1E88E5' }}>DinaEO</Text></Text>

                    {/* Info Rows */}
                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="map-marker" size={20} color="#E53935" />
                            <Text style={styles.infoText}>
                                Harris Hotel & Conventions Festival Citylink Bandung, Jalan Peta, Suka Asih, Bandung City, West Java, Indonesia, Bandung
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="calendar-month" size={20} color="#E53935" />
                            <Text style={styles.infoText}>31 Desember 2025</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="ticket-confirmation" size={20} color="#E53935" />
                            <Text style={styles.infoText}>Harga tiket mulai dari IDR 185.000</Text>
                        </View>
                    </View>

                    <Text style={styles.warningText}>Tiket tersedia, beli sebelum kehabisan</Text>

                    {/* Main Action Button */}
                    <TouchableOpacity
                        style={styles.buyBtn}
                        onPress={() => router.push('/buy-ticket')}
                    >
                        <Text style={styles.buyBtnText}>Beli Tiket Sekarang</Text>
                    </TouchableOpacity>

                    {/* Pricing Table Section */}
                    <View style={styles.tableCard}>
                        <Text style={styles.tableTitle}>Kategori dan Harga</Text>

                        <View style={styles.tableHeader}>
                            <Text style={styles.columnLabel}>Kategori</Text>
                            <Text style={styles.columnLabel}>Harga</Text>
                        </View>

                        <PriceRow label="Diamond" />
                        <PriceRow label="Platinum" />
                        <PriceRow label="Gold" />
                        <PriceRow label="Silver" />
                        <PriceRow label="Kategori" />
                        <PriceRow label="Kategori" isLast={true} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

// --- Komponen Baris Harga ---
const PriceRow = ({ label, isLast }) => (
    <View style={[styles.priceRow, isLast && { borderBottomWidth: 0 }]}>
        <Text style={styles.priceLabel}>{label}</Text>
        <Text style={styles.priceValue}>Harga</Text>
    </View>
);

// --- Styles ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    imageContainer: { width: width, height: 300, position: 'relative' },
    headerImage: { width: '100%', height: '100%', backgroundColor: '#EEE' },
    headerButtons: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    circleBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    contentWrapper: { padding: 20, marginTop: -20, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
    eventTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    createdBy: { fontSize: 13, color: '#666', marginTop: 5, marginBottom: 20 },

    infoSection: { gap: 15, marginBottom: 20 },
    infoRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
    infoText: { flex: 1, fontSize: 13, color: '#666', lineHeight: 18 },

    warningText: { fontSize: 12, color: '#333', marginBottom: 15 },
    buyBtn: { backgroundColor: '#1E88E5', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
    buyBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

    // Table Styles
    tableCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 15,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5
    },
    tableTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 15 },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD'
    },
    columnLabel: { fontSize: 13, fontWeight: 'bold', color: '#333' },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE'
    },
    priceLabel: { fontSize: 13, color: '#333', fontWeight: '500' },
    priceValue: { fontSize: 13, color: '#333', fontWeight: '500' }
});