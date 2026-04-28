import { StarIcon } from './Icons.jsx';

function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();
}

export default function ReviewCard({ review }) {
  const stars = Math.round(Number(review.rating) || 0);
  return (
    <div
      className="card p-5 flex flex-col gap-3"
      style={{ borderColor: '#00D4FF15' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
          style={{ background: '#00D4FF22', color: '#00D4FF', fontFamily: 'Poppins, sans-serif' }}
        >
          {initials(review.reviewer_name) || 'SW'}
        </div>
        <div>
          <div className="font-semibold text-[15px] text-white">{review.reviewer_name}</div>
          <div className="text-[13px] text-ink-muted font-light">{review.course_name}</div>
        </div>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} filled={i < stars} className="w-4 h-4 text-cyan-glow" />
        ))}
      </div>
      <p className="text-[13px] text-ink-muted line-clamp-3">{review.review_text}</p>
    </div>
  );
}
