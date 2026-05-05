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
      <div className="aspect-video overflow-hidden relative" style={{ background: '#F3F4F6' }}>
        <img src={thumb} alt={course.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-head line-clamp-2" style={{ color: '#010202', fontWeight: 600, fontSize: 17, lineHeight: 1.3 }}>
            {course.title}
          </h3>
          {course.is_bestseller && (
            <span
              className="shrink-0 rounded-full"
              style={{
                background: 'linear-gradient(45deg, #6B6ECA, #41B9F8)',
                color: '#fff',
                fontSize: 11,
                padding: '3px 10px',
                fontWeight: 600,
              }}
            >
              বেস্টসেলার
            </span>
          )}
        </div>
        <div style={{ color: '#6B7280', fontSize: 13 }}>{course.instructor}</div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} filled={i < stars} className="w-4 h-4" style={{ color: '#41B9F8' }} />
          ))}
          <span style={{ color: '#6B7280', fontSize: 12, marginLeft: 4 }}>({course.review_count || 0})</span>
        </div>
        {withActions && course.description && (
          <p className="line-clamp-2" style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.65 }}>
            {course.description}
          </p>
        )}
        <div className="flex items-end gap-2 mt-1">
          <span className="gradient-text" style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 20 }}>৳{course.sale_price}</span>
          {course.original_price && Number(course.original_price) > 0 && (
            <span style={{ color: '#9CA3AF', fontSize: 14, textDecoration: 'line-through' }}>
              ৳{course.original_price}
            </span>
          )}
        </div>
        {withActions && (
          <div className="flex gap-2 mt-3">
            <a href={course.course_url || '#'} className="btn-primary !px-3 !py-1.5" style={{ fontSize: 13 }}>
              কার্টে যোগ
            </a>
            <a href={course.course_url || '#'} className="btn-outline !px-3 !py-1.5" style={{ fontSize: 13 }}>
              বিস্তারিত
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
