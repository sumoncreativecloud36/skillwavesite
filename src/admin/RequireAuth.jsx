import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

const CACHE_KEY = 'sw_admin_cache_v1';

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
  } catch {
    return null;
  }
}
function writeCache(v) {
  try {
    if (v) localStorage.setItem(CACHE_KEY, JSON.stringify(v));
    else localStorage.removeItem(CACHE_KEY);
  } catch { /* ignore */ }
}

export default function RequireAuth({ children }) {
  const cached = useRef(readCache());
  const [state, setState] = useState(() => {
    const c = cached.current;
    if (c) return { loading: false, user: { id: c.user_id }, isAdmin: c.is_admin };
    return { loading: true, user: null, isAdmin: false };
  });

  useEffect(() => {
    let mounted = true;

    async function check(session) {
      const user = session?.user || null;
      if (!user) {
        writeCache(null);
        if (mounted) setState({ loading: false, user: null, isAdmin: false });
        return;
      }
      const { data } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();
      const isAdmin = !!data;
      writeCache({ user_id: user.id, is_admin: isAdmin });
      if (mounted) setState({ loading: false, user, isAdmin });
    }

    supabase.auth.getSession().then(({ data }) => check(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => check(session));
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ color: '#6B7280' }}>
        <div className="flex items-center gap-3">
          <span
            className="w-5 h-5 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: '#41B9F8', borderRightColor: '#6B6ECA' }}
          />
          লোড হচ্ছে...
        </div>
      </div>
    );
  }
  if (!state.user) return <Navigate to="/admin/login" replace />;
  if (!state.isAdmin) return <Navigate to="/account" replace />;
  return children;
}
