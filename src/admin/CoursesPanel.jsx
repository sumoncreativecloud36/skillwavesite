import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { PanelHeader, Field, ImageUploader, Toast } from './ui.jsx';

const EMPTY = {
  title: '', description: '', instructor: '', thumbnail_url: '',
  sale_price: '', original_price: '', rating: 5, review_count: 0,
  is_featured: false, is_bestseller: false, course_url: '',
};

export default function CoursesPanel() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');

  async function load() {
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    setList(data || []);
  }
  useEffect(() => { load(); }, []);

  async function save(form) {
    const payload = {
      ...form,
      sale_price: Number(form.sale_price) || 0,
      original_price: Number(form.original_price) || 0,
      rating: Number(form.rating) || 0,
      review_count: Number(form.review_count) || 0,
    };
    if (form.id) {
      await supabase.from('courses').update(payload).eq('id', form.id);
    } else {
      delete payload.id;
      await supabase.from('courses').insert(payload);
    }
    setEditing(null);
    await load();
    setToast('সংরক্ষিত হয়েছে');
    setTimeout(() => setToast(''), 1500);
  }

  async function remove(id) {
    if (!confirm('আপনি কি নিশ্চিত?')) return;
    await supabase.from('courses').delete().eq('id', id);
    load();
  }

  return (
    <div>
      <PanelHeader title="কোর্স ম্যানেজার" desc="কোর্স যোগ, এডিট ও ডিলিট করুন।" />
      {!editing && (
        <>
          <button className="btn-primary mb-4" onClick={() => setEditing({ ...EMPTY })}>+ নতুন কোর্স</button>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: '#0A2540' }}>
                <tr className="text-left text-ink-muted">
                  <th className="p-3">শিরোনাম</th>
                  <th className="p-3">প্রশিক্ষক</th>
                  <th className="p-3">দাম</th>
                  <th className="p-3">ফিচার্ড</th>
                  <th className="p-3">বেস্টসেলার</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {list.map((c) => (
                  <tr key={c.id} className="border-t" style={{ borderColor: '#00D4FF15' }}>
                    <td className="p-3">{c.title}</td>
                    <td className="p-3 text-ink-muted">{c.instructor}</td>
                    <td className="p-3 text-cyan-glow">৳{c.sale_price}</td>
                    <td className="p-3">{c.is_featured ? '✓' : '—'}</td>
                    <td className="p-3">{c.is_bestseller ? '✓' : '—'}</td>
                    <td className="p-3 flex gap-2">
                      <button className="text-cyan-glow hover:underline text-xs" onClick={() => setEditing(c)}>এডিট</button>
                      <button className="text-red-400 hover:underline text-xs" onClick={() => remove(c.id)}>ডিলিট</button>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr><td colSpan={6} className="p-6 text-center text-ink-muted">কোনো কোর্স নেই</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {editing && <CourseForm initial={editing} onCancel={() => setEditing(null)} onSave={save} />}
      <Toast msg={toast} />
    </div>
  );
}

function CourseForm({ initial, onCancel, onSave }) {
  const [f, setF] = useState(initial);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: typeof v === 'object' && v?.target ? v.target.value : v }));
  const toggle = (k) => () => setF((s) => ({ ...s, [k]: !s[k] }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(f); }}
      className="card p-6 max-w-3xl space-y-4"
    >
      <h2 className="text-lg font-semibold text-white">{f.id ? 'কোর্স এডিট' : 'নতুন কোর্স'}</h2>
      <Field label="শিরোনাম"><input required className="input-dark" value={f.title} onChange={set('title')} /></Field>
      <Field label="বিবরণ"><textarea className="input-dark" rows={3} value={f.description} onChange={set('description')} /></Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="প্রশিক্ষকের নাম"><input className="input-dark" value={f.instructor} onChange={set('instructor')} /></Field>
        <Field label="কোর্স URL"><input className="input-dark" value={f.course_url} onChange={set('course_url')} /></Field>
      </div>
      <Field label="থাম্বনেইল"><ImageUploader value={f.thumbnail_url} onChange={set('thumbnail_url')} folder="courses" /></Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="সেল প্রাইস (৳)"><input type="number" className="input-dark" value={f.sale_price} onChange={set('sale_price')} /></Field>
        <Field label="মূল প্রাইস (৳)"><input type="number" className="input-dark" value={f.original_price} onChange={set('original_price')} /></Field>
        <Field label="রেটিং (০-৫)"><input type="number" step="0.1" min="0" max="5" className="input-dark" value={f.rating} onChange={set('rating')} /></Field>
        <Field label="রিভিউ সংখ্যা"><input type="number" className="input-dark" value={f.review_count} onChange={set('review_count')} /></Field>
      </div>
      <div className="flex gap-3 flex-wrap">
        <button type="button" onClick={toggle('is_featured')} className={f.is_featured ? 'btn-primary' : 'btn-outline'}>
          ফিচার্ড: {f.is_featured ? 'হ্যাঁ' : 'না'}
        </button>
        <button type="button" onClick={toggle('is_bestseller')} className={f.is_bestseller ? 'btn-primary' : 'btn-outline'}>
          বেস্টসেলার: {f.is_bestseller ? 'হ্যাঁ' : 'না'}
        </button>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary">সংরক্ষণ</button>
        <button type="button" onClick={onCancel} className="btn-outline">বাতিল</button>
      </div>
    </form>
  );
}
