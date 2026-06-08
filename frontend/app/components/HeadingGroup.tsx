interface HeadingGroupProps {
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
}

export default function HeadingGroup({
  title,
  eyebrow,
  description,
  className = "",
}: HeadingGroupProps) {
  return (
    <header className={className}>
      <hgroup>
        {eyebrow && (
          <p className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-1">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-950 leading-tight">
          {title}
        </h1>
      </hgroup>

      {description && (
        <p className="mt-4 text-lg text-slate-600">{description}</p>
      )}
    </header>
  );
}
