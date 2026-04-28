import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { useSite } from '../context/SiteContext.jsx';
import { PanelHeader, Field, ImageUploader, Toast } from './ui.jsx';

export default function BrandingPanel() {
  const { settings, refresh } = useSite();
  const [logo, setLogo] = useState('');
  const [tagline, setTagline] = useState('');
  const [toast, setToast] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setLogo(settings.logo_url || '');
    setTagline(settings.tagline || '');
  }, [settings]);

  async function save() {
    setBusy(true);
    await supabase.from('settings').upsert(
      [
        { key: 'logo_url', value: logo },
        { key: 'tagline', value: tagline },
      ],
      { onConflict: 'key' }
    );
    await refresh();
    setBusy(false);
    setToast('সংরক্ষিত হয়েছে');
    setTimeout(() => setToast(''), 1800);
  }

  return (
    <div>
      <PanelHeader title="ব্র্যান্ডিং" desc="সাইটের লোগো ও ট্যাগলাইন এডিট করুন।" />
      <div className="card p-6 max-w-2xl space-y-5">
        <Field label="লোগো">
          <ImageUploader value={logo} onChange={setLogo} folder="branding" label="লোগো আপলোড" />
        </Field>
        <Field label="ট্যাগলাইন">
          <textarea
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="input-dark"
            rows={2}
            placeholder="বাংলায় শিখুন। দক্ষ হয়ে উঠুন।"
          />
        </Field>
        <button onClick={save} disabled={busy} className="btn-primary">
          {busy ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
        </button>
      </div>
      <Toast msg={toast} />
    </div>
  );
}
