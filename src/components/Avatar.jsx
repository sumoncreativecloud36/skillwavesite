export function getInitials(name = '', email = '') {
  const src = (name && name.trim()) || (email ? email.split('@')[0] : '');
  if (!src) return 'SW';
  const parts = src.trim().split(/\s+/).filter(Boolean);
  const letters = (parts.length >= 2 ? [parts[0], parts[parts.length - 1]] : [parts[0]])
    .map((p) => p[0]?.toUpperCase())
    .filter(Boolean)
    .join('');
  return letters || 'SW';
}

export default function Avatar({ user, size = 48, ring = true, className = '' }) {
  const url = user?.user_metadata?.avatar_url;
  const name = user?.user_metadata?.full_name || '';
  const initials = getInitials(name, user?.email);
  const fontSize = Math.round(size * 0.36);
  const style = {
    width: size,
    height: size,
    fontFamily: 'Poppins, sans-serif',
    fontSize,
    fontWeight: 700,
    border: ring ? '2px solid rgba(255,255,255,0.6)' : 'none',
    background: 'linear-gradient(45deg, #6B6ECA, #41B9F8)',
    color: '#FFFFFF',
    flexShrink: 0,
    boxShadow: ring ? '0 4px 14px -4px rgba(65,185,248,0.45)' : 'none',
  };
  return (
    <div className={`rounded-full overflow-hidden flex items-center justify-center ${className}`} style={style}>
      {url ? (
        <img src={url} alt={name || 'avatar'} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
