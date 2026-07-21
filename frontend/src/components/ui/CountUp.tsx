import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView";

interface CountUpProps {
  value: string;
  durationMs?: number;
  className?: string;
}

/** Animates the numeric portion of a value like "50+" or "100+" from 0 once scrolled into view. */
export function CountUp({ value, durationMs = 1400, className }: CountUpProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const { ref, inView } = useInView<HTMLParagraphElement>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, durationMs]);

  return (
    <p ref={ref} className={className}>
      {count}
      {suffix}
    </p>
  );
}
