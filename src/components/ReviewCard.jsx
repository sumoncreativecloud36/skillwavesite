import { StarIcon } from './Icons.jsx';

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((s) => s[0]).join('').toUpperCase();
}

export default function ReviewCard({ review }) {
  const stars = Math.round(Number(review.rating) || 0);
  return (
    <div className="card flex flex-col gap-3" style={{ padding: 20 }}>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(45deg, #6B6ECA, #41B9F8)',
            color: '#fff',
            fontFamily: 'Poppins',
            fontWeight: 600,
          }}
        >
          {initials(review.reviewer_name) || 'SW'}
        </div>
        <div>
          <div className="font-head" style={{ color: '#010202', fontWeight: 600, fontSize: 15 }}>
            {review.reviewer_name}
          </div>
          <div style={{ color: '#6B7280', fontSize: 13 }}>{review.course_name}</div>
        </div>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} filled={i < stars} className="w-4 h-4" style={{ color: '#41B9F8' }} />
        ))}
      </div>
      <p className="line-clamp-3" style={{ color: '#374151', fontSize: 14, lineHeight: 1.65 }}>
        {review.review_text}
      </p>
    </div>
  );
}
