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

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header Title */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profil</Text>
                </View>

                {/* User Info Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarPlaceholder}>
                        <MaterialCommunityIcons name="account" size={50} color="#A0A0A0" />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Dina Nur Auliana</Text>
                        <Text style={styles.userEmail}>dinanr.aulia@gmail.com</Text>
                        <Text style={styles.joinDate}>Bergabung sejak tanggal 11 November 2025</Text>
                    </View>
                </View>

                {/* Settings Section */}
                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>Pengaturan</Text>

                    <SettingItem
                        icon="account-edit-outline"
                        title="Ubah Profil"
                        onPress={() => router.push('/edit-profile')}
                    />
                    <SettingItem
                        icon="history"
                        title="Riwayat"
                        onPress={() => router.push('/history')}
                    />
                    <SettingItem
                        icon="bookmark-outline"
                        title="Bookmark"
                        onPress={() => router.push('/bookmarks')}
                    />
                    <SettingItem
                        icon="logout"
                        title="Logout"
                        isLogout={true}
                        onPress={() => router.replace('/login')}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

// --- KOMPONEN ITEM PENGATURAN ---
const SettingItem = ({ icon, title, onPress, isLogout }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.itemLeft}>
            <MaterialCommunityIcons
                name={icon}
                size={24}
                color={isLogout ? "#E53935" : "#666"}
            />
            <Text style={[styles.itemText, isLogout && { color: '#E53935' }]}>{title}</Text>
        </View>
        <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={isLogout ? "#E53935" : "#1E88E5"}
        />
    </TouchableOpacity>
);

// --- STYLES ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { paddingHorizontal: 20, paddingVertical: 15 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#000' },

    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userInfo: { marginLeft: 15, flex: 1 },
    userName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    userEmail: { fontSize: 14, color: '#666', marginTop: 2 },
    joinDate: { fontSize: 11, color: '#A0A0A0', marginTop: 4 },

    settingsSection: { paddingHorizontal: 20, marginTop: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 15 },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 0,
    },
    itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    itemText: { fontSize: 16, color: '#333', fontWeight: '500' }
});