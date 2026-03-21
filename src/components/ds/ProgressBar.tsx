interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = "" }: ProgressBarProps) {
  const pct = Math.min(100, (current / total) * 100);
  return (
    <div className={`flex gap-1.5 ${className}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-2 flex-1 rounded-full"
          style={{
            background:
              i < current
                ? "var(--color-primary-pure)"
                : "var(--color-primary-lightest)",
          }}
        />
      ))}
    </div>
  );
}
