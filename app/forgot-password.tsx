import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/* Tombol Back */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Lupa Password</Text>
                    <Text style={styles.subtitle}>Sign In to get started</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <MaterialCommunityIcons name="email-outline" size={20} color="#1E88E5" style={styles.inputIcon} />
                        <TextInput style={styles.input} placeholder="Enter your email" />
                    </View>

                    <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.forgotButtonText}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    innerContainer: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
    backButton: { marginBottom: 20 },
    headerContainer: { marginBottom: 40 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#000000', marginBottom: 8 },
    subtitle: { fontSize: 14, color: '#1E88E5', fontWeight: '500' },
    formContainer: { marginBottom: 30 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 12, marginBottom: 24, height: 50, backgroundColor: '#FAFAFA' },
    inputIcon: { marginRight: 10 },
    input: { flex: 1, fontSize: 14, color: '#333' },
    forgotButton: { backgroundColor: '#1E88E5', borderRadius: 8, height: 50, justifyContent: 'center', alignItems: 'center' },
    forgotButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});