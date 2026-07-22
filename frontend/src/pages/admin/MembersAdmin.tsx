import { useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";
import { TextField, TextAreaField } from "../../components/ui/Field";
import { ImageInput } from "../../components/ui/ImageInput";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { createMember, deleteMember, listMembers, updateMember, uploadMemberPhoto } from "../../lib/members";
import type { Member } from "../../types";

type FormState = Omit<Member, "id">;

const emptyForm: FormState = {
  fullName: "",
  university: "",
  scholarshipName: "",
  major: "",
  graduationYear: undefined,
  bio: "",
  bioEn: "",
  photoUrl: "",
  linkedinUrl: "",
  githubUrl: "",
  otherUrl: "",
  featured: false,
  sortOrder: 0,
};

export function MembersAdmin() {
  const { data, loading, error, refetch } = useMembersRefetch();
  const [editing, setEditing] = useState<Member | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [photo, setPhoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setPhoto(null);
    setShowForm(true);
  };

  const openEdit = (member: Member) => {
    setEditing(member);
    setForm(member);
    setPhoto(null);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const saved = editing ? await updateMember(editing.id, form) : await createMember(form);
      if (photo) await uploadMemberPhoto(saved.id, photo);
      setShowForm(false);
      refetch();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member: Member) => {
    if (!confirm(`Xoá thành viên "${member.fullName}"?`)) return;
    await deleteMember(member.id);
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink-900 dark:text-white">Thành viên</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">Quản lý danh sách thành viên hiển thị công khai.</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={openCreate}>
          Thêm thành viên
        </Button>
      </div>

      <div className="mt-8">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {data && data.length === 0 && <EmptyState message="Chưa có thành viên nào. Hãy thêm thành viên đầu tiên." />}
        {data && data.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((member) => (
              <Card key={member.id} className="flex gap-4 p-5">
                <div className="h-16 w-16 shrink-0 overflow-hidden border border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-800">
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-serif text-xl text-ink-300 dark:text-ink-600">
                      {member.fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate font-medium text-ink-900 dark:text-white">{member.fullName}</p>
                    {member.featured && <Star size={15} className="shrink-0 fill-brand-500 text-brand-500" />}
                  </div>
                  <p className="truncate text-sm text-ink-500 dark:text-ink-400">{member.university}</p>
                  <p className="mt-1 truncate text-xs text-brand-600 dark:text-brand-400">{member.scholarshipName}</p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="ghost" size="sm" icon={<Pencil size={14} />} onClick={() => openEdit(member)}>
                      Sửa
                    </Button>
                    <Button variant="danger" size="sm" icon={<Trash2 size={14} />} onClick={() => handleDelete(member)}>
                      Xoá
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <Modal title={editing ? "Sửa thành viên" : "Thêm thành viên"} onClose={() => setShowForm(false)}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <ImageInput
              label="Ảnh đại diện"
              value={photo}
              onChange={setPhoto}
              existingUrl={editing?.photoUrl}
            />
            <TextField
              label="Họ và tên"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Trường đại học"
                required
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
              />
              <TextField
                label="Chuyên ngành"
                value={form.major ?? ""}
                onChange={(e) => setForm({ ...form, major: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Học bổng"
                required
                value={form.scholarshipName}
                onChange={(e) => setForm({ ...form, scholarshipName: e.target.value })}
              />
              <TextField
                label="Năm tốt nghiệp"
                type="number"
                value={form.graduationYear ?? ""}
                onChange={(e) =>
                  setForm({ ...form, graduationYear: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </div>
            <TextAreaField
              label="Giới thiệu ngắn"
              value={form.bio ?? ""}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
            <TextAreaField
              label="Giới thiệu ngắn (Tiếng Anh, không bắt buộc)"
              value={form.bioEn ?? ""}
              onChange={(e) => setForm({ ...form, bioEn: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="LinkedIn (không bắt buộc)"
                type="url"
                placeholder="https://linkedin.com/in/..."
                value={form.linkedinUrl ?? ""}
                onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              />
              <TextField
                label="GitHub (không bắt buộc)"
                type="url"
                placeholder="https://github.com/..."
                value={form.githubUrl ?? ""}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              />
            </div>
            <TextField
              label="Liên kết khác (không bắt buộc)"
              type="url"
              placeholder="https://..."
              value={form.otherUrl ?? ""}
              onChange={(e) => setForm({ ...form, otherUrl: e.target.value })}
            />
            <label className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-300">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Hiển thị nổi bật trên trang chủ
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Huỷ
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Đang lưu..." : "Lưu"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function useMembersRefetch() {
  const [version, setVersion] = useState(0);
  const state = useFetch(() => listMembers(), [version]);
  return { ...state, refetch: () => setVersion((v) => v + 1) };
}
