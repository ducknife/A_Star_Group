import { Fragment } from "react";

export function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-ink-900 bg-brand-600 py-3 dark:border-ink-100">
      <div className="marquee-track flex w-max items-center gap-8">
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {track.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex shrink-0 items-center gap-8 font-serif text-lg font-semibold uppercase tracking-widest text-white"
              >
                {item}
                <span aria-hidden className="text-white/50">
                  ✦
                </span>
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
