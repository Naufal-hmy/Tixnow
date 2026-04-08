import { supabase } from '../lib/supabase';

export const orderService = {
    /**
     * Mengambil riwayat tiket berdasarkan user yang sedang login
     */
    async getMyTickets() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        events (
          title,
          date,
          location,
          image_url,
          category
        )
      `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error ambil tiket:", error.message);
            return [];
        }
        return data;
    }
};