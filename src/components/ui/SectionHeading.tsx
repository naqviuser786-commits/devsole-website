interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      {/* Eyebrow: Minimalist Architectural Monospace Pill */}
      {eyebrow && (
        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[11px] font-mono font-semibold tracking-wider text-blue-400 uppercase shadow-2xs backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          <span>{eyebrow}</span>
        </div>
      )}

      {/* Title: High-Contrast Display Heading */}
      <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.14]">
        {title}
      </h2>

      {/* Description: Refined Legible Slate Typography */}
      {description && (
        <p className={`mt-3.5 text-balance text-sm sm:text-base leading-relaxed text-slate-400 font-normal ${
          isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;