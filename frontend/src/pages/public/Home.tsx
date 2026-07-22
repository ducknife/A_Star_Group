import { Link } from "react-router-dom";
import { ArrowRight, FileText, Users } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { CountUp } from "../../components/ui/CountUp";
import { Marquee } from "../../components/ui/Marquee";
import { MemberCard } from "../../components/members/MemberCard";
import { DocumentCard } from "../../components/documents/DocumentCard";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { listMembers } from "../../lib/members";
import { listDocuments } from "../../lib/documents";
import { siteContent } from "../../data/siteContent";
import { useTranslation } from "../../lib/translations";
import logo from "../../assets/images/logo.png";
import iconPencil from "../../assets/images/3d/pencil.png";
import iconRocket from "../../assets/images/3d/rocket.png";

export function Home() {
  const members = useFetch(() => listMembers(true), []);
  const documents = useFetch(() => listDocuments({ size: 3 }), []);
  const { t, language } = useTranslation();
  const content = siteContent[language];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/40">
        <Container className="grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <p className="kicker">{content.hero.eyebrow}</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-ink-900 dark:text-white sm:text-5xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 dark:text-ink-300">
              {content.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/thanh-vien">
                <Button size="lg" icon={<Users size={18} />}>
                  {t.home.exploreMembers}
                </Button>
              </Link>
              <Link to="/tai-lieu">
                <Button variant="ghost" size="lg" icon={<FileText size={18} />}>
                  {t.home.documentLibrary}
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative h-72 w-72 sm:h-88 sm:w-88">
              <div className="absolute inset-8 flex items-center justify-center border border-ink-300 bg-white p-8 dark:border-ink-700 dark:bg-ink-950">
                <img src={logo} alt="A* SQUAD" className="w-40 sm:w-48" />
              </div>
              <img
                src={iconPencil}
                alt=""
                aria-hidden
                className="absolute -bottom-6 -right-4 w-28 rotate-6 drop-shadow-xl sm:-bottom-8 sm:-right-6 sm:w-32"
              />
            </div>
            <p className="mt-8 font-script text-2xl text-brand-600 dark:text-brand-400">{content.tagline}</p>
          </div>
        </Container>
      </section>

      {/* Marquee */}
      <Marquee items={content.marqueeItems} />

      {/* Stats */}
      <section className="border-b border-ink-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/40">
        <Container className="grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {content.stats.map((stat) => (
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

      {/* About summary */}
      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow={content.about.eyebrow} title={content.about.title} align="left" />
          <div className="space-y-4">
            {content.about.paragraphs.map((p) => (
              <p key={p} className="leading-relaxed text-ink-500 dark:text-ink-300">
                {p}
              </p>
            ))}
            <Link
              to="/gioi-thieu"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              {t.home.learnMore} <ArrowRight size={15} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Mission / values */}
      <section className="bg-ink-50 py-24 dark:bg-ink-900/40">
        <Container>
          <SectionHeading
            eyebrow={t.home.coreValuesEyebrow}
            title={t.home.missionTitle}
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.missionValues.map((value, i) => (
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

      {/* Members preview */}
      <section className="py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow={t.home.peopleEyebrow} title={t.home.featuredMembersTitle} />
            <Link
              to="/thanh-vien"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              {t.home.viewAll} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-12">
            {members.loading && <LoadingState label={t.home.loadingMembers} />}
            {members.error && <ErrorState message={members.error} />}
            {members.data && members.data.length === 0 && (
              <EmptyState message={t.home.noFeaturedMembers} />
            )}
            {members.data && members.data.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members.data.slice(0, 3).map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Documents preview */}
      <section className="bg-ink-50 py-24 dark:bg-ink-900/40">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow={t.home.resourcesEyebrow} title={t.home.latestDocumentsTitle} />
            <Link
              to="/tai-lieu"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              {t.home.viewDocumentLibrary} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-12">
            {documents.loading && <LoadingState label={t.home.loadingDocuments} />}
            {documents.error && <ErrorState message={documents.error} />}
            {documents.data && documents.data.content.length === 0 && (
              <EmptyState message={t.home.noDocuments} />
            )}
            {documents.data && documents.data.content.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {documents.data.content.map((doc) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="relative overflow-hidden border border-brand-700 bg-brand-600 px-8 py-16 text-center">
            <img
              src={iconRocket}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-8 w-24 rotate-12 opacity-90 sm:w-32"
            />
            <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">{t.home.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-50">{t.home.ctaSubtitle}</p>
            <Link to="/lien-he" className="mt-8 inline-block">
              <Button variant="secondary" size="lg">
                {t.home.contactNow}
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
