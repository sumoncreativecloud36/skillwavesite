import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { PanelHeader, Field, Toast } from './ui.jsx';

const EMPTY = { reviewer_name: '', course_name: '', rating: 5, review_text: '', is_approved: true };

export default function ReviewsPanel() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');

  async function load() {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    setList(data || []);
  }
  useEffect(() => { load(); }, []);

  async function save(form) {
    const payload = { ...form, rating: Number(form.rating) || 0 };
    if (form.id) {
      await supabase.from('reviews').update(payload).eq('id', form.id);
    } else {
      delete payload.id;
      await supabase.from('reviews').insert(payload);
    }
    setEditing(null);
    await load();
    setToast('সংরক্ষিত হয়েছে');
    setTimeout(() => setToast(''), 1500);
  }

  async function approve(r) {
    await supabase.from('reviews').update({ is_approved: !r.is_approved }).eq('id', r.id);
    load();
  }
  async function remove(id) {
    if (!confirm('আপনি কি নিশ্চিত?')) return;
    await supabase.from('reviews').delete().eq('id', id);
    load();
  }

  return (
    <div>
      <PanelHeader title="রিভিউ ম্যানেজার" desc="শিক্ষার্থীদের রিভিউ এপ্রুভ ও পরিচালনা করুন।" />
      {!editing && (
        <>
          <button className="btn-primary mb-4" onClick={() => setEditing({ ...EMPTY })}>+ নতুন রিভিউ</button>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: '#0A2540' }}>
                <tr className="text-left text-ink-muted">
                  <th className="p-3">নাম</th>
                  <th className="p-3">কোর্স</th>
                  <th className="p-3">রেটিং</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {list.map((r) => (
                  <tr key={r.id} className="border-t" style={{ borderColor: '#00D4FF15' }}>
                    <td className="p-3">{r.reviewer_name}</td>
                    <td className="p-3 text-ink-muted">{r.course_name}</td>
                    <td className="p-3 text-cyan-glow">{r.rating}★</td>
                    <td className="p-3">
                      <span className={r.is_approved ? 'text-cyan-glow' : 'text-ink-muted'}>
                        {r.is_approved ? 'এপ্রুভড' : 'পেন্ডিং'}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2 flex-wrap">
                      <button className="text-cyan-glow hover:underline text-xs" onClick={() => approve(r)}>
                        {r.is_approved ? 'হাইড' : 'এপ্রুভ'}
                      </button>
                      <button className="text-cyan-glow hover:underline text-xs" onClick={() => setEditing(r)}>এডিট</button>
                      <button className="text-red-400 hover:underline text-xs" onClick={() => remove(r.id)}>ডিলিট</button>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-ink-muted">কোনো রিভিউ নেই</td></tr>}
              </tbody>
            </table>
          </div>
        </>
      )}
      {editing && <ReviewForm initial={editing} onCancel={() => setEditing(null)} onSave={save} />}
      <Toast msg={toast} />
    </div>
  );
}

function ReviewForm({ initial, onCancel, onSave }) {
  const [f, setF] = useState(initial);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: typeof v === 'object' && v?.target ? v.target.value : v }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }} className="card p-6 max-w-2xl space-y-4">
      <h2 className="text-lg font-semibold text-white">{f.id ? 'রিভিউ এডিট' : 'নতুন রিভিউ'}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="রিভিউয়ারের নাম"><input required className="input-dark" value={f.reviewer_name} onChange={set('reviewer_name')} /></Field>
        <Field label="কোর্সের নাম"><input className="input-dark" value={f.course_name} onChange={set('course_name')} /></Field>
        <Field label="রেটিং (১-৫)"><input type="number" min="1" max="5" className="input-dark" value={f.rating} onChange={set('rating')} /></Field>
        <Field label="স্ট্যাটাস">
          <button type="button" onClick={() => set('is_approved')(!f.is_approved)} className={f.is_approved ? 'btn-primary' : 'btn-outline'}>
            {f.is_approved ? 'এপ্রুভড' : 'পেন্ডিং'}
          </button>
        </Field>
      </div>
      <Field label="রিভিউ লেখা"><textarea className="input-dark" rows={4} value={f.review_text} onChange={set('review_text')} /></Field>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary">সংরক্ষণ</button>
        <button type="button" onClick={onCancel} className="btn-outline">বাতিল</button>
      </div>
    </form>
  );
}
