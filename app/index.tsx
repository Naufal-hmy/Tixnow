import { Redirect } from 'expo-router';

export default function Index() {
    // Kode ini akan "menendang" pengguna langsung ke halaman login saat aplikasi pertama kali dibuka
    return <Redirect href="/login" />;
}