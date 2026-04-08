import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

const { width } = Dimensions.get('window');

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // 1. Ambil Detail Event saat halaman dibuka
    useEffect(() => {
        fetchEventDetail();
    }, [id]);

    const fetchEventDetail = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setEvent(data);
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // 2. Fungsi Beli Tiket dengan Logika Saldo
    const handleBuyTicket = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return Alert.alert('Eits!', 'Login dulu ya.');

            // A. Cek Saldo User di Tabel Profiles
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('balance')
                .eq('id', user.id)
                .single();

            if (profileError) throw profileError;

            // B. Validasi: Apakah saldo cukup?
            if (profile.balance < event.price) {
                return Alert.alert(
                    "Saldo Kurang!",
                    `Saldo kamu: Rp ${profile.balance.toLocaleString('id-ID')}\nHarga tiket: Rp ${event.price.toLocaleString('id-ID')}\n\nSilakan top up dulu di Beranda!`
                );
            }

            // C. Proses Potong Saldo
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ balance: profile.balance - event.price })
                .eq('id', user.id);

            if (updateError) throw updateError;

            // D. Masukkan data ke Tabel Orders
            const { error: orderError } = await supabase.from('orders').insert({
                user_id: user.id,
                event_id: event.id,
                total_price: event.price,
                status: 'success',
                is_checked_in: false
            });

            if (orderError) throw orderError;

            Alert.alert("Berhasil! 🎉", "Tiket sudah aman, cek di menu Tiket Saya.", [
                { text: "Lihat Tiket", onPress: () => router.push('/my-tickets') }
            ]);

        } catch (error: any) {
            Alert.alert("Gagal", error.message);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E88E5" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail Event</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: event?.image_url }} style={styles.image} />
                <View style={styles.content}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{event?.category || 'Music'}</Text>
                    </View>
                    <Text style={styles.title}>{event?.title}</Text>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="calendar-clock" size={20} color="#1E88E5" />
                        <Text style={styles.infoText}>{event?.date}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="map-marker" size={20} color="#1E88E5" />
                        <Text style={styles.infoText}>{event?.location}</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Tentang Event</Text>
                    <Text style={styles.description}>
                        {event?.description || "Nikmati pengalaman konser luar biasa di Tikara!"}
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View>
                    <Text style={styles.priceLabel}>Harga Tiket</Text>
                    <Text style={styles.priceValue}>Rp {event?.price?.toLocaleString('id-ID')}</Text>
                </View>
                <TouchableOpacity style={styles.buyButton} onPress={handleBuyTicket}>
                    <Text style={styles.buyButtonText}>Beli Tiket</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
    headerTitle: { fontSize: 16, fontWeight: 'bold' },
    backButton: { padding: 8, backgroundColor: '#F5F5F5', borderRadius: 12 },
    image: { width: width, height: 250 },
    content: { padding: 20 },
    categoryBadge: { backgroundColor: '#E3F2FD', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginBottom: 10 },
    categoryText: { color: '#1E88E5', fontWeight: 'bold', fontSize: 12 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 15 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
    infoText: { color: '#666', fontSize: 14 },
    divider: { height: 1, backgroundColor: '#EEE', marginVertical: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    description: { fontSize: 14, color: '#666', lineHeight: 22 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF' },
    priceLabel: { fontSize: 12, color: '#999' },
    priceValue: { fontSize: 18, fontWeight: 'bold', color: '#E53935' },
    buyButton: { backgroundColor: '#1E88E5', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 12 },
    buyButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});