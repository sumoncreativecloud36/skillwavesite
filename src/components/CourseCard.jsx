import { StarIcon } from './Icons.jsx';

const COURSE_FALLBACKS = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80',
];

function fallbackFor(id = '') {
  const i = String(id).split('').reduce((a, c) => a + c.charCodeAt(0), 0) % COURSE_FALLBACKS.length;
  return COURSE_FALLBACKS[i];
}

export default function CourseCard({ course, withActions = false }) {
  const stars = Math.round(Number(course.rating) || 0);
  const thumb = course.thumbnail_url || fallbackFor(course.id);
  return (
    <div className="card card-hover overflow-hidden flex flex-col">
      <div className="aspect-video overflow-hidden relative" style={{ background: '#0B0F19' }}>
        <img src={thumb} alt={course.title} className="w-full h-full object-cover opacity-95" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 60%, #0D152680)' }}
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1 font-body">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-head text-white line-clamp-2" style={{ fontWeight: 600, fontSize: 17, lineHeight: 1.3 }}>
            {course.title}
          </h3>
          {course.is_bestseller && (
            <span
              className="shrink-0 rounded-full"
              style={{ background: '#00D4FF22', color: '#00D4FF', fontSize: 12, padding: '2px 10px' }}
            >
              বেস্টসেলার
            </span>
          )}
        </div>
        <div style={{ color: '#A0AEC0', fontSize: 13, fontWeight: 400 }}>{course.instructor}</div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} filled={i < stars} className="w-4 h-4" style={{ color: '#00D4FF' }} />
          ))}
          <span style={{ color: '#A0AEC0', fontSize: 12, marginLeft: 4 }}>({course.review_count || 0})</span>
        </div>
        {withActions && course.description && (
          <p className="line-clamp-2" style={{ color: '#A0AEC0', fontSize: 14, lineHeight: 1.65 }}>
            {course.description}
          </p>
        )}
        <div className="flex items-end gap-2 mt-1">
          <span style={{ color: '#00D4FF', fontWeight: 700, fontSize: 18 }}>৳{course.sale_price}</span>
          {course.original_price && Number(course.original_price) > 0 && (
            <span style={{ color: '#A0AEC0', fontSize: 14, textDecoration: 'line-through' }}>
              ৳{course.original_price}
            </span>
          )}
        </div>
        {withActions && (
          <div className="flex gap-2 mt-3">
            <a href={course.course_url || '#'} className="btn-primary !px-3 !py-1.5" style={{ fontSize: 13 }}>
              কার্টে যোগ করুন
            </a>
            <a href={course.course_url || '#'} className="btn-outline !px-3 !py-1.5" style={{ fontSize: 13 }}>
              বিস্তারিত দেখুন
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
