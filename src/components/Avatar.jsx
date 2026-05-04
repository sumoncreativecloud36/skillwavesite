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
    border: ring ? '2px solid #00D4FF' : 'none',
    background: '#00D4FF22',
    color: '#00D4FF',
    flexShrink: 0,
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
