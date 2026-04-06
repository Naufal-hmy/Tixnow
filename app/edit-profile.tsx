import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
    // State untuk input (bisa diisi data default user)
    const [name, setName] = useState('Dina Nur Auliana');
    const [email, setEmail] = useState('dinanr.aulia@gmail.com');
    const [phone, setPhone] = useState('081234567890');

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Custom */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ubah Profil</Text>
                <View style={{ width: 24 }} /> {/* Spacer agar judul tetap di tengah */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Foto Profil Section */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarCircle}>
                        <MaterialCommunityIcons name="account" size={60} color="#A0A0A0" />
                        <TouchableOpacity style={styles.cameraBtn}>
                            <MaterialCommunityIcons name="camera" size={18} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.changePhotoText}>Ganti Foto Profil</Text>
                </View>

                {/* Form Input */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nama Lengkap</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Masukkan nama lengkap"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            placeholder="Masukkan email"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nomor Telepon</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholder="Masukkan nomor telepon"
                        />
                    </View>
                </View>

                {/* Tombol Simpan */}
                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => {
                        alert('Profil Berhasil Diperbarui!');
                        router.back();
                    }}
                >
                    <Text style={styles.saveBtnText}>Simpan Perubahan</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

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

    avatarSection: { alignItems: 'center', marginVertical: 30 },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    cameraBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#1E88E5',
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFF'
    },
    changePhotoText: { marginTop: 15, color: '#1E88E5', fontWeight: 'bold', fontSize: 14 },

    form: { gap: 20, marginBottom: 40 },
    inputGroup: { gap: 8 },
    label: { fontSize: 14, color: '#666', fontWeight: '500' },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#FAFAFA'
    },

    saveBtn: {
        backgroundColor: '#1E88E5',
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    saveBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});