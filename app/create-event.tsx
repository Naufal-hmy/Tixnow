import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { eventService } from '../services/eventService';

export default function CreateEventScreen() {
    const [form, setForm] = useState({
        title: '',
        category: 'Musik',
        date: '',
        location: '',
        price: '',
        image_url: 'https://picsum.photos/600/400', // Default gambar biar gak ribet copas link
        description: ''
    });

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        // 1. Validasi Input
        if (!form.title || !form.price || !form.date || !form.location) {
            return Alert.alert("Eits!", "Mohon isi Judul, Tanggal, Lokasi, dan Harga.");
        }

        const priceValue = parseInt(form.price);
        if (isNaN(priceValue)) {
            return Alert.alert("Error", "Harga harus berupa angka.");
        }

        try {
            setLoading(true);

            // 2. Kirim ke Database dengan status 'pending'
            const { error } = await eventService.createEvent({
                ...form,
                price: priceValue,
                status: 'pending' // Wajib pending agar diverifikasi admin dulu
            });

            if (error) throw error;

            Alert.alert("Sukses! 🎉", "Event berhasil diajukan. Tunggu verifikasi admin agar muncul di Beranda ya!", [
                { text: "Mantap", onPress: () => router.replace('/(tabs)') }
            ]);

        } catch (error: any) {
            Alert.alert("Gagal Terbit", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Navigasi */}
            <View style={styles.headerNav}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Panel Organizer</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Buat Event Baru</Text>
                <Text style={styles.subtitle}>Event yang kamu buat akan ditinjau oleh tim Tikara sebelum diterbitkan.</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nama Event *</Text>
                    <TextInput style={styles.input} placeholder="Contoh: Konser Tulus 2026" onChangeText={(t) => setForm({ ...form, title: t })} />
                </View>

                <View style={styles.row}>
                    <View style={[styles.formGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Kategori</Text>
                        <TextInput style={styles.input} placeholder="Pop/Festival" onChangeText={(t) => setForm({ ...form, category: t })} />
                    </View>
                    <View style={[styles.formGroup, { flex: 1, marginLeft: 15 }]}>
                        <Text style={styles.label}>Harga Tiket *</Text>
                        <TextInput style={styles.input} placeholder="500000" keyboardType="numeric" onChangeText={(t) => setForm({ ...form, price: t })} />
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Tanggal Pelaksanaan *</Text>
                    <TextInput style={styles.input} placeholder="Contoh: 15 Mei 2026" onChangeText={(t) => setForm({ ...form, date: t })} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Lokasi / Venue *</Text>
                    <TextInput style={styles.input} placeholder="Contoh: Istora Senayan, Jakarta" onChangeText={(t) => setForm({ ...form, location: t })} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Deskripsi Event</Text>
                    <TextInput style={[styles.input, styles.textArea]} placeholder="Detail acara..." multiline onChangeText={(t) => setForm({ ...form, description: t })} />
                </View>

                <TouchableOpacity
                    style={[styles.btn, loading && { backgroundColor: '#A0A0A0' }]}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#FFF" /> : (
                        <>
                            <MaterialCommunityIcons name="rocket-launch" size={20} color="#FFF" />
                            <Text style={styles.btnText}>Ajukan Verifikasi</Text>
                        </>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    content: { padding: 20, paddingBottom: 40 },
    sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E88E5', marginBottom: 5 },
    subtitle: { fontSize: 13, color: '#666', marginBottom: 25 },
    formGroup: { marginBottom: 15 },
    row: { flexDirection: 'row' },
    label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
    input: { borderWidth: 1, borderColor: '#EEE', padding: 12, borderRadius: 10, backgroundColor: '#FAFAFA' },
    textArea: { height: 80, textAlignVertical: 'top' },
    btn: { backgroundColor: '#1E88E5', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'center', gap: 10 },
    btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});