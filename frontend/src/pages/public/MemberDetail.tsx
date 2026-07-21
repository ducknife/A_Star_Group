import { Link, useParams } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { LoadingState, ErrorState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { getMember } from "../../lib/members";

export function MemberDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: member, loading, error } = useFetch(() => getMember(Number(id)), [id]);

  if (loading) return <LoadingState label="Đang tải hồ sơ thành viên..." />;
  if (error || !member) return <ErrorState message="Không tìm thấy thành viên này." />;

  return (
    <section className="py-16">
      <Container className="max-w-4xl">
        <Link
          to="/thanh-vien"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-600 dark:text-ink-400"
        >
          <ArrowLeft size={15} />
          Quay lại danh sách thành viên
        </Link>

        <div className="mt-8 grid gap-10 border border-ink-200 dark:border-ink-800 md:grid-cols-[280px_1fr]">
          <div className="aspect-square w-full overflow-hidden border-b border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-800 md:aspect-auto md:border-b-0 md:border-r">
            {member.photoUrl ? (
              <img src={member.photoUrl} alt={member.fullName} className="h-full w-full object-cover grayscale" />
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

            {member.bio && (
              <p className="mt-6 text-base leading-relaxed text-ink-600 dark:text-ink-300">{member.bio}</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
