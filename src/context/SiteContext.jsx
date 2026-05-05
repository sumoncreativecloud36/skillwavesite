import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';

const SiteContext = createContext(null);

const DEFAULTS = {
  logo_url: '',
  tagline: 'বাংলায় শিখুন। দক্ষ হয়ে উঠুন।',
  hero_headline: 'বাংলায় শিখুন বিশ্বমানের স্কিল',
  hero_description: 'SkillWave-এ পাবেন এক্সপার্টদের তৈরি কোর্স, ই-বুক ও লাইভ ক্লাস। আজই শুরু করুন আপনার ক্যারিয়ার যাত্রা।',
  hero_image_url: '',
  hero_video_url: '',
  hero_badge_text: '🔴 লাইভ ইভেন্ট',
  hero_badge_visible: 'true',
  hero_btn1_label: 'ফ্রি রেজিস্ট্রেশন করুন',
  hero_btn1_url: '/signup',
  hero_btn2_label: 'আরও জানুন',
  hero_btn2_url: '#about',
};

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS);
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [{ data: s }, { data: sec }] = await Promise.all([
        supabase.from('settings').select('key,value'),
        supabase.from('sections').select('section_key,heading,subtitle,is_visible'),
      ]);
      const merged = { ...DEFAULTS };
      (s || []).forEach((row) => {
        merged[row.key] = row.value;
      });
      setSettings(merged);
      const secMap = {};
      (sec || []).forEach((row) => {
        secMap[row.section_key] = row;
      });
      setSections(secMap);
    } catch (e) {
      console.warn('Settings fetch failed (using defaults):', e?.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <SiteContext.Provider value={{ settings, sections, loading, refresh }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be inside SiteProvider');
  return ctx;
}
