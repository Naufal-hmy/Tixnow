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

export default function BookmarksScreen() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Favorit Saya</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Item Favorit 1 */}
                <BookmarkItem
                    title="Cakra Khan: Symphony of giving"
                    date="31 Des 2025"
                    location="Bandung Convention Center"
                    image="https://picsum.photos/200/200?random=1"
                />

                {/* Item Favorit 2 */}
                <BookmarkItem
                    title="Tulus: Tur Manusia"
                    date="10 Feb 2026"
                    location="Istora Senayan, Jakarta"
                    image="https://picsum.photos/200/200?random=2"
                />

                {/* Item Favorit 3 */}
                <BookmarkItem
                    title="Coldplay: Music of the Spheres"
                    date="15 Mei 2026"
                    location="Stadion Utama GBK"
                    image="https://picsum.photos/200/200?random=3"
                />

            </ScrollView>
        </SafeAreaView>
    );
}

// --- KOMPONEN ITEM FAVORIT ---
const BookmarkItem = ({ title, date, location, image }) => (
    <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => router.push('/details')}
    >
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <View style={styles.row}>
                <MaterialCommunityIcons name="calendar" size={14} color="#666" />
                <Text style={styles.detailText}>{date}</Text>
            </View>
            <View style={styles.row}>
                <MaterialCommunityIcons name="map-marker" size={14} color="#666" />
                <Text style={styles.detailText} numberOfLines={1}>{location}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.removeBtn}>
            <MaterialCommunityIcons name="heart" size={22} color="#E53935" />
        </TouchableOpacity>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },

    scrollContent: { padding: 20 },

    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        alignItems: 'center'
    },
    image: { width: 70, height: 70, borderRadius: 10, backgroundColor: '#EEE' },
    info: { flex: 1, marginLeft: 15, justifyContent: 'center' },
    title: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 2 },
    detailText: { fontSize: 12, color: '#666' },

    removeBtn: { padding: 10 }
});