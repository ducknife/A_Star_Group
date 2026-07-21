import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { TextField, TextAreaField, SelectField } from "../../components/ui/Field";
import { ImageInput } from "../../components/ui/ImageInput";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import { createDocument, deleteDocument, listDocuments, updateDocument } from "../../lib/documents";
import { DOCUMENT_CATEGORY_LABELS } from "../../lib/constants";
import type { AppDocument, DocumentCategory } from "../../types";

export function DocumentsAdmin() {
  const { auth } = useAuth();
  const canManageAll = auth?.role === "ADMIN" || auth?.role === "MOD";

  const [version, setVersion] = useState(0);
  const { data, loading, error } = useFetch(() => listDocuments({ size: 1000 }), [version]);
  const documents = data?.content ?? [];
  const refetch = () => setVersion((v) => v + 1);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<AppDocument | null>(null);
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

  const openCreate = () => {
    setEditing(null);
    resetForm();
    setShowForm(true);
  };

  const openEdit = (doc: AppDocument) => {
    setEditing(doc);
    setTitle(doc.title);
    setDescription(doc.description ?? "");
    setCategory(doc.category);
    setFile(null);
    setThumbnail(null);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (editing) {
        await updateDocument(editing.id, { title, description, category, file: file ?? undefined, thumbnail: thumbnail ?? undefined });
      } else {
        if (!file || !thumbnail) return;
        await createDocument({ title, description, category, file, thumbnail });
      }
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
              : "Đăng tải và quản lý tài liệu của bạn trong kho tài liệu chung."}
          </p>
        </div>
        <Button icon={<Plus size={16} />} onClick={openCreate}>
          Tải lên tài liệu
        </Button>
      </div>

      <div className="mt-8">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {data && documents.length === 0 && <EmptyState message="Chưa có tài liệu nào. Hãy tải lên tài liệu đầu tiên." />}
        {documents.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {documents.map((doc) => {
              const canManage = canManageAll || doc.uploadedBy === auth?.username;
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
                    {canManage && (
                      <div className="mt-3 flex gap-2">
                        <Button variant="ghost" size="sm" icon={<Pencil size={14} />} onClick={() => openEdit(doc)}>
                          Sửa
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={<Trash2 size={14} />}
                          onClick={() => handleDelete(doc.id, doc.title)}
                        >
                          Xoá
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {showForm && (
        <Modal title={editing ? "Sửa tài liệu" : "Tải lên tài liệu"} onClose={() => setShowForm(false)}>
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
            <ImageInput
              label="Ảnh thumbnail"
              required={!editing}
              value={thumbnail}
              onChange={setThumbnail}
              existingUrl={editing?.thumbnailUrl}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">
                {editing ? "Thay thế tệp (không bắt buộc)" : "Tệp tài liệu"}
              </label>
              {editing && (
                <p className="mb-1.5 text-xs text-ink-400">Hiện tại: {editing.fileName}</p>
              )}
              <input
                required={!editing}
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-ink-500 dark:text-ink-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Huỷ
              </Button>
              <Button type="submit" disabled={saving || (!editing && (!file || !thumbnail))}>
                {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Tải lên"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
