import { StarIcon } from './Icons.jsx';

export default function CourseCard({ course, withActions = false }) {
  const stars = Math.round(Number(course.rating) || 0);
  return (
    <div className="card card-hover overflow-hidden flex flex-col">
      <div className="aspect-video bg-bg-base overflow-hidden">
        {course.thumbnail_url ? (
          <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-cyan-glow opacity-30 text-3xl font-bold">SW</div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[17px] text-white line-clamp-2">{course.title}</h3>
          {course.is_bestseller && (
            <span
              className="shrink-0 text-[12px] px-2 py-0.5 rounded-full"
              style={{ background: '#00D4FF22', color: '#00D4FF' }}
            >
              বেস্টসেলার
            </span>
          )}
        </div>
        <div className="text-[13px] text-ink-muted">{course.instructor}</div>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} filled={i < stars} className="w-4 h-4 text-cyan-glow" />
          ))}
          <span className="text-[12px] text-ink-muted ml-1">({course.review_count || 0})</span>
        </div>
        {withActions && course.description && (
          <p className="text-[14px] text-ink-muted line-clamp-2">{course.description}</p>
        )}
        <div className="flex items-end gap-2 mt-1">
          <span className="text-cyan-glow font-bold text-lg">৳{course.sale_price}</span>
          {course.original_price && Number(course.original_price) > 0 && (
            <span className="text-ink-muted text-sm line-through">৳{course.original_price}</span>
          )}
        </div>
        {withActions && (
          <div className="flex gap-2 mt-3">
            <a href={course.course_url || '#'} className="btn-primary !px-3 !py-1.5 !text-[13px]">
              কার্টে যোগ করুন
            </a>
            <a href={course.course_url || '#'} className="btn-outline !px-3 !py-1.5 !text-[13px]">
              বিস্তারিত দেখুন
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
