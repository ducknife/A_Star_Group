import { Users, FileText, Download, GraduationCap } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { LoadingState, ErrorState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { listMembers } from "../../lib/members";
import { listDocuments } from "../../lib/documents";

export function Dashboard() {
  const members = useFetch(() => listMembers(), []);
  const documents = useFetch(() => listDocuments(), []);

  if (members.loading || documents.loading) return <LoadingState label="Đang tải tổng quan..." />;
  if (members.error || documents.error) return <ErrorState message="Không thể tải dữ liệu tổng quan." />;

  const totalDownloads = (documents.data ?? []).reduce((sum, d) => sum + d.downloadCount, 0);
  const universities = new Set((members.data ?? []).map((m) => m.university)).size;

  const cards = [
    { icon: Users, label: "Thành viên", value: members.data?.length ?? 0 },
    { icon: FileText, label: "Tài liệu", value: documents.data?.length ?? 0 },
    { icon: Download, label: "Lượt tải tài liệu", value: totalDownloads },
    { icon: GraduationCap, label: "Trường đại học", value: universities },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink-900 dark:text-white">Tổng quan</h1>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
        Số liệu tổng hợp về thành viên và tài liệu của A* SQUAD.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center border border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400">
              <Icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink-900 dark:text-white">{value}</p>
              <p className="text-sm text-ink-500 dark:text-ink-400">{label}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
