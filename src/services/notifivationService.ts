import { supabase } from "../lib/supabase";

export const createNotification = async (notification) => {
  try {

    const { error } = await supabase
    .from('notifications')
    .insert(notification)
    .select()
    .single()

    if (error) {
      console.log('notification error: ', error);
      return {success: false, msg: 'Something went wrong.'}
    }

    return {success: true};
  } catch (error) {
    console.log('notification error: ', error);
    return {success: false, msg: 'Something went wrong.'}
  }
}

export const fetchNotification = async (receiverId) => {
  try {

    const { data, error } = await supabase
    .from('notifications')
    .select(`
      *,
      sender: senderId(id, name, image)
    `)
    .eq('receiverId', receiverId)
    .order('created_at', {ascending: false});

    if (error) {
      console.log('fetch notification error: ', error);
      return {success: false, msg: 'Could not fetch notification.'}
    }

    return {success: true, data: data};
  } catch (error) {
    console.log('fetch notification error: ', error);
    return {success: false, msg: 'Could not fetch notification.'}
  }
}