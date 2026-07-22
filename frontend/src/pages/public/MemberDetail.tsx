import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, GraduationCap, Link2 } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { LoadingState, ErrorState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { getMember } from "../../lib/members";
import { useTranslation, pickLangOptional } from "../../lib/translations";
import type { Member } from "../../types";

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13M7.11 20.45H3.56V9h3.55z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2" />
    </svg>
  );
}

function SocialLinks({ member, otherLabel }: { member: Member; otherLabel: string }) {
  const links = [
    member.linkedinUrl && { href: member.linkedinUrl, label: "LinkedIn", icon: <LinkedinIcon /> },
    member.githubUrl && { href: member.githubUrl, label: "GitHub", icon: <GithubIcon /> },
    member.otherUrl && { href: member.otherUrl, label: otherLabel, icon: <Link2 size={16} /> },
  ].filter(Boolean) as Array<{ href: string; label: string; icon: ReactNode }>;

  if (links.length === 0) return null;

  return (
    <div className="mt-6 flex gap-2 border-t border-ink-200 pt-6 dark:border-ink-800">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="inline-flex h-9 w-9 items-center justify-center border border-ink-300 text-ink-600 transition-colors hover:border-brand-600 hover:text-brand-600 dark:border-ink-700 dark:text-ink-300"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}

export function MemberDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: member, loading, error } = useFetch(() => getMember(Number(id)), [id]);
  const { t, language } = useTranslation();

  if (loading) return <LoadingState label={t.memberDetail.loading} />;
  if (error || !member) return <ErrorState message={t.memberDetail.notFound} />;

  const bio = pickLangOptional(language, member.bio, member.bioEn);

  return (
    <section className="py-16">
      <Container className="max-w-4xl">
        <Link
          to="/thanh-vien"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-600 dark:text-ink-400"
        >
          <ArrowLeft size={15} />
          {t.memberDetail.back}
        </Link>

        <div className="mt-8 grid gap-10 border border-ink-200 dark:border-ink-800 md:grid-cols-[280px_1fr]">
          <div className="aspect-square w-full overflow-hidden border-b border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-800 md:aspect-auto md:border-b-0 md:border-r">
            {member.photoUrl ? (
              <img src={member.photoUrl} alt={member.fullName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full min-h-[280px] w-full items-center justify-center font-serif text-6xl text-ink-300 dark:text-ink-600">
                {member.fullName.charAt(0)}
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <p className="kicker">{member.scholarshipName}</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-ink-900 dark:text-white sm:text-4xl">
              {member.fullName}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-400">
              <GraduationCap size={16} />
              {member.university}
              {member.major ? ` — ${member.major}` : ""}
              {member.graduationYear ? ` (${member.graduationYear})` : ""}
            </p>

            {bio && (
              <p className="mt-6 text-base leading-relaxed text-ink-600 dark:text-ink-300">{bio}</p>
            )}

            <SocialLinks member={member} otherLabel={t.memberDetail.otherLink} />
          </div>
        </div>
      </Container>
    </section>
  );
}
