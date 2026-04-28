import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { useSite } from '../context/SiteContext.jsx';
import { PanelHeader, Field, ImageUploader, Toast } from './ui.jsx';

const KEYS = [
  'hero_headline',
  'hero_description',
  'hero_image_url',
  'hero_badge_text',
  'hero_badge_visible',
  'hero_btn1_label',
  'hero_btn1_url',
  'hero_btn2_label',
  'hero_btn2_url',
];

export default function HeroPanel() {
  const { settings, refresh } = useSite();
  const [form, setForm] = useState({});
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const init = {};
    KEYS.forEach((k) => (init[k] = settings[k] || ''));
    setForm(init);
  }, [settings]);

  const set = (k) => (v) => setForm((s) => ({ ...s, [k]: typeof v === 'object' ? v.target.value : v }));

  async function save() {
    setBusy(true);
    const rows = KEYS.map((k) => ({ key: k, value: form[k] ?? '' }));
    await supabase.from('settings').upsert(rows, { onConflict: 'key' });
    await refresh();
    setBusy(false);
    setToast('সংরক্ষিত হয়েছে');
    setTimeout(() => setToast(''), 1800);
  }

  const badgeOn = String(form.hero_badge_visible) === 'true';

  return (
    <div>
      <PanelHeader title="হিরো ব্যানার" desc="হোমপেজের শীর্ষ ব্যানার কন্টেন্ট এডিট করুন।" />
      <div className="card p-6 max-w-3xl space-y-5">
        <Field label="হেডলাইন (বাংলা)">
          <input value={form.hero_headline || ''} onChange={set('hero_headline')} className="input-dark" />
        </Field>
        <Field label="বিবরণ">
          <textarea value={form.hero_description || ''} onChange={set('hero_description')} className="input-dark" rows={3} />
        </Field>
        <Field label="হিরো ছবি">
          <ImageUploader value={form.hero_image_url} onChange={set('hero_image_url')} folder="hero" />
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="লাইভ ব্যাজ টেক্সট">
            <input value={form.hero_badge_text || ''} onChange={set('hero_badge_text')} className="input-dark" />
          </Field>
          <Field label="লাইভ ব্যাজ দৃশ্যমান">
            <button
              type="button"
              onClick={() => set('hero_badge_visible')(badgeOn ? 'false' : 'true')}
              className={badgeOn ? 'btn-primary' : 'btn-outline'}
            >
              {badgeOn ? 'চালু' : 'বন্ধ'}
            </button>
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="বাটন ১ লেবেল">
            <input value={form.hero_btn1_label || ''} onChange={set('hero_btn1_label')} className="input-dark" />
          </Field>
          <Field label="বাটন ১ URL">
            <input value={form.hero_btn1_url || ''} onChange={set('hero_btn1_url')} className="input-dark" />
          </Field>
          <Field label="বাটন ২ লেবেল">
            <input value={form.hero_btn2_label || ''} onChange={set('hero_btn2_label')} className="input-dark" />
          </Field>
          <Field label="বাটন ২ URL">
            <input value={form.hero_btn2_url || ''} onChange={set('hero_btn2_url')} className="input-dark" />
          </Field>
        </div>

        <button onClick={save} disabled={busy} className="btn-primary">
          {busy ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
        </button>
      </div>
      <Toast msg={toast} />
    </div>
  );
}
