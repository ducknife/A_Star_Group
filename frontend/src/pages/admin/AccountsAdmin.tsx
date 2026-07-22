import { useState } from "react";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";
import { TextField, SelectField } from "../../components/ui/Field";
import { Badge } from "../../components/ui/Badge";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import { createAccount, deleteAccount, listAccounts, updateAccountRole } from "../../lib/accounts";
import { ACCOUNT_ROLE_LABELS } from "../../lib/constants";
import type { AccountRole } from "../../types";

export function AccountsAdmin() {
  const { auth } = useAuth();
  const [version, setVersion] = useState(0);
  const { data, loading, error } = useFetch(() => listAccounts(), [version]);
  const refetch = () => setVersion((v) => v + 1);

  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<AccountRole>("MEMBER");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [roleUpdatingId, setRoleUpdatingId] = useState<number | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setDisplayName("");
    setRole("MEMBER");
    setFormError(null);
  };

  const handleSubmit = async () => {
    setSaving(true);
    setFormError(null);
    try {
      await createAccount({ username, password, role, displayName: displayName || undefined });
      setShowForm(false);
      resetForm();
      refetch();
    } catch {
      setFormError("Không thể tạo tài khoản. Tên đăng nhập có thể đã tồn tại.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Xoá tài khoản "${name}"?`)) return;
    await deleteAccount(id);
    refetch();
  };

  const handleRoleChange = async (id: number, role: AccountRole) => {
    setRoleError(null);
    setRoleUpdatingId(id);
    try {
      await updateAccountRole(id, role);
      refetch();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setRoleError(err.response.data.message);
      } else {
        setRoleError("Không thể đổi vai trò tài khoản.");
      }
    } finally {
      setRoleUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink-900 dark:text-white">Tài khoản</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Tạo tài khoản cho thành viên và điều hành viên (mod). Hệ thống không cho phép tự đăng ký.
          </p>
        </div>
        <Button
          icon={<Plus size={16} />}
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Thêm tài khoản
        </Button>
      </div>

      <div className="mt-8">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {roleError && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{roleError}</p>}
        {data && data.length === 0 && <EmptyState message="Chưa có tài khoản nào ngoài admin." />}
        {data && data.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((account) => {
              const isSelf = account.username === auth?.username;
              return (
                <Card key={account.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-ink-900 dark:text-white">
                        {account.displayName || account.username}
                      </p>
                      <p className="text-sm text-ink-500 dark:text-ink-400">@{account.username}</p>
                    </div>
                    {isSelf ? (
                      <Badge>{ACCOUNT_ROLE_LABELS[account.role]}</Badge>
                    ) : (
                      <select
                        value={account.role}
                        disabled={roleUpdatingId === account.id}
                        onChange={(e) => handleRoleChange(account.id, e.target.value as AccountRole)}
                        className="border border-ink-300 bg-white px-2 py-1 text-xs font-medium outline-none focus:border-brand-600 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-100"
                      >
                        <option value="MEMBER">Thành viên</option>
                        <option value="MOD">Điều hành viên</option>
                        <option value="ADMIN">Quản trị viên</option>
                      </select>
                    )}
                  </div>
                  {!isSelf && (
                    <div className="mt-4">
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<Trash2 size={14} />}
                        onClick={() => handleDelete(account.id, account.displayName || account.username)}
                      >
                        Xoá
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {showForm && (
        <Modal title="Thêm tài khoản" onClose={() => setShowForm(false)}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <TextField
              label="Tên đăng nhập"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Mật khẩu"
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Tên hiển thị"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <SelectField label="Vai trò" value={role} onChange={(e) => setRole(e.target.value as AccountRole)}>
              <option value="MEMBER">Thành viên — chỉ đăng tải tài liệu của mình</option>
              <option value="MOD">Điều hành viên — quản lý thành viên & tài liệu</option>
              <option value="ADMIN">Quản trị viên — toàn quyền</option>
            </SelectField>

            {formError && <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Huỷ
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Đang lưu..." : "Tạo tài khoản"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
