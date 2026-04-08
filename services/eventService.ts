import { supabase } from '../lib/supabase';

// Tipe data untuk event, bisa disesuaikan dengan skema tabel "events" di Supabase
export interface EventModel {
  id: string;
  title: string;
  organizer: string;
  date: string;
  originalPrice: number;
  discountPrice: number;
  category: string;
  imageUrl: string;
}

export const eventService = {
  /**
   * Mengambil semua data events dari Supabase
   * @returns {Promise<EventModel[]>} Daftar events
   */
  async getAllEvents(): Promise<EventModel[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*');

    if (error) {
      console.error("Error mengambil data events:", error);
      throw error;
    }

    return data || [];
  }
};
