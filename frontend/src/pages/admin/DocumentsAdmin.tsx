import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { TextField, TextAreaField, SelectField } from "../../components/ui/Field";
import { ImageInput } from "../../components/ui/ImageInput";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import { createDocument, deleteDocument, listDocuments } from "../../lib/documents";
import { DOCUMENT_CATEGORY_LABELS } from "../../lib/constants";
import type { DocumentCategory } from "../../types";

export function DocumentsAdmin() {
  const { auth } = useAuth();
  const canManageAll = auth?.role === "ADMIN" || auth?.role === "MOD";

  const [version, setVersion] = useState(0);
  const { data, loading, error } = useFetch(() => listDocuments(), [version]);
  const refetch = () => setVersion((v) => v + 1);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<DocumentCategory>("SCHOLARSHIP_GUIDE");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("SCHOLARSHIP_GUIDE");
    setFile(null);
    setThumbnail(null);
  };

  const handleSubmit = async () => {
    if (!file || !thumbnail) return;
    setSaving(true);
    try {
      await createDocument({ title, description, category, file, thumbnail });
      setShowForm(false);
      resetForm();
      refetch();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, docTitle: string) => {
    if (!confirm(`Xoá tài liệu "${docTitle}"?`)) return;
    await deleteDocument(id);
    refetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink-900 dark:text-white">Tài liệu</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            {canManageAll
              ? "Quản lý toàn bộ tài liệu công khai cho cộng đồng."
              : "Đăng tải tài liệu của bạn lên kho tài liệu chung."}
          </p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => setShowForm(true)}>
          Tải lên tài liệu
        </Button>
      </div>

      <div className="mt-8">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {data && data.length === 0 && <EmptyState message="Chưa có tài liệu nào. Hãy tải lên tài liệu đầu tiên." />}
        {data && data.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((doc) => {
              const canDelete = canManageAll || doc.uploadedBy === auth?.username;
              return (
                <Card key={doc.id} className="flex flex-col">
                  <div className="aspect-[3/4] w-full overflow-hidden border-b border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-800">
                    <img src={doc.thumbnailUrl} alt={doc.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <Badge className="self-start">{DOCUMENT_CATEGORY_LABELS[doc.category]}</Badge>
                    <p className="mt-2 flex-1 font-medium text-ink-900 dark:text-white">{doc.title}</p>
                    {doc.uploadedBy && (
                      <p className="mt-1 text-xs text-ink-400">Đăng bởi @{doc.uploadedBy}</p>
                    )}
                    {canDelete && (
                      <Button
                        variant="danger"
                        size="sm"
                        className="mt-3"
                        icon={<Trash2 size={14} />}
                        onClick={() => handleDelete(doc.id, doc.title)}
                      >
                        Xoá
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {showForm && (
        <Modal title="Tải lên tài liệu" onClose={() => setShowForm(false)}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <TextField label="Tiêu đề" required value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextAreaField
              label="Tóm tắt ngắn"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <SelectField
              label="Danh mục"
              value={category}
              onChange={(e) => setCategory(e.target.value as DocumentCategory)}
            >
              {Object.entries(DOCUMENT_CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </SelectField>
            <ImageInput label="Ảnh thumbnail" required value={thumbnail} onChange={setThumbnail} />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">Tệp tài liệu</label>
              <input
                required
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-ink-500 dark:text-ink-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Huỷ
              </Button>
              <Button type="submit" disabled={saving || !file || !thumbnail}>
                {saving ? "Đang tải lên..." : "Tải lên"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
