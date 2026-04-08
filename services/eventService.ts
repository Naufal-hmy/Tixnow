import { supabase } from '../lib/supabase';

export interface EventModel {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  price: number;
  image_url: string;
  description: string;
  status: string;
}

export const eventService = {
  async getAllEvents(): Promise<EventModel[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('id', { ascending: true });

    if (error) throw error;
    return (data as EventModel[]) || [];
  },

  async createEvent(eventData: Partial<EventModel>) {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select();
    return { data, error };
  }
};