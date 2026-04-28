import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

export default function RequireAuth({ children }) {
  const [state, setState] = useState({ loading: true, user: null });

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setState({ loading: false, user: data.session?.user || null });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setState({ loading: false, user: session?.user || null });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-muted">
        লোড হচ্ছে...
      </div>
    );
  }
  if (!state.user) return <Navigate to="/admin/login" replace />;
  return children;
}
