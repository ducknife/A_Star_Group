import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import type { Member } from "../../types";

export function MemberCard({ member }: { member: Member }) {
  return (
    <Link to={`/thanh-vien/${member.id}`} className="block h-full">
      <Card className="flex h-full flex-col">
        <div className="aspect-square w-full overflow-hidden border-b border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-800">
          {member.photoUrl ? (
            <img src={member.photoUrl} alt={member.fullName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-serif text-5xl text-ink-300 dark:text-ink-600">
              {member.fullName.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="kicker">{member.scholarshipName}</p>
          <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-ink-900 dark:text-white">
            {member.fullName}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-400">
            {member.university}
            {member.major ? ` — ${member.major}` : ""}
          </p>

          {member.bio && (
            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              {member.bio}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
