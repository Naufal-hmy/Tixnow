import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function RegisterScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Daftar Akun</Text>
                        <Text style={styles.subtitle}>Sign In to get started</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <MaterialCommunityIcons name="account-outline" size={20} color="#1E88E5" style={styles.inputIcon} />
                            <TextInput style={styles.input} placeholder="Enter your name" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <MaterialCommunityIcons name="email-outline" size={20} color="#1E88E5" style={styles.inputIcon} />
                            <TextInput style={styles.input} placeholder="Enter your email" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <MaterialCommunityIcons name="lock-outline" size={20} color="#1E88E5" style={styles.inputIcon} />
                            <TextInput style={styles.input} placeholder="Enter your Password" secureTextEntry={true} />
                        </View>
                        <View style={styles.inputWrapper}>
                            <MaterialCommunityIcons name="lock-outline" size={20} color="#1E88E5" style={styles.inputIcon} />
                            <TextInput style={styles.input} placeholder="Enter your confirmation password" secureTextEntry={true} />
                        </View>

                        <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/login')}>
                            <Text style={styles.registerButtonText}>Daftar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} /><Text style={styles.dividerText}>Anda dapat terhubung dengan</Text><View style={styles.dividerLine} />
                    </View>

                    <TouchableOpacity style={styles.googleButton}>
                        <MaterialCommunityIcons name="google" size={20} color="#DB4437" style={styles.googleIcon} />
                        <Text style={styles.googleButtonText}>Masuk dengan akun google</Text>
                    </TouchableOpacity>

                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Apakah anda Sudah punya akun? </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={[styles.footerText, styles.loginText]}>klik Masuk</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    scrollContainer: { flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center', paddingBottom: 20 },
    headerContainer: { marginTop: 40, marginBottom: 30 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#000000', marginBottom: 8 },
    subtitle: { fontSize: 14, color: '#1E88E5', fontWeight: '500' },
    formContainer: { marginBottom: 30 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 12, marginBottom: 16, height: 50, backgroundColor: '#FAFAFA' },
    inputIcon: { marginRight: 10 },
    input: { flex: 1, fontSize: 14, color: '#333' },
    registerButton: { backgroundColor: '#1E88E5', borderRadius: 8, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    registerButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
    dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
    dividerText: { marginHorizontal: 10, fontSize: 12, color: '#666666' },
    googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#1E88E5', borderRadius: 8, height: 50, marginBottom: 30 },
    googleIcon: { marginRight: 10 },
    googleButtonText: { color: '#1E88E5', fontSize: 14, fontWeight: '600' },
    footerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto' },
    footerText: { fontSize: 13, color: '#1E88E5' },
    loginText: { fontWeight: 'bold' },
});