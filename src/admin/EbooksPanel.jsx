import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { PanelHeader, Field, ImageUploader, Toast } from './ui.jsx';

const EMPTY = {
  title: '', author: '', cover_url: '', price: '',
  description: '', is_featured: true, purchase_url: '',
};

export default function EbooksPanel() {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');

  async function load() {
    const { data } = await supabase.from('ebooks').select('*').order('created_at', { ascending: false });
    setList(data || []);
  }
  useEffect(() => { load(); }, []);

  async function save(form) {
    const payload = { ...form, price: Number(form.price) || 0 };
    let error;
    if (form.id) {
      ({ error } = await supabase.from('ebooks').update(payload).eq('id', form.id));
    } else {
      delete payload.id;
      ({ error } = await supabase.from('ebooks').insert(payload));
    }
    if (error) {
      setToast('Save failed: ' + error.message);
      setTimeout(() => setToast(''), 4000);
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
              <thead style={{ background: '#0A2540' }}>
                <tr className="text-left text-ink-muted">
                  <th className="p-3">শিরোনাম</th>
                  <th className="p-3">লেখক</th>
                  <th className="p-3">দাম</th>
                  <th className="p-3">ফিচার্ড</th>
                  <th className="p-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {list.map((e) => (
                  <tr key={e.id} className="border-t" style={{ borderColor: '#00D4FF15' }}>
                    <td className="p-3">{e.title}</td>
                    <td className="p-3 text-ink-muted">{e.author}</td>
                    <td className="p-3 text-cyan-glow">৳{e.price}</td>
                    <td className="p-3">{e.is_featured ? '✓' : '—'}</td>
                    <td className="p-3 flex gap-2">
                      <button className="text-cyan-glow hover:underline text-xs" onClick={() => setEditing(e)}>এডিট</button>
                      <button className="text-red-400 hover:underline text-xs" onClick={() => remove(e.id)}>ডিলিট</button>
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
  const [f, setF] = useState(initial);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: typeof v === 'object' && v?.target ? v.target.value : v }));
  const toggle = (k) => () => setF((s) => ({ ...s, [k]: !s[k] }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }} className="card p-6 max-w-3xl space-y-4">
      <h2 className="text-lg font-semibold text-white">{f.id ? 'ই-বুক এডিট' : 'নতুন ই-বুক'}</h2>
      <Field label="শিরোনাম"><input required className="input-dark" value={f.title} onChange={set('title')} /></Field>
      <Field label="লেখক"><input className="input-dark" value={f.author} onChange={set('author')} /></Field>
      <Field label="কভার ছবি"><ImageUploader value={f.cover_url} onChange={set('cover_url')} folder="ebooks" /></Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="দাম (৳)"><input type="number" className="input-dark" value={f.price} onChange={set('price')} /></Field>
        <Field label="পারচেজ লিংক"><input className="input-dark" value={f.purchase_url} onChange={set('purchase_url')} /></Field>
      </div>
      <Field label="বিবরণ"><textarea className="input-dark" rows={3} value={f.description} onChange={set('description')} /></Field>
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
