import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { MemberCard } from "../../components/members/MemberCard";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { listMembers } from "../../lib/members";

export function Members() {
  const { data, loading, error } = useFetch(() => listMembers(), []);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (m) =>
        m.fullName.toLowerCase().includes(q) ||
        m.university.toLowerCase().includes(q) ||
        m.scholarshipName.toLowerCase().includes(q),
    );
  }, [data, query]);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Cộng đồng A* SQUAD"
          title="Thành viên"
          description="Những cá nhân xuất sắc đã đạt học bổng và cùng đồng hành trong cộng đồng A* SQUAD."
          align="center"
          className="mx-auto"
        />

        <div className="relative mx-auto mt-10 max-w-md">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên, trường, học bổng..."
            className="w-full border border-ink-300 bg-white py-2.5 pl-11 pr-4 text-sm text-ink-800 outline-none transition-colors focus:border-brand-600 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100"
          />
        </div>

        <div className="mt-14">
          {loading && <LoadingState label="Đang tải danh sách thành viên..." />}
          {error && <ErrorState message={error} />}
          {data && filtered.length === 0 && (
            <EmptyState message={query ? "Không tìm thấy thành viên phù hợp." : "Chưa có thành viên nào được thêm."} />
          )}
          {filtered.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
