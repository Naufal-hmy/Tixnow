import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Riwayat Transaksi</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <HistoryItem
                    title="Cakra Khan: Symphony of giving"
                    date="15 Jan 2026, 10:30 WIB"
                    price="IDR 1.104.000"
                    status="Selesai"
                    isSuccess={true}
                />

                <HistoryItem
                    title="BigBang Fest 2025"
                    date="20 Des 2025, 14:00 WIB"
                    price="IDR 960.000"
                    status="Selesai"
                    isSuccess={true}
                />

                <HistoryItem
                    title="Indie Playground Bandung"
                    date="05 Nov 2025, 09:15 WIB"
                    price="IDR 450.000"
                    status="Dibatalkan"
                    isSuccess={false}
                />

            </ScrollView>
        </SafeAreaView>
    );
}

// --- KOMPONEN ITEM RIWAYAT ---
const HistoryItem = ({ title, date, price, status, isSuccess }) => (
    <TouchableOpacity style={styles.itemCard} activeOpacity={0.7}>
        <View style={styles.itemHeader}>
            <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color="#1E88E5" />
            </View>
            <View style={styles.itemTitleSection}>
                <Text style={styles.itemTitle} numberOfLines={1}>{title}</Text>
                <Text style={styles.itemDate}>{date}</Text>
            </View>
            <View style={[styles.statusBadge, !isSuccess && styles.statusBadgeFailed]}>
                <Text style={[styles.statusText, !isSuccess && styles.statusTextFailed]}>{status}</Text>
            </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.itemFooter}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>{price}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#FFF'
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },

    scrollContent: { padding: 20 },

    itemCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5
    },
    itemHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitleSection: { flex: 1 },
    itemTitle: { fontSize: 14, fontWeight: 'bold', color: '#333' },
    itemDate: { fontSize: 11, color: '#999', marginTop: 2 },

    statusBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    statusBadgeFailed: { backgroundColor: '#FFEBEE' },
    statusText: { fontSize: 10, color: '#4CAF50', fontWeight: 'bold' },
    statusTextFailed: { color: '#E53935' },

    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },

    itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { fontSize: 12, color: '#666' },
    totalValue: { fontSize: 14, fontWeight: 'bold', color: '#1E88E5' }
});