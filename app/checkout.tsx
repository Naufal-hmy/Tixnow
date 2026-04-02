import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckoutScreen() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ringkasan Pesanan</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Info Event Singkat */}
                <View style={styles.eventCard}>
                    <Image
                        source={{ uri: 'https://picsum.photos/200/200?random=100' }}
                        style={styles.eventImage}
                    />
                    <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle} numberOfLines={1}>Cakra Khan: Symphony of giving</Text>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="calendar" size={14} color="#666" />
                            <Text style={styles.infoText}>31 Desember 2025</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="map-marker" size={14} color="#666" />
                            <Text style={styles.infoText} numberOfLines={1}>Bandung Convention Center</Text>
                        </View>
                    </View>
                </View>

                {/* Detail Tiket */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detail Tiket</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Silver (1x)</Text>
                        <Text style={styles.detailValue}>IDR 960.000</Text>
                    </View>
                </View>

                {/* Rincian Biaya */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rincian Biaya</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total Harga Tiket</Text>
                        <Text style={styles.detailValue}>IDR 960.000</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Pajak (10%)</Text>
                        <Text style={styles.detailValue}>IDR 96.000</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Biaya Layanan</Text>
                        <Text style={styles.detailValue}>IDR 48.000</Text>
                    </View>
                    <View style={[styles.detailRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Pembayaran</Text>
                        <Text style={styles.totalValue}>IDR 1.104.000</Text>
                    </View>
                </View>

                {/* Metode Pembayaran */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
                    <TouchableOpacity style={styles.paymentSelector}>
                        <View style={styles.paymentLeft}>
                            <MaterialCommunityIcons name="wallet-outline" size={24} color="#1E88E5" />
                            <Text style={styles.paymentText}>Saldo Tixnow (Rp 280.000)</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="#A0A0A0" />
                    </TouchableOpacity>
                    <Text style={styles.paymentWarning}>Saldo tidak cukup, silakan pilih metode lain</Text>
                </View>

            </ScrollView>

            {/* Button Bayar */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.payBtn}
                    onPress={() => {
                        alert('Pembayaran Berhasil!');
                        // Setelah bayar, kita arahkan ke tab Tiket
                        router.replace('/(tabs)/ticket');
                    }}
                >
                    <Text style={styles.payBtnText}>Bayar Sekarang</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 15 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },

    scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },

    eventCard: { flexDirection: 'row', backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, marginBottom: 25 },
    eventImage: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#EEE' },
    eventInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
    eventTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
    infoText: { fontSize: 11, color: '#666' },

    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },

    detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    detailLabel: { fontSize: 14, color: '#666' },
    detailValue: { fontSize: 14, color: '#333', fontWeight: '500' },

    totalRow: { marginTop: 10, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#EEE' },
    totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    totalValue: { fontSize: 16, fontWeight: 'bold', color: '#E53935' },

    paymentSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FAFAFA'
    },
    paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    paymentText: { fontSize: 14, color: '#333', fontWeight: '500' },
    paymentWarning: { fontSize: 11, color: '#E53935', marginTop: 8, fontStyle: 'italic' },

    footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#EEE' },
    payBtn: { backgroundColor: '#1E88E5', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    payBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});