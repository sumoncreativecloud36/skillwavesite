import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { useSite } from '../context/SiteContext.jsx';
import { PanelHeader, Field, Toast } from './ui.jsx';

const SECTIONS = [
  { key: 'top_selling', name: 'টপ সেলিং কোর্স' },
  { key: 'featured_courses', name: 'ফিচার্ড কোর্স' },
  { key: 'featured_ebooks', name: 'ফিচার্ড ই-বুক' },
  { key: 'reviews', name: 'শিক্ষার্থীদের মতামত' },
];

export default function SectionsPanel() {
  const { refresh } = useSite();
  const [rows, setRows] = useState({});
  const [toast, setToast] = useState('');

  async function load() {
    const { data } = await supabase.from('sections').select('*');
    const map = {};
    SECTIONS.forEach((s) => { map[s.key] = { section_key: s.key, heading: '', subtitle: '', is_visible: true }; });
    (data || []).forEach((r) => { map[r.section_key] = r; });
    setRows(map);
  }
  useEffect(() => { load(); }, []);

  async function save(key) {
    const r = rows[key];
    await supabase.from('sections').upsert(
      [{ section_key: key, heading: r.heading, subtitle: r.subtitle, is_visible: r.is_visible }],
      { onConflict: 'section_key' }
    );
    await refresh();
    setToast('সংরক্ষিত হয়েছে');
    setTimeout(() => setToast(''), 1500);
  }

  function update(key, patch) {
    setRows((s) => ({ ...s, [key]: { ...s[key], ...patch } }));
  }

  return (
    <div>
      <PanelHeader title="সেকশন সেটিংস" desc="হোমপেজের প্রতিটি সেকশনের শিরোনাম, সাবটাইটেল ও দৃশ্যমানতা।" />
      <div className="space-y-5">
        {SECTIONS.map((s) => {
          const r = rows[s.key] || {};
          return (
            <div key={s.key} className="card p-5 max-w-3xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">{s.name}</h3>
                <button
                  onClick={() => update(s.key, { is_visible: !r.is_visible })}
                  className={r.is_visible ? 'btn-primary !text-xs !py-1 !px-3' : 'btn-outline !text-xs !py-1 !px-3'}
                >
                  {r.is_visible ? 'দৃশ্যমান' : 'লুকানো'}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="হেডিং"><input className="input-dark" value={r.heading || ''} onChange={(e) => update(s.key, { heading: e.target.value })} /></Field>
                <Field label="সাবটাইটেল"><input className="input-dark" value={r.subtitle || ''} onChange={(e) => update(s.key, { subtitle: e.target.value })} /></Field>
              </div>
              <button onClick={() => save(s.key)} className="btn-primary !text-sm">সংরক্ষণ</button>
            </div>
          );
        })}
      </div>
      <Toast msg={toast} />
    </div>
  );
}
