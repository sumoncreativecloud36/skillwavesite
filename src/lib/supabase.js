import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[SkillWave] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');

export const STORAGE_BUCKET = 'skillwave';

export async function uploadFile(file, folder = 'uploads') {
  if (!file) throw new Error('কোনো ফাইল নির্বাচন করা হয়নি');
  if (file.size && file.size > 10 * 1024 * 1024) {
    throw new Error('ফাইল সর্বোচ্চ ১০ MB হতে পারে');
  }

  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session) {
    throw new Error('সেশন এক্সপায়ার্ড — দয়া করে আবার লগইন করুন');
  }

  const rawExt = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
  const ext = rawExt.length ? rawExt : 'bin';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      upsert: false,
      contentType: file.type || 'application/octet-stream',
      cacheControl: '3600',
    });

  if (error) {
    const msg = error.message || String(error);
    const status = error.statusCode || error.status;
    if (import.meta.env.DEV) console.error('[uploadFile]', { msg, status, path, error });
    if (/bucket.*not.*found/i.test(msg)) throw new Error('Storage bucket "skillwave" পাওয়া যায়নি');
    if (/policy|permission|denied|unauthor|jwt|token/i.test(msg)) {
      throw new Error(`${msg} — দয়া করে লগআউট করে আবার লগইন করুন`);
    }
    throw new Error(`${msg}${status ? ` (status ${status})` : ''}`);
  }
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
