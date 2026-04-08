import { router } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

export default function TopUpScreen() {
    const amounts = [100000, 250000, 500000, 1000000, 2500000];

    const handleTopUp = async (nominal: number) => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: profile } = await supabase.from('profiles').select('balance').eq('id', user?.id).single();

        const { error } = await supabase
            .from('profiles')
            .update({ balance: (profile.balance || 0) + nominal })
            .eq('id', user?.id);

        if (!error) {
            Alert.alert("Sukses!", `Saldo bertambah Rp${nominal.toLocaleString()}`, [
                { text: "Mantap", onPress: () => router.back() }
            ]);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#FFF' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Top Up Tikara</Text>
            <Text style={{ color: '#666', marginBottom: 30 }}>Pilih nominal saldo yang ingin ditambahkan:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15 }}>
                {amounts.map(a => (
                    <TouchableOpacity key={a} style={styles.btn} onPress={() => handleTopUp(a)}>
                        <Text style={styles.btnText}>+ Rp {a.toLocaleString('id-ID')}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    btn: { width: '47%', padding: 20, backgroundColor: '#F0F7FF', borderRadius: 15, alignItems: 'center', borderWeight: 1, borderColor: '#1E88E5' },
    btnText: { fontWeight: 'bold', color: '#1E88E5' }
});