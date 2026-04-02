import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventScreen() {
    // Nama hari
    const days = ['SEN', 'Sel', 'Rab', 'Ka M', 'JUM', 'SAB', 'MIN'];

    // Tanggal 1-31
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);

    // State untuk tanggal yang diklik
    const [selectedDate, setSelectedDate] = useState(19);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header Halaman */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Event</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Card Kalender */}
                <View style={styles.calendarCard}>
                    <View style={styles.calendarHeader}>
                        <TouchableOpacity><MaterialCommunityIcons name="chevron-left" size={24} color="#A0A0A0" /></TouchableOpacity>
                        <Text style={styles.monthTitle}>Desmeber 2025</Text>
                        <TouchableOpacity><MaterialCommunityIcons name="chevron-right" size={24} color="#A0A0A0" /></TouchableOpacity>
                    </View>

                    {/* Nama Hari */}
                    <View style={styles.daysContainer}>
                        {days.map((day, index) => (
                            <Text key={index} style={styles.dayText}>{day}</Text>
                        ))}
                    </View>

                    {/* Grid Tanggal */}
                    <View style={styles.datesGrid}>
                        {dates.map((date) => {
                            const isFirst = date === 1;
                            const isSelected = selectedDate === date;

                            return (
                                <TouchableOpacity
                                    key={date}
                                    activeOpacity={0.7}
                                    style={[
                                        styles.dateItem,
                                        isFirst && styles.firstDateBg, // Biru penuh untuk tanggal 1
                                        isSelected && !isFirst && styles.selectedDateBorder // Outline biru untuk pilihan
                                    ]}
                                    onPress={() => setSelectedDate(date)}
                                >
                                    <Text style={[
                                        styles.dateText,
                                        isFirst && styles.whiteText, // Putih khusus tanggal 1
                                        isSelected && !isFirst && styles.blueText // Biru untuk pilihan lainnya
                                    ]}>
                                        {date}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* List Event */}
                <View style={styles.eventList}>
                    <EventItem
                        image="https://picsum.photos/200/200?random=20"
                        title="BigBang Fest 2025"
                        category="Konser"
                        promotor="Abogrup"
                        location="Bandung, Jawa Barat"
                        date="31 Desember 2025"
                        price="IDR 960.000"
                    />
                    <EventItem
                        image="https://picsum.photos/200/200?random=21"
                        title="Cakra Khan: Symphony of giving"
                        category="Musik"
                        promotor="Abogrup"
                        location="Bandung, Jawa Barat"
                        date="31 Desember 2025"
                        price="IDR 960.000"
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

// --- Komponen Item Event ---
const EventItem = ({ image, title, category, promotor, location, date, price }) => {
    const [isLiked, setIsLiked] = useState(false);
    return (
        <TouchableOpacity style={styles.eventCard} activeOpacity={0.8}
            onPress={() => router.push('/event-detail')}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.eventImage} />
                <TouchableOpacity style={styles.heartBtn} onPress={() => setIsLiked(!isLiked)}>
                    <MaterialCommunityIcons name={isLiked ? "heart" : "heart-outline"} size={20} color="#E53935" />
                </TouchableOpacity>
            </View>

            <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{title}</Text>

                <View style={styles.tagBadge}>
                    <MaterialCommunityIcons name="music-note" size={12} color="#666" />
                    <Text style={styles.tagText}>{category}</Text>
                </View>

                <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="account" size={14} color="#666" />
                    <Text style={styles.detailText}>Diselenggarakan <Text style={{ color: '#52A3DB' }}>{promotor}</Text></Text>
                </View>

                <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="map-marker-outline" size={14} color="#666" />
                    <Text style={styles.detailText}>{location}</Text>
                </View>

                <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={14} color="#666" />
                    <Text style={styles.detailText}>{date}</Text>
                </View>

                <Text style={styles.priceText}>{price}</Text>
            </View>
        </TouchableOpacity>
    );
}

// --- Styles ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { paddingHorizontal: 20, paddingVertical: 15 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#000' },
    scrollContent: { paddingBottom: 30 },

    // Kalender
    calendarCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 15,
        padding: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 25
    },
    calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    monthTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E3A5F' },
    daysContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    dayText: { width: 40, textAlign: 'center', fontSize: 12, color: '#A0A0A0' },
    datesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },

    // Item Tanggal
    dateItem: {
        width: 38,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        marginBottom: 8,
        borderRadius: 19
    },
    dateText: { fontSize: 14, color: '#1E3A5F' },

    // Logika Warna
    firstDateBg: { backgroundColor: '#52A3DB' },
    selectedDateBorder: { borderWidth: 2, borderColor: '#52A3DB' },
    whiteText: { color: '#FFFFFF', fontWeight: 'bold' },
    blueText: { color: '#52A3DB', fontWeight: 'bold' },

    // Event List
    eventList: { paddingHorizontal: 20, gap: 15 },
    eventCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#F5F5F5'
    },
    imageWrapper: { position: 'relative' },
    eventImage: { width: 100, height: 125, borderRadius: 12, backgroundColor: '#EEE' },
    heartBtn: { position: 'absolute', top: 5, left: 5, backgroundColor: '#FFF', padding: 5, borderRadius: 15, elevation: 2 },
    eventInfo: { flex: 1, marginLeft: 15, justifyContent: 'space-between' },
    eventTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E3A5F', marginBottom: 4 },
    tagBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#F5F5F5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, gap: 4, marginBottom: 4 },
    tagText: { fontSize: 10, color: '#666', fontWeight: 'bold' },
    detailRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
    detailText: { fontSize: 11, color: '#666' },
    priceText: { fontSize: 14, fontWeight: 'bold', color: '#E53935', textAlign: 'right', marginTop: 5 }
});