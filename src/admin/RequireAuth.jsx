import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

export default function RequireAuth({ children }) {
  const [state, setState] = useState({ loading: true, user: null, isAdmin: false });

  useEffect(() => {
    let mounted = true;

    async function check(session) {
      const user = session?.user || null;
      if (!user) {
        if (mounted) setState({ loading: false, user: null, isAdmin: false });
        return;
      }
      const { data } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();
      if (mounted) setState({ loading: false, user, isAdmin: !!data });
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
      <div className="min-h-screen flex items-center justify-center" style={{ color: '#A0AEC0' }}>
        লোড হচ্ছে...
      </div>
    );
  }
  if (!state.user) return <Navigate to="/admin/login" replace />;
  if (!state.isAdmin) return <Navigate to="/account" replace />;
  return children;
}
