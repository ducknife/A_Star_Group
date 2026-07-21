import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { CountUp } from "../../components/ui/CountUp";
import { about, missionValues, stats } from "../../data/siteContent";
import logo from "../../assets/images/logo.png";

export function About() {
  return (
    <>
      <section className="border-b border-ink-200 bg-ink-50 py-20 dark:border-ink-800 dark:bg-ink-900/40">
        <Container className="flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
          <div className="shrink-0 border border-ink-300 bg-white p-4 dark:border-ink-700 dark:bg-ink-950">
            <img src={logo} alt="A* SQUAD" className="h-24 w-24" />
          </div>
          <div>
            <p className="kicker justify-center lg:justify-start">{about.eyebrow}</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-ink-900 dark:text-white sm:text-5xl">
              {about.title}
            </h1>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl space-y-6">
          {about.paragraphs.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-ink-600 dark:text-ink-300">
              {p}
            </p>
          ))}
        </Container>
      </section>

      <section className="bg-ink-50 py-20 dark:bg-ink-900/40">
        <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <CountUp
                value={stat.value}
                className="font-serif text-3xl font-bold text-brand-600 dark:text-brand-400 sm:text-4xl"
              />
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Định hướng" title="Mục tiêu & Giá trị cốt lõi" align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {missionValues.map((value, i) => (
              <Card key={value.title} className="p-6">
                <span className="font-serif text-3xl font-bold text-brand-200 dark:text-brand-900">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-ink-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
