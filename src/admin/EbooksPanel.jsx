import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { PanelHeader, Field, ImageUploader, Toast } from './ui.jsx';

const EMPTY = {
  title: '', author: '', cover_url: '', price: '', original_price: '',
  description: '', long_description: '', is_featured: true, purchase_url: '',
  faq: [],
};

const ALLOWED = [
  'id', 'title', 'author', 'cover_url', 'price', 'original_price',
  'description', 'long_description', 'is_featured', 'purchase_url', 'faq',
];

export default function EbooksPanel() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');

  async function load() {
    const { data, error } = await supabase
      .from('ebooks').select('*').order('created_at', { ascending: false });
    if (error) {
      setToast('Load failed: ' + error.message);
      setTimeout(() => setToast(''), 4000);
    }
    setList(data || []);
  }
  useEffect(() => { load(); }, []);

  async function save(form) {
    const payload = {};
    for (const k of ALLOWED) if (form[k] !== undefined) payload[k] = form[k];
    payload.price = Number(payload.price) || 0;
    payload.original_price = Number(payload.original_price) || 0;
    if (!Array.isArray(payload.faq)) payload.faq = [];
    payload.faq = payload.faq.filter((x) => x && (x.q || x.a));

    let error;
    if (form.id) {
      ({ error } = await supabase.from('ebooks').update(payload).eq('id', form.id));
    } else {
      delete payload.id;
      ({ error } = await supabase.from('ebooks').insert(payload));
    }
    if (error) {
      setToast('Save failed: ' + error.message);
      setTimeout(() => setToast(''), 5000);
      return;
    }
    setEditing(null);
    await load();
    setToast('সংরক্ষিত হয়েছে');
    setTimeout(() => setToast(''), 1500);
  }

  async function remove(id) {
    if (!confirm('আপনি কি নিশ্চিত?')) return;
    const { error } = await supabase.from('ebooks').delete().eq('id', id);
    if (error) {
      setToast('Delete failed: ' + error.message);
      setTimeout(() => setToast(''), 4000);
      return;
    }
    load();
  }

  return (
    <div>
      <PanelHeader title="ই-বুক ম্যানেজার" desc="ই-বুক যোগ, এডিট ও ডিলিট করুন।" />
      {!editing && (
        <>
          <button className="btn-primary mb-4" onClick={() => setEditing({ ...EMPTY })}>+ নতুন ই-বুক</button>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: '#0F172A' }}>
                <tr className="text-left">
                  <th className="p-3">শিরোনাম</th>
                  <th className="p-3">লেখক</th>
                  <th className="p-3">দাম</th>
                  <th className="p-3">ফিচার্ড</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {list.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {e.cover_url ? (
                          <img src={e.cover_url} alt="" className="w-8 h-12 object-contain rounded" style={{ background: '#0F172A' }} />
                        ) : (
                          <div className="w-8 h-12 rounded flex items-center justify-center text-xs opacity-40" style={{ background: '#0F172A' }}>📖</div>
                        )}
                        <span>{e.title}</span>
                      </div>
                    </td>
                    <td className="p-3 text-ink-muted">{e.author}</td>
                    <td className="p-3" style={{ color: '#41B9F8' }}>৳{e.price}</td>
                    <td className="p-3">{e.is_featured ? '✓' : '—'}</td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        <button className="text-xs hover:underline" style={{ color: '#41B9F8' }} onClick={() => setEditing({ ...EMPTY, ...e })}>এডিট</button>
                        <button className="text-xs hover:underline" style={{ color: '#EF4444' }} onClick={() => remove(e.id)}>ডিলিট</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-ink-muted">কোনো ই-বুক নেই</td></tr>}
              </tbody>
            </table>
          </div>
        </>
      )}
      {editing && <EbookForm initial={editing} onCancel={() => setEditing(null)} onSave={save} />}
      <Toast msg={toast} />
    </div>
  );
}

