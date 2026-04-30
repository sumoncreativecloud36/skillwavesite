import { StarIcon } from './Icons.jsx';

export default function CourseCard({ course, withActions = false }) {
  const stars = Math.round(Number(course.rating) || 0);
  return (
    <div className="card card-hover overflow-hidden flex flex-col">
      <div className="aspect-[16/10] overflow-hidden" style={{ background: '#0B1220' }}>
        {course.thumbnail_url ? (
          <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center display text-3xl" style={{ color: '#00D4FF22' }}>SW</div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[17px] text-white line-clamp-2 leading-snug">{course.title}</h3>
          {course.is_bestseller && (
            <span
              className="shrink-0 text-[11px] px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{ background: '#00D4FF14', color: '#00D4FF', border: '1px solid #00D4FF40' }}
            >
              Bestseller
            </span>
          )}
        </div>
        <div className="text-[13px]" style={{ color: '#7C8AA3' }}>{course.instructor}</div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} filled={i < stars} className="w-4 h-4" />
          ))}
          <span className="text-[12px] ml-1" style={{ color: '#7C8AA3' }}>({course.review_count || 0})</span>
        </div>
        {withActions && course.description && (
          <p className="text-[14px] line-clamp-2" style={{ color: '#A8B5CC' }}>{course.description}</p>
        )}
        <div className="flex items-end gap-2 mt-1">
          <span className="display text-white text-xl">৳{course.sale_price}</span>
          {course.original_price && Number(course.original_price) > 0 && (
            <span className="text-sm line-through" style={{ color: '#7C8AA3' }}>৳{course.original_price}</span>
          )}
        </div>
        {withActions && (
          <div className="flex gap-2 mt-3">
            <a href={course.course_url || '#'} className="btn-primary !px-4 !py-1.5 !text-[13px]">
              কার্টে যোগ
            </a>
            <a href={course.course_url || '#'} className="btn-outline !px-4 !py-1.5 !text-[13px]">
              বিস্তারিত
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
