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
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} filled={i < stars} className="w-4 h-4" />
        ))}
      </div>
      <p className="text-[14px] leading-relaxed" style={{ color: '#D4DCE8' }}>"{review.review_text}"</p>
      <div className="flex items-center gap-3 pt-3 mt-auto" style={{ borderTop: '1px solid #FFFFFF0F' }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-[13px]"
          style={{ background: '#00D4FF14', color: '#00D4FF', border: '1px solid #00D4FF40' }}
        >
          {initials(review.reviewer_name) || 'SW'}
        </div>
        <div>
          <div className="font-semibold text-[14px] text-white">{review.reviewer_name}</div>
          <div className="text-[12px]" style={{ color: '#7C8AA3' }}>{review.course_name}</div>
        </div>
      </div>
    </div>
  );
}