function EbookForm({ initial, onCancel, onSave }) {
  const [f, setF] = useState({ ...EMPTY, ...initial, faq: Array.isArray(initial.faq) ? initial.faq : [] });
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: typeof v === 'object' && v?.target ? v.target.value : v }));
  const toggle = (k) => () => setF((s) => ({ ...s, [k]: !s[k] }));

  function addFaq() { setF((s) => ({ ...s, faq: [...(s.faq || []), { q: '', a: '' }] })); }
  function removeFaq(i) { setF((s) => ({ ...s, faq: s.faq.filter((_, j) => j !== i) })); }
  function updateFaq(i, key, val) {
    setF((s) => ({ ...s, faq: s.faq.map((it, j) => (j === i ? { ...it, [key]: val } : it)) }));
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }} className="card p-6 max-w-4xl space-y-5">
      <h2 style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20 }}>{f.id ? 'ই-বুক এডিট' : 'নতুন ই-বুক'}</h2>
      <Field label="শিরোনাম"><input required className="input-dark" value={f.title} onChange={set('title')} /></Field>
      <Field label="লেখক"><input className="input-dark" value={f.author} onChange={set('author')} /></Field>
      <Field label="কভার ছবি (512×800 portrait)" hint="ছবি আপলোড করুন বা URL পেস্ট করুন। কভার পুরোপুরি দেখা যাবে।">
        <ImageUploader value={f.cover_url} onChange={set('cover_url')} folder="ebooks" />
      </Field>
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="সেল প্রাইস (৳)"><input type="number" className="input-dark" value={f.price} onChange={set('price')} /></Field>
        <Field label="মূল প্রাইস (৳)"><input type="number" className="input-dark" value={f.original_price} onChange={set('original_price')} /></Field>
        <Field label="পারচেজ লিংক"><input className="input-dark" value={f.purchase_url} onChange={set('purchase_url')} /></Field>
      </div>
      <Field label="শর্ট বিবরণ (কার্ডে দেখাবে)"><textarea className="input-dark" rows={3} value={f.description} onChange={set('description')} /></Field>
      <Field label="বিস্তারিত (ডিটেইল পেজে দেখাবে)"><textarea className="input-dark" rows={6} value={f.long_description || ''} onChange={set('long_description')} /></Field>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium" style={{ color: '#D1D5DB' }}>সচরাচর জিজ্ঞাসা (FAQ)</label>
          <button type="button" onClick={addFaq} className="btn-outline !text-sm">+ প্রশ্ন যোগ করুন</button>
        </div>
        <div className="space-y-3">
          {(f.faq || []).map((item, i) => (
            <div
              key={i}
              className="rounded-lg p-4 space-y-2 relative"
              style={{ background: '#0F172A', border: '1px solid #1F2937' }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-wider" style={{ color: '#41B9F8', fontWeight: 600 }}>প্রশ্ন #{i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: 'rgba(239,68,68,0.10)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.35)' }}
                >
                  🗑 মুছুন
                </button>
              </div>
              <input
                className="input-dark"
                placeholder="প্রশ্ন (Question)"
                value={item.q || ''}
                onChange={(e) => updateFaq(i, 'q', e.target.value)}
              />
              <textarea
                className="input-dark"
                rows={3}
                placeholder="উত্তর (Answer)"
                value={item.a || ''}
                onChange={(e) => updateFaq(i, 'a', e.target.value)}
              />
            </div>
          ))}
          {(!f.faq || f.faq.length === 0) && (
            <div
              className="text-sm p-4 rounded-lg text-center"
              style={{ color: '#6B7280', background: '#0F172A', border: '1px dashed #1F2937' }}
            >
              এখনো কোনো প্রশ্ন যোগ করা হয়নি। উপরের বাটনে ক্লিক করে প্রশ্ন যোগ করুন।
            </div>
          )}
        </div>
      </div>

      <div>
        <button type="button" onClick={toggle('is_featured')} className={f.is_featured ? 'btn-primary' : 'btn-outline'}>
          ফিচার্ড: {f.is_featured ? 'হ্যাঁ' : 'না'}
        </button>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary">সংরক্ষণ</button>
        <button type="button" onClick={onCancel} className="btn-outline">বাতিল</button>
      </div>
    </form>
  );
}
